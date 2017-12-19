function setup(){
  createCanvas(1200,640)
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

  for(var j=0;j<18;j++){
    for(var i=0;i<10;i++){
      fill(0,floor(random(2))*255,floor(random(2))*255)
      Hexagon(40+j*120,35+i*69,40);
    }
  }
  for(var j=0;j<18;j++){
    for(var i=0;i<10;i++){
      fill(0,floor(random(2))*255,floor(random(2))*255)
      Hexagon(100+j*120,70+i*69,40);
    }
  }
}



function draw(){

}
