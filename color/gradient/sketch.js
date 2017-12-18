
function setup() {
  // put setup code here
  createCanvas(1200,640)
}




var i = 0;
var stage = 1;

var Y_AXIS = 1;
var X_AXIS = 2;
var b1, b2, c1, c2;

function setGradient(x, y, w, h, c1, c2, axis) {

  noFill();

  if (axis == Y_AXIS) {  // Top to bottom gradient
    for (var i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }
  else if (axis == X_AXIS) {  // Left to right gradient
    for (var i = x; i <= x+w; i++) {
      var inter = map(i, x, x+w, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y+h);
    }
  }
}

function draw() {
  i = i + stage;
  if(i == 255){
    stage = -1;
  }if(i==0){
    stage = 1;
  }
  background(i,i,i);

  setGradient(350,220,200,200,color(0,0,0),color(128,128,128),X_AXIS)
  setGradient(650,220,200,200,color(128,128,128),color(255,255,255),X_AXIS)


}
