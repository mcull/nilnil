function setup(){
  //noLoop();
  createCanvas(windowWidth,windowHeight)

  dim =2000;
  B=color(0,0,255);
  R=color(255,0,0);
}
var check=0;
var rx;
var ry;
var dim;
var B;
var R;
var points=0;
function draw(){

  if(check==0){
    rx=random(10,windowWidth-10);
    ry=random(10,windowHeight-10);
    check=1;
  }
  background(255,0,0);
  noFill();
  drawGradient2(rx,ry);
  fill(255,0,0);
  noStroke();
  fill(255,0,0);
  ellipse(rx,ry,20,20);
  strokeWeight(1);
  stroke(0);
  line(rx,ry+10,rx,ry-10)
  line(rx+10,ry,rx-10,ry)
  noFill();
  drawGradient(mouseX,mouseY);
  if(mouseIsPressed&&mouseX>rx-10&&mouseX<rx+10&&mouseY>ry-10&&mouseY<ry+10){
    check=0;
    points++;
  }

}

function drawGradient(x, y) {
  var radius = 0;
  var h = 0;
  for (var r = radius; r <dim; r+=4) {

    stroke(255,255,255,h/1.5);
    noFill();
    if(h==512){
      strokeWeight(2000);
      ellipse(x, y, 1535, 1535);
    }else if(h<512){
      strokeWeight(4);
      ellipse(x, y, r, r);
    }

    h+=4;

  }
}
function drawGradient2(x, y) {
  var radius = 0;
  var h = 0;
  for (var r = radius; r < dim; r++) {
    noFill();

    if(h==1024){
      strokeWeight(2000);
      stroke(0,0,255);
      ellipse(x, y, 1488, 1488);
    }else if(h<512){
      var g = 255-h/2;
      strokeWeight(1);
      stroke(lerpColor(R,B,h/512));
      ellipse(x, y, r, r);
    }
    h+=1;

  }
}
