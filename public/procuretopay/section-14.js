var userListData = [];
var currentQuestion = 0;
var score = [];
for(var i=0; i< totQuestions;i++)
 score[i]=-1;
var totQuestions;
var j=0;

var container = document.getElementById('quizContainer');
var questiontext = document.getElementById('question');
var opt1 = document.getElementById('opt1');
var opt2 = document.getElementById('opt2');
var opt3 = document.getElementById('opt3');
var nextSection = document.getElementById('nextSection');
var nextButton = document.getElementById('nextButton');
var previousButton = document.getElementById('previousButton');
var resultCont = document.getElementById('result');
var c3= document.getElementById('c3');


$(document).ready(function() {
	loadQuestion(currentQuestion);
	$("#nextButton").click(function(event){
              loadNextQuestion();
            });
	$("#previousButton").click(function(event){
              loadPreviousQuestion();
            });
	$("#nextSection").click(function(event){
			submitAnswers();
	});
});
function loadQuestion (ArticleIndex) {
	$.getJSON( 'category4/data', function( data ) {
		nextSection.style.display='none';
		userListData=data;
		totQuestions=userListData.length;
		console.log(totQuestions);
		questiontext.textContent = (ArticleIndex + 1) + '. ' + userListData[ArticleIndex].title;
		opt1.textContent = userListData[ArticleIndex].choice1.title;
		opt2.textContent = userListData[ArticleIndex].choice2.title;
		if(userListData[ArticleIndex].choice3.weight == -1)
		{
			c3.style.display='none';
			opt3.textContent='';
		}
		else
		{
			c3.style.display='block';
			opt3.textContent = userListData[ArticleIndex].choice3.title;
		}
	});
};
function loadNextQuestion(){
	var selectedOption = document.querySelector('input[type=radio]:checked');
	if(!selectedOption){
		alert('Please select your Answer!');
		return;
	}
	var answer = selectedOption.value;
	if(answer == 1){
		score[currentQuestion]=userListData[currentQuestion].choice1.weight;
		if(userListData[currentQuestion].choice1.next_id == -1)
			currentQuestion++;
		else
			currentQuestion=userListData[currentQuestion].choice1.next_id;
	}
	if(answer == 2){
		score[currentQuestion]=userListData[currentQuestion].choice2.weight;
		if(userListData[currentQuestion].choice2.next_id == -1)
			currentQuestion++;
		else
			currentQuestion=userListData[currentQuestion].choice2.next_id;
	}
	if(answer == 3){
		score[currentQuestion]=userListData[currentQuestion].choice3.weight;
		if(userListData[currentQuestion].choice3.next_id == -1)
			currentQuestion++;
		else
			currentQuestion=userListData[currentQuestion].choice3.next_id;
	}
	selectedOption.checked = false;
	if(currentQuestion == totQuestions - 1){
		nextButton.textContent = 'Submit';
	}
	if(currentQuestion == totQuestions){
		container.style.display = 'none';
		resultCont.style.display = 'block';
		nextSection.style.display = 'block';
		resultCont.textContent = 'Purchase Section Assessment Complete ' + score[0];
		return; 
	}
	loadQuestion(currentQuestion);
};
function loadPreviousQuestion(){
	if(currentQuestion== 0)
		currentQuestion=0;
	else
		currentQuestion--; 
	loadQuestion(currentQuestion); 
	if(currentQuestion == totQuestions - 1){ 
		nextButton.textContent = 'Submit';
		} else{ 
		  nextButton.textContent = 'Next Question';
		  }; 
};
function submitAnswers(){
    var newData = {
    result: []
	};

	for(var i in userListData) {    

	    var item = userListData[i];   

	    newData.result.push({ 
	        "category" : item.category,
	        "section"  : item.section,
	        "question_weight" : item.weight,
	        "question_title" : item.title,
	        "answer_weight" : score[i]
	    });
	}
    console.log(newData.result);
    console.log(userListData);
}