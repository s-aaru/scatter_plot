import initialState from './initialState';
 export default function plottedPoints(state = initialState.plottedPoints, action){
 	switch( action.type){
 		case "LOAD_PLOTTED_POINTS_SUCCESS":{
 			return action.entities
 		}
 		default:
 			return state
 	}
 }