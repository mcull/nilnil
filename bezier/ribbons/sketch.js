var points = new Array();
var greyBouncer = new Bouncer(0,0,255,1);
var strokeBouncer = new Bouncer(1,1,17,0.1);
var dotBouncer = new Bouncer(0,0,255,1);
var alphaBouncer = new Bouncer(128,80,255,.1);
var blossomBouncer = null;
var dots = new Array();
var curves = new Array();

var c, w, alpha = null;

var SPACE = 20;
var HEIGHT = .5;
var MAX_CURVES = 300;

function setup() {
  createCanvas(windowWidth, windowHeight*HEIGHT);
  noFill();
  strokeJoin(ROUND);
  background(255);
  //noLoop();
  strokeWeight(1);
  //frameRate(2);
}

function draw() {
  if (curves.length <= MAX_CURVES) {
    var startX = random(windowWidth/4);
    var startY = random(windowHeight*HEIGHT);
    var endX = random(windowWidth/2) + windowWidth/2;
    var endY = random(windowHeight*HEIGHT);
    var c1X = random(windowWidth);
    var c1Y = random(windowHeight*HEIGHT);
    var c2X = random(windowWidth);
    var c2Y = random(windowHeight*HEIGHT);
    append(curves,[startX, startY, c1X, c1Y, c2X, c2Y, endX, endY]);
    if (frameCount%(MAX_CURVES/10) > 0) {
      return;
    }
  }

  background(255);
  var alpha = 230;
  reverse(curves).forEach(function(curve, counter) {
    alpha-=15;
    if (alpha < 10) {
      alpha = 10;
    }
    stroke(0,alpha);
    var w = curve[0]%20;
    //random(30);
    var c = 255;
    bezier(...curve);
    for (var j = 0; j < w; j++) {
      bezier(curve[0],
             curve[1],
             curve[2]-j,
             curve[3]+j,
             curve[4]-j/2,
             curve[5]+j/2,
             curve[6],
             curve[7]);
    }
    //bezier(85, 20, 10, 10, 90, 90, 15, 80);
    stroke(255, 102, 0, alpha);
    steps = floor((floor(curve[6]) - floor(curve[0])))/2;
    //console.log(frameCount, curves);

    for (i = 0; i <= steps; i++) {
      if (floor(curve[0]*i)%5 == 0) {
        continue;
      }
      t = i / steps;
      x = bezierPoint(curve[0], curve[2], curve[4], curve[6], t);
      y = bezierPoint(curve[1], curve[3], curve[5], curve[7], t);
      tx = bezierTangent(curve[0], curve[2], curve[4], curve[6], t);
      ty = bezierTangent(curve[1], curve[3], curve[5], curve[7], t);
      a = atan2(ty, tx);
      a -= HALF_PI;
      line(x, y, cos(a)*18 + x, sin(a)*18 + y);
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

function xRound(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function isValid(x,y, bound) {
  //return (w < 3 && random(100) < 1) || sq(x - windowWidth/2)+sq(y - windowHeight/2) <= sq(bound/2);
  return sq(x - windowWidth/2)+sq(y - windowHeight/2) <= sq(bound/2);

}

function validCoordinate() {
  var currentRadius = blossomBouncer.next();
  var coordinate = randomCoordinate();

  while (!isValid(...coordinate, currentRadius)) {
    coordinate = randomCoordinate();
  }
  return coordinate;
}

function randomCoordinate() {
  return [random(windowWidth), random(windowHeight)]
}
