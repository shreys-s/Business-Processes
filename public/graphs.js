var results= [];
var svendor=0;
var tvendor=0;
var spurchase=0;
var tpurchase=0;
window.onload = function () {
$.getJSON('results/data', function( data ) {
    console.log(data);
    for(var i in data) {
        if(data[i].section == "Vendor Analysis")
        {
        svendor=svendor+(data[i].question.weight*data[i].answer);
        tvendor=tvendor+data[i].question.weight;
        }
    };
    svendor=svendor/tvendor;
    for(var i in data) {
        if(data[i].section == "Purchase Section")
        {
        spurchase=spurchase+(data[i].question.weight*data[i].answer);
        tpurchase=tpurchase+data[i].question.weight;
        }
    };
    spurchase=spurchase/tpurchase;


    var chart = new CanvasJS.Chart("chartContainer", {
        theme: "light1", // "light2", "dark1", "dark2"
        animationEnabled: true, // change to true      
        title:{
            text: "Procure To Pay"
        },
        data: [
        {
            // Change type to "bar", "area", "spline", "pie",etc.
            type: "column",
            dataPoints: [
                { label:  "Vendor Analysis",  y: svendor  },
                { label: "Purchase Section", y: spurchase  }
            ]
        }
        ]
    });
    chart.render();
    var chart2 = new CanvasJS.Chart("chartContainer2", {
        theme: "light1", // "light2", "dark1", "dark2"
        animationEnabled: true, // change to true      
        title:{
            text: "Procure To Pay"
        },
        data: [
        {
            // Change type to "bar", "area", "spline", "pie",etc.
            type: "column",
            dataPoints: [
                { label:  "Vendor Analysis",  y: svendor  },
                { label: "Purchase Section", y: spurchase  }
            ]
        }
        ]
    });
    chart2.render();
});
}