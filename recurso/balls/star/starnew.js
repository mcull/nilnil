function setup(){
  createCanvas(1200,640);
  fill(255,0,0);
  beginShape();
  vertex(600+cos(3*PI/10)*50,320+sin(3*PI/10)*50);
  vertex(600+cos(7*PI/10)*50,320+sin(7*PI/10)*50);
  vertex(600+cos(11*PI/10)*50,320+sin(11*PI/10)*50);
  vertex(600+cos(15*PI/10)*50,320+sin(15*PI/10)*50);
  vertex(600+cos(19*PI/10)*50,320+sin(19*PI/10)*50);
  endShape(CLOSE);
  fill(0,0,255);
  beginShape();
  vertex(600+cos(5*PI/10)*50,320+sin(5*PI/10)*50);
  vertex(600+cos(9*PI/10)*50,320+sin(9*PI/10)*50);
  vertex(600+cos(13*PI/10)*50,320+sin(13*PI/10)*50);
  vertex(600+cos(17*PI/10)*50,320+sin(17*PI/10)*50);
  vertex(600+cos(PI/10)*50,320+sin(PI/10)*50);
  endShape(CLOSE);
  fill(0,0,255);
  star1 = new StarPath(600,320,150,1,4,0);
  star2 = new StarPath(600,320,150,1,0,200);
  star3 = new StarPath(600,320,150,1,2,100);
  fill(255,0,0);
  star4 = new StarPath(600,320,150,-1,1,0,1);
  star5 = new StarPath(600,320,150,-1,3,0,1);

}
var star;



function draw(){
  //background(255);
  fill(0,0,255);
  // ellipse(...star1.next(),20,20);
  // ellipse(...star2.next(),20,20);
  // ellipse(...star3.next(),20,20);
  fill(255,0,0);
  ellipse(...star4.next(),20,20);
  //ellipse(...star5.next(),20,20);
}
// PI/5,


function StarPath(x,y,length,direction,stage=0,slide=0,level=0){
  this.x=x;
  this.y=y;
  this.length=length;
  this.direction=direction;
  this.rotation=direction;
  this.slide=(length-slide)*this.direction;
  this.stage=stage;
  this.level=level;
  this.next=function(){

    if(this.slide==-this.direction*this.length){
      this.stage+=1;
      this.slide=(-0.5+this.rotation/2)*this.length;
      this.direction=-1*this.direction;
      if(this.stage==5){
        this.stage=0;
        this.level++;
      }

    }
    this.slide-=2*this.direction

    if(this.stage==0){
    return[this.x+cos(11*PI/10)*this.length/3+
           cos((16*PI/10)+PI*this.level*this.rotation)*this.slide,
           this.y+sin(11*PI/10)*this.length/3+
           sin(16*PI/10+PI*this.level*this.rotation)*this.slide]
    }else if(this.stage==1){
      return[this.x+cos(3*PI/10)*this.length/3+
             cos(18*PI/10+PI*this.level*this.rotation)*this.slide,
             this.y+sin(3*PI/10)*this.length/3+
             sin(18*PI/10+PI*this.level*this.rotation)*this.slide]
    }else if(this.stage==2){
      return[this.x+cos(15*PI/10)*this.length/3+
             cos(20*PI/10+PI*this.level*this.rotation)*this.slide,
             this.y+sin(15*PI/10)*this.length/3+
             sin(20*PI/10+PI*this.level*this.rotation)*this.slide]
    }else if(this.stage==3){
      return[this.x+cos(7*PI/10)*this.length/3+
             cos(2*PI/10+PI*this.level*this.rotation)*this.slide,
             this.y+sin(7*PI/10)*this.length/3+
             sin(2*PI/10+PI*this.level*this.rotation)*this.slide]
    }else if(this.stage==4){
      return[this.x+cos(19*PI/10)*this.length/3+
             cos(4*PI/10+PI*this.level*this.rotation)*this.slide,
             this.y+sin(19*PI/10)*this.length/3+
             sin(4*PI/10+PI*this.level*this.rotation)*this.slide]
    }

  }
}
