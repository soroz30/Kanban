import { combineReducers } from 'redux';

import lanes from './Lane/LaneReducer';
import notes from './Note/NoteReducer';

const reducers = {
    lanes,
    notes
};

export default reducers;