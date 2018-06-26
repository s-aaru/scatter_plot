import React, {Component} from 'react';
import Scatterplotcomponent from '../components/ScatterPlotComponent';


class Scattterplot extends Component{
	constructor(props, context){
		super(props,context);
		this.state = {
			"height":"300",
			"width":"800",
			"startX":"0",
			"startY":"0",
			"endX":"10",
			"endY":"10"

		};

		// this.updateProps = this.updateProps.bind(this);

		// console.log("plotterpoints are ", props.data)
	}


	render(){
		console.log("props", this.props)

		return(
	<div>	
    <Scatterplotcomponent ref="scatterplotcanvas" height={this.state.height} width={this.state.width}  ></Scatterplotcomponent>
    </div>
   


			)
	}
}

export default Scattterplot;