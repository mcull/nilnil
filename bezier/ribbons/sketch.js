var points = new Array();
var greyBouncer = new Bouncer(0,0,255,1);
var strokeBouncer = new Bouncer(1,1,17,0.1);
var dotBouncer = new Bouncer(0,0,255,1);
var alphaBouncer = new Bouncer(128,80,255,.1);
var blossomBouncer = null;
var dots = new Array();
var curves = new Array();

var jump = true;

var c, altC, fc, altFc, w, alpha = null;

var SPACE = 20;
var HEIGHT = .5;
var MAX_CURVES = 300;
var ODDS_OF_WHITE = .05;

function setup() {
  createCanvas(windowWidth, windowHeight*HEIGHT);
  noFill();
  strokeJoin(ROUND);
  background(255);
  //noLoop();
  strokeWeight(1);
  strokeCap(SQUARE);
}

function draw() {
  if (curves.length <= MAX_CURVES) {
    var startX = random(windowWidth/4);
    var startY = random(windowHeight*HEIGHT);
    var endX = random(windowWidth/2) + windowWidth/2;
    var endY = random(windowHeight*HEIGHT);
    var c1X = random(windowWidth);
    var c1Y = random(windowHeight*HEIGHT);
    //var c1Y = randomGaussian(windowHeight/4,35);
    var c2X = random(windowWidth);
    //var c2Y = random(windowHeight*HEIGHT);
    var c2Y = randomGaussian(windowHeight/3,25);
    var splineColor = color(0, 0, 0);
    var featherColor = color(255, 102, 0);
    var featherSize = 18;
    var featherWeight = 1;
    var fade = true;
    var direction = 1;

    if (random(100) < 100*ODDS_OF_WHITE) {
      //splineColor = color(0,255,0);
      //featherColor = color(0,255,0);
      splineColor = color(255);
      featherColor = color(255);
      startX = random(windowWidth - windowWidth/5);
      startY = random(windowHeight*HEIGHT/10);
      endX = startX + random(windowWidth/5);
      endY = random(windowHeight*HEIGHT/10) + (windowHeight*HEIGHT/10 * 8);
      fade = false;
      featherSize = 9;
      featherWeight = 2;
      direction = -1;
    }

    var newCurve = new Curve(startX,
                             startY,
                             c1X,
                             c1Y,
                             c2X,
                             c2Y,
                             endX,
                             endY,
                             splineColor,
                             featherColor,
                             featherSize,
                             featherWeight,
                             fade,
                             direction);

    append(curves,newCurve);
    if (jump && frameCount%(MAX_CURVES/10) > 0) {
      return;
    }
  } else {
    jump = false;
    curves = curves.slice(random(MAX_CURVES/10));
  }

  background(255);
  var alpha = 230;
  reverse(curves).forEach(function(curve) {
    strokeWeight(1);
    alpha-=15;
    if (alpha < 10) {
      alpha = 10;
    }
    var appliedAlpha = (curve.fade) ? alpha : 230;
    stroke(red(curve.color),green(curve.color),blue(curve.color), appliedAlpha);
    for (var j = 0; j < curve.width; j++) {
      if (j == floor(curve.width/2)) {
        continue;
      }
      bezier(...curve.spline(j));
    }
    //bezier(85, 20, 10, 10, 90, 90, 15, 80);
    stroke(red(curve.featherColor),green(curve.featherColor),blue(curve.featherColor), appliedAlpha);
    //steps = floor((floor(curve[6]) - floor(curve[0])))/2;
    //console.log(frameCount, curves);

    for (i = 0; i <= curve.steps(); i++) {
      if (curve.skip(i)) {
        continue;
      }
      strokeWeight(ceil(random(curve.featherWeight)));
      t = i / curve.steps();
      x = bezierPoint(curve.startX, curve.c1X, curve.c2X, curve.endX, t);
      y = bezierPoint(curve.startY, curve.c1Y, curve.c2Y, curve.endY, t);
      tx = bezierTangent(curve.startX, curve.c1X, curve.c2X, curve.endX, t);
      ty = bezierTangent(curve.startY, curve.c1Y, curve.c2Y, curve.endY, t);
      a = atan2(ty, tx);
      a -= HALF_PI*curve.direction;
      line(x, y, cos(a)*curve.featherSize + x, sin(a)*curve.featherSize + y);
    }
  });
  reverse(curves);
}

function Bouncer(start, min, max, increment) {
  this.bounds = [min,max];
  this.increment = increment;
  this.current = start;
  this.next = function() {
    this.current = this.current + this.increment;
    if (this.bounds.includes(xRound(this.current, 1))) {
      this.increment *= -1;
    }
    return this.current;
  }
}

function Curve(startX, startY, c1X, c1Y, c2X, c2Y, endX, endY, color, featherColor, featherSize, featherWeight, fade, direction) {
  this.color = color;
  this.featherColor = featherColor;
  this.startX = startX;
  this.startY = startY;
  this.c1X = c1X;
  this.c1Y = c1Y;
  this.c2X = c2X;
  this.c2Y = c2Y;
  this.endX = endX;
  this.endY = endY;
  this.width = startX%30;
  this.fade = fade;
  this.featherSize = featherSize;
  this.featherWeight = featherWeight;
  this.direction = direction;
  this.spline = function(shift) {
    return [this.startX,
            this.startY,
            this.c1X - shift,
            this.c1Y + shift/2,
            this.c2X - shift,
            this.c2Y + shift/2,
            this.endX,
            this.endY];
  };

  this.steps = function() {
    return floor(endX - startX)/2;
  };

  this.skip = function(step) {
    return floor(startX*step)%5 == 0
  };
}

function xRound(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
