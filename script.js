//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let catcher, fallingObject;
let score=0;
let bgColor = 0
let catcherColor= 0
let ballColor =0
let backgroundImg;
let catcherImg;
let myFont;
let victoryImg;
let failImg;
let misses = 0;
let coinSound
let coinLoss
let bgMusic
let failSound;
let winSound;
let gamePlaying = true;


/* PRELOAD LOADS FILES */
function preload(){
  backgroundImg = loadImage("assets/greenHill.jpeg");
  catcherImg = loadImage("assets/sonic.gif");
  fallingObjectImg = loadImage("assets/ring.gif");
  myFont = loadFont('assets/pixel.ttf');
  victoryImg =loadImage("assets/victory.gif");
  failImg = loadImage("assets/fail.gif");
  bgMusic = loadSound("assets/greenHillZone.mp3")
  failSound = loadSound("assets/failSound.mp3");
  winSound = loadSound("assets/winSound.mp3")
  
  
  
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);
  /*bgColor = random(255);
  catcherColor = random(225);
  ballColor = random(225);*/
  rectMode(CENTER);
  textFont(myFont);
  //load music
  coinSound = loadSound('assets/coinSound.mp3');
  coinLoss = loadSound("assets/coinLoss.mp3");
  failSound.loop();
  failSound.setVolume(0);
  winSound.loop();
  winSound.setVolume(0);

  
if (gamePlaying == true){
  bgMusic.loop()
} else if (gamePlaying == false) {
  bgMusic.stop()
}
  
  //Resize images
  backgroundImg.resize(600,0);
  catcherImg.resize(80,0)
  fallingObjectImg.resize(30,0)
  victoryImg.resize(400,400)
  failImg.resize(400,400)
  
  
  //Create catcher 
  catcher = new Sprite(catcherImg,200,380,"k");
  //catcher.color = color(95,158,160);
  
  //Create falling object
  fallingObject = new Sprite(fallingObjectImg);
  
  //fallingObject.color = color(0,128,128);
  fallingObject.vel.y=5;
  fallingObject.rotationLook = true;

  
 //restart button
  restartButton = new Sprite (200,100,200,50)
  restartButton.color = color("blue")
  restartButton.x = -900
  restartButton.y= (-900)
  restartButton.text =("Restart?")
 

}

/* DRAW LOOP REPEATS */
function draw() {
  background(224,224,224);
  


  //draw background image
  image(backgroundImg,0,0);
  //colors 
  //background(bgColor)
  /*if (frameCount % 60 == 0) {
    bgColor = color(random(255), random(255), random(255));
    catcher.color = (random(255), random(255), random(255));
    fallingObject.color = (random(255), random(255), random(255));
  }*/


  
  // Draw directions to screen
  fill("yellow");
  textSize(12);

  text("Move the \ncatcher with \nthe left and \nright arrow\n keys to \ncatch the \nrings.", width-100, 20);
 
  

  //if fallingObject reaches bottom, move back to random position at top
  if (fallingObject.y >= height){
    fallingObject.y=0;
    fallingObject.x = random(width);
    fallingObject.vel.y=random(4,6)
    score = score-1
    misses = misses+1
    coinLoss.play()


  }
 

  //move catcher
  if (kb.pressing("left")){
    catcher.vel.x= -10;
  } else if (kb.pressing("right")){
    catcher.vel.x= 10
  } else{
    catcher.vel.x = 0
  }

  //stop catcher at ends
  if(catcher.x <50){
    catcher.x =50
  } else if (catcher.x>350){
    catcher.x =350
  }
  //if falling object collides with catcher, move back to random position at the top
  if (fallingObject.collides(catcher)){
    fallingObject.y=0;
    fallingObject.x= random(width);
    fallingObject.vel.y= 11;
    coinSound.play();
    fallingObject.direction = "down"
    score = score+1;
  }
  //points missed
  if (misses== 3){
    score=-1
    
  }

  //points to win!
  if (score == 10){
    
    youWin()
    sleep(3000).then(function() {
      restart()
    })
    
    
  } else if (score==-1){
 
    youLose()

    sleep(3000).then(function() {
      
      restart()
    })
  } 
  
  //points to lose
  
  if (restartButton.mouse.presses()){
    restart()
  }

  //draw score on the screen
  fill("yellow");
  stroke("brown")
  textSize(20);
  if (score >=0 ){
    text("RINGS   "+score,10,30)
  }else if (score =-1){
    text("RINGS   0")
  }

  //allSprites.debug =mouse.pressing();
}


function youWin(){
  //background("gold")
  image(victoryImg,0,0)
  textSize(20)
  winSound.setVolume(1)
  bgMusic.setVolume(0)
  text("You win!!",width/2-20,height/2)
  catcher.x= (-700)
  catcher.y= (-700)
  catcher.vel.x=0
  fallingObject.x = (-500)
  fallingObject.y =(-500)
  fallingObject.vel.y=0;
  gamePlaying = false
  
  
  //restartButton.x = width/2
  //restartButton.y = height/2+50
  
  
}

function youLose(){
  //background("gold")
  image(failImg,0,0);
  bgMusic.setVolume(0);
  failSound.setVolume(1);
  
 
  textSize(20)
  text("You lose!!",30,height/2)
  catcher.x= (-700)
  catcher.y= (-700)
  catcher.vel.x=0
  fallingObject.x = (-500)
  fallingObject.y =(-500)
  fallingObject.vel.y=0;
  
  
  //restartButton.x = width/2
  //restartButton.y = height/2+50


}

function restart(){
  
  //background("blue")
  score= 0
  misses =0
  catcher.x =(200)
  catcher.y =(380)
  fallingObject.x = (width/2)
  fallingObject.y = (0)
  fallingObject.vel.y= 11
  fallingObject.direction="down"
  restartButton.x = -900
  restartButton.y = -900
  gamePlaying = true
  bgMusic.setVolume(1)
  failSound.setVolume(0)
  winSound.setVolume(0)

}