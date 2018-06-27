import entityApi from '../api/entityApi';


export function loadPlottedPointsSuccess(entities){
	return {type:"LOAD_PLOTTED_POINTS_SUCCESS",entities}
}

export function loadPlottedPoints(){
	return function(dispatch){
		entityApi.loadPlottedPoints().then(entities=>{
			console.log("entities ",entities)
          dispatch(loadPlottedPointsSuccess(entities))
		}).
		catch(error=>{
			throw(error);
		});
	}
}