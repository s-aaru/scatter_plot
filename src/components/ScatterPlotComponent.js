import React, {Component} from 'react';


class Scatterplotcomponent extends Component{

	constructor(props, context){
		super(props,context);
    console.log("Scatterplotcomponent Scatterplotcomponent", props)
    this.options = {};
    this.options.data = props.loadedData;
    /*If json-server si down , then uncomment below line to set static data*/
    this.options.data = props.data;
	}

	/*Method to create scatter plot circles*/
  drawPlots(ctx, upperLeftCornerX, upperLeftCornerY,color, canvasHt){
    ctx.fillStyle=color;
    ctx.beginPath();
    ctx.arc(upperLeftCornerX,upperLeftCornerY,10,0,2*Math.PI);
    ctx.fillText(upperLeftCornerX+ ' , '+upperLeftCornerY, upperLeftCornerX-10/4 ,upperLeftCornerY-10/2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

/*Method to create grid lines*/
  drawLine(ctx, startX, startY, endX, endY,color){
  ctx.save();
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(startX,startY);
  ctx.lineTo(endX,endY);
  ctx.stroke();
  ctx.restore();
}

/*set chart width based on data*/
getCanvasWidth(){
  let plotterpoints = this.props.data;
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

/*set chart height based on data*/
getCanvasHeight(){
  let plotterpoints = this.props.data;
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

/*Set chart axis labels*/
setAxisLabels(){
    //ToDo" Logic to create axis labels
  }

/*on click event listener to highlight the plot on select*/
  onClick(event){

    const canvas = this.refs.canvas;
    let ctx = canvas.getContext("2d");
    let xpos = event.clientX;
    let ypos = canvas.height - event.clientY;
    for(let i=0; i<this.options.data.length; i++){
      if(this.options.data[i].start_time<(xpos-2) && this.options.data[i].duration<(ypos-2)){
        let color = this.getColorCode(this.options.data[i].status);
        ctx.beginPath();
        ctx.translate(0, canvas.height);
        ctx.scale(1, -1);
        ctx.arc(this.options.data[i].start_time,(canvas.height - this.options.data[i].duration),10,0,2*Math.PI);
        ctx.fillStyle=color;
        ctx.lineWidth = 5;
        ctx.fill();
        ctx.stroke();
        ctx.restore();

      }
    }
  }

/*Method to set the scatter circle/bubble color*/
  getColorCode(status){
    let color;
    if(status==='error'){
      color ='orange';
    }else if(status==='pass'){
      color ='green';
    }else{
      color = 'red';
    }
    return color;
  }

  /*Main method to generate the scatter plot chart */
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
       }

        //drawing the plots
        var totalPlots = this.options.data;
        for (let i=0; i<totalPlots.length; i++){
          let color = this.getColorCode(totalPlots[i].status);
          this.drawPlots(
            ctx,
            totalPlots[i].start_time,
            totalPlots[i].duration,
            color,
            canvas.height
            );
        }
      }




      componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        this.scatterPlotChart();
        this.setAxisLabels();
      }



      render(){
        var passStyle = {
          backgroundColor: 'green',
          width: '20px'
        };
        var errorStyle = {
          backgroundColor: 'orange',
          width: '20px'
        };
        var failStyle = {
          backgroundColor: 'red',
          width: '20px'
        };

        return(
         <div>	
         <div id = 'chartArea'>
         <canvas ref="canvas" />
         <div id='xAxisTips'></div>
         </div>
         <div id="scatterplotLegend">
         <div><span style = {passStyle}>&nbsp;</span> Pass</div>
         <div><span style = {errorStyle}>&nbsp;</span> Error</div>
         <div><span style = {failStyle}>&nbsp;</span> Fail</div>
         </div>
         </div>
         )
      }
    }

    export default Scatterplotcomponent;