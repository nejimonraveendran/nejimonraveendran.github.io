var cloudSketch = function(p) {

    p.x = 100;
    p.y = 200;
    p.canvas;

    p.setup = function() {
        p.canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        p.canvas.position(0,0);
        p.frameRate(30);
    }

    p.draw = function() {
        p.clear();
        p.background(220, 10);
        p.noStroke();
        p.fill('rgba(250, 250, 250, 0.3)');
  
        p.ellipse(p.x, p.y, 150, 100);
        p.ellipse(p.x + 20, p.y, 150, 100);
        p.ellipse(p.x - 20, p.y + 10, 150, 70);
        p.ellipse(p.x + 70, p.y + 10, 150, 70);
        
        p.x = p.x + 0.3;

        if(p.x > p.windowWidth - 100)
            p.x = 100;
    }

}

var skySketch = new p5(cloudSketch);

