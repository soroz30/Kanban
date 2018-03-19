import callApi from '../util/apiCaller';

export const CREATE_NOTE = 'CREATE_NOTE';
export const CREATE_NOTES = 'CREATE_NOTES';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';
export const MOVE_WITHIN_LANE = 'MOVE_WITHIN_LANE';
export const CLEAR_ACTIVE_LANE = 'CLEAR_ACTIVE_LANE';


export function createNote(note, laneId) {
    return {
        type: CREATE_NOTE,
        laneId,
        note,
    };
}

export function createNotes(notesData) {
    console.log(notesData)
    return {
        type: CREATE_NOTES,
        notes: notesData,
    };
}

export function createNoteRequest(note, laneId) {
    return (dispatch) => {
        return callApi('notes', 'post', { note, laneId }).then(noteResp => {
            dispatch(createNote(noteResp, laneId));
        });
    };
}

export function updateNote(note) {
    return {
        type: UPDATE_NOTE,
        note,
    };
}

export function updateNoteRequest(note, laneId) {
    return (dispatch) => {
        return callApi(`notes/${note.id}/task`, 'post', { note, laneId }).then(noteResp => {
            dispatch(updateNote(note));
        });
    };
}

export function deleteNote(noteId, laneId) {
    return {
        type: DELETE_NOTE,
        noteId,
        laneId,
    };
}

export function deleteNoteRequest(noteId, laneId) {
    return (dispatch) => {
        return callApi(`notes/${noteId}`, 'delete', { laneId }).then(noteResp => {
            dispatch(deleteNote(noteResp.id, laneId));
        });
    };
}

export function editNote(noteId) {
    return {
        type: EDIT_NOTE,
        id: noteId,
    };
}

export function moveWithinLane(laneId, targetId, sourceId) {
    return {
        type: MOVE_WITHIN_LANE,
        laneId,
        targetId,
        sourceId,
    };
}