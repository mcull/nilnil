function setup(){
  //noLoop();
  createCanvas(windowWidth,windowHeight);
  d=new DNA(600,100,100);
}

function Pair(x,y,speed,dist,pos,co=1){
  this.x=x;
  this.y=y;
  this.dist=dist;
  this.stage=(Math.PI/speed);
  this.pos=pos;
  this.colo=co;
  this.next=function(){
    if(this.pos<=0){
      this.stage*=-1;
      this.pos=0;
    }else if(this.pos>=Math.PI){
      this.stage*=-1;
      this.pos=Math.PI;
    }
    this.pos+=this.stage;
    strokeWeight(0);
    if(abs(this.stage)==this.stage){
      (this.colo==1)?fill(255,0,0):fill(0,0,255);
      ellipse(cos(this.pos)*dist+this.x,cos(this.pos)+this.y,20,20);
      (this.colo==1)?fill(0,0,255):fill(255,0,0);
      ellipse(-cos(this.pos)*dist+this.x,cos(this.pos)+this.y,20,20);
      stroke(0);
      strokeWeight(2);
      if(abs(cos(this.pos))==cos(this.pos)){
        line(-cos(this.pos)*dist+this.x+10,cos(this.pos)+this.y,
        +cos(this.pos)*dist+this.x-10,cos(this.pos)+this.y);
      }
      else{
        line(-cos(this.pos)*dist+this.x-10,cos(this.pos)+this.y,
        +cos(this.pos)*dist+this.x+10,cos(this.pos)+this.y);
      }

    }else{
      (this.colo==1)?fill(0,0,255):fill(255,0,0);
      ellipse(-cos(this.pos)*dist+this.x,cos(this.pos)+this.y,20,20);
      (this.colo==1)?fill(255,0,0):fill(0,0,255);
      ellipse(cos(this.pos)*dist+this.x,cos(this.pos)+this.y,20,20);
      stroke(0);
      strokeWeight(2);
      if(abs(cos(this.pos))==cos(this.pos)){
        line(-cos(this.pos)*dist+this.x+10,cos(this.pos)+this.y,
        +cos(this.pos)*dist+this.x-10,cos(this.pos)+this.y);
      }else{
        line(-cos(this.pos)*dist+this.x-10,cos(this.pos)+this.y,
        +cos(this.pos)*dist+this.x+10,cos(this.pos)+this.y);
      }

    }


  }
}


function DNA(x,speed,width){
  this.x=x;
  this.speed=speed;
  this.w=width;
  this.array=[];
  for(var i=0;i<60;i++){
    var p=new Pair(this.x,20+(i*20),this.speed,this.w,
    ((i%8)*40)/this.speed,(i%16<=7) ? 1:2);
    this.array.push(p);
  }
  this.nexts=function(){
    for(var j=0;j<60;j++){
      this.array[j].next();
    }
  }
}

var d;

function draw(){
  background(255);
  d.nexts();

}
