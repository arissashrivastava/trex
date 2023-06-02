var PLAY=1;
var END=0;
var gameState=PLAY;
var trex,trex_running
var ground
//loading the image
function preload(){
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  
trex_collided=loadImage("trex1.png")
groundImage=loadImage("ground2.png")
cloudImage=loadImage("cloud.png")
obstacle1=loadImage("obstacle1.png")
obstacle2=loadImage("obstacle2.png")
obstacle3=loadImage("obstacle3.png")
obstacle4=loadImage("obstacle4.png")
obstacle5=loadImage("obstacle5.png")
obstacle6=loadImage("obstacle6.png")
restartImage=loadImage("restart.png")
gameOverImage=loadImage("gameOver.png")
}

function setup(){
createCanvas(600, 200);
//create a trex sprite
trex=createSprite(50,140,20,50) 
  trex.addAnimation("running",trex_running)
  edges=createEdgeSprites()
  trex.scale=0.6
  trex.x=30
  //create a ground sprite
 ground=createSprite(200,180,400,20)  
 ground.addImage("ground", groundImage) 
 ground.x=ground.width/2
  
  
  //create invisible ground
  invisibleGround= createSprite(200,190,400,10)
  invisibleGround.visible=false
  
  obstacleGroup= new Group()
    
  cloudsGroup= new Group()
   rand=Math.round(random(1,100))
  //trex.setCollider("rectangle",0,0,100,trex.height)
//trex.debug=true
   score=0

//create a restart sprite
 
restart= createSprite(300,100)
  
  restart.addImage(restartImage)
gameOver= createSprite(300,125) 
gameOver.addImage( gameOverImage)
restart.scale=0.5
gameOver.scale=0.5

}

function draw(){
  background("white")
  text("Score:"+ score ,500,50)
 

  
  if(gameState === PLAY){
   gameOver.visible=false
    restart.visible=false  
    ground.velocityX=-(4+3*score/100)
    
     score=score+Math.round(frameCount/60)
    
     if(ground.x<0){
        ground.x= ground.width/2
     }
    
    if(keyDown("space") && trex.y>=100 ) {
    trex.velocityY = -10;
  }
    //add gravity
  trex.velocityY = trex.velocityY + 0.8
  
    
    spawnClouds()   
    spawnObstacles()
    
    if(obstacleGroup.isTouching(trex)){
     // trex.velocityY=-12
   gameState=END 
    }
     }
  else if(gameState===END){
   gameOver.visible=true
    restart.visible=true 
    ground.velocityX=0
    trex.velocityY=0
    trex.changeAnimation("collided",trex_collided)
    
 obstacleGroup.setLifetimeEach(-1)  
    cloudsGroup.setLifetimeEach(-1)
   
    obstacleGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    
    }
  
    //jump when space button is pressed
  
 ground.velocityX= -3 
  

  

  
  
  //stop trex from falling down
  trex.collide(invisibleGround)
  

   if(mousePressedOver(restart)){
    reset()
     }
    drawSprites()
  
}
function reset(){
gameState=PLAY
    gameOver.visible=false
    restart.visible=false 
  
  obstacleGroup.destroyEach()
    cloudsGroup.destroyEach()
  
    trex.changeAnimation("collided",trex_running)
    
}

function spawnClouds(){
  if(frameCount%60 === 0){   
    cloud=createSprite(600,100,40,10)  
    cloud.addImage(cloudImage)
    cloud.y=Math.round(random(10,60))
    cloud.scale=0.4
    cloud.velocityX= -3
    
    cloud.lifetime=200
    
    console.log(trex.depth)
      console.log(cloud.depth)
    cloud.depth=trex.depth
   trex.depth=trex.depth+1
   cloudsGroup.add(cloud)
    
   }
}
  function spawnObstacles(){
 if(frameCount%60 === 0){   
    obstacles=createSprite(600,165,10,40)  
      obstacles.velocityX= -3
   
    var rand=Math.round(random(1,6))
    switch(rand){
      case 1: obstacles.addImage(obstacle1);
              break;
      case 2: obstacles.addImage(obstacle2);
              break;
      case 3: obstacles.addImage(obstacle3);
              break;
      case 4: obstacles.addImage(obstacle4);
              break;
      case 5: obstacles.addImage(obstacle5);
              break;        
      case 6: obstacles.addImage(obstacle6);
              break;
              default:break;       
 }
 obstacles.scale=0.5
 obstacles.lifetime=300   
 obstacleGroup.add(obstacles)
 }
    

  }

