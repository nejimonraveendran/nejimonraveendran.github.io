function polarToCartesian(angleInDegrees, radius) {
    var radian = angleInDegrees * 0.0174532725199433; //0.01745 = Math.PI/180 
    var x = Math.cos(radian) * radius;
    var y = Math.sin(radian) * radius;
    return new Vector(x, y);
}
function cartesianToPolar(x, y) {
    var angleInRadians = Math.atan2(y, x);
    var angleInDegrees = angleInRadians * (180 / Math.PI); //(Math.atan2(y, x) * 180) / Math.PI;
    var radius = Math.sqrt(x * x + y * y); //pythogorus theorem
    return new Polar(angleInDegrees, angleInRadians, radius);
}
function angleBetween(v1, v2) {
    var angleInRadiansV1 = Math.atan2(v1.y, v1.x);
    var angleInDegreesV1 = angleInRadiansV1 * (180 / Math.PI); //(Math.atan2(y, x) * 180) / Math.PI;
    var angleInRadiansV2 = Math.atan2(v2.y, v2.x);
    var angleInDegreesV2 = angleInRadiansV2 * (180 / Math.PI); //(Math.atan2(y, x) * 180) / Math.PI;
    var radianDifference = Math.abs(angleInRadiansV2 - angleInRadiansV1);
    var degreesDifference = Math.abs(angleInDegreesV2 - angleInDegreesV1);
    return new AngleInfo(degreesDifference, radianDifference);
}
function degreesToRadian(deg) {
    return deg * 0.0174532725199433; //0.01745 = Math.PI/180;
}
function radianToDegrees(radian) {
    return radian * 180 / Math.PI;
}
function mapRange(sourceNumber, sourceMin, sourceMax, targetMin, targetMax) {
    return (sourceNumber - sourceMin) * (targetMax - targetMin) / (sourceMax - sourceMin) + targetMin;
}
function distanceBetween(v1, v2) {
    var x = v2.x - v1.x;
    var y = v2.y - v1.y;
    return Math.sqrt(x * x + y * y); //pythogorus theorem;
}
function magnitude(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
}
function createVector(x, y) {
    return new Vector(x, y);
}
// function clearCanvas(){
//     //_context.clearRect(0, 0, _canvasWidth, _canvasHeight);
//     _context.clearRect(-_canvasWidth/2, -_canvasHeight/2, _canvasWidth * 2, _canvasHeight * 2);
// }
// function circle(x: number, y: number, radius: number, strokeColor?: string, fillColor?: any){
//     const curStrokeStyle = _context.strokeStyle;
//     const curFillStyle = _context.fillStyle;
//     if(strokeColor != null && strokeColor != ''){
//         _context.strokeStyle = strokeColor;
//     }
//     _context.beginPath(); 
//     _context.arc(x, y, radius, 0, 2* Math.PI);        
//     _context.closePath();
//     _context.stroke();
//     if (fillColor != null && fillColor != '') {
//         _context.fillStyle = fillColor;
//         _context.fill();
//         _context.fillStyle = curFillStyle;
//     }
//     _context.strokeStyle = curStrokeStyle;
// }
// function text(text: string, x: number, y: number, fillColor?: any, font?: string){
//     const curFont = _context.font;
//     const curFillStyle = _context.fillStyle;
//     if(font != null && font != ''){
//         _context.font = font;
//     }
//     if(fillColor != null && fillColor != ''){
//         _context.fillStyle = fillColor;
//     }
//     _context.fillText(text, x, y);
//     _context.fillStyle = curFillStyle;
//     _context.font = curFont;  
// }
// function strokeText(text: string, x: number, y: number, strokeColor?: string, font?: string){
//     const curStrokeStyle = _context.strokeStyle;
//     const curFont = _context.font;
//     if(font != null && font != ''){
//         _context.font = font;
//     }
//     if(strokeColor != null && strokeColor != ''){
//         _context.strokeStyle = strokeColor;
//     }
//     _context.strokeText(text, x, y);
//     _context.strokeStyle = curStrokeStyle;
//     _context.font = curFont;
// }
// function line(x1: number, y1: number, x2: number, y2: number, strokeColor?: string){
//     const curStrokeStyle = _context.strokeStyle;
//     if(strokeColor != null && strokeColor != ''){
//         _context.strokeStyle = strokeColor;
//     }
//     _context.beginPath();
//     _context.moveTo(x1, y1);
//     _context.lineTo(x2, y2);
//     _context.closePath();
//     _context.stroke();
//     _context.strokeStyle = curStrokeStyle;
// }    
// function triangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, strokeColor?: string, fillColor?: any){
//     const curStrokeStyle = _context.strokeStyle;
//     if(strokeColor != null && strokeColor != ''){
//         _context.strokeStyle = strokeColor;
//     }
//     _context.beginPath();
//     _context.moveTo(x1, y1);
//     _context.lineTo(x2, y2);
//     _context.lineTo(x3, y3);        
//     _context.closePath();
//     _context.stroke();
//     if (fillColor != null && fillColor != '') {
//         const curFillStyle = _context.fillStyle;
//         _context.fillStyle = fillColor;
//         _context.fill();    
//         _context.fillStyle = curFillStyle;
//     }
//     _context.strokeStyle = curStrokeStyle;
// }    
//# sourceMappingURL=Functions.js.map