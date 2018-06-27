import {combineReducers} from 'redux';
import plottedPoints from './plottedPointsReducer';

const rootReducer = combineReducers({
	plottedPoints
});

export default rootReducer;