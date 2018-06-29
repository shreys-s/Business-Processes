        window.onload = function () {
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            title:{
                text: "Procure To Pay"
            },  
            axisY: {
                title: "Maturity",
                titleFontColor: "#4F81BC",
                lineColor: "#4F81BC",
                labelFontColor: "#4F81BC",
                tickColor: "#4F81BC"
            },
            axisY2: {
                title: "Average",
                titleFontColor: "#C0504E",
                lineColor: "#C0504E",
                labelFontColor: "#C0504E",
                tickColor: "#C0504E"
            },  
            toolTip: {
                shared: true
            },
            legend: {
                cursor:"pointer",
                itemclick: toggleDataSeries
            },
            data: [{
                type: "column",
                name: "Maturity",
                legendText: "Maturity",
                showInLegend: true, 
                dataPoints:[
                    { label: "Purchase Section", y: 266.21 },
                    { label: "Vendor Analysis", y: 302.25 },
                    { label: "Finances", y: 157.20 },
                    { label: "ERP Section", y: 148.77 }
                ]
            },
            {
                type: "column", 
                name: "Average",
                legendText: "Average",
                axisYType: "secondary",
                showInLegend: true,
                dataPoints:[
                    { label: "Purchase Section", y: 10.46 },
                    { label: "Vendor Analysis", y: 2.27 },
                    { label: "Finances", y: 3.99 },
                    { label: "ERP Section", y: 4.45 }
                ]
            }]
        });
        chart.render();

        function toggleDataSeries(e) {
            if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
            }
            else {
                e.dataSeries.visible = true;
            }
            chart.render();
        }


            var gauge = {
                    title:{text: "Gauge Chart"},
                    data : { y: 71 }, //gauge value change it
                    maximum : 100
                };



            var chart2 = new CanvasJS.Chart("chartContainer2");

            createGauge(chart2);



            //Function for gauge
            function createGauge(chart2){

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
                
                if(!chart2.options.data)
                    chart2.options.data = [];
                chart2.options.data.push(data);
                
                
                
                if(gauge.title){
                    chart2.options.title = gauge.title;
                }
                
                //For showing value
                if(!chart2.options.subtitles)
                    chart2.options.subtitles = [];
                chart2.options.subtitles.push(gauge.valueText);
                

                chart2.render();
            }



        }

