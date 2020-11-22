
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage,restartImage
var FoodGroup, obstacleGroup

var invisibleGround
var Ground
var score=0
var bananaGroup
var PLAY=1
var END=0
var gameState=PLAY
var start
var t
var gameOver
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

   restartImage=loadImage("restart.png")
  game=loadImage("download (1).png")
  
}



function setup() {
  createCanvas(595,300)
 
  
  
  Ground=createSprite(50,295,1500,10)
  Ground.velocityX=-3
  monkey=createSprite(60,270,20,20)
  monkey.addAnimation("running",monkey_running)
  monkey.scale=0.1
gameOver=createSprite(250,130,20,20)
  gameOver.addImage(game)
  gameOver.scale=0.5
  
  
  t=createSprite(250,200,20,20)
  t.addImage(restartImage)
  t.scale=0.2
  invisibleGround=createSprite(50,300,1500,10)
  
  bananaGroup=new Group();
 obstacleGroup=new Group();
}


function draw() {
background(400)
 
   if(Ground.x<0){
    Ground.x=Ground.width/2
     
  }
 
  
  
  if (gameState===PLAY){ 
     
     if(keyDown("space")&&monkey.y>230){
     monkey.velocityY=-12
       
     }
     monkey.velocityY= monkey.velocityY+0.5
    
   t.visible=false
      score=score+Math.round(getFrameRate()/60)
   invisibleGround.visible=false
 gameOver.visible=false;
    obstacles();
   banana();
  
    if(score%400===0){
monkey.scale=0.1

}
    if(monkey.scale>=0.5){
      monkey.x=200
    }
  
   if(bananaGroup.isTouching(monkey)){
    monkey.scale=monkey.scale+0.02
      bananaGroup.destroyEach();
     }
 if(monkey.isTouching(obstacleGroup)){
     gameOver.visible=true;
     monkey.scale=0.1
     gameState=END
 }
   
     }
  
 
  
  
  
  
  if (gameState===END){
   
  
    monkey.velocityX=0
    monkey.y=270
    monkey.velocityY=0
    bananaGroup.velocityX=0
  bananaGroup.destroyEach();
    obstacleGroup.velocityX=0
 t.visible=true
     invisibleGround.visible=false
    
  if(monkey.isTouching(obstacleGroup)){
  }
    if(mousePressedOver(t)){
      score=0
      
      gameState=PLAY
      
     
 }
    
  }
     
     

  
  monkey.collide(invisibleGround)
 
  
 
  drawSprites();
  
  
   text("Survival Time:"+score,200,50)
  
}

function banana(){
 if(frameCount%100===0){
   var banana=createSprite(599,200,20,20)
  banana.velocityX=-(2+score/100)
   banana.addImage(bananaImage)
   banana.scale=0.05
   banana.lifetime=300
   
   banana.setCollider("circle",0,0,10)
  banana.y=Math.round(random(120,200))
   bananaGroup.add(banana)
   }
   }

function obstacles(){
 if(frameCount%300===0){
   var obstacle=createSprite(599,275,20,20)
  obstacle.velocityX=-(2+score/100)
   obstacle.addImage(obstacleImage)
   obstacle.scale=0.09
   obstacle.lifetime=300
   
   obstacle.setCollider("circle",0,0,10)
  
   obstacleGroup.add(obstacle)
   }
   }



