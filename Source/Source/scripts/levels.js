/**
* 	Copyright 2011 Steven Holms <superlinkx@gmail.com>
*
*	MIT License:
*	
* Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
* modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software
* is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
* DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
* OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function lvl_init(){
	lvl1 = new Level([1,2,8,1,"rgb(0,0,0)","rgb(0,255,0)"]);
	lvl2 = new Level([2,3,9,1,"rgb(0,0,0)","rgb(0,0,255)"]);
	lvl3 = new Level([3,4,10,1,"rgb(0,0,0)","rgb(255,0,0)"]);
	lvl4 = new Level([4,5,11,1,"rgb(0,0,0)","rgb(0,255,255)"]);
	lvl5 = new Level([5,6,12,1,"rgb(0,0,0)","rgb(255,255,0)"]);
	lvl6 = new Level([6,7,13,1,"rgb(0,0,0)","rgb(255,0,255)"]);
	lvl7 = new Level([7,8,14,1,"rgb(0,0,0)","rgb(255,255,255)"]);
	lvl8 = new Level([8,9,15,1,"rgb(255,255,255)","rgb(0,0,0)"]);
	lvl9 = new Level([9,10,16,1,"rgb(255,255,255)","rgb(0,255,0)"]);
	lvl10 = new Level([10,11,17,1,"rgb(255,255,255)","rgb(255,0,0)"]);
}
function Level(params){
	this.enemy1Speed = params[0];
	this.enemy2Speed = params[1];
	this.enemyTotal = params[2];
	this.sc0reMult = params[3];
	this.bgcolor = params[4];
	this.bgline = params[5];
}
function lvlReader(){
	enemy1Speed = currentLevel.enemy1Speed;
	enemy2Speed = currentLevel.enemy2Speed;
	enemyTotal = currentLevel.enemyTotal;
	sc0reMult = currentLevel.sc0reMult;
	bgcolor = currentLevel.bgcolor;
	bgline = currentLevel.bgline;
}
function lvlchecker(){
	if(enemyKilled < 100) lvl = 1;
	if(100 <= enemyKilled && enemyKilled < 200) lvl = 2;
	if(200 <= enemyKilled && enemyKilled < 300) lvl = 3;
	if(300 <= enemyKilled && enemyKilled < 400) lvl = 4;
	if(400 <= enemyKilled && enemyKilled < 500) lvl = 5;
	if(500 <= enemyKilled && enemyKilled < 600) lvl = 6;
	if(600 <= enemyKilled && enemyKilled < 700) lvl = 7;
	if(700 <= enemyKilled && enemyKilled < 800) lvl = 8;
	if(800 <= enemyKilled && enemyKilled < 900) lvl = 9;
	if(900 <= enemyKilled) lvl = 10;
	switch(lvl){
		case 1: currentLevel = lvl1;
				break;
		case 2: currentLevel = lvl2;
				break;
		case 3: currentLevel = lvl3;
				break;
		case 4: currentLevel = lvl4;
				break;
		case 5: currentLevel = lvl5;
				break;
		case 6: currentLevel = lvl6;
				break;
		case 7: currentLevel = lvl7;
				break;
		case 8: currentLevel = lvl8;
				break;
		case 9: currentLevel = lvl9;
				break;
		case 10: currentLevel = lvl10;
				break;
	}
}