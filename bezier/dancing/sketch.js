var points = new Array();
var greyBouncer = new Bouncer(0,0,255,1);
var strokeBouncer = new Bouncer(1,1,17,0.1);
var dotBouncer = new Bouncer(0,0,255,1);
var backgroundBouncer = new Bouncer(128,0,255,1);
var dots = new Array();
var SPACE = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  strokeJoin(ROUND);
  textSize(72);
  background(128);
//noLoop();
}

function draw() {
  fill(backgroundBouncer.next());
  rect(0, 0, windowWidth, windowHeight);
  noFill();
  //background(backgroundBouncer.next());
  stroke(greyBouncer.next());
  strokeWeight(strokeBouncer.next());

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
  fill(128,128,128,10);
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
    if ( this.bounds.includes(xRound(this.current, 1))) {
      this.increment *= -1;
    }
    return this.current;
  }
}

function xRound(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function isValid(x,y) {
  return sq(x - windowWidth/2)+sq(y - windowHeight/2) <= sq(windowHeight/2);
}

function validCoordinate() {
  var coordinate = randomCoordinate();
  while (!isValid(...coordinate)) {
    coordinate = randomCoordinate();
  }
  return coordinate;
}

function randomCoordinate() {
  return [random(windowWidth), random(windowHeight)]
}
