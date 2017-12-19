function setup(){
  console.log(sqrt(3)*40);
  createCanvas(windowWidth,windowHeight);
  function Hexagon(x,y,sidelength,r,g,b){
      fill(r,g,b);
      beginShape();
      vertex(sidelength*cos(2*PI/3)+x,sidelength*sin(2*PI/3)+y);
      vertex(sidelength*cos(PI/3)+x,sidelength*sin(PI/3)+y);
      vertex(sidelength*cos(0)+x,sidelength*sin(0)+y);
      vertex(sidelength*cos(5*PI/3)+x,sidelength*sin(5*PI/3)+y);
      vertex(sidelength*cos(4*PI/3)+x,sidelength*sin(4*PI/3)+y);
      vertex(sidelength*cos(PI)+x,sidelength*sin(PI)+y);

      endShape(CLOSE);
    }

  for(var j=0;j<windowWidth/Hexlength;j++){
    for(var i=0;i<windowHeight/Hexlength;i++){
      var r = floor(random(2))*255;
      noStroke();
      //fill(0,r,255-r);
      Hexagon(Hexlength*(j*3+1),((i+1/2)*sqrt(3))*Hexlength,Hexlength,
              0,r,255-r);
    }
  }
  for(var j=0;j<windowWidth/Hexlength;j++){
    for(var i=0;i<windowHeight/Hexlength;i++){
      var r = floor(random(2))*255;
      noStroke();
      stroke(0,r,255-r);
      fill(0,r,255-r);
      Hexagon(Hexlength*(j*3-1/2),i*sqrt(3)*Hexlength,Hexlength,
              0,r,255-r);
    }
  }
}
var Hexlength=7


function draw(){

}
