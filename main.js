const FPS = 30;// target frames per second
const w = 240;
const h = 480;
const width = w - 150;
const height = h - 150;
var x = 0;
var y = 0;
var bgx = 0;
var bg1y = -480;
var bg2y = -1440;
var px = (w/2)-30;
var py = (h-30);
var xDirection = 5;
var yDirection = 5;
var bg1 = new Image();
	bg1.src = "images/background.png";
var bg2 = new Image();
	bg2.src = "images/background.png";
var pSprite = new Image();
	pSprite.src = "images/psprite.png";
var canvas = null;
var body = null;
var context2D = null;

window.onload = init;

function init(){
	canvas = document.getElementById('helium');	
	context2D = canvas.getContext('2d');
	canvas.width = w;
	canvas.height = h;
	context2D.drawImage(bg1, 0, 0);
	document.onkeydown = keyListener;
	setInterval(draw, 1000 / FPS);
}

function backgroundDraw(){
	context2D.drawImage(bg1, bgx, bg1y);
	context2D.drawImage(bg2, bgx, bg2y);
	bg1y += 2;
	bg2y += 2;
	if (bg1y == 480){
		bg1y = -1440;
	}
	if (bg2y == 480){
		bg2y = -1440;
	}

}

function playerDraw(){
	bounds();
	context2D.drawImage(pSprite, px, py);
}

function keyListener(e){
	if(!e){
		e = window.event;
	}
	if (e.keyCode == 37){
		px -= 5;
	}
	if (e.keyCode == 39){
		px += 5;
	}
}

function bounds(){
	if (px > (w-31)){
		px = (w-30);
	}
	if (px < 1){
		px = 0;
	}
}

function draw(){
	canvas.width = canvas.width;
	backgroundDraw();
	playerDraw();
}

