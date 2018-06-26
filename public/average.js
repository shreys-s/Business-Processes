window.onload = function () {
$.getJSON('users/data', function( data ) {
	console.log(data);
});
}