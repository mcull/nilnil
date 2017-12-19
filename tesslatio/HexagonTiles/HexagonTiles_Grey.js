function setup(){
  createCanvas(1200,640)
  hexs1=[];
  hexs2=[];
  for(var i=0;i<18;i++){
    var x=[];

    for(var j=0;j<10;j++){
      x.push(new Pulsar(i*120+40,35+j*69,40,(floor(random(2))*255),floor(random(101)) ));
    }
    hexs1.push(x);
  }
  for(var i=0;i<18;i++){
    var y=[];

    for(var j=0;j<10;j++){
      y.push(new Pulsar(i*120-20,1+j*69,40,(floor(random(2))*255),floor(random(101)) ));
    }
    hexs2.push(y);
  }
//  hex = new Pulsar(600,320,100,0);

}
var hex;
function Hexagon(x,y,sidelength){

    beginShape();
    vertex(sidelength*cos(2*PI/3)+x,sidelength*sin(2*PI/3)+y);
    vertex(sidelength*cos(PI/3)+x,sidelength*sin(PI/3)+y);
    vertex(sidelength*cos(0)+x,sidelength*sin(0)+y);
    vertex(sidelength*cos(5*PI/3)+x,sidelength*sin(5*PI/3)+y);
    vertex(sidelength*cos(4*PI/3)+x,sidelength*sin(4*PI/3)+y);
    vertex(sidelength*cos(PI)+x,sidelength*sin(PI)+y);

    endShape(CLOSE);
  }

function draw(){

  for(var j=0;j<18;j++){
    for(var i=0;i<10;i++){
      hexs1[j][i].pulse();
    }
  }
  for(var j=0;j<18;j++){
    for(var i=0;i<10;i++){
      hexs2[j][i].pulse();
    }
  }
  //hex.pulse();
}

function Pulsar(x,y,sidelength,color,stage=0){
  this.x=x;
  this.y=y;
  this.sidelength=sidelength;
  this.color=color;
  this.slide=stage;
  this.pulse = function(){
    stroke(this.color);
    fill(this.color);
    Hexagon(this.x,this.y,this.sidelength)
    stroke(255-this.color);
    fill(255-this.color);
    Hexagon(this.x,this.y,this.sidelength-this.slide)
    this.slide+=Math.ceil(Math.random(6));

    if(this.slide>=this.sidelength){
      this.slide=0;
      this.color=255-this.color;
    }

  }
}
