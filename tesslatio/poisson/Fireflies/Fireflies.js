function setup(){
  createCanvas(windowWidth,windowHeight);
  W=windowWidth;
  H=windowHeight;


}

function flasher(rate,x,y,time){
  this.x=x;
  this.y=y;
  this.rate=rate;
  this.stage=rate;
  this.brightness=time+1;
  this.flash=function(){
    if(this.brightness>=255||this.brightness<=0){
      this.stage*=-1;
    }
    this.brightness+=this.stage;
    fill(200,255,0,this.brightness);
    ellipse(this.x,this.y,10,10);
  }
}
var W=1200;
var H=640;
var f=new flasher(2,W/2,H/2);
var field=[];
for(var i=0;i<30;i++){
  field.push(new flasher(Math.random()*3+1,Math.random()*1200,Math.random()*640,Math.random()*254));
}
function draw(){
  background(0);
  noStroke();
  for(var i=0;i<30;i++){
    field[i].flash();
  }
}
