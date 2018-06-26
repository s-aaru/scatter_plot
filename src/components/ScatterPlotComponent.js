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
    // ctx.fillText(upperLeftCornerX+ ' , '+upperLeftCornerY, 10, 2);
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

setXaxisTips(){
    const canvas = this.refs.canvas;
    let ctx = canvas.getContext("2d");
    let i = canvas.width;
    while(i>0){
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(i,-20);
        ctx.fillText(i,10);
        ctx.restore();
        i = i/10;
    }
    
  
}
onClick(event){
    
    const canvas = this.refs.canvas;
    let ctx = canvas.getContext("2d");
    
    let xpos = event.clientX;
    let ypos = canvas.height - event.clientY;
    console.log("clicked ",xpos,ypos)
    for(let i=0; i<this.options.data.length; i++){
        console.log("inside loop")
if(this.options.data[i].start_time>xpos && this.options.data[i].duration>ypos){
console.log(this.options.data[i])
    //ctx.fillStyle=color;
    ctx.beginPath();
    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);
    ctx.arc(this.options.data[i].start_time,(canvas.height - this.options.data[i].duration),10,0,2*Math.PI);
    // ctx.fillText(upperLeftCornerX+ ' , '+upperLeftCornerY, 10, 2);
    ctx.lineWidth = 20;
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    }
}
}
scatterPlotChart(){
    let me = this;
	const canvas = this.refs.canvas;
    canvas.width = this.getCanvasWidth();
    canvas.height = this.getCanvasHeight();
    canvas.addEventListener('click', function(event){me.onClick(event);}, false);
    let ctx = canvas.getContext("2d");
    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);
    this.options.gridScale = 5;
    var maxValue = 10;
    var canvasActualHeight = canvas.height;
    var canvasActualWidth = canvas.width;
    console.log("maxValue  ",maxValue)

        //drawing the grid lines
        let gridY = 0;

        for(let i=0; i< canvas.height/30; i++){
            gridY = (30 + gridY);

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
            if(i%2!==0){
                             ctx.fillText(gridY/60 + 'min',0,gridY);
         }
         ctx.restore();
         //this.setXaxisTips();
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