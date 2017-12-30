var canvas;

var play = true;
var doSave = false;
var randohash =  Math.round((new Date()).getTime() / 1000);
var outerColors;
var innerColors;
var spirals = [];

var spiralPairs = [];

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


function addSpiral() {
  spirals.unshift(new Spiral(1,random([-1,1])));
}

function addSpiralPair() {
  var direction = random([-1,1]);
  var shiftX = random(-1*width/100, width/100);
  var shiftY = random(-1*height/100, height/100);
  spiralPairs.unshift([new Spiral(10,direction,Math.PI,shiftX,shiftY),
                       new Spiral(1,direction,Math.PI/180,shiftX,shiftY)]);
}

function setup() {
  if (location.hash.length > 0) {
    randohash = location.hash.substring(1);
  }

  innerColors = [color(91,192,235),
            color(253,231,76),
            color(155,197,61),
            color(195,66,63)];
  outerColors = [color(221, 16, 66),
            color(255, 104, 181),
            color(222, 220, 205),
            color(17, 99, 109)];

  randomSeed(randohash);

  //addSpiral();

  addSpiralPair();

  stroke(0,100);
  strokeWeight(1);
  canvas = createCanvas(windowWidth,windowHeight);
  background(128);
  //noLoop();
}

function draw() {
  if (doSave) {
    save(canvas, 'nilnil_spiral-' + randohash + '.png');
    doSave = false;
  }
  if (!play) {
    return;
  }

  spiralPairs.forEach(function(spiralPair) {
    if (!spiralPair[0].done || !spiralPair[1].done) {
      strokeWeight(1);
      stroke(0,100);
      if (random(100) > 30) {
        fill(random(outerColors));
        ellipse(spiralPair[0].x(), spiralPair[0].y(), randomGaussian(max(5,spiralPair[0].radius/5),14));
      }
      if (random(100) > 30) {
        fill(random(outerColors));
        ellipse(spiralPair[1].x(), spiralPair[1].y(), randomGaussian(max(5,spiralPair[0].radius/5),14));
      }
      var cross = floor(log(spiralPair[0].radius*50)*100);
      if (cross % 13 == 0) {
        var slope = (spiralPair[1].y() - spiralPair[0].y())/(spiralPair[1].x() - spiralPair[0].x());
        for (var i = spiralPair[0].x(); i < spiralPair[1].x(); i+= 8) {
          if (random(100) < 30) {
            continue;
          }
          fill(random(innerColors));
          ellipse(i,slope*(i-spiralPair[0].x()) + spiralPair[0].y(),10);
        }
      }

      spiralPair[0].offsetX += random([-.5,1]);
      spiralPair[0].offsetY += random([-.1,.1]);
      spiralPair[1].offsetX += random([-.5,1]);
      spiralPair[1].offsetY += random([-.1,.1]);
      spiralPair[0].advance();
      spiralPair[1].advance();
      if (frameCount % 25 == 0) {
        fade();
      }
    } else {
      addSpiralPair();
      spiralPairs.pop();
    }
  });
}

function fade() {
  fill(128,20);
  rect(0,0,width,height);
}

function Spiral(radius, direction, radian, offsetX, offsetY) {
  this.radius = floor(radius);
  this.radian = radian;//Math.PI/random(1,180);
  this.done = false;
  this.direction = direction;
  this.offsetX = offsetX;
  this.offsetY = offsetY;
  this.x = function() {
    return cos(this.radian)*this.radius + width/2 + this.offsetX*direction;
  }
  this.y = function() {
    return sin(this.radian)*this.radius + height/2 + this.offsetY*direction;
  }

  this.advance = function() {
    this.done = (this.x() < 0 || this.x() > width) && (this.y() < 0 || this.y() > height);
    if (!this.done) {
      this.radius += max(.1,randomGaussian(.5,.01));
      this.radian += 2*(max(.5,this.radius/height)) *  Math.PI/180 * this.direction;
    }
  }
}
