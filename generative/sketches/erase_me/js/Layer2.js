var Layer2 = /** @class */ (function () {
    function Layer2(canvasId) {
        this._mouseX = 0;
        this._mouseY = 0;
        this._fps = 120;
        //loop code
        this._x = 0;
        this._canvas = document.getElementById(canvasId);
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
        this._canvasWidth = this._canvas.width;
        this._canvasHeight = this._canvas.height;
        this._context = this._canvas.getContext('2d', { willReadFrequently: true });
    }
    Layer2.prototype.loop = function () {
        var _this = this;
        this.clearCanvas();
        //dont change this code:
        setTimeout(function () {
            requestAnimationFrame(function () { return _this.loop(); });
        }, 1000 / this._fps);
    };
    //functions
    Layer2.prototype.clearCanvas = function () {
        this._context.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
    };
    return Layer2;
}());
//# sourceMappingURL=Layer2.js.map