        window.onload = function () {
var gauge = {
		title:{text: "Gauge Chart"},
		data : { y: 71 }, //gauge value change it
		maximum : 100
    };



var chart = new CanvasJS.Chart("chartContainer2");

createGauge(chart);



//Function for gauge
function createGauge(chart){

		//Caluculation of remaining parameters to render gauge with the help of doughnut
    gauge.unoccupied = {
                      y: gauge.maximum - gauge.data.y , 
                      color: "#DEDEDE", 
                      toolTipContent: null, 
                      highlightEnabled: false,
                      click : function (){ gauge.unoccupied.exploded = true; }
                  }
   gauge.data.click = function (){ gauge.data.exploded = true; };
   if(!gauge.data.color)
    	gauge.data.color = "#69C434";
   gauge.valueText = {text: gauge.data.y.toString(), verticalAlign :"center"};
   
   
		var data = {
        					type: "doughnut",
        					dataPoints: [
                  {
                    y: gauge.maximum ,
                    color: "transparent",
                    toolTipContent: null
                  },
                  gauge.data,
                  gauge.unoccupied
                ],
      };
    
    if(!chart.options.data)
    	chart.options.data = [];
    chart.options.data.push(data);
    
    
    
    if(gauge.title){
    	chart.options.title = gauge.title;
    }
    
    //For showing value
    if(!chart.options.subtitles)
    	chart.options.subtitles = [];
    chart.options.subtitles.push(gauge.valueText);
    

    chart.render();
}
}