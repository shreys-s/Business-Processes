var results= [];
var svendor=0;
var tvendor=0;
var spurchase=0;
var tpurchase=0;
var sfinances=0;
var tfinances=0;
var serp=0;
var terp=0;
window.onload = function () {
    $.getJSON('results/data', function( data ) {
        console.log(data);
        for(var i in data) {
            if(data[i].section == "Vendor Analysis")
            {
            svendor=svendor+(data[i].question.weight*data[i].answer);
            tvendor=tvendor+data[i].question.weight;
            }
            if(data[i].section == "Purchase Section")
            {
            spurchase=spurchase+(data[i].question.weight*data[i].answer);
            tpurchase=tpurchase+data[i].question.weight;
            }
            if(data[i].section == "Finances")
            {
            sfinances=sfinances+(data[i].question.weight*data[i].answer);
            tfinances=tfinances+data[i].question.weight;
            }
            if(data[i].section == "ERP Section")
            {
            serp=serp+(data[i].question.weight*data[i].answer);
            terp=terp+data[i].question.weight;
            }
        };
        svendor=svendor/tvendor;
        spurchase=spurchase/tpurchase;
        // serp=serp/terp;
        // sfinances=sfinances/tfinances;

        submitAnswers();

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
                    { label: "Purchase Section", y: spurchase  },
                    { label:  "Finances",  y: sfinances  },
                    { label:  "ERP Section",  y: serp  }
                ]
            }
            ]
        });
        chart.render();
    });
}
function submitAnswers(){
    var sendInfo = {
        purchasesection: spurchase,
        vendoranalysis: svendor,
        finances: sfinances,
        erpsection: serp
    };
    console.log(sendInfo);
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/assessment/results/p2p",
            data: JSON.stringify(sendInfo),
            contentType: 'application/json',
            success: function(data){
                console.log('success');
            }
    });
}