var circles;

function setup() {
  createCanvas(windowWidth, windowHeight);
  circles = new Array();

  noFill();
  //noLoop();
  //frameRate(3);
  //fill(255,200)
  stroke(0,90);
  strokeWeight(1);
  var hash =location.hash;
  if (hash.length > 0) {
    hash = hash.substring(1);
    var parent = null;
    hash.split("|").forEach(function(circle){
      var params = circle.split(",");
      parent = new Circle(parseInt(params[0]), parent, parseInt(params[1]));
      circles.push(parent);
      console.log(circles);
    });
  } else {
    var parentCircle = new Circle(random(5,15));
    circles.push(parentCircle);
//    circles = [parentCircle];
    var numOfCircles = random(3,6);
    hash = "#" + parentCircle.radius + ",1";
    for (var i = 0; i < floor(numOfCircles); i++) {
      parentCircle = new Circle(random(5,windowHeight/numOfCircles), parentCircle, random([1,-1]));
      circles.push(parentCircle);
      hash += "|" + parentCircle.radius + "," + parentCircle.direction;
    }
    location.hash = hash;
  }
}

function draw() {
  console.log(circles);
  circles.forEach(function(circle, i) {
    if (i > 0) {
      ellipse(circle.x(), circle.y(), 2);
    }
    circle.advance();
  });
}

function Circle(radius, parent = null, direction = 1) {
  this.radius = floor(radius);
  this.radian = Math.PI/random(0,180);
  this.parent = parent;
  this.direction = direction;
  this.x = function() {
    return cos(this.radian)*this.radius + this.centerX();
  }
  this.y = function() {
    return sin(this.radian)*this.radius + this.centerY();
  }

  this.centerX = function() {
    return (this.parent == null) ? windowWidth/2 : this.parent.x();
  }
  this.centerY = function() {
    return (this.parent == null) ? windowHeight/2 : this.parent.y();
  }
   this.advance = function() {
     this.radian += Math.PI/this.radius * this.direction;
     // if (this.parent != null) {
     //   parent.advance();
     // }
   }
}
