import React,{ Component } from 'react';
import plotpoints from './data/data';
import Scatterplot from './pages/Scatterplot'


class App extends Component{
	render(){
		console.log("plotpoints",plotpoints)
	return(
<div>
SCATTER PLOT COMPONENT:
<Scatterplot data = {plotpoints} />
</div>
	)
	}
} 

export default App;