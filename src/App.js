import React,{ Component } from 'react';
import Scatterplotcomponent from './components/ScatterPlotComponent';
import plotterpoints from './data/data';
import {connect} from 'react-redux';
import * as entityAction from './actions/entityAction';
import {bindActionCreators} from 'redux';


class App extends Component{
	constructor(props,context){
		super(props, context);
	}

	componentDidMount(){
		console.log("this.props ",this.props)
	}

	render(){
		return(
			<div>
			SCATTER PLOT COMPONENT:
				<Scatterplotcomponent ref="scatterplotcanvas" data={plotterpoints} loadedData = {this.props.plottedPoints} ></Scatterplotcomponent>
			</div>
			)
	}
} 

function mapStateToProps(state, ownProps){
	return{
		plottedPoints: state.plottedPoints
	}

}

function mapDispatchToProps(dispatch){
	return {actions: bindActionCreators(entityAction,dispatch)};
	
}

export default connect(mapStateToProps, mapDispatchToProps)(App);