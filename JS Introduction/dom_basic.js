//Event Listeners

canvas  = document.getElementById("mycanvas");// they did global declare but i(apoorv) the one currently reading prefer to declare with let 
function f(){
	console.log("You clicked on the canvas");
}

canvas.addEventListener('click',f);


function f2(e){
	console.log("A key got pressed",e.key);
}

document.addEventListener('keydown',f2);
