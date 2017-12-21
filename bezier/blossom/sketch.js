var points = new Array();
var greyBouncer = new Bouncer(0,0,255,1);
var strokeBouncer = new Bouncer(1,1,17,0.1);
var dotBouncer = new Bouncer(0,0,255,1);
var alphaBouncer = new Bouncer(128,80,255,.1);
var blossomBouncer = null;
var dots = new Array();

var c, w, alpha = null;

var SPACE = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  strokeJoin(ROUND);
  textSize(72);
  background(128);
  blossomBouncer = new Bouncer(floor(windowHeight-1),10,floor(windowHeight),.1);
//noLoop();
}

function draw() {
  noFill();
  //background(backgroundBouncer.next());
  c = greyBouncer.next();
  w = strokeBouncer.next();
  alpha = alphaBouncer.next();
  if (w < 3 && alpha > 230 && random(10) < 1) {
    c = color(255, 0, 0);
  }
  stroke(c, alpha);
  strokeWeight(w);

  if (points.length > 0) {
    points = subset(points, 6, 7);
  }
  while (points.length < 8)  {
    var coordinate = validCoordinate();
    append(points, coordinate[0]);
    append(points, coordinate[1]);
  }
  bezier(...points);
  stroke(128,128,128,10);
  //fill(128,128,128,10);
  strokeWeight(1);
  for (var i = SPACE; i < windowWidth - SPACE; i += SPACE) {
    for (var j = SPACE; j < windowHeight - SPACE; j += SPACE) {
      ellipse(i,j,2);
    }
  }
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
