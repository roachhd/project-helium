/*
 Copyright 2011 Steven Holms <superlinkx@gmail.com>
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
if(!b)var b="";var err,FPS=60;localStorage.fallback||(localStorage.fallback="false");"false"===localStorage.fallback?(width=480,height=800):"true"===localStorage.fallback&&(width=360,height=600);var pw=30,ph=30,e1w=30,e1h=30;x=0;y=0;bgpos=0;px=width/2-pw/2;py=height-ph;e1x=25;e1y=-45;bgcolor="rgb(0,0,0)";bgline="rgb(0,255,0)";lvl1=null;lvl2=null;lvl3=null;lvl4=null;lvl5=null;lvl6=null;lvl7=null;lvl8=null;lvl9=null;lvl10=null;pSprite=new Image;pSprite.src=b+"images/heliumclass1.svg";var e1Sprite=new Image;
e1Sprite.src=b+"images/enemy1.svg";var e2Sprite=new Image;e2Sprite.src=b+"images/enemy2.svg";var pauseSprite=new Image;pauseSprite.src=b+"images/pause.svg";var restartSprite=new Image;restartSprite.src=b+"images/restart.svg";var upKey=!1,downKey=!1,rightKey=!1,leftKey=!1,enterKey=!1,gamePaused=!1,enemies=[],enemyLasers=[],enemyKilled=0,enemy1Speed=1,enemy2Speed=2,enemyLaserTime=0,enemyTotal=8,path=null,pathSize=null,e1xa=50,e1xf=2*Math.PI/240,pspeed=5;lasers=[];laserKey=!1;laserTime=0;
laserWidth=4;laserHeight=20;laserCount=4;laserLimit=4;laserFireTracker=0;laserTimeout=20;laserSpeed=10;sc0re=0;sc0reMult=1;alive=!0;lives=3;gameStarted=!1;lvl=1;storageCalled=!1;canvas=null;body=null;ctx=null;fallback=!1;speedMult=1;function lvl_init(){lvl1=new Level([1,2,8,1,"rgb(0,0,0)","rgb(0,255,0)"]);lvl2=new Level([2,3,9,1,"rgb(0,0,0)","rgb(0,0,255)"]);lvl3=new Level([3,4,10,1,"rgb(0,0,0)","rgb(255,0,0)"]);lvl4=new Level([4,5,11,1,"rgb(0,0,0)","rgb(0,255,255)"]);lvl5=new Level([5,6,12,1,"rgb(0,0,0)","rgb(255,255,0)"]);lvl6=new Level([6,7,13,1,"rgb(0,0,0)","rgb(255,0,255)"]);lvl7=new Level([7,8,14,1,"rgb(0,0,0)","rgb(255,255,255)"]);lvl8=new Level([8,9,15,1,"rgb(255,255,255)","rgb(0,0,0)"]);lvl9=new Level([9,10,16,1,"rgb(255,255,255)",
"rgb(0,255,0)"]);lvl10=new Level([10,11,17,1,"rgb(255,255,255)","rgb(255,0,0)"])}function Level(a){this.enemy1Speed=a[0];this.enemy2Speed=a[1];this.enemyTotal=a[2];this.sc0reMult=a[3];this.bgcolor=a[4];this.bgline=a[5]}function lvlReader(){enemy1Speed=currentLevel.enemy1Speed;enemy2Speed=currentLevel.enemy2Speed;enemyTotal=currentLevel.enemyTotal;sc0reMult=currentLevel.sc0reMult;bgcolor=currentLevel.bgcolor;bgline=currentLevel.bgline}
function lvlchecker(){100>enemyKilled&&(lvl=1);100<=enemyKilled&&200>enemyKilled&&(lvl=2);200<=enemyKilled&&300>enemyKilled&&(lvl=3);300<=enemyKilled&&400>enemyKilled&&(lvl=4);400<=enemyKilled&&500>enemyKilled&&(lvl=5);500<=enemyKilled&&600>enemyKilled&&(lvl=6);600<=enemyKilled&&700>enemyKilled&&(lvl=7);700<=enemyKilled&&800>enemyKilled&&(lvl=8);800<=enemyKilled&&900>enemyKilled&&(lvl=9);900<=enemyKilled&&(lvl=10);switch(lvl){case 1:currentLevel=lvl1;break;case 2:currentLevel=lvl2;break;case 3:currentLevel=
lvl3;break;case 4:currentLevel=lvl4;break;case 5:currentLevel=lvl5;break;case 6:currentLevel=lvl6;break;case 7:currentLevel=lvl7;break;case 8:currentLevel=lvl8;break;case 9:currentLevel=lvl9;break;case 10:currentLevel=lvl10}};function backgroundDraw(){60==bgpos&&(bgpos=0);ctx.fillStyle=bgcolor;ctx.fillRect(0,0,width,height);ctx.beginPath();ctx.strokeStyle=bgline;for(i=0.5;i<=width+0.5;i+=60)ctx.moveTo(i,0),ctx.lineTo(i,height),i===width+0.5&&(ctx.moveTo(i-1,0),ctx.lineTo(i-1,height));for(i=bgpos;i<=height;i+=60)ctx.moveTo(0,i),ctx.lineTo(width,i);ctx.stroke();bgpos+=1}
function Player(a,c){this.x=a;this.y=c;this.h=this.w=30;this.draw=function(){rightKey&&(this.x+=pspeed*speedMult);leftKey&&(this.x-=pspeed*speedMult);upKey&&(this.y-=pspeed*speedMult);downKey&&(this.y+=pspeed*speedMult);this.bounds();ctx.drawImage(pSprite,this.x,this.y,this.w,this.h)};this.bounds=function(){if(this.x>width-31)this.x=width-30;if(1>this.x)this.x=0;if(this.y>height-31)this.y=height-30;if(1>this.y)this.y=0};this.collision=function(){for(var a=0;a<enemies.length;a++)this.x+this.w>=enemies[a].x&&
this.x<=enemies[a].x+enemies[a].w&&this.y<=enemies[a].y+enemies[a].h&&this.y+this.h>=enemies[a].y&&checkLives()};this.fire=function(){!0==laserKey&&5<=laserTime&&0<laserCount&&(lasers.push(new Laser(player.x+(player.w/2-laserWidth/2),player.y,laserWidth,laserHeight,"player")),laserTime=0,laserCount--);laserTime+=1;laserCount<laserLimit&&!(laserFireTracker++%(laserTimeout/speedMult))&&laserCount++}}
function Enemy(a,c,e,d,f,g){this.x=a;this.y=c;this.w=e;this.h=d;this.speed=f;this.initx=a;this.type=g;this.fired=0;this.fire=function(){if(!this.fired)enemyLasers.push(new Laser(this.x+(this.w/2-laserWidth/2),this.y,laserWidth,laserHeight,"enemy")),this.fired=!0};this.draw=function(){switch(this.type){case 1:ctx.drawImage(e1Sprite,this.x,this.y,this.w,this.h);break;case 2:ctx.drawImage(e2Sprite,this.x,this.y,this.w,this.h);break;default:ctx.drawImage(e1Sprite,this.x,this.y,this.w,this.h)}};this.move=
function(){switch(this.type){case 1:this.x=e1xa*Math.sin(e1xf*this.y)+this.initx;if(this.y<=height)this.y+=this.speed*speedMult;else if(this.y>height)this.y=-45;break;case 2:if(this.y<=height)this.y+=this.speed*speedMult;else if(this.y>height)this.y=-45;break;default:if(this.x=e1xa*Math.sin(e1xf*this.y)+this.initx,this.y<=d)this.y+=this.speed*speedMult;else if(this.y>d)this.y=-45}}}function drawEnemy(){for(var a=0;a<enemies.length;a++)enemies[a].draw()}
function moveEnemy(){for(var a=0;a<enemies.length;a++)enemies[a].move()}function enemyFire(){for(var a=0;a<enemies.length;a++)2===enemies[a].type&&enemies[a].fire()}function randomType(){var a=Math.ceil(2*Math.random());0==a&&(a=1);return a}function randomPath(){return Math.floor(19*Math.random())}function typeSpeed(a){return 1===a?enemy1Speed:2===a?enemy2Speed:enemy1Speed}
function Path(a){switch(a){case 0:pathSize=0*(width/20);break;case 1:pathSize=width/20;break;case 2:pathSize=2*(width/20);break;case 3:pathSize=3*(width/20);break;case 4:pathSize=4*(width/20);break;case 5:pathSize=5*(width/20);break;case 6:pathSize=6*(width/20);break;case 7:pathSize=7*(width/20);break;case 8:pathSize=8*(width/20);break;case 9:pathSize=9*(width/20);break;case 10:pathSize=10*(width/20);break;case 11:pathSize=11*(width/20);break;case 12:pathSize=12*(width/20);break;case 13:pathSize=
13*(width/20);break;case 14:pathSize=14*(width/20);break;case 15:pathSize=15*(width/20);break;case 16:pathSize=16*(width/20);break;case 17:pathSize=17*(width/20);break;case 18:pathSize=18*(width/20);break;case 19:pathSize=19*(width/20);break;default:pathSize=0*(width/20)}return pathSize}
function enemyLaserTest(){for(var a=0;a<enemyLasers.length;a++)if(enemyLasers[a].x+enemyLasers[a].w>=player.x&&enemyLasers[a].x<=player.x+player.w&&enemyLasers[a].y>=player.y&&enemyLasers[a].y+enemyLasers[a].h<=player.y+player.h){checkLives();enemyLasers.splice(a,1);break}}
function hitTest(){for(var a=0;a<lasers.length;a++)for(var c=0;c<enemies.length;c++)if(lasers[a].x+lasers[a].w>=enemies[c].x&&lasers[a].x<=enemies[c].x+enemies[c].w&&lasers[a].y<=enemies[c].y+enemies[c].h&&lasers[a].y+lasers[a].h>=enemies[c].y){enemyKilled+=1;enemies.splice(c,1);sc0re+=10*sc0reMult;path=randomPath();type=randomType();e1x=Path(path);c=typeSpeed(type);enemies.push(new Enemy(e1x,-45,e1w,e1h,c,type));lasers.splice(a,1);break}}
function Laser(a,c,e,d,f){this.x=a;this.y=c;this.w=e;this.h=d;this.type=f;this.draw=function(){if("enemy"===this.type){var a=ctx.createLinearGradient(this.x,this.y,this.x,this.y+20);a.addColorStop(0,"rgba(255,0,0,0.2)");a.addColorStop(1,"rgba(255,0,0,0.8)");ctx.fillStyle=a;ctx.fillRect(this.x,this.y,this.w,this.h)}if("player"===this.type)a=ctx.createLinearGradient(this.x,this.y,this.x,this.y+20),a.addColorStop(0,"rgba(255,0,0,0.8)"),a.addColorStop(1,"rgba(255,0,0,0.2)"),ctx.fillStyle=a,ctx.fillRect(this.x,
this.y,this.w,this.h)};this.move=function(){"player"===this.type&&(-10<=this.y?this.y-=laserSpeed*speedMult:-10>this.y&&lasers.splice(i,1));"enemy"===this.type&&(this.y<=height+10?this.y+=laserSpeed*speedMult:this.y>height+10&&enemyLasers.splice(i,1))}}function drawLaser(){if(lasers.length)for(var a=0;a<lasers.length;a++)lasers[a].draw();if(enemyLasers.length)for(a=0;a<enemyLasers.length;a++)enemyLasers[a].draw()}
function moveLaser(){for(var a=0;a<lasers.length;a++)lasers[a].move();for(a=0;a<enemyLasers.length;a++)enemyLasers[a].move()}function checkLives(){lives-=1;reset();0==lives&&(alive=!1)}
function reset(){storageCalled=!1;lasers.splice(0,lasers.length);enemyLasers.splice(0,lasers.length);laserFireTracker=enemyLasers.length=0;laserCount=4;player.x=width/2-15;player.y=height-30;player.w=30;player.h=30;enemies.splice(0,enemies.length);for(i=0;i<enemyTotal;i++){path=randomPath();type=randomType();e1x=Path(path);var a=typeSpeed(type);enemies.push(new Enemy(e1x,-45,e1w,e1h,a,type))}}
function keyDown(a){a.preventDefault();39==a.keyCode?rightKey=!0:37==a.keyCode&&(leftKey=!0);38==a.keyCode?upKey=!0:40==a.keyCode&&(downKey=!0);32==a.keyCode&&(laserKey=!0);13==a.keyCode&&(enterKey=!0);191==a.keyCode&&pauseGame()}function keyUp(a){a.preventDefault();39==a.keyCode?rightKey=!1:37==a.keyCode&&(leftKey=!1);38==a.keyCode?upKey=!1:40==a.keyCode&&(downKey=!1);32==a.keyCode&&(laserKey=!1);13==a.keyCode&&(enterKey=!1)};function intro(){ctx.fillStyle="rgba(255,255,255,0.7)";ctx.fillRect(0,0,width,height);ctx.fillStyle="#f00";ctx.font='54px "Times New Roman"';ctx.fillText("Project Helium",width/2-160,height/2);ctx.font='36px "Times New Roman"';ctx.fillText("Press Enter to Play",width/2-130,height/2+50);ctx.fillText("Use arrow keys to move",width/2-175,height/2+90);ctx.fillText("Use space to shoot",width/2-130,height/2+130)}
function gameOver(){lives=0;ctx.fillStyle="rgba(255,255,255,0.7)";ctx.fillRect(0,0,width,height);ctx.fillStyle="#f00";ctx.fillText("Game Over!",width/2-63,height/2);ctx.fillText("Press Enter to Continue...",width/2-133,height/2+80);storageCalled||updateStorage();enterKey&&restartGame()}
function fullscreen(){document.getElementById("canvasContainer").webkitRequestFullScreen?document.getElementById("canvasContainer").webkitRequestFullScreen():alert("Browser not supported. You need to install the latest WebKit Browser (for example Chrome 15) in order to use the full-screen API.")}
function scoreboard(){ctx.font='26px "Times New Roman"';ctx.fillStyle="rgba(255,255,255,0.8)";ctx.fillRect(0,0,width,60);ctx.fillStyle="#f00";ctx.fillText("Score: ",10,55);ctx.fillText(sc0re,100,55);ctx.fillText("Lives:",10,20);ctx.fillText(lives,100,20);ctx.fillText("Level:",width-100,20);10>lvl&&ctx.fillText(lvl,width-20,20);10<=lvl&&ctx.fillText(lvl,width-30,20);ctx.fillText("Shots:",width-100,55);ctx.fillText(laserCount,width-20,55)}
function pauseGame(){gamePaused?(game=window.setTimeout(gameLoop,1E3/FPS),gamePaused=!1):(window.clearTimeout(game),gamePaused=!0,ctx.fillStyle="rgba(255,255,255,0.7)",ctx.fillRect(0,0,width,height),ctx.fillStyle="#f00",ctx.font='54px "Times New Roman"',ctx.fillText("Paused",width/2-70,height/2),ctx.font='36px "Times New Roman"',ctx.fillText("Press / to Continue",width/2-130,height/2+60))}function restartGame(){alive=!0;lives=3;enemyKilled=sc0re=0;enemy1Speed=1;enemy2Speed=2;reset()}
function gameStart(){gameStarted=!0;reset()}function updateStorage(){localStorage.topScore?parseInt(parseFloat(localStorage.topScore))<sc0re&&(localStorage.topScore=sc0re):localStorage.topScore=sc0re;localStorage.lastScore=sc0re;var a=document.getElementById("topScore"),c=document.getElementById("lastScore");a.innerHTML="Your Highest Score Ever Was: "+localStorage.topScore;c.innerHTML="Your Latest Score Was: "+localStorage.lastScore;storageCalled=!0}
function toggle_fallback(){if("false"===localStorage.fallback)width=360,height=600,canvas.width=width,canvas.height=height,$("#canvasContainer").css("height",height),$("#canvasContainer").css("width",width),$("#fallback").text("HD Version"),reset(),localStorage.fallback="true";else if("true"===localStorage.fallback)width=480,height=800,canvas.width=width,canvas.height=height,$("#canvasContainer").css("height",height),$("#canvasContainer").css("width",width),$("#fallback").text("SD Version"),reset(),
localStorage.fallback="false"};function init(){$("#canvasContainer").css("height",height);$("#canvasContainer").css("width",width);"true"===localStorage.fallback&&$("#fallback").text("Revert to HD");canvas=document.getElementById("helium");canvasContainer=document.getElementById("canvasContainer");ctx=canvas.getContext("2d");canvas.width=width;canvas.height=height;document.addEventListener("keydown",keyDown,!1);document.addEventListener("keyup",keyUp,!1);var a=document.getElementById("topScore"),c=document.getElementById("lastScore");
if(localStorage.topScore)a.innerHTML="Your Highest Score Ever Was: "+localStorage.topScore;if(localStorage.lastScore)c.innerHTML="Your Latest Score Was: "+localStorage.lastScore;for(a=0;a<enemyTotal;a++)path=randomPath(),type=randomType(),e1x=Path(path),c=typeSpeed(type),enemies.push(new Enemy(e1x,-45,e1w,e1h,c,type));player=new Player(px,py);lvl_init();gameLoop()}
function gameLoop(){ctx.clearRect(0,0,width,height);backgroundDraw();enterKey&&gameStart();gameStarted||intro();alive&&gameStarted&&0<lives&&(lvlchecker(),lvlReader(),moveLaser(),moveEnemy(),drawLaser(),drawEnemy(),player.draw(),enemyFire(),player.fire(),player.collision(),hitTest(),enemyLaserTest());alive||gameOver();scoreboard();game=window.setTimeout("gameLoop()",1E3/FPS)}window.onload=init;
