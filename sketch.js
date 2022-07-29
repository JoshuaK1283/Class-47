var ship;
var shipImg;
var bgImg;
var obstacle, obstacle2;
var obstacleImg, obstacle2Img, obstaclesGroup;
var laser, laserImg;
var score = 0;
var life = 3;
var gameState = 0;


function preload(){
  shipImg = loadImage("assets/spaceship.png");
  obstacleImg = loadImage("assets/meteor1.webp");
  obstacle2Img = loadImage("assets/meteor2.gif");
  laserImg = loadImage("assets/laser.png");
}

function setup(){
  createCanvas(1500, 800);
  ship = createSprite(200, 300); 
  ship.addImage(shipImg);
  ship.scale = 0.3;
  obstaclesGroup = new Group();
}

function draw() {
  background('black');
  
  fill('white');
  textSize(30);
  text("Score: "+score, 10, 30);
  text("Lives: "+life, 150, 30);
  if(gameState == 0){
  if(keyDown(UP_ARROW)){
    ship.y -= 10;
  }
  if(keyDown(DOWN_ARROW)){
    ship.y += 10;
  }
  if(keyDown(LEFT_ARROW)){
    ship.x -= 10;
  }
  if(keyDown(RIGHT_ARROW)){
    ship.x += 10;
  }
  if(keyDown("SPACE")){
    shoot();
  }
  if(obstaclesGroup.isTouching(laser)){
    obstaclesGroup.destroyEach();
    score += 1;
  }
  if(obstaclesGroup.isTouching(ship)){
    
    life -= 1;
    
    gameState = 1;
  }
  spawnObstacles();
  }
  if(gameState == 1){
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    if(keyDown("SPACE")){
      gameState = 0;
    }
  }
  drawSprites();
}

function spawnObstacles(){
  if(frameCount % 80 == 0){
  obstacle = createSprite(1510, random(10,790), 20, 20);
  //obstacle.addImage(obstacleImg);
  //obstacle.scale = 0.3;
  obstacle.velocityX = -10;
  obstacle.lifetime = 500;
    
  var rand = Math.round(random(1,2))
  console.log(rand);
  switch(rand){
    case 1: obstacle.addImage(obstacleImg);
    obstacle.scale = 0.3;
    break;
    case 2: obstacle.addImage(obstacle2Img);
    obstacle.scale = 0.3;
    break;
  }
  obstaclesGroup.add(obstacle);
}
}

function shoot(){
  if(frameCount % 10 == 0){
  laser = createSprite(ship.x+20, ship.y, 10, 10);
  laser.addImage(laserImg);
  laser.velocityX = 10
  laser.lifetime = 700;
  laser.scale = 0.15
  }
}

