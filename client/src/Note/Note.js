import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { compose } from 'redux';
import styles from './Note';
import ItemTypes from '../Kanban/itemTypes';

class Note extends React.Component {
    render() {
        const {
            connectDragSource,
            connectDropTarget,
            isDragging,
            editing,
            children
        } = this.props;

        const DragSource = editing ? a => a : connectDragSource;

        return DragSource(connectDropTarget(
            <li
                className={styles.Note}
                style={{
                    opacity: isDragging ? 0 : 1
                }}
            >
                {children}
            </li>
        ));
    }
}

const noteSource = {
    beginDrag(props) {
        return {
            id: props.id,
            laneId: props.laneId,
            clearLanesChanges: props.clearLanesChanges,
        };
    },
    isDragging(props, monitor) {
        return props.id === monitor.getItem();
    },
    endDrag(props, monitor) {
        props.updateLanesNotes(monitor.getDropResult().changes);
        props.clearLanesChanges();
    }
};

const noteTarget = {
    drop(targetProps, monitor) {
        const sourceProps = monitor.getItem();

        return {
            sourceId: sourceProps.id,
            sourceLaneId: sourceProps.laneId,
            change: targetProps.changes
        }
    },
    hover(targetProps, monitor) {
        const sourceProps = monitor.getItem();

        if (targetProps.id !== sourceProps.id) {
            if (sourceProps.laneId === targetProps.laneId) {
                targetProps.moveWithinLane(targetProps.laneId, targetProps.id, sourceProps.id);
            } else if (targetProps.id !== sourceProps.id) {
                targetProps.moveBetweenLanes(targetProps.laneId, sourceProps.laneId, sourceProps.id, targetProps.id);
            }
        }
    }
}

export default compose(
                   DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({
                       connectDragSource: connect.dragSource(),
                       isDragging: monitor.isDragging(),
                   })),
                   DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
                       connectDropTarget: connect.dropTarget(),
                   }))
               )(Note);
               