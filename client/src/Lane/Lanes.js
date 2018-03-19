import React from 'react';
import Lane from './LaneContainer.js';

const Lanes = ({ lanes }) => {
    return (
        <div className='lanes'>
            {lanes.filter(lane => lane.id).map(lane => {
                return <Lane className='lane' key={lane.id} lane={lane} />
            })}
        </div>
    );
};

export default Lanes;