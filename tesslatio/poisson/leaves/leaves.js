function setup(){
  createCanvas(1201,641);
/*
  for(var i=0;i<61;i++){
    line(i*20,0,i*20,640);
  }
  for(var i=0;i<33;i++){
    line(0,i*20,1200,i*20);
  }
  */
}
var c1=(180,180,0);
var c2=(2200,0,0);
var c3=(200,75,0);
var colors = [c1,c2,c3]
function draw(){
  for(var i=0;i<floor(random(8))*2;i++){
    shuffle(colors);
    fill(200,floor(random(3))*100,0,25);
    noStroke();
    rect(floor(random(120))*10+floor(random(6)),floor(random(64))*10+floor(random(6)),10,10);
  }
}
