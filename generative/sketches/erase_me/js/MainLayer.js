var MainLayer = /** @class */ (function () {
    function MainLayer(canvasId) {
        var _this = this;
        this._prevFrameTime = Date.now();
        this._fps = 30;
        this.animationId = 0;
        this.pixelScanningsize = 2;
        this._canvas = document.getElementById(canvasId);
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
        this._canvasWidth = this._canvas.width;
        this._canvasHeight = this._canvas.height;
        this._context = this._canvas.getContext('2d', { willReadFrequently: true });
        this.context = this._context;
        this.height = this._canvasHeight;
        this.loadImageAndProcess("tree.jpg");
        //on this event, , 
        this._canvas.onmousemove = function (e) {
            if (e.buttons != 1) //if left button down
                return;
            _this.applyEffect(e.x, e.y);
        };
        window.addEventListener('touchmove', function (e) {
            var touch = e.touches[0];
            if (touch == null || touch == undefined) {
                return;
            }
            _this.applyEffect(touch.clientX, touch.clientY);
        });
    }
    MainLayer.prototype.applyEffect = function (pointerX, pointerY) {
        //scan the particles around the current mouse position.  The effect will be applied to these particles.
        for (var i = 0; i < this.particles.length; i++) {
            var scanRadius = Math.random() * 20 + 5; //scan radius is determined by this setting.
            if ((this.particles[i].originalX >= pointerX - scanRadius && this.particles[i].originalX <= pointerX + scanRadius) &&
                (this.particles[i].originalY >= pointerY - scanRadius && this.particles[i].originalY <= pointerY + scanRadius)) {
                var particle = void 0;
                particle = this.particles[i];
                particle.velocityY = Math.random() * 10 + 0.5; //change vertical velocity of the particle in the scan radius range                        
            }
        }
    };
    MainLayer.prototype.loadImageAndProcess = function (image) {
        var _this = this;
        var img = new Image();
        img.onload = function (evt) {
            if (_this.animationId != 0) {
                cancelAnimationFrame(_this.animationId);
            }
            _this.clearCanvas();
            _this.particles = [];
            _this.drawImage(img);
            _this.convertToParticles();
            _this.clearCanvas();
            _this.renderParticles();
            //start animation loop
            _this.loop();
        };
        img.src = image;
    };
    //loop code
    MainLayer.prototype.loop = function () {
        var _this = this;
        var elapsed = Date.now() - this._prevFrameTime;
        if (elapsed > 1000 / this._fps) {
            this._prevFrameTime = Date.now();
            this.clearCanvas();
            this.renderParticles();
        }
        //do not change the below code:
        this.animationId = requestAnimationFrame(function () { return _this.loop(); });
    };
    //functions
    MainLayer.prototype.drawImage = function (img) {
        var wRatio = this._canvasWidth / img.naturalWidth;
        var hRatio = this._canvasHeight / img.naturalHeight;
        var scaleFactor = 1;
        if (img.naturalWidth <= 500 || img.naturalHeight <= 500) {
            scaleFactor = 1;
        }
        else if (img.naturalWidth <= 1000 || img.naturalHeight <= 1000) {
            scaleFactor = 0.5;
        }
        else {
            scaleFactor = 0.25;
        }
        var ratio = Math.max(hRatio, wRatio) * scaleFactor; //change the multiplier to change the scale
        var left = (this._canvasWidth - img.naturalWidth * ratio) / 2;
        var top = (this._canvasHeight - img.naturalHeight * ratio) / 2;
        this._context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, left, top, img.width * ratio, img.height * ratio);
    };
    MainLayer.prototype.convertToParticles = function () {
        var imageData = this._context.getImageData(0, 0, this._canvasWidth, this._canvasHeight).data;
        for (var y = 0; y < this._canvas.height; y += this.pixelScanningsize) {
            for (var x = 0; x < this._canvas.width; x += this.pixelScanningsize) {
                var curPixelIndex = (y * this._canvasWidth + x) * 4;
                var alpha = imageData[curPixelIndex];
                if (alpha > 0) {
                    var r = imageData[curPixelIndex];
                    var g = imageData[curPixelIndex + 1];
                    var b = imageData[curPixelIndex + 2];
                    var color = "rgb(".concat(r, ",").concat(g, ",").concat(b, ")");
                    var p = new Particle(this, x, y, color);
                    this.particles.push(p);
                }
            }
        }
    };
    MainLayer.prototype.renderParticles = function () {
        var _this = this;
        this.particles.forEach(function (particle, i) {
            particle.update();
            particle.draw();
            //optional: if off canvas, remove particle. 
            if (particle.isOffCanvas()) {
                _this.particles.splice(i, 1);
            }
        });
    };
    MainLayer.prototype.clearCanvas = function () {
        this._context.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
    };
    MainLayer.prototype.circle = function (x, y, radius) {
        this._context.beginPath();
        this._context.arc(x, y, radius, 0, 2 * Math.PI);
        this._context.closePath();
        this._context.stroke();
    };
    return MainLayer;
}());
var Particle = /** @class */ (function () {
    function Particle(layer, originalX, originalY, color) {
        this.originalX = 0;
        this.originalY = 0;
        this.currentX = 0;
        this.currentY = 0;
        this.velocityX = 0;
        this.velocityY = 0;
        this.angle = 0;
        this.rotationRadius = 0;
        this._layer = layer;
        this.originalX = originalX;
        this.originalY = originalY;
        this.currentX = this.originalX;
        this.currentY = this.originalY;
        //this.velocityX = Math.random() * 1 + 0.01;
        this.velocityY = 0; //set initial velocity to 0 (to keep the particle vertically stationary).
        this.angle = Math.random() * (Math.PI * 2); //set angle of rotation of current particle to a random value between 0 and 360 degrees
        this.rotationRadius = Math.random() * 1; //rotation trajectory of current particle
        this.color = color;
        this.size = this._layer.pixelScanningsize;
    }
    Particle.prototype.update = function () {
        //as soon as the vertical position changes from original position, start applying oscillating movement in the x axis
        if (this.currentY > this.originalY) {
            this.currentX += Math.cos(this.angle) * this.rotationRadius;
            this.angle += 0.01; //optional: start changing the angle for more wandering particle effect
        }
        //constantly move the particle down
        this.currentY += this.velocityY;
    };
    Particle.prototype.draw = function () {
        this._layer.context.fillStyle = this.color;
        this._layer.context.fillRect(this.currentX, this.currentY, this.size, this.size);
    };
    Particle.prototype.isOffCanvas = function () {
        return this.currentY > this._layer.height;
    };
    return Particle;
}());
//# sourceMappingURL=MainLayer.js.map