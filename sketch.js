
var monkey , monkey_running,monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var survivalTime;
var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collided = loadImage("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600)
  
  ground = createSprite(600,270,1200,5);
  ground.x = ground.width/2;
  
  monkey = createSprite(50,250,30,30);
  monkey.addAnimation("running",monkey_running)
  monkey.scale = 0.13;


  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true;
  survivalTime = 0;
  
}
function draw() {
  createCanvas(600,300);
  background("lightgreen");
  
  if (gameState === PLAY) {
      if(keyDown("space") && monkey.y >=200) {
         monkey.velocityY = -12;
      }
      monkey.velocityY = monkey.velocityY + 0.5;
      
      spawnObstacles();
      spawnBananas();
    
      ground.velocityX = -10;
      if(ground.x < 0) {
         ground.x = ground.width/2;
      }
     survivalTime = Math.ceil(frameCount/getFrameRate())
      if(monkey.isTouching(bananaGroup)){
         bananaGroup.destroyEach();
      }
      if(monkey.isTouching(obstacleGroup)) {
         gameState = END;
      }
     }
 if(gameState === END) {
     monkey.velocityX = 0;
     bananaGroup.setVelocityXEach (0);
     obstacleGroup.setVelocityXEach(0);
   
     obstacleGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);
   
     ground.velocityX = 0;
   
     textSize(30);
     fill("blue")
     text("Game Over",230,150);
     
  }
  monkey.collide(ground);
  
  drawSprites();
  textSize(30)
  text("Survival time: " + survivalTime,200,50);
}
function spawnObstacles() {
  if(frameCount % 300 === 0 ) {
     obstacle = createSprite(520,250,20,20);
     obstacle.addImage ("obstacle",obstacleImage);
     obstacle.scale = 0.1;
     obstacle.velocityX = -(5 + survivalTime / 2);
     obstacleGroup.add(obstacle);
     obstacle.lifetime = 150;
  }
}
function spawnBananas() {
   if(frameCount % 150 === 0) {
      banana = createSprite(500,Math.round(random(120,200)),10,10);
      banana.addImage("point",bananaImage);
      banana.velocityX = -(5 + survivalTime / 50);
      banana.scale = 0.1;
      bananaGroup.add(banana);
      banana.lifetime = 200;
   }
}