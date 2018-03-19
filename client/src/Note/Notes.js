import React from 'react';
import Note from './Note';
import Edit from '../Edit/Edit';

import styles from './Note';

const Notes = (props) => {
    const {
        notes,
        laneId,
        editNote,
        updateNoteRequest,
        deleteNoteRequest,
        moveWithinLane,
        moveBetweenLanes,
        clearLanesChanges,
        changes,
        updateLanesNotes
    } = props;
    return (
        <ul className={styles.Notes}>{notes.map(note =>
            <Note
                id={note.id}
                key={note.id}
                moveWithinLane={moveWithinLane}
                moveBetweenLanes={moveBetweenLanes}
                clearLanesChanges={clearLanesChanges}
                laneId={laneId}
                changes={changes}
                updateLanesNotes={updateLanesNotes}
            >
                <Edit
                    editing={note.editing}
                    value={note.task}
                    onValueClick={() => editNote(note.id)}
                    onUpdate={(task) => updateNoteRequest({
                        ...note,
                        task,
                        editing: false,
                    },
                        laneId
                    )}
                    onDelete={() => deleteNoteRequest(note.id, laneId)}
                />
            </Note>
        )}</ul>);
};

export default Notes;
