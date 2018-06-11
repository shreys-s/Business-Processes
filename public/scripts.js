var userListData = [];
var i=0;
var questiontext = document.getElementById('question');
var opt1 = document.getElementById('opt1');
var opt2 = document.getElementById('opt2');
var opt3 = document.getElementById('opt3');
$(document).ready(function() {
	loadQuestion(i);
});
function loadQuestion (ArticleIndex) {
	console.log("Function kaam kar raha hai!");
	$.getJSON( 'category1/data', function( data ) {
		userListData=data;
		questiontext.textContent = (ArticleIndex + 1) + '. ' + userListData[ArticleIndex].title;
		opt1.textContent = userListData[ArticleIndex].choice1;
		opt2.textContent = userListData[ArticleIndex].choice2;
		opt3.textContent = userListData[ArticleIndex].choice3;
	});
};
function loadNextQuestion(){
	console.log("Next Button kaam kar raha hai!");
};
