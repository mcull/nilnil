var mother = null;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  background(255);
  mother = new Beast(windowWidth/2, windowHeight/2, windowHeight/2);
  noLoop();
}

function draw() {
  mother.render();
}

function Beast(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.children = [];
  if (r > 10) {
    this.children.push(new Beast(this.x-r/2, this.y,r/2));
    //this.children.push(new Beast(this.xr/2, this.y,r/2));
    this.children.push(new Beast(this.x, this.y-r/2,r/2));
    this.children.push(new Beast(this.x, this.y+r/2,r/2));
  }

  this.render = function() {
    ellipse(x, y, r);
    this.children.forEach(function(child) {
      child.render();
    });
  }
}
