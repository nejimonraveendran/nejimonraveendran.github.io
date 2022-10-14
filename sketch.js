let sunAlpha;
let sunAuraIncrement;
let skyDrawn = false;
let foregroundBuildingsDrawn = false;
let midGroundBuildingsDrawn = false;
let farAwayBuildingsDrawn = false;
let horizonDrawn = false;
let cloudX = 0, cloudY = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);

  refreshDrawing();
  frameRate(50);
}


function draw() {
  drawSky();
  drawHorizon();
  drawSun();
  drawFarAwayBuildings();
  drawMidGroundBuildings();
  drawForegroundBuildings();
  //drawClouds();
}

function refreshDrawing(){
  skyDrawn = false;
  foregroundBuildingsDrawn = false;
  midGroundBuildingsDrawn = false;
  farAwayBuildingsDrawn = false;
  horizonDrawn = false;

  sunAlpha = 1;
  sunAuraIncrement = 0;
}

function drawSky(){
  if(skyDrawn) return;

  for (let pos = 0; pos <= width; pos++) {
    //convert the current position to a value between 0 and 1
    let amount = ((pos / width) * 100) / 100;
  
    //set color mode to HSB.  H = hue (0 to 330), S = saturation (0 to 100), B = brightness (0 to 100)
    //https://www.learnui.design/blog/the-hsb-color-system-practicioners-primer.html
    colorMode(HSB);

    //set color HSB mode
    let h = lerp (210, 180, amount); // try changing the values
    let s = lerp (50, 0, amount);;
    let b = 100;
    stroke(h, s, 100);
    line(0, pos, width, pos);
  }

  skyDrawn = true;
}

let farAwayBuildingX = 0;

let farAwayBuildingSpacing = 5;
let farAwayBuildingMaxHeight = 100;

function drawFarAwayBuildings(){
  if(farAwayBuildingsDrawn) return;

  colorMode(HSB);
  //fill(200, 100, 80);
  fill('rgba(250, 250, 250, 0.5)');
  noStroke();
  
  //let x = 0;
  for (let index = 0; index < width; index = index + 100) {
    let y = random(200, 400);
    let w = random(20, 60);
    let x = random (index + 100, index + 120);
    rect(x, height - y, w, 400);  
    
  }
   
  farAwayBuildingsDrawn = true;
}

function drawHorizon(){
  if(horizonDrawn) return;
  colorMode(HSB);
  fill('rgba(250, 250, 250, 0.3)');
  noStroke();
  
  ellipse(width/4, height / 1.1, windowWidth / 3);
  ellipse(width, height / 1.1, windowWidth / 1.5);
    
  horizonDrawn = true;
}

function drawClouds(){
  colorMode(HSB);
  fill('rgba(250, 250, 250, 0.3)');
  noStroke();
  
  ellipse(cloudX, cloudY, 100);
  cloudX++;  
}


function drawForegroundBuildings(){
  if(foregroundBuildingsDrawn) return;

  let x = 0;
  colorMode(HSB);
  fill(200, 50, 50);
  noStroke();
  
  for (let index = 0; index < 100; index++) {
    let y = random(30, 200);
    let w = random(50, 100);
    let h = height - y;
    rect(x, h, w, 400);
    
    let a = random(1, index);
    if(a > 0 && a < 10)
      strokeWeight(5);
      rect(x + random(5, w), h - 20, 1, 20);
      ellipse(x + w / 2, h, a, random(0, w));
    
    x = x + index;      
  }

  foregroundBuildingsDrawn = true;
}

function drawMidGroundBuildings(){
  if(midGroundBuildingsDrawn) return;

  let x = 0;
  colorMode(HSB);
  noStroke();
  
  for (let index = 0; index < 100; index++) {
    let y = random(40, 300);
    let w = random(50, 100);
    fill(200, 50, 80);
  
    rect(x, height - y, w, 400);

  //  fill(60, 50, 100);

    // let units = w / 10;
    // let unitGap = 5;

    // for (let nextUnitX = x + unitGap; nextUnitX <= (x + w) - unitGap; nextUnitX = nextUnitX + units + unitGap) {
      
    //   rect(nextUnitX, (height - y) + unitGap, units);
    //   //nextUnitX = nextUnitX + units + 2;
    //   //rect(nextUnitX, (height - y) + 1, units);
        
    // }

        
    x = x + 100;      
  }

   midGroundBuildingsDrawn  = true;
}



// function drawBuildings(color, brightness, clustered, maxHeight){
//   let x = 0;
//   colorMode(HSB);
//   fill(color, 50, brightness);
//   noStroke();
  
//   for (let index = 0; index < 100; index++) {
//     let y = random(30, maxHeight);
//     let w = random(50, 100);
//     rect(x, height - y, w, 400);

//     if(clustered){
//       x = x + index;
//     }else{
//       x = x + 100;
//     }
      
//   }
// }



function drawSun() {
  colorMode(HSB);
  fill(27, 100, 100);
  
  let sunWidth = 100;
  ellipse(width / 4, height / 2, sunWidth);
  
  noFill();
    
    if(sunAlpha >= 0.02){
      sunAlpha = sunAlpha - 0.02;
      stroke('rgba(245,237,196,' + sunAlpha  + ')');
      ellipse(width / 4, height / 2, sunWidth + sunAuraIncrement);  
      sunAuraIncrement++;
    }

}

function mouseMoved(){
  
}

function mouseClicked(){
  refreshDrawing();
}