var canvas;
var canvasContext;
var drawing;
var particles;
var animationId = 0;
var text = 'KARMA';
var fps = 30;
window.addEventListener('load', function () {
    setupControls();
    setup();
});
window.addEventListener('resize', function () {
    setup();
});
window.addEventListener('mousemove', function (evt) {
    drawing.pointer.x = evt.x;
    drawing.pointer.y = evt.y;
    drawing.pointer.radius = Math.random() * 1000 + 5000000;
});
window.addEventListener('touchmove', function (evt) {
    for (var i = 0; i < evt.touches.length; i++) {
        drawing.pointer.x = evt.touches[i].clientX;
        drawing.pointer.y = evt.touches[i].clientY;
        drawing.pointer.radius = Math.random() * 1000 + 5000000;
    }
});
function setupControls() {
    var btn = document.getElementById("btnGo");
    var txt = document.getElementById("txtText");
    btn.onclick = function () {
        if (txt.value == null || txt.value == undefined || txt.value == '') {
            return;
        }
        text = txt.value;
        setup();
    };
}
function setup() {
    if (animationId > 0) {
        cancelAnimationFrame(animationId);
    }
    particles = [];
    var urlParams = new URLSearchParams(window.location.search);
    var inputText = urlParams.get('text');
    var inputFps = urlParams.get('fps');
    this.text = inputText == null ? text : inputText;
    this.fps = inputFps == null ? fps : inputFps;
    canvas = document.getElementById('myCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasContext = canvas.getContext('2d', { willReadFrequently: true });
    drawing = new Drawing(canvasContext);
    drawing.drawText(text);
    particles = drawing.convertDrawingToParticles();
    animate();
}
var prevFrameTime = Date.now();
function animate() {
    var elapsed = Date.now() - prevFrameTime;
    if (elapsed > 1000 / fps) {
        this._prevFrameTime = Date.now();
        drawing.clearCanvas();
        particles.forEach(function (particle) {
            particle.update();
            particle.draw();
        });
    }
    this.animationId = requestAnimationFrame(animate);
}
// private loop(){
//     let elapsed = Date.now() - this._prevFrameTime;
//     if(elapsed > 1000/this._fps){
//         this._prevFrameTime = Date.now();
//         this.clearCanvas();
//         this.renderParticles();
//     }
//     //do not change the below code:
//    this.animationId = requestAnimationFrame(() => this.loop());        
// }
//# sourceMappingURL=App.js.map