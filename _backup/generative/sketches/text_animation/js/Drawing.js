var Drawing = /** @class */ (function () {
    function Drawing(canvasContext) {
        this.canvasContext = canvasContext;
        this.pointer = new Pointer();
    }
    Drawing.prototype.clearCanvas = function () {
        this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
    };
    Drawing.prototype.drawText = function (text) {
        var _this = this;
        var gradient = this.canvasContext.createLinearGradient(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
        gradient.addColorStop(0.3, 'yellow');
        gradient.addColorStop(0.6, 'red');
        gradient.addColorStop(0.9, 'yellow');
        var maxTextWidth = this.canvasContext.canvas.width * 0.5;
        this.canvasContext.fillStyle = gradient;
        this.canvasContext.textAlign = 'center';
        this.canvasContext.textBaseline = 'alphabetic'; //alphabetic, top, bottom, middle
        this.canvasContext.strokeStyle = 'white';
        var linesArray = [];
        var words = text.split(' ');
        var lineCounter = 0;
        var line = '';
        var fontSize;
        if (this.canvasContext.canvas.width >= this.canvasContext.canvas.height) {
            fontSize = words.length > 1 ? this.canvasContext.canvas.height * 0.2 : this.canvasContext.canvas.height * 0.25;
        }
        else {
            fontSize = words.length > 1 ? this.canvasContext.canvas.width * 0.2 : this.canvasContext.canvas.width * 0.25;
        }
        var lineWidth = fontSize / 75;
        this.canvasContext.font = fontSize + 'px Helvetica';
        this.canvasContext.lineWidth = lineWidth;
        for (var i = 0; i < words.length; i++) {
            var curLine = line + words[i] + ' ';
            var curLineWidth = this.canvasContext.measureText(curLine).width;
            if (curLineWidth > maxTextWidth) {
                line = words[i] + ' ';
                lineCounter++;
            }
            else {
                line = curLine;
            }
            linesArray[lineCounter] = line;
        }
        var totalTextHeight = lineCounter * fontSize;
        var textStartY = (this.canvasContext.canvas.height / 2 - totalTextHeight / 2);
        linesArray.forEach(function (curLine, index) {
            _this.canvasContext.fillText(curLine, _this.canvasContext.canvas.width / 2, textStartY + index * fontSize);
            _this.canvasContext.strokeText(curLine, _this.canvasContext.canvas.width / 2, textStartY + index * fontSize);
        });
    };
    Drawing.prototype.convertDrawingToParticles = function () {
        var particlesArray = [];
        var pixels = this.canvasContext.getImageData(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height).data;
        var pixelScanningSize;
        if (this.canvasContext.canvas.width <= this.canvasContext.canvas.height) {
            pixelScanningSize = Math.floor(this.canvasContext.canvas.width / 300);
        }
        else {
            pixelScanningSize = Math.floor(this.canvasContext.canvas.height / 300);
        }
        for (var y = 0; y < this.canvasContext.canvas.height; y += pixelScanningSize) {
            for (var x = 0; x < this.canvasContext.canvas.width; x += pixelScanningSize) {
                var curPixelIndex = (y * this.canvasContext.canvas.width + x) * 4;
                var alpha = pixels[curPixelIndex + 3];
                if (alpha > 0) {
                    var red = pixels[curPixelIndex + 0];
                    var green = pixels[curPixelIndex + 1];
                    var blue = pixels[curPixelIndex + 2];
                    var color = 'rgb(' + red + ',' + green + ',' + blue + ')';
                    particlesArray.push(new Particle(this, x, y, pixelScanningSize, color));
                }
            }
        }
        return particlesArray;
    };
    Drawing.prototype.drawWaterMarks = function (text) {
        var fontSize;
        if (this.canvasContext.canvas.width >= this.canvasContext.canvas.height) {
            fontSize = this.canvasContext.canvas.height * 0.1;
        }
        else {
            fontSize = this.canvasContext.canvas.width * 0.1;
        }
        this.canvasContext.font = fontSize + 'px Helvetica';
        this.canvasContext.fillStyle = 'rgb(255, 255, 255, 0.1)';
        var textWidth = this.canvasContext.measureText(text).width;
        var x = this.canvasContext.canvas.width * 0.1 + textWidth / 2;
        var y = this.canvasContext.canvas.height * 0.2;
        this.canvasContext.fillText(text, x, y);
        x = this.canvasContext.canvas.width - textWidth;
        y = this.canvasContext.canvas.height - fontSize;
        this.canvasContext.fillText(text, x, y);
    };
    return Drawing;
}());
//# sourceMappingURL=Drawing.js.map