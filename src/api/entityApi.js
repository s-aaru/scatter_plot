class EntityApi{

	static loadPlottedPoints(){
		return fetch("http://localhost:3000/plotterpoints").then(response => response.json())
		.then(j => {
			return j;
		})
	}
}

export default EntityApi;