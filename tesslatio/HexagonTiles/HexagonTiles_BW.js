function setup(){
  createCanvas(windowWidth,windowHeight);
  var HL=30;
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

  for(var j=0;j<windowWidth/HL;j++){
    for(var i=0;i<windowHeight/HL;i++){
      var r = floor(random(2))*255;
      stroke(r);
      fill(r,r,r);
      Hexagon(HL*(j*3+1),((i+1/2)*sqrt(3))*HL,HL);
    }
  }
  for(var j=0;j<windowWidth/HL;j++){
    for(var i=0;i<windowHeight/HL;i++){
      var r = floor(random(2))*255;
      stroke(r);
      fill(r,r,r);
      Hexagon(HL*(j*3-1/2),i*sqrt(3)*HL,HL);
    }
  }
}



function draw(){

}
