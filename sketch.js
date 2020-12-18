var playerImg;
var ballImg;
var defenderImg;
var backgroundImg;
var goalImg;
var defender, ball, player, goal;
var gameState = 0;
var edges;
var midfieldBarrier
var score = 0;
var scoringLine;

function preload(){
playerImg =  loadImage("boy.png")
ballImg = loadImage("ballImg.png")
defenderImg = loadImage("defenderImg.png")
backgroundImg = loadImage("Background.jpg")
goalImg = loadImage("GoalImg.png")
} 

function setup() {
  createCanvas(1536, 730);
 player =  createSprite(1300, 350, 50, 50);
 ball = createSprite(775, 350, 20, 20)
 defender = createSprite(400, 300, 50, 50)
 goal = createSprite(0, 350, 60, 60)
 scoringLine = createSprite(100, 360, 10, 370)
 midFieldBarrier = createSprite(775, 365, 10, 730)
 player.addImage("playerImg", playerImg)
 ball.addImage("ballImg", ballImg)
 defender.addImage("defenderImg", defenderImg)
 goal.addImage("goalImg", goalImg)
 player.scale = 0.1
 ball.scale = 0.075
 defender.scale = 0.25
 goal.scale = 0.75
 player.setCollider("rectangle", 0, -200, 750, 1500)
 edges = createEdgeSprites()
 goal.depth = -1
}

function draw() {
  background(backgroundImg);  
  scoringLine.visible = false
  midFieldBarrier.visible = false
  if(keyDown("RIGHT_ARROW")){
  player.x=player.x+10
  }
  if(keyDown("LEFT_ARROW")){
  player.x=player.x-10
  }
  if(keyDown("DOWN_ARROW")){
  player.y=player.y+15
  }
  if(keyDown("UP_ARROW")){
  player.y=player.y-15
  }
  if(gameState === 0){
  textSize(45)
  stroke(10)
  fill("red")
  text("Press Space To Start", 550, 365)
  player.visible = false
  ball.visible = false
  defender.visible = false
  goal.visible = false
  }

  if(keyDown("space")){
    gameState = 1
    defender.velocityY = 13
    ball.velocityX = 10
  }

  if(gameState === 1){
  player.visible = true
  ball.visible = true
  defender.visible = true
  goal.visible = true
  textSize(30)
  stroke(10)
  fill("blue")
  text("score : " + score, 50, 50)
  }
 

  if(ball.isTouching(scoringLine)){
  score++
  ball.x = 775
  ball.y = 350
  ball.velocityX = 10
  ball.velocityY = 0
  }

  if(score === 10){
  gameState = 2
  }

  if(gameState === 2){
  textSize(50)
  stroke(10)
  fill("black")
  text("You Win!", 675, 365)
  player.visible = false
  ball.visible = false
  defender.visible = false
  goal.visible = false
  }

  ball.bounceOff(player)
  ball.bounceOff(defender)
  defender.bounceOff(edges)
  ball.bounceOff(edges)
  player.bounceOff(defender)
  player.bounceOff(midFieldBarrier)
  player.bounceOff(edges)

  drawSprites();
}
