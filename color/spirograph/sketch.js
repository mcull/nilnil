var circles;
var totalRadii = 0;
var canvas;

var play = true;
var doSave = false;
var randohash =  Math.round((new Date()).getTime() / 1000);

$( document ).ready(function() {
  var shareUrl = window.location.href;
  if (location.hash.length == 0) {
    shareUrl = window.location.href + '#' + randohash;
  }
  $("#share").attr("data-clipboard-text", shareUrl);
  tippy("#share", {
    trigger: 'click',
    placement: 'right',
    animation: 'scale',
    duration: 100,
    arrow: true,
    theme: 'nilnil'
  })
  var clipboard = new Clipboard('#share');

  $("#pause").click(function(){
    play = false;
    $(this).css("display", "none");
    $("#play").css("display", "block");
  });
  $("#play").click(function(){
    play = true;
    $(this).css("display", "none");
    $("#pause").css("display", "block");
  });
  $("#save").click(function(){
    doSave = true;
  });
});

function setup() {
  if (location.hash.length > 0) {
    randohash = location.hash.substring(1);
  }

  randomSeed(randohash);

  circles = new Array();

  var parentCircle = new Circle(random(5,15));
  circles.push(parentCircle);
  var numOfCircles = random(3,6);

  for (var i = 0; i < floor(numOfCircles); i++) {
    r = random(5,100);
    totalRadii += r;
    parentCircle = new Circle(r, parentCircle, random([1,-1]));
    circles.push(parentCircle);
  }

  pixelDensity(3.0);
  canvas = createCanvas(max(2*totalRadii,windowWidth), max(2*totalRadii,windowHeight));
  noFill();
  stroke(0,50);
  strokeWeight(1);
  //fill(255,150);
}

function draw() {
  if (doSave) {
    save(canvas, 'nilnil_spirograph-' + randohash + '.png');
    doSave = false;
  }
  if (!play) {
    return;
  }
  var x;
  var y;
  circles.forEach(function(circle, i) {
    if (i > 0) {
       x = circle.x();
       y = circle.y();
      ellipse(x, y, 2);
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
    return (this.parent == null) ? width/2 : this.parent.x();
  }
  this.centerY = function() {
    return (this.parent == null) ? height/2 : this.parent.y();
  }
   this.advance = function() {
     this.radian += Math.PI/this.radius * this.direction;
     // if (this.parent != null) {
     //   parent.advance();
     // }
   }
}
