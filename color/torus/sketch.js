var mother = null;
var img;

function setup() {
  createCanvas(windowWidth, windowHeight,WEBGL);
  noFill();
  background(255);
  img = loadImage("http://nilnil.nl/img/blossom.png");
  //noLoop();
}

function draw() {
  //mother.render();
  background(255);

  var distance = sqrt(sq(mouseX - pmouseX) + sq(mouseY - pmouseY))


  ambientLight((frameCount)/27);
  normalMaterial(250);

  directionalLight(20,100,10,1)

  rotateX(-1*frameCount*.01);
  rotateY(-1*frameCount*.02);
  sphere(100/(1+distance/30));
  texture(img);

  rotateX(frameCount*.01);
  rotateY(frameCount*.02);
  translate(random(distance),random(distance));
  torus(200, 90);
}
