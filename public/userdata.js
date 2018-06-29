

window.onload = function () {
    var p2p=[0,0,0,0,0];
    var o2c=[0,0,0,0,0];
    var h2r=[0,0,0,0,0];
    $.getJSON('http://localhost:3000/assessment/results/userdata', function(user) {
        console.log(user);
    $.getJSON('http://localhost:3000/assessment/results/users/data', function(allusers) {
        console.log(allusers);
        for (var i = 0; i < allusers.length; i++) {
            p2p[0] = p2p[0] + allusers[i].p2p.purchasesection;
            p2p[1] = p2p[1] + allusers[i].p2p.vendoranalysis;
            p2p[2] = p2p[2] + allusers[i].p2p.erpsection;
            p2p[3] = p2p[3] + allusers[i].p2p.finances;
            p2p[4] = p2p[4] + allusers[i].p2p.score;
        }
        p2p[0]=p2p[0]/allusers.length;
        p2p[1]=p2p[1]/allusers.length;
        p2p[2]=p2p[2]/allusers.length;
        p2p[3]=p2p[3]/allusers.length;
        p2p[4]=p2p[4]/allusers.length;
        console.log(p2p);

        for (var i = 0; i < allusers.length; i++) {
            o2c[0] = o2c[0] + allusers[i].o2c.billing;
            o2c[1] = o2c[1] + allusers[i].o2c.cashapplication;
            o2c[2] = o2c[2] + allusers[i].o2c.creditanalysis;
            o2c[3] = o2c[3] + allusers[i].o2c.glposting;
            o2c[4] = o2c[4] + allusers[i].o2c.score;
        }
        o2c[0]=o2c[0]/allusers.length;
        o2c[1]=o2c[1]/allusers.length;
        o2c[2]=o2c[2]/allusers.length;
        o2c[3]=o2c[3]/allusers.length;
        o2c[4]=o2c[4]/allusers.length;
        console.log(o2c);
//ProcureToPay        
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
            itemclick: toggleDataSeries1
        },
        data: [{
            type: "column",
            name: "Maturity",
            legendText: "Maturity",
            showInLegend: true, 
            dataPoints:[
                { label: "Purchase Section", y: user.p2p.purchasesection },
                { label: "Vendor Analysis", y: user.p2p.vendoranalysis },
                { label: "Finances", y: user.p2p.finances },
                { label: "ERP Section", y: user.p2p.erpsection }
            ]
        },
        {
            type: "column", 
            name: "Average",
            legendText: "Average",
            axisYType: "secondary",
            showInLegend: true,
            dataPoints:[
                { label: "Purchase Section", y: p2p[0] },
                { label: "Vendor Analysis", y: p2p[1] },
                { label: "Finances", y: p2p[3] },
                { label: "ERP Section", y: p2p[2] }
            ]
        }]
    });
    chart.render();
    function toggleDataSeries1(e) {
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        chart.render();
    }


//OrderToCash
        var chart3 = new CanvasJS.Chart("chartContainer3", {
        animationEnabled: true,
        title:{
            text: "Order To Cash"
        },  
        axisY: {
            title: "Maturity",
            titleFontColor: "#F79E4F",
            lineColor: "#F79E4F",
            labelFontColor: "#F79E4F",
            tickColor: "#F79E4F"
        },
        axisY2: {
            title: "Average",
            titleFontColor: "#4FA8F7",
            lineColor: "#4FA8F7",
            labelFontColor: "#4FA8F7",
            tickColor: "#4FA8F7"
        },  
        toolTip: {
            shared: true
        },
        legend: {
            cursor:"pointer",
            itemclick: toggleDataSeries3
        },
        data: [{
            type: "column",
            name: "Maturity",
            legendText: "Maturity",
            color: "#F79E4F",
            showInLegend: true, 
            dataPoints:[
                { label: "Billing", y: user.o2c.billing },
                { label: "Cash Application & Collection", y: user.o2c.cashapplication },
                { label: "Credit Analysis", y: user.o2c.creditanalysis },
                { label: "GL Posting & Reporting", y: user.o2c.glposting }
            ]
        },
        {
            type: "column", 
            name: "Average",
            legendText: "Average",
            color:"#4FA8F7",
            axisYType: "secondary",
            showInLegend: true,
            dataPoints:[
                { label: "Billing", y: o2c[0] },
                { label: "Cash Application & Collection", y: o2c[1] },
                { label: "Credit Analysis", y: o2c[2] },
                { label: "GL Posting & Reporting", y: o2c[3] }
            ]
        }]
    });
    chart3.render();


    function toggleDataSeries3(e) {
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        chart3.render();
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


    });
    });
}

