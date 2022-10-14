var towerSketch = function(p) {
    p.canvas;

    p.setup = function() {
        p.canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        p.canvas.position(0,0);
        p.frameRate(30);
    }

    p.draw = function() {
        p.clear();
        p.background(220, 10);
        //p.noStroke();
        //p.fill('rgba(250, 250, 250, 0.3)');
  
        //line(100, 100, 300, 300);
    }

}

var skySketch = new p5(towerSketch);

