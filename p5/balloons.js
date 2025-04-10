let balloonsArray = [];
let canvasHeight = window.innerHeight / 2; // 220; 
let timerHandle;
let timerInterval = 3000;

let timerFunc = function () {
    drawNewBalloons();         
}

function setup(){
    pixelDensity(1);
    let cnv = this.createCanvas(windowWidth, canvasHeight);
    cnv.position(0, 0);
    
    colorMode(HSB);
    
    clearInterval(timerHandle); 
    drawNewBalloons(); 
   // timerHandle = setInterval(timerFunc, timerInterval);


    addEventListener('focus', (event) => { 
        clearInterval(timerHandle); 
        drawNewBalloons(); 
        timerHandle = setInterval(timerFunc, timerInterval);

    });
    
    addEventListener('blur', (event) => { 
        clearInterval(timerHandle); 
    });
}

function draw(){
  
    clear();

    for (let i = 0; i < balloonsArray.length; i++) {
        let balloon = balloonsArray[i];
    
        balloon.y = balloon.y + balloon.speed; // 0.4; // balloon.speed * random(-5, 10);
        balloon.x =  random(balloon.x - 0.3,balloon.x + 0.3);
        balloon.opacity = balloon.opacity - 0.005;
    
        balloon.draw();
        if(balloon.midCanvas()){
            balloonsArray.splice(i, 1);
        }else{
            balloon.draw();
        }
      }
}
  
//window resized event
function windowResized(){
    this.resizeCanvas(windowWidth, canvasHeight);  
}

// function mousePressed(){
//     drawNewBalloons();
// }

function drawNewBalloons(){
    let balloonSize = random(5, 10);
  
    for (let i = 0; i <= width; i = i + balloonSize * 10) {
      balloonSize = random(1, 2);
      let balloonColor = random(0, 300);
      let x = i + random (-2, 2);
      let y = 0 - balloonSize; // height + random(balloonSize, balloonSize + 10);
      let balloon = new Balloon(x, y, balloonSize, balloonColor);
      balloon.speed = random(2, 10);
      balloonsArray.push(balloon);
    }
}


class Balloon {
    constructor(x, y, dia, hsbColor){
        this.clr = hsbColor;
        this.x = x;
        this.y = y;
        this.dia = dia;
        this.opacity = 1;
        this.speed = 1;    
    }
    
    draw(){
        colorMode(HSB);
        let ballColor = color(this.clr, 100, 100);
        ballColor.setAlpha(this.opacity);
        fill(ballColor);
        
        let strokeColor = color(this.clr, 100, 80);
        strokeColor.setAlpha(this.opacity); 
        stroke(strokeColor);
        circle(this.x, this.y, this.dia * 2);
   }

    midCanvas(){
        return this.y > canvasHeight - 100;
    }

}