function setup(){
  createCanvas(1200,640);

}
var j=0
function draw(){
  background(255);
  if(!keyIsPressed){
    for(var i=0;i<30;i++){
      fill(0,0,0);
      rect(i*40,0,20,640);
    }
  }
  noStroke();
  fill(255,255,255)
  rect(480,0,240,50);
  fill(0);
  textSize(20);
  text("Hold any key for illusion.",482,30)
  fill(255,255,0);
  rect(j,260,50,20);
  fill(0,0,255);
  rect(j,380,50,20);
  j+=1;
  if(j==1150){
    j=0;
  }
}
