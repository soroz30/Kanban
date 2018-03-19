import React, { Component } from 'react';
import { connect } from 'react-redux';
import Lanes from '../Lane/Lanes';
import styles from './Kanban';
import { createLaneRequest, fetchLanes } from '../Lane/LaneActions';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { compose } from 'redux';

class Kanban extends Component {
    componentWillMount = () => {
        this.props.fetchLanes();
    }

    render = () => {
        return (
              <div>
                <button
                  className={styles.AddLane}
                  onClick={() => this.props.createLane({
                    name: 'New lane',
                  })}
                >Add lane</button>
                <Lanes lanes={this.props.lanes} />
              </div>
        )
    }
}

Kanban.need = [() => { return fetchLanes(); }];

const mapStateToProps = state => ({
    lanes: Object.values(state.lanes)
});

const mapDispatchToProps = {
    createLane: createLaneRequest,
    fetchLanes
};

export default compose(connect(mapStateToProps, mapDispatchToProps),
                       DragDropContext(HTML5Backend))(Kanban);