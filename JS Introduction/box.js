




// canvas is used to draw graphics





function init(){
	console.log("In Init");
	canvas = document.getElementById("mycanvas");
	W = canvas.width = 500;
	H = canvas.height = 500;
	pen = canvas.getContext('2d')
	game_over =false;


	rect = {
	x:20,
	y:20,
	w:40,
	h:40,
	speed:20,
}

}
function draw(){
	//console.log("In Draw");
	pen.clearRect(0,0,W,H);
	pen.fillStyle = "red";
	pen.fillRect(rect.x,rect.y,rect.w,rect.h);
	
}

function update(){
	//console.log("In Update");
	rect.x += rect.speed;
	if(rect.x>W-rect.w || rect.x <0){
		rect.speed *= -1;
	}
}

function gameloop(){
	
	if(game_over==true){
		clearInterval(f);
	}
	
	console.log("in gamelooop");
	draw();
	update();
}

init();
var f = setInterval(gameloop,100);











