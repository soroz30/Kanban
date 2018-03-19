import React from 'react';
import NotesContainer from '../Note/NotesContainer';
import Edit from '../Edit/Edit';

import styles from './Lane';

const Lane = (props) => {
    const {
        connectDropTarget,
        lane,
        laneNotes,
        updateLane,
        addNote,
        editLane,
        deleteLane
    } = props;
    const laneId = lane.id;

    return connectDropTarget(
        <div className={styles.Lane}>
            <div className={styles.LaneHeader}>
                <Edit
                    className={styles.LaneName}
                    editing={lane.editing}
                    value={lane.name}
                    onValueClick={() => editLane(lane.id)}
                    onUpdate={name => updateLane({ ...lane, name, editing: false })}
                    onDelete={() => deleteLane(lane)}
                />
                <div className={styles.LaneAddNote}>
                    <button 
                        className={styles.AddButton}
                        onClick={() => addNote({ task: 'New Note' }, laneId)}
                    >Add Note
                    </button>
                </div>
            </div>
            <NotesContainer
                notes={laneNotes}
                laneId={laneId}
            />
        </div>
    );
}

export default Lane;
