function setup(){
  createCanvas(1200,640);
  var CONTROL=30;
  star1 = new StarPath(600,320,150,PI/(3*CONTROL),0,2*PI/3);
  star2 = new StarPath(600,320,150,PI/(3*CONTROL),2,PI/3);
  star3 = new StarPath(600,320,150,PI/(3*CONTROL),2,0);
  star4 = new StarPath(600,320,150,PI/(2*CONTROL),3,2*PI/3,0);
  star5 = new StarPath(600,320,150,PI/(2*CONTROL),3,PI/3,0);

}
var star1;
var star2;
var star3;
var star4;
var star5;



function draw(){
  if(!keyIsPressed){
    background(255);
  }

  fill(0,0,255);
  ellipse(...star1.next1(),20,20);
  ellipse(...star2.next1(),20,20);
  ellipse(...star3.next1(),20,20);
  //fill(255,0,0);
  ellipse(...star4.next2(),20,20);
  //ellipse(...star5.next2(),20,20);
}



function StarPath(x,y,length,direction,stage=0,slide=PI,level=0){
  this.x=x;
  this.y=y;
  this.length=length;
  this.direction=direction;
  this.slide=slide;
  this.stage=stage;
  this.level=level;
  this.next1=function(){

    if(this.slide>=PI){
      this.direction*=-1;
      this.slide=PI;
      this.stage++;
    }if(this.slide<=0){
      this.direction*=-1;
      this.slide=0;
      this.stage++;
    }if(this.stage==5){
      this.stage=0;
      this.level++;
    }

    this.slide+=this.direction

    if(this.stage==0){
    return[this.x+cos(11*PI/10)*this.length/3+
           cos((16*PI/10)+PI*this.level)*cos(this.slide)*this.length,
           this.y+sin(11*PI/10)*this.length/3+
           sin(16*PI/10+PI*this.level)*cos(this.slide)*this.length]
    }else if(this.stage==1){
      return[this.x+cos(3*PI/10)*this.length/3+
             cos(18*PI/10+PI*this.level)*cos(this.slide)*this.length,
             this.y+sin(3*PI/10)*this.length/3+
             sin(18*PI/10+PI*this.level)*cos(this.slide)*this.length]
    }else if(this.stage==2){
      return[this.x+cos(15*PI/10)*this.length/3+
             cos(20*PI/10+PI*this.level)*cos(this.slide)*this.length,
             this.y+sin(15*PI/10)*this.length/3+
             sin(20*PI/10+PI*this.level)*cos(this.slide)*this.length]
    }else if(this.stage==3){
      return[this.x+cos(7*PI/10)*this.length/3+
             cos(2*PI/10+PI*this.level)*cos(this.slide)*this.length,
             this.y+sin(7*PI/10)*this.length/3+
             sin(2*PI/10+PI*this.level)*cos(this.slide)*this.length]
    }else if(this.stage==4){
      return[this.x+cos(19*PI/10)*this.length/3+
             cos(4*PI/10+PI*this.level)*cos(this.slide)*this.length,
             this.y+sin(19*PI/10)*this.length/3+
             sin(4*PI/10+PI*this.level)*cos(this.slide)*this.length]
    }

  }
  this.next2=function(){

    if(this.slide>=PI){
      this.direction*=-1;
      this.slide=PI;
      this.stage++;
    }if(this.slide<=0){
      this.direction*=-1;
      this.slide=0;
      this.stage++;
    }if(this.stage==5){
      this.stage=0;
      this.level++;
    }

    this.slide+=this.direction

    if(this.stage==0){
    return[this.x+cos(19*PI/10)*this.length/3+
           cos((4*PI/10)+PI*this.level)*cos(this.slide)*this.length,
           this.y+sin(19*PI/10)*this.length/3+
           sin(4*PI/10+PI*this.level)*cos(this.slide)*this.length]
    }else if(this.stage==1){
      return[this.x+cos(7*PI/10)*this.length/3+
             cos(2*PI/10+PI*this.level)*cos(this.slide)*this.length,
             this.y+sin(7*PI/10)*this.length/3+
             sin(2*PI/10+PI*this.level)*cos(this.slide)*this.length]
    }else if(this.stage==2){
      return[this.x+cos(15*PI/10)*this.length/3+
             cos(20*PI/10+PI*this.level)*cos(this.slide)*this.length,
             this.y+sin(15*PI/10)*this.length/3+
             sin(20*PI/10+PI*this.level)*cos(this.slide)*this.length]
    }else if(this.stage==3){
      return[this.x+cos(3*PI/10)*this.length/3+
             cos(18*PI/10+PI*this.level)*cos(this.slide)*this.length,
             this.y+sin(3*PI/10)*this.length/3+
             sin(18*PI/10+PI*this.level)*cos(this.slide)*this.length]
    }else if(this.stage==4){
      return[this.x+cos(11*PI/10)*this.length/3+
             cos(16*PI/10+PI*this.level)*cos(this.slide)*this.length,
             this.y+sin(11*PI/10)*this.length/3+
             sin(16*PI/10+PI*this.level)*cos(this.slide)*this.length]
    }

  }
}
