var myFont;
var takeoff;
var landing;
var depBouncer;
var retBouncer;
var lSize = 200;
var swinger;

function preload() {
  myFont = loadFont('https://s3.amazonaws.com/nilnilfonts/SpecialElite-Regular.ttf');
}

var outboundX;
var outboundY;
var returnX;
var returnY;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  noFill();
  strokeJoin(ROUND);
  background(255);
  //noLoop();
  strokeWeight(1);
  strokeCap(SQUARE);

  fill('#ED225D');
  textFont(myFont);
  depBouncer = new Bouncer(32,31,33,1);
  retBouncer = new Bouncer(33,32,34,1);
  swinger = new Bouncer(1,0,90,0.01)

  outboundX = max(width/3, random(width - width/5));
  outboundY = random(height/2);
  returnX = max(width/3, random(width - width/5));
  returnY = random(height/2);
}

var depSize = 32;
var retSize = 33;
var textColor = '#000000';
var bgcolor = '#FFFFFF';
var showAviary = false;
function draw() {
  if (random(100) < 2) {
    var temp = bgcolor;
    bgcolor = textColor;
    textColor = temp;
    outboundX = max(width/3, random(width - width/5));
    outboundY = random(height/2);
    returnX = max(width/3, random(width - width/5));
    returnY = random(height/2);
    showAviary = !showAviary;
  }
  if (random(100) < 20) {
    depSize = depBouncer.next();
    outboundX += random(-1,1)*random(5);
    outboundY += random(-1,1)*random(5);
    returnX += random(-1,1)*random(5);
    returnY += random(-1,1)*random(5);
  }
  if (random(100) < 17) {
    retSize = retBouncer.next();
  }
  background(bgcolor);
    fill(textColor);
    textSize(depSize);
    text('3/8 15:25PST OAK', 10, 30);
    text('21:25CST MDW', 75, 60);
    textSize(retSize);
    text('3/10 19:50CST OAK', 10, 90);
    text('22:30PST MDW', 75, 120);
    stroke(textColor);
    line(180,105,returnX,returnY-5);
    line(200,35,outboundX,outboundY-5);
    textSize(12);
    noStroke();
    fill('#FF0000');
    text('SWA 2357', returnX, returnY);
    text('SWA 5551', outboundX, outboundY);

    push();
    translate(width/2,height/2);
    fill('#666666');
    textSize(24);
    text('9:15alinea', 0, 0);
    translate(7,10);
    for (var i = 0; i < 18; i++) {
      ellipse(0,0,10);
      translate(11,0);
    }
    pop();
    push();
    fill('#666666');
    textSize(24);
    translate(width/4,height/2);
    text('5:15aviary', 0, 0);
    if (showAviary) {
      translate(125,-6);
      rotate(swinger.next());
      textSize(14);
      fill('#FFFFFF');
      text('3-Course Cocktail Progressionx2 + Food Pairingx2',0,0);
    }
    pop();
    push();
    fill(textColor);
    textSize(72);
    translate(0,0);
    rotate(PI/2);
    text('ACE HOTEL', 0, 0);
    pop();

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
