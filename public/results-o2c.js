var results= [];
var svendor=0;
var tvendor=0;
var spurchase=0;
var tpurchase=0;
var sfinances=0;
var tfinances=0;
var serp=0;
var terp=0;
var sp2p=0;
window.onload = function () {
    $.getJSON('http://localhost:3000/assessment/results/data', function( data ) {
        console.log(data);
        for(var i in data) {
            if(data[i].section == "Credit Analysis")
            {
            svendor=svendor+(data[i].question.weight*data[i].answer);
            tvendor=tvendor+data[i].question.weight;
            }
            if(data[i].section == "Billing")
            {
            spurchase=spurchase+(data[i].question.weight*data[i].answer);
            tpurchase=tpurchase+data[i].question.weight;
            }
            if(data[i].section == "Cash Application & Collection")
            {
            sfinances=sfinances+(data[i].question.weight*data[i].answer);
            tfinances=tfinances+data[i].question.weight;
            }
            if(data[i].section == "GL Posting & Reporting")
            {
            serp=serp+(data[i].question.weight*data[i].answer);
            terp=terp+data[i].question.weight;
            }
        };
        if (tvendor!=0)
            svendor=(svendor/tvendor)*10;
        if (tpurchase!=0)
            spurchase=(spurchase/tpurchase)*10;
        if (tfinances!=0)
            sfinances=(sfinances/tfinances)*10;
        if (terp!=0)
            serp=(serp/terp)*10;
        sp2p=(svendor+spurchase+sfinances+serp)/4;

        submitAnswers();
    });
}
function submitAnswers(){
    var sendInfo = {
        billing: spurchase,
        creditanalysis: svendor,
        cashapplication: sfinances,
        glposting: serp,
        score: sp2p
    };
    console.log(sendInfo);
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/assessment/results/o2c",
            data: JSON.stringify(sendInfo),
            contentType: 'application/json',
            success: function(data){
                console.log('success');
            }
    });
}