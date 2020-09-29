var gameState = "play"         

var jungle,jungleimg;
var monkey,monkeyimg,monkeycollided;
var banana,bananaimg,bananaGroup;
var stone,stoneimg,stoneGroup;
var invisibleground;

var score = 0;
var survivalchances = 2;

function preload(){

  jungleimg = loadImage("jungle.jpg");
  monkeyimg = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  monkeycollided = loadAnimation("Monkey_01.png");
  
  bananaimg = loadImage("banana.png");
  stoneimg = loadImage("stone.png");
  
}

function setup() {
  createCanvas(400, 400);
  
  jungle = createSprite(0,0,400,400);
  jungle.addImage("jungle",jungleimg);
  jungle.scale = 1.1;
  jungle.x = jungle.width/2;
  jungle.velocityX = -3; 
  
  monkey = createSprite(50,250,5,5);
  monkey.addAnimation("running",monkeyimg);
  monkey.scale = 0.1;
  monkey.debug = true;
  monkey.setCollider("circle",0,0,40);
  
  invisibleground = createSprite(200,283,400,10);
  invisibleground.visible = false;
  
  bananaGroup = new Group();
  stoneGroup = new Group();
  
} 

function draw() {
      background(220);
  
    if(jungle.x<0){
      jungle.x = jungle.width/2;
    }
        
    if(gameState === "play"){
     
    if(keyDown("space")&&monkey.y>250){
      monkey.velocityY = -10; 
    }
    
    monkey.velocityY = monkey.velocityY + 0.5;

    if(frameCount % 150 === 0){
      bananas();
    }

    if(monkey.isTouching(bananaGroup)){
       bananaGroup.destroyEach();
       score = score+2;
    }
  
    if(frameCount % 70 === 0){
      obstacles();
    }
  
    switch(score){
     
      case 10 : monkey.scale = 0.11;
        break;
      case 20 : monkey.scale = 0.12;
        break;
      case 30 : monkey.scale = 0.13;
        break;  
      case 40 : monkey.scale = 0.14;
        break;
      case 50 : monkey.scale = 0.15;
        break; 
      default : break;  
    }
       
    if(monkey.isTouching(stoneGroup)){
      
      stoneGroup.destroyEach();
      survivalchances= survivalchances - 1;
      monkey.scale = 0.1;
      
    } 
      
    if(survivalchances === 0){
       gameState = "end";
       bananaGroup.destroyEach();
    }
   
   }
  
   if(gameState === "end"){

     jungle.velocityX = 0;
     monkey.velocityY = 0;
     monkey.changeAnimation("gameover",monkeycollided);
     
   }
    
    monkey.collide(invisibleground);

    drawSprites();

    stroke("blue");
    fill("yellow");
    textSize(20);
    text("Score = " + score,300,20);
    text("Survival Chances = " +survivalchances,50,20);

    if(gameState === "end"){
      textSize(40);
      text("Game Over",100,200);
    }
}

function bananas(){
 
  var banana = createSprite(400,random(140,170),5,5);
  banana.addImage("banana",bananaimg);
  banana.scale = 0.05;
  banana.velocityX = -(6+score/2);
  
  bananaGroup.add(banana);
  bananaGroup.setLifetimeEach(67);
  
} 

function obstacles(){
 
  var stone = createSprite(400,273,5,5);
  stone.addImage("stone",stoneimg);
  stone.scale = 0.17;
  stone.velocityX = -(6+score/2);
  
  stoneGroup.add(stone);
  stoneGroup.setLifetimeEach(67);
  
}