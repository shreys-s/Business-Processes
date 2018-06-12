var userListData = [];
var currentQuestion = 0;
var score = 0;
var totQuestions;

var container = document.getElementById('quizContainer');
var questiontext = document.getElementById('question');
var opt1 = document.getElementById('opt1');
var opt2 = document.getElementById('opt2');
var opt3 = document.getElementById('opt3');
var nextButton = document.getElementById('nextButton');
var previousButton = document.getElementById('previousButton');
var resultCont = document.getElementById('result');


$(document).ready(function() {
	loadQuestion(currentQuestion);
	$("#nextButton").click(function(event){
              loadNextQuestion();
            });
	$("#previousButton").click(function(event){
              loadPreviousQuestion();
            });
});
function loadQuestion (ArticleIndex) {
	$.getJSON( 'category1/data', function( data ) {
		userListData=data;
		totQuestions=userListData.length;
		console.log(totQuestions);
		questiontext.textContent = (ArticleIndex + 1) + '. ' + userListData[ArticleIndex].title;
		opt1.textContent = userListData[ArticleIndex].choice1;
		opt2.textContent = userListData[ArticleIndex].choice2;
		opt3.textContent = userListData[ArticleIndex].choice3;
	});
};

function loadNextQuestion(){
	var selectedOption = document.querySelector('input[type=radio]:checked');
	if(!selectedOption){
		alert('Please select your Answer!');
		return;
	}
	var answer = selectedOption.value;
	if(userListData[currentQuestion].answer == answer){
		score+=10;
	}
	selectedOption.checked = false;
	currentQuestion++;
	if(currentQuestion == totQuestions - 1){
		nextButton.textContent = 'Submit';
	}
	if(currentQuestion == totQuestions){
		container.style.display = 'none';
		resultCont.style.display = '';
		resultCont.textContent = 'Your Score: ' + score;
		return; 
	}
	loadQuestion(currentQuestion);
};
function loadPreviousQuestion(){
	currentQuestion--; 
	loadQuestion(currentQuestion); 
	if(currentQuestion == totQuestions - 1){ 
		nextButton.textContent = 'Finish';
		} else{ 
		  nextButton.textContent = 'Next Question';
		  }; 
}
