function setup(){
  var startrad=[4*PI/8,3*PI/8,2*PI/8,PI/8,0,PI/8,2*PI/8,3*PI/8]
  var polarity=[-1,-1,-1,-1,1,1,1,1]
  createCanvas(windowWidth,windowHeight);
  test = new Spin(0,0,0,windowWidth/2,windowHeight/2,75,windowHeight*1.1,ROOT);

}

var SPEED = 15;
var MAX_DEPTH = 3;
var ROOT = 0;
var SCALE = .16;
var startrad=[4*Math.PI/8,3*Math.PI/8,2*Math.PI/8,Math.PI/8,0
  ,Math.PI/8,2*Math.PI/8,3*Math.PI/8]
var polarity=[-1,-1,-1,-1,1,1,1,1]

function Spin(radian,rad,slide,x,y,speed,size,depth){
  this.radian=radian;
  this.slide=slide;
  this.rad=rad;
  this.x=x;
  this.y=y;
  this.speed=speed;
  this.size=size;
  this.depth=depth;
  this.dots=[];
  if(this.depth < MAX_DEPTH){
    for(var k=0; k<8; k++){
      this.dots.push(new Spin(k*(Math.PI/8),
                              startrad[(k)%8],
                              ((this.depth%2==0)?1:-1)*polarity[(k)%8]*Math.PI/this.speed,
                              this.x,
                              this.y,
                              this.speed,
                              Math.floor(this.size*SCALE),
                              this.depth+1))
    }
  }

  this.render = function(x=this.x,y=this.y) {
    // get new x,y
    var newCoordinates = [x, y];
    if (depth > ROOT) {
      newCoordinates = this.next(x,y);
    }
    //console.log(this.depth, newCoordinates);

    // draw ellipse
    var c = (this.depth % 2 == 0) ? 0 : 255;
    fill(c);
    ellipse(newCoordinates[0],newCoordinates[1],this.size);
    // draw children
    this.dots.forEach(function(dot) {
      dot.render(newCoordinates[0],newCoordinates[1]);
    });
  }

  this.next = function(x,y) {
    if(this.rad>=PI){
      this.slide=-PI/this.speed;
      this.rad = PI;  // stave off propegation of rounding errors
    }if(this.rad<=0){
      this.slide=PI/this.speed;
      this.rad = 0; // stave off propegation of rounding errors
    }
    this.rad=this.rad+this.slide;
    //console.log(this.rad);

    this.yout=sin(this.radian);
    this.xout=cos(this.radian);
    if (this.radian == PI) {
      this.yout=0;
    }if(this.radian==PI/2){
      this.xout=0;
    }
    return [floor((this.xout/SCALE)*(this.size-this.size*SCALE)/2*cos(this.rad))+x,
      floor(((this.yout)/SCALE)*(this.size-this.size*SCALE)/2*cos(this.rad))+y];
  }
}

var test;

var dots=[];
var anti=[];
var bee=[];


function draw(){
  background(255)
  test.render();


}
