var c = document.getElementById("triba");
var ctx = c.getContext("2d");
var m = 800/50;
var n = 600/50;
var pocetni_igrac = 0;

const gameState = {
	igrac: pocetni_igrac,
	dot: 0,
	dots: [],
	popunjeneTacke: [],
	pomocneDots: [],
	lines: []
};


function main(){
	postaviRegularno(m, n);
	window.addEventListener('mousedown', handleClick);
}
function postaviRegularno(m, n){
	gameState.popunjeneTacke = [];
	ctx.lineWidth = 4;
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, c.width, c.height);
	for(let i = 0; i < m; i++){
		for(let j = 0; j < n; j++){
			if((i < 10 || i > 13) && (j < 5 || j > 9)){
				ctx.beginPath();
			ctx.arc(i*50+25, j*50+25, 10, 0, 2 * Math.PI);
			ctx.fillStyle = 'gray';
			ctx.fill();
			gameState.popunjeneTacke.push({prvi: i*50+25, drugi: j*50+25});
			}
			
		}
	}
}

function handleClick(event){
	if (event.target === c) {
		var promjena = 0;
		var { offsetX: x, offsetY: y } = event;
		t1 = Math.round((x-25)/50);
		t2 = Math.round((y-25)/50);
		x = t1*50+25;
		y = t2*50+25;
		if(gameState.dot % 3 != 0){
			let xp = gameState.dots.at(-1).prvi;
			let yp = gameState.dots.at(-1).drugi;
				if(xp === x && yp === y){
				gameState.dots.pop();
				gameState.dot--;
				promjena = 1;
			}
		}

		if((x > 500 && x < 700) || (y > 250 && y < 500)){
			promjena = 1;
		}

		if(promjena === 0){
			gameState.dot += 1;
			if(gameState.dot%3 === 0){
			if((gameState.dots.at(-1).prvi === gameState.dots.at(-2).prvi && gameState.dots.at(-1).prvi === x) 
				|| (gameState.dots.at(-1).drugi === gameState.dots.at(-2).drugi && gameState.dots.at(-1).drugi === y)){
				gameState.dot --;
				promjena = 1;
			}
			else if(((gameState.dots.at(-1).prvi - gameState.dots.at(-2).prvi === gameState.dots.at(-1).drugi - gameState.dots.at(-2).drugi) && (gameState.dots.at(-1).prvi - x === gameState.dots.at(-1).drugi - y)) || ((gameState.dots.at(-1).prvi - gameState.dots.at(-2).prvi === -(gameState.dots.at(-1).drugi - gameState.dots.at(-2).drugi)) && (gameState.dots.at(-1).prvi - x === -(gameState.dots.at(-1).drugi - y)))){
				gameState.dot --;
				promjena = 1;
			}
			else{
				gameState.dots.push({prvi: x,drugi: y});
			}
		}
		else{
			gameState.dots.push({prvi: x,drugi: y});
		}
		}
		if(promjena === 0){
			for(let i = 0; i < gameState.dots.length - 1; i++){
			if(gameState.dots.at(i).prvi === x && gameState.dots.at(i).drugi === y){
				gameState.dots.pop();
				gameState.dot--;
				promjena = 1;
				break;
			}
				if(i%3 == 1){
					let x1 = gameState.dots.at(i).prvi;
					let y1 = gameState.dots.at(i).drugi;
					let x2 = gameState.dots.at(i-1).prvi;
					let y2 = gameState.dots.at(i-1).drugi;
					if(provjeriLiniju({x1, y1, x2, y2, x, y})){
						gameState.dots.pop();
						gameState.dot--;
						promjena = 1;
						break;

					}
				}
				if(i%3 == 2){
					let x1 = gameState.dots.at(i).prvi;
					let y1 = gameState.dots.at(i).drugi;
					let x2 = gameState.dots.at(i-1).prvi;
					let y2 = gameState.dots.at(i-1).drugi;
					let x3 = gameState.dots.at(i-2).prvi;
					let y3 = gameState.dots.at(i-2).drugi;
					if(provjeriLiniju({x1, y1, x2, y2, x, y})){
						gameState.dots.pop();
						gameState.dot--;
						promjena = 1;
						break;
					}
					x2 = x3;
					y2 = y3;
					if(provjeriLiniju({x1, y1, x2, y2, x, y})){
						gameState.dots.pop();
						gameState.dot--;
						promjena = 1;
						break;
					}
				} 
			}
		}
		

			if(promjena === 0){
				for(let i = 0; i < gameState.lines.length; i++){
				if(gameState.dot % 3 === 1){
					break;
				}
				else if(gameState.dot % 3 === 2){
					let x1 = gameState.lines.at(i).x1;
					let y1 = gameState.lines.at(i).y1;
					let x2 = gameState.lines.at(i).x2;
					let y2 = gameState.lines.at(i).y2;

					let x3 = gameState.dots.at(-2).prvi;
					let y3 = gameState.dots.at(-2).drugi;
					if((x3 === x1 && y3 === y1) || (x3 === x2 && y3 === y2)){
						continue;
					}
					else{
						if(provjeriKoliziju({x1, y1, x2, y2, x3, y3, x, y})){
							gameState.dots.pop();
							gameState.dot--;
							break;
						}
					}
					
				}
				else{
					let x1 = gameState.lines.at(i).x1;
					let y1 = gameState.lines.at(i).y1;
					let x2 = gameState.lines.at(i).x2;
					let y2 = gameState.lines.at(i).y2;

					let x3 = gameState.dots.at(-2).prvi;
					let y3 = gameState.dots.at(-2).drugi;
					if((x3 === x1 && y3 === y1) || (x3 === x2 && y3 === y2)){
						continue;
					}
					else{
						if(provjeriKoliziju({x1, y1, x2, y2, x3, y3, x, y})){
							gameState.dots.pop();
							gameState.dot--;
							break;
						}
					}
					
					x3 = gameState.dots.at(-3).prvi;
					y3 = gameState.dots.at(-3).drugi;
					if((x3 === x1 && y3 === y1) || (x3 === x2 && y3 === y2)){
						continue;
					}
					else{
						if(provjeriKoliziju({x1, y1, x2, y2, x3, y3, x, y})){
							gameState.dots.pop();
							gameState.dot--;
							break;
						}
					}
				}
			}
		}

			

		drawGame();

		if(krajIgre()){
			console.log("Kraj igre!");
		}
	}
}

function NovaIgra(){
	if(pocetni_igrac === 0){
		pocetni_igrac = 1;
	}
	else{
		pocetni_igrac = 0;
	}
	gameState.igrac = pocetni_igrac;
	gameState.dot = 0;
	gameState.dots = [];
	gameState.popunjeneTacke = [];
	gameState.pomocneDots = [];
	gameState.lines = [];
	postaviRegularno();
	drawGame();
}

function krajIgre(){
	return false;
}

//https://www.geeksforgeeks.org/program-for-point-of-intersection-of-two-lines/
function provjeriKoliziju({x1, y1, x2, y2, x3, y3, x, y}){
        var a1 = y2 - y1;
        var b1 = x1 - x2;
        var c1 = a1*(x1) + b1*(y1);

        var a2 = y - y3;
        var b2 = x3 - x;
        var c2 = a2*(x3)+ b2*(y3);
        
        var determinant = a1*b2 - a2*b1;
        if (determinant == 0)
        {
            return false;
        }
        else
        {
            var x4 = (b2*c1 - b1*c2)/determinant;
            var y4 = (a1*c2 - a2*c1)/determinant;
            if((x4 > x1 && x4 > x2) || (x4 < x1 && x4 < x2) || (x4 > x3 && x4 > x) || (x4 < x3 && x4 < x) || (y4 > y1 && y4 > y2) || (y4 < y1 && y4 < y2) || (y4 > y3 && y4 > y) || (y4 < y3 && y4 < y)){
            	return false;
            }
            return true;
        }
}

function provjeriLiniju({x1, y1, x2, y2, x, y}){
	if(((x-x1 > 25) && (x-x2 > 25)) || ((x-x1 < -25) && (x-x2 < -25)) || ((y-y1 > 25) && (y-y2 > 25)) || ((y-y1 < -25) && (y-y2 < -25))){
		return false;
	}
	if(x1 === x2){
		if(x === x1){
			return true;
		}
		return false;
	}
	rezultat = (y2-y1)/(x2-x1);
	rezultat = rezultat * (x-x2) - y + y2;
	if(rezultat <= 10 && rezultat >= -10){
		return true;
	}	
	return false;
}

function drawDot({ x, y }) {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    if(gameState.igrac === 0){
    	ctx.fillStyle = 'red';	
    }
    else{
    	ctx.fillStyle = 'blue';
    }
    ctx.fill();
    ctx.closePath();
}

function drawLine(x, y, x1, y1) {
	if(gameState.igrac === 0){
		ctx.strokeStyle = 'red';
	}
	else{
		ctx.strokeStyle = 'blue';
	}
    ctx.beginPath();
    ctx.moveTo(x, y);
	ctx.lineTo(x1, y1);
    ctx.stroke();
    ctx.closePath();
    ctx.strokeStyle = 'black';
}

function resetCanvas() {
      ctx.clearRect(0, 0, c.width, c.height);
      postaviRegularno(m,n);
    }

function drawGame(){
	resetCanvas();
	gameState.lines = [];
	let a = 0;
	gameState.igrac = pocetni_igrac;
	for (let i = 0; i < gameState.dots.length; i++){
		let x = gameState.dots.at(i).prvi;
		let y = gameState.dots.at(i).drugi;

		drawDot({x, y});
		a++;
		if(a >= 2){
			let x1 = gameState.dots.at(i-1).prvi;
			let y1 = gameState.dots.at(i-1).drugi;
			drawLine(x, y, x1, y1);
			gameState.lines.push({x1: x, y1: y, x2: x1, y2: y1, igrac: gameState.igrac});
		}
		if(a === 3){
			a = 0;
			let x2 = gameState.dots.at(i-2).prvi;
			let y2 = gameState.dots.at(i-2).drugi;
			drawLine(x, y, x2, y2);
			gameState.lines.push({x1: x, y1: y, x2: x2, y2: y2, igrac: gameState.igrac});
			if(gameState.igrac === 0){
				gameState.igrac = 1;
			}
			else{
				gameState.igrac = 0;
			}
		}
	}
	gameState.pomocneDots = [];
	for(let i = 0; i < gameState.popunjeneTacke.length; i++){
		let x = gameState.popunjeneTacke.at(i).prvi;
		let y = gameState.popunjeneTacke.at(i).drugi;
		for(let j = 0; j < gameState.lines.length; j++){
			let x1 = gameState.lines.at(j).x1;
			let y1 = gameState.lines.at(j).y1;
			let x2 = gameState.lines.at(j).x2;
			let y2 = gameState.lines.at(j).y2;

			if(provjeriLiniju({x1, y1, x2, y2, x, y})){
				gameState.igrac = gameState.lines.at(j).igrac;
				gameState.pomocneDots.push({prvi: x, drugi: y});
				drawDot({x, y});
				break;
			}
		}
	}

	if(pocetni_igrac === 0){
		if(gameState.dot % 6 <= 2){
			gameState.igrac = 0;
		}
		else{
			gameState.igrac = 1;
		}
	}
	else{
		if(gameState.dot % 6 <= 2){
			gameState.igrac = 1;
		}
		else{
			gameState.igrac = 0;
		}
	}
	
	if(gameState.igrac === 0){
		document.getElementById('igracl').style.background = "red";
		document.getElementById('igracd').style.background = "red";
	}
	else{
		document.getElementById('igracl').style.background = "blue";
		document.getElementById('igracd').style.background = "blue";
	}
	
}

main();