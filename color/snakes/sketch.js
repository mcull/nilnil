var mother = null;
var img;
var ambientBouncer;
var snakes = new Array();
var snakeCount = 0;
var numOfSnakes = 75;//floor(random(7,10));

function addSnake() {
  snakes.push(new Snake(random(windowWidth*.2,windowWidth*.8),
                        random(windowHeight*.2,windowHeight*.8),
                        random(50,75)));
  snakeCount++;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //noLoop();
  frameRate(8);
  background(255);
  stroke(200,200);

  for (var i = 0; i < numOfSnakes; i++) {
    addSnake();
  }
}

function draw() {
  background(255);
  if (snakeCount < numOfSnakes) {
    addSnake();
  }

  snakes.sort(function(a,b){
    return a.size - b.size;
  });


  snakes.forEach(function(snake) {
    var alpha = max(20,150 - snake.body.length*5);
    var segmentSize = snake.size - snake.body.length/3;
    snake.move();
    reverse(snake.body).forEach(function(bodySegment, i) {
      fill(128, alpha);
      alpha += 5;
      ellipse(bodySegment[0],bodySegment[1], max(4,segmentSize));
      if (i % 3 == 0) {
        segmentSize++;
      }
    });
    reverse(snake.body);
  });
}

function Snake(x, y, length) {
  this.x = x;
  this.y = y;
  this.length = length;
  this.body = new Array([x,y]);
  this.size = max(2,randomGaussian(10,10));

  this.move = function() {
    var directions = [-1,1];
    var head = this.body[0];

    var xDistance = max(2,floor(random(this.size*.4)));
    var yDistance = max(2,floor(random(this.size*.4)));

    if (this.body.length > 1 && random(100) > 40) {
      var neck = this.body[1];
      if (head[0] - neck[0] < 0) {
        xDistance *= -1;
      }
      if (head[1] - neck[1] < 0) {
        yDistance *= -1;
      }
    } else {
      xDistance *= random(-1,1);
      yDistance *= random(-1,1);
    }

    var newX = min(max(head[0] + xDistance,5), windowWidth - 5);
    var newY = min(max(head[1] + yDistance, 5), windowHeight - 5);

    this.body.unshift([newX,newY]);
    //console.log(this.body.length, this.length);
    if (this.body.length > this.length) {
      this.body.pop();
      //this.body = this.body.slice(0,this.length);
    }
    // if (newX > windowWidth || newX < 0 || newY > windowHeight || newY < 0) {
    //   snakeCount--;
    // }
  }
}

function Bouncer(start, min, max, increment) {
  this.bounds = [min,max];
  this.increment = increment;
  this.current = start;
  this.next = function() {
    this.current = this.current + this.increment;
    if (this.bounds.includes(xRound(this.current, 1))) {
      this.increment *= -1;
    }
    return this.current;
  }
}

function xRound(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
