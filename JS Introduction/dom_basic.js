//Event Listeners

canvas  = document.getElementById("mycanvas");
function f(){
	console.log("You clicked on the canvas");
}

canvas.addEventListener('click',f);


function f2(e){
	console.log("A key got pressed",e.key);
}

document.addEventListener('keydown',f2);