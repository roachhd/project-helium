/*
 Copyright 2011
 Project Helium and all its contents are copyrighted by Steven Holms <superlinkx>.
 All rights reserved.
 Do not distribute without permission.
*/
function backgroundDraw(){ctx.drawImage(bg1,bgx,bg1y);ctx.drawImage(bg2,bgx,bg2y);bg1y+=2;bg2y+=2;bg1y==480&&(bg1y=-1440);bg2y==480&&(bg2y=-1440)}function playerDraw(){rightKey?px+=5:leftKey&&(px-=5);upKey?py-=5:downKey&&(py+=5);playerBounds();ctx.drawImage(pSprite,px,py)}function playerBounds(){px>w-31&&(px=w-30);px<1&&(px=0);py>h-31&&(py=h-30);py<1&&(py=0)}function drawEnemy1(){for(var a=0;a<enemies.length;a++)ctx.fillStyle="#f00",ctx.fillRect(enemies[a][0],enemies[a][1],e1w,e1h)}
function moveEnemy1(){for(var a=0;a<enemies.length;a++)enemies[a][0]=e1xa*Math.sin(e1xf*enemies[a][1])+enemies[a][5],enemies[a][1]<h?enemies[a][1]+=enemies[a][4]:enemies[a][1]>h-1&&(enemies[a][1]=-45)}function drawLaser(){if(lasers.length)for(var a=0;a<lasers.length;a++)ctx.fillStyle="#f00",ctx.fillRect(lasers[a][0],lasers[a][1],lasers[a][2],lasers[a][3])}function moveLaser(){for(var a=0;a<lasers.length;a++)lasers[a][1]>-11?lasers[a][1]-=10:lasers[a][1]<-10&&lasers.splice(a,1)}
function hitTest(){for(var a=!1,c=0;c<lasers.length;c++){for(var b=0;b<enemies.length;b++)lasers[c][1]<=enemies[b][1]+enemies[b][3]&&lasers[c][0]>=enemies[b][0]&&lasers[c][0]<=enemies[b][0]+enemies[b][2]&&(e1x=Math.random()*200+25,a=!0,enemies.splice(b,1),sc0re+=10*scoreMult,enemies.push([e1x,-45,e1w,e1h,enemy1Speed,e1x]));a==!0&&(lasers.splice(c,1),a=!1)}}
function shipCollision(){for(var a=px+pw,c=py+ph,b=0;b<enemies.length;b++)px>=enemies[b][0]&&px<=enemies[b][0]+e1w&&py<=enemies[b][1]+e1h&&checkLives(),a<=enemies[b][0]+e1w&&a>=enemies[b][0]&&py>=enemies[b][1]&&py<=enemies[b][1]+e1h&&checkLives(),c>=enemies[b][1]&&c<=enemies[b][1]+e1h&&px>=enemies[b][0]&&px<=enemies[b][0]+e1w&&checkLives(),c>=enemies[b][1]&&c<=enemies[b][1]+e1h&&a<=enemies[b][0]+e1w&&a>=enemies[b][0]&&checkLives()}
function checkLives(){lives-=1;lives>0?reset():lives==0&&(alive=!1)}function reset(){var a=Math.random()*200+25;px=w/2-15;py=h-30;ph=pw=30;for(var c=0;c<enemies.length;c++)enemies[c][0]=a,enemies[c][5]=a,enemies[c][1]=-45}
function scoreTotal(){ctx.font="bold 18px Arial";ctx.fillStyle="rgba(255,255,255,0.8)";ctx.fillRect(0,0,w,60);ctx.fillStyle="#f00";ctx.fillText("Score: ",10,55);ctx.fillText(sc0re,70,55);ctx.fillText("Lives:",10,30);ctx.fillText(lives,68,30);ctx.fillText("Level:",w-80,30);ctx.fillText(lvl,w-20,30);if(!alive)lives=0,ctx.fillText("Game Over!",w/2-55,h/2),ctx.fillRect(w/2-53,h/2+10,100,40),ctx.fillStyle="#000",ctx.fillText("Continue?",w/2-48,h/2+35),canvas.addEventListener("click",continueButton,!1);
if(!gameStarted)ctx.fillStyle="rgba(255,255,255,0.7)",ctx.fillRect(0,0,w,h),ctx.fillStyle="#f00",ctx.font="bold 32px Arial",ctx.fillText("Project Helium",w/2-110,h/2),ctx.font="bold 20px Arial",ctx.fillText("Click to Play",w/2-56,h/2+30),ctx.fillText("Use ASWD to move",w/2-100,h/2+60),ctx.fillText("Use the j key to shoot",w/2-100,h/2+90)}function gameStart(){gameStarted=!0;canvas.removeEventListener("click",gameStart,!1)};