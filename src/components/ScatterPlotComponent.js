import React, {Component} from 'react';
import plotterpoints from '../data/data';

class Scatterplotcomponent extends Component{

	


	constructor(props, context){
		super(props,context);
		this.options = {};
        this.options.data = plotterpoints;

		// console.log("plotterpoints are ", props.data)
	}

	
    drawPlots(ctx, upperLeftCornerX, upperLeftCornerY,color){
       console.log("drawPlots executed ---------> ",ctx, upperLeftCornerX, upperLeftCornerY)
    //ctx.save();
    ctx.fillStyle=color;
    ctx.beginPath();
    ctx.arc(upperLeftCornerX,upperLeftCornerY,10,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

drawLine(ctx, startX, startY, endX, endY,color){
  console.log("drawLine------",ctx, startX, startY, endX, endY,color)
  ctx.save();
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(startX,startY);
  ctx.lineTo(endX,endY);
  ctx.stroke();
  ctx.restore();
}

getCanvasWidth(){
    let maxWidth = plotterpoints[0].start_time;
    for(let i=1; i<plotterpoints.length;i++){
        if(maxWidth<plotterpoints[i].start_time){
            maxWidth = plotterpoints[i].start_time;
        }

    }

    if((maxWidth%100)!==0){
        maxWidth = maxWidth + (maxWidth%100)
    }
    return maxWidth;
}

getCanvasHeight(){
    let maxHeight = plotterpoints[0].duration;
    for(let i=1; i<plotterpoints.length;i++){
        if(maxHeight<plotterpoints[i].duration){
            maxHeight = plotterpoints[i].duration;
        }

    }

    if((maxHeight%100)!==0){
        maxHeight = maxHeight + (maxHeight%100)
    }
    return maxHeight;
}

scatterPlotChart(){
	const canvas = this.refs.canvas;
    canvas.width = this.getCanvasWidth();
    canvas.height = this.getCanvasHeight();
    let ctx = canvas.getContext("2d");
    this.options.gridScale = 5;
    var maxValue = 10;
    var canvasActualHeight = canvas.height;
    var canvasActualWidth = canvas.width;
    console.log("maxValue  ",maxValue)
    
        //drawing the grid lines
        let gridY = 0;

        for(let i=0; i< canvas.height/10; i++){
            gridY = canvas.height/10 + gridY;
            let gridValue = 0;

            this.drawLine(
                ctx,
                0,
                gridY,
                canvas.width,
                gridY,
                '#eeeee'
                );
            
            //writing grid markers
            ctx.save();
            ctx.fillStyle = '#eeeee';
            ctx.font = "bold 10px Arial";
            if(i%2===0){
             ctx.fillText(5 - (i/2) + ' min', 10,gridY - 2);
         }
         ctx.restore();
         gridValue+=2;
     }



        // -------------------------------------------



        //drawing the plots


        var totalPlots = this.options.data;
        
        let color = 'grey';
        for (let i=0; i<totalPlots.length; i++){
        	console.log("totalPlots------------- ",i)
        	if(totalPlots[i].status==='error'){
        		color ='orange';
        	}else if(totalPlots[i].status==='pass'){
        		color ='green';
        	}else{
                color = 'red';
            }
            this.drawPlots(
                ctx,
                totalPlots[i].start_time,
                totalPlots[i].duration,
                color
                );
        }
    }

    


    componentDidMount() {
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext("2d");
		 // this.drawLine(ctx,0,0,100,100,'red');
       this.scatterPlotChart();
       
   }

   

   render(){
      console.log("props", this.props)

      return(
       <div>	
       <canvas ref="canvas" />
       </div>
       )
   }
}

export default Scatterplotcomponent;