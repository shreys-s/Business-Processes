var userListData = [];
var currentQuestion = 0;
var score = [];
for(var i=0; i< totQuestions;i++)
 score[i]=-1;
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
		opt1.textContent = userListData[ArticleIndex].choice1.title;
		opt2.textContent = userListData[ArticleIndex].choice2.title;
		opt3.textContent = userListData[ArticleIndex].choice3.title;
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
		resultCont.style.display = '';
		resultCont.textContent = 'Your Score: ' + score[0];
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
		nextButton.textContent = 'Finish';
		} else{ 
		  nextButton.textContent = 'Next Question';
		  }; 
}
