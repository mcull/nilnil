/*

function setup(){
  createCanvas(660,660);
  k=0
  l=0

}


function draw(){
  background(255,255,255);
  fill(160,0,160);
  stroke(160,0,160);
  k+=(1/3);
  l+=(1/3);
  if(l>=27){
    l=0
  }
  if(k>=27){
    k=0
  }

  for(var i=0;i<27;i++){
    for(var j=0;j<27;j++){

      if((i==floor(k) || i-1==floor(k))&&j<floor(l)){
        if(j==floor(l) || j-1==floor(l)){
          fill(0,0,0);
          ellipse((i*24)+15,(j*24)+15,20,20)
        }else{
          fill(0,0,0);
          ellipse((i*24)+15,(j*24)+15,20,20)
      }
      }else{
        if((j==floor(l) || j-1==floor(l))&&i<floor(k)){
          fill(0,0,0);
          ellipse((i*24)+15,(j*24)+15,20,20)
        }else{
          fill(160,0,160);
          ellipse((i*24)+15,(j*24)+15,20,20)
        }
      }
      if((i==floor(k) || i-1==floor(k))&&(j==floor(l) || j-1==floor(l))){
        fill(0,0,0);
        ellipse((i*24)+15,(j*24)+15,20,20)
      }

    }
  }
}
*/

function setup(){
  createCanvas(1200,600)
  for(var j=0;j<10;j++){
    for(var i=0;i<12;i++){
      beginShape();
      vertex(0+(i*100),30+(j*60));
      vertex(10+(i*100),0+(j*60));
      vertex(50+(i*100),0+(j*60));
      vertex(60+(i*100),30+(j*60));
      vertex(50+(i*100),60+(j*60));
      vertex(10+(i*100),60+(j*60));
      endShape(CLOSE);
    }
  }
  for(var j=0;j<10;j++){
    for(var i=0;i<12;i++){
      beginShape();
      vertex(50+(i*100),60+(j*60));
      vertex(60+(i*100),30+(j*60));
      vertex(100+(i*100),30+(j*60));
      vertex(110+(i*100),60+(j*60));
      vertex(100+(i*100),90+(j*60));
      vertex(60+(i*100),90+(j*60));
      endShape(CLOSE);
    }
  }
}

function draw(){

}
