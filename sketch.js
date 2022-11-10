
var trex ,trex_running, trex_collided;
var ground,invisibleGround,groundImage;
var score = 0; 
var gameState = "play"; 
var cloudsGroup, obstaclesGroup;
var restart, restartImg;
var gameover, gameoverImg;
var trex_collided;
var jumpsound, checkpointsound, diesound;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
 groundImage =loadImage("ground2.png");
 cloudImage = loadImage ("cloud.png");
 obstacles1 = loadImage ("obstacle1.png");
 obstacles2 = loadImage ("obstacle2.png");
 obstacles3 = loadImage ("obstacle3.png");
 obstacles4 = loadImage ("obstacle4.png");
 obstacles5 = loadImage ("obstacle5.png");
 obstacles6 = loadImage ("obstacle6.png");
 gameoverImg = loadImage ("gameOver.png");
 restartImg = loadImage ("restart.png");
 trex_collided = loadAnimation("trex_collided.png");
 jumpsound = loadSound ("jump.mp3");
 checkpointsound = loadSound ("checkpoint.mp3");
 diesound = loadSound ("die.mp3");
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  
  //crear sprite de Trex
 trex = createSprite(50,height-20,20,50);
 trex.addAnimation("running",trex_running);
 trex.addAnimation("collided",trex_collided);
 trex.scale = 0.5;
 ground = createSprite(200,height-20,400,20);
 ground.addImage(groundImage);
 invisibleGround= createSprite(200,height-10,400,10);
 invisibleGround.visible = false; 
 cloudsGroup = new Group ();
 obstaclesGroup = new Group ();  
 gameover=createSprite(width/2, height/2);
 gameover.addImage(gameoverImg);
 gameover.scale = 0.5; 
 gameover.visible = false;
 restart=createSprite(width/2, height/2+40);
 restart.addImage(restartImg);
 restart.scale = 0.5;
 restart.visible = false;
 trex.debug = false;
 trex.setCollider("circle",0,0,40);
}

function draw(){
  background(180);
  if (gameState == "play"){
    ground.velocityX= -4;
    spawnObstacles();
    spawnClouds();
    if (Math.round(score)>0 && Math.round(score)%100==0){
      checkpointsound.play();
    } 
    if ((keyDown("space") || touches.lenght>0)&& trex.y>= height-60){
      trex.velocityY=-10;
      jumpsound.play();
      touches= [];
    }
    trex.velocityY= trex.velocityY+0.5;
    if (ground.x<0){
      ground.x=ground.width/2;
    }
    if (trex.isTouching(obstaclesGroup)){
gameState = "end"; 
diesound.play();
    }
    score = score + 0.1;
  }

  if (gameState == "end"){
    ground.velocityX= 0;
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    trex.velocityY = 0;
    gameover.visible = true; 
    restart.visible = true;
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    trex.changeAnimation("collided",trex_collided);
  }
  text("Puntuacion : "+ Math.round(score), width-100, 50);
 drawSprites(); 
trex.collide(invisibleGround);
if (mousePressedOver(restart) || touches.lenght>0){
  console.log("Reinicio");
  reset();
  touches=[];
}
}
function reset(){
  gameState = "play";
  score = 0;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running"); 
  gameover.visible = false; 
  restart.visible = false;
}

function spawnClouds(){
  if (frameCount% 60===0){
var cloud = createSprite(width,80,40,20);
numAl = Math.round(random(10,150));
cloud.y = numAl;
cloud.velocityX = -4;
cloud.addImage (cloudImage);
cloud.scale = 0.5
trex.depth = cloud.depth;
trex.depth = trex.depth + 1;
cloud.lifetime = 150; 
cloudsGroup.add (cloud);
}
}

function spawnObstacles(){
if (frameCount% 60===0){
var obstacle = createSprite (width,height-35,20,40);
obstacle.velocityX = -6;
var dado = Math.round(random(1,6));
switch(dado){
  case 1 : obstacle.addImage(obstacles1);
  break;
  case 2 : obstacle.addImage(obstacles2);
  break;
  case 3 : obstacle.addImage(obstacles3);
  break;
  case 4 : obstacle.addImage(obstacles4);
  break;
  case 5 : obstacle.addImage(obstacles5);
  break;
  case 6 : obstacle.addImage(obstacles6);
  break;
default:
break;
}
obstacle.scale = 0.5;
obstacle.lifetime = 200;
obstaclesGroup.add(obstacle);
}
}

 