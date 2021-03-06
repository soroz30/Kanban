import {
    CREATE_LANE,
    CREATE_LANES,
    UPDATE_LANE,
    DELETE_LANE,
    EDIT_LANE,
    MOVE_BETWEEN_LANES,
    CLEAR_LANES_CHANGES
} from './LaneActions';

import {
    DELETE_NOTE,
    CREATE_NOTE,
    MOVE_WITHIN_LANE
} from '../Note/NoteActions';

import omit from 'lodash/omit';

const initialState = {};

function handleActiveLaneChange(state, targetLaneId, sourceNoteId, sourceLaneId) {
    const stateModifiedCopy = { ...state };
    if (state.activeLane === targetLaneId) { return stateModifiedCopy; }
    if (!state.activeLane && !sourceLaneId) {
        stateModifiedCopy.activeLane = targetLaneId;
        return stateModifiedCopy;
    }
    const activeLane = state.activeLane || sourceLaneId;
    stateModifiedCopy[activeLane].notes = stateModifiedCopy[activeLane].notes.filter(noteId => noteId !== sourceNoteId);
    stateModifiedCopy.activeLane = targetLaneId;
    return stateModifiedCopy;
}

function insertNotes(array, sourceNoteId, targetNoteId) {
    const targetIndex = array.indexOf(targetNoteId);
    const arrayCopy = [...array];

    targetIndex === -1 ? arrayCopy.push(sourceNoteId) : arrayCopy.splice(targetIndex, 0, sourceNoteId);
    return arrayCopy;
}

function moveNotes(array, sourceNoteId, targetNoteId) {
    const sourceIndex = array.indexOf(sourceNoteId);
    if (sourceIndex === -1) {
        return insertNotes(array, sourceNoteId, targetNoteId);
    }
    const targetIndex = array.indexOf(targetNoteId);
    const arrayCopy = [...array];

    if (targetIndex === -1) { return arrayCopy; }
    arrayCopy.splice(targetIndex, 0, arrayCopy.splice(sourceIndex, 1)[0]);
    return arrayCopy;
}

const lanes = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_LANE:
        case UPDATE_LANE:
             return { ...state, [action.lane.id]: action.lane };
        case EDIT_LANE: {
             const lane = { ...state[action.id], editing: true };
             return { ...state, [action.id]: lane };
        }
        case CREATE_LANES:
             return { ...action.lanes };
        case DELETE_NOTE: {
             const newLane = { ...state[action.laneId] };
             newLane.notes = newLane.notes.filter(noteId => noteId !== action.noteId);
  
             return { ...state, [action.laneId]: newLane };
        }
        case CREATE_NOTE: {
             const newLane = { ...state[action.laneId] };
             newLane.notes = newLane.notes.concat(action.note.id);
  
             return { ...state, [action.laneId]: newLane };
        }
        case DELETE_LANE: {
             return omit(state, action.laneId);
        }
        case MOVE_WITHIN_LANE: {
             const stateModifiedCopy = handleActiveLaneChange(state, action.laneId, action.sourceId);
             const newLane = { ...stateModifiedCopy[action.laneId] };
             newLane.notes = moveNotes(newLane.notes, action.sourceId, action.targetId);
             const changedLane = { [action.laneId]: newLane.notes };
             return { ...stateModifiedCopy, [action.laneId]: newLane, changes: changedLane };
        }
        case MOVE_BETWEEN_LANES: {
             const stateModifiedCopy = handleActiveLaneChange(state, action.targetLaneId, action.sourceNoteId, action.sourceLaneId);
             const targetLane = { ...stateModifiedCopy[action.targetLaneId] };
  
             if (!targetLane.notes.length) {
                 targetLane.notes = [...targetLane.notes, action.sourceNoteId];
             } else if (targetLane.notes.indexOf(action.sourceNoteId) === -1) {
                 targetLane.notes = insertNotes(targetLane.notes, action.sourceNoteId, action.targetNoteId);
             } else {
                 targetLane.notes = moveNotes(targetLane.notes, action.sourceNoteId, action.targetNoteId);
             }
             const changedLanes = { [action.sourceLaneId]: stateModifiedCopy[action.sourceLaneId].notes, [action.targetLaneId]: targetLane.notes };
             return { ...stateModifiedCopy, [action.targetLaneId]: targetLane, changes: changedLanes };
        }
        case CLEAR_LANES_CHANGES: {
             return { ...state, activeLane: '', changes: {} };
        }
        default:
             return state;
    }
}

export default lanes;