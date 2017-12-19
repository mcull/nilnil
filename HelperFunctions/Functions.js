
//bounces back and forth between MIN MAX with INCR increments
function Bouncer(min,max,incr,start,stage=1){
  this.min=min;
  this.max=max;
  this.incr=incr;
  this.val=start;
  this.stage=stage*this.incr;
  this.next = function(){
    if(this.val==this.min){
      this.stage=this.incr;
    }if(this.val==this.max){
      this.stage=-this.incr;
    }
    return(this.val+=this.stage);
  }
}
//creates a rectangle with a linear gradient form color 1(C1) to color 2(C2)
//with top left corner at (X,Y) and width and height W and H
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
//wierd spinny thing
function Spin(radian,rad,slide,x,y,speed,size,depth,scale){
  this.radian=radian;
  this.slide=slide;
  this.rad=rad;
  this.x=x;
  this.y=y;
  this.speed=speed;
  this.size=size;
  this.depth=depth;
  this.scale=scale;
  this.dots=[];
  if(this.depth < this.depth){
    for(var k=0; k<8; k++){
      this.dots.push(new Spin(k*(Math.PI/8),
                              startrad[(k)%8],
                              ((this.depth%2==0)?1:-1)*polarity[(k)%8]*Math.PI/this.speed,
                              this.x,
                              this.y,
                              this.speed,
                              Math.floor(this.size*this.scale),
                              this.depth+1,this.scale))
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
    return [floor((this.xout/this.scale)*(this.size-this.size*this.scale)/2*cos(this.rad))+x,
      floor(((this.yout)/this.scale)*(this.size-this.size*this.scale)/2*cos(this.rad))+y];
  }
}
