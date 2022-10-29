let balloonsArray = [];
let canvasHeight = 220; 
    
function setup(){
    pixelDensity(1);
    let cnv = this.createCanvas(windowWidth, canvasHeight);
    cnv.position(0, 0);
    colorMode(HSB);
    
    drawNewBalloons();

    setInterval(() => 
    {
        drawNewBalloons();

    }, 3000);
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
  
    for (let i = 0; i <= width; i = i + balloonSize * 2) {
      balloonSize = random(5, 10);
      let balloonColor = random(0, 300);
      let x = i + random (-2, 2);
      let y = 0 - balloonSize; // height + random(balloonSize, balloonSize + 10);
      let balloon = new Balloon(x, y, balloonSize, balloonColor);
      balloon.speed = random(0, 0.7);
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