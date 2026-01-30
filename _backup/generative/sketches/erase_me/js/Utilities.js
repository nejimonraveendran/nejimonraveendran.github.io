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
var Vector = /** @class */ (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    //tested
    Vector.prototype.copy = function () {
        var v = new Vector();
        v.x = this.x;
        v.y = this.y;
        return v;
    };
    //tested
    Vector.prototype.add = function (v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    };
    //tested
    Vector.prototype.subtract = function (v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    };
    //tested
    Vector.prototype.multiply = function (v) {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    };
    //tested
    Vector.prototype.divide = function (v) {
        if (v.x === 0 || v.y === 0) {
            console.warn('Vector error', 'divide by 0');
            return this;
        }
        this.x /= v.x;
        this.y /= v.y;
        return this;
    };
    //tested
    Vector.prototype.distance = function (v) {
        return v.copy().subtract(this).magnitude();
    };
    //tested
    Vector.prototype.magnitude = function () {
        return Math.sqrt(this.magSq());
    };
    //tested
    Vector.prototype.magSq = function () {
        var x = this.x;
        var y = this.y;
        return x * x + y * y;
    };
    //tested
    Vector.prototype.normalize = function () {
        var len = this.magnitude();
        if (len !== 0) {
            this.x *= 1 / len;
            this.y *= 1 / len;
        }
        return this;
    };
    //tested
    Vector.prototype.limit = function (max) {
        var mSq = this.magSq();
        if (mSq > max * max) {
            this.x /= Math.sqrt(mSq);
            this.y /= Math.sqrt(mSq);
            this.x *= max;
            this.y *= max;
        }
        return this;
    };
    //tested
    Vector.prototype.setMagnitude = function (num) {
        this.normalize();
        this.x *= num;
        this.y *= num;
        return this;
    };
    Vector.prototype.dot = function (vector) {
        return this.x * (vector.x || 0) + this.y * (vector.y || 0);
    };
    Vector.prototype.angleBetween = function (v) {
        var angleInRadiansV1 = Math.atan2(v.y, v.x);
        var angleInDegreesV1 = angleInRadiansV1 * (180 / Math.PI);
        var angleInRadiansV2 = Math.atan2(this.y, this.x);
        var angleInDegreesV2 = angleInRadiansV2 * (180 / Math.PI);
        var radianDifference = Math.abs(angleInRadiansV2 - angleInRadiansV1);
        var degreesDifference = Math.abs(angleInDegreesV2 - angleInDegreesV1);
        return new AngleInfo(degreesDifference, radianDifference);
    };
    return Vector;
}());
var Polar = /** @class */ (function () {
    function Polar(angleInDegrees, angleInRadians, radius) {
        this.angleInDegrees = angleInDegrees;
        this.angleInRadians = angleInRadians;
        this.radius = radius;
    }
    return Polar;
}());
var AngleInfo = /** @class */ (function () {
    function AngleInfo(angleInDegrees, angleInRadians) {
        this.angleInDegrees = angleInDegrees;
        this.angleInRadians = angleInRadians;
    }
    return AngleInfo;
}());
//# sourceMappingURL=Utilities.js.map