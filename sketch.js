var PLAY=1;
var END=0;
var gameState=PLAY;
var sword,vegetable,monster,score;
var swordImage,vegetable1Image,vegetable2Image,vegetable3Image,vegetable4Image,monsterImage,gameoverImage;
var fruitGroup,enemyGroup;
var gameoverSound,swordSound;


function preload(){
  swordImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  vegetable1 = loadImage("carrot2.png");
  vegetable2 = loadImage("tomato.png");
  vegetable3 = loadImage("cabbage.png");
  vegetable4 = loadImage("brinjal.png");
  gameOverImage=loadImage("gameover.png");
  gameoverSound=loadSound("gameover.mp3");
  swordSound=loadSound("knifeSwooshSound.mp3")

}                         
                                                    
function setup(){
  createCanvas(600,600)
  sword=createSprite(40,200,20,20)
  sword.addImage(swordImage)
  sword.scale=0.7
  
  vegetableGroup=new Group();
  enemyGroup=new Group();
  
   score=0
  
  
  
}

function draw(){
background("yellow")
  if(gameState===PLAY){
    vegetables();
Enemy();
    sword.x=mouseX
  sword.y=mouseY
if(vegetableGroup.isTouching(sword)){
vegetableGroup.destroyEach();
score=score+2;
swordSound.play();  
  
}
else {
  if(enemyGroup.isTouching(sword)){
  gameState=END;
    gameoverSound.play();
        
        vegetableGroup.destroyEach();
        enemyGroup.destroyEach();
        vegetableGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        sword.addImage(gameOverImage);
        sword.x=200;
        sword.y=200;
      }
    }

  
  
  
  
  }
drawSprites();
  fill("red")
  stroke("black")
  strokeWeight(4)
  textSize(15)
  text("Score : "+ score,300,30);
}

function vegetables(){
  if(frameCount%80===0){
    vegetable=createSprite(400,200,20,20)
    vegetable.scale=0.2
  var position=Math.round(random(1,2))
  if(position===1){
     vegetable.x=0
     vegetable.velocityX=(7+score/4)
  }
    else if(position===2){
      vegetable.x=600
      vegetable.velocityX=-(7+score/4)
    }       
            
    var rand=Math.round(random(1,4))
    if(rand===1){
      vegetable.addImage(vegetable1)
      
    }
    else if(rand===2){
      vegetable.addImage(vegetable2)
      
    }
     else if(rand===3){
      vegetable.addImage(vegetable3)
      
    }
     else if(rand===4){
      vegetable.addImage(vegetable4)
      
    }
    vegetable.y=Math.round(random(50,340));
   
    vegetable.setLifetime=100;
    vegetableGroup.add(vegetable);
  }
}

function Enemy(){
  if(frameCount%200===0){
    monster=createSprite(400,200,20,20)
    monster.addAnimation("moving", monsterImage);
monster.y=Math.round(random(100,300));
monster.velocityX=-(10+score/10)
monster.setLifetime=50;
enemyGroup.add(monster);
  }
}