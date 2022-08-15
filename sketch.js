const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var ground;
var rope;
var fruit;
var bunny;
var button;
var ballon;
var mute;

var bgMusic, eatSound, sadSound, cutSound, airSound;

var backgroundImg, fruitImg, rabbitImg;
var eat, blink, sad;

var fruitLink;

function preload() {
  backgroundImg = loadImage("./assets/background.png");
  fruitImg = loadImage("./assets/melon.png");
  rabbitImg = loadImage("./assets/blink_1.png");
  eat = loadAnimation("./assets/eat_0.png",
   "./assets/eat_1.png","./assets/eat_2.png", "./assets/eat_3.png",
   "./assets/eat_4.png");
   blink = loadAnimation("./assets/blink_1.png", "./assets/blink_2.png",
   "./assets/blink_3.png");
   sad = loadAnimation("./assets/sad_1.png", "./assets/sad_2.png",
   "./assets/sad_3.png");

   eat.playing = true;
   eat.looping = false;
   blink.playing = true;
   sad.playing = true;
   sad.looping = false;

   bgMusic = loadSound("./assets/sound1.mp3");
   eatSound = loadSound("./assets/eating_sound.mp3");
   sadSound = loadSound("./assets/sad.wav");
   cutSound = loadSound("./assets/rope_cut.mp3");
   airSound = loadSound("./assets/air.wav");

}

function setup() 
{
  createCanvas(500,600);
  engine = Engine.create();
  world = engine.world;

  bgMusic.play();
  bgMusic.setVolume(0.1);

  //determinando velocidade das animações
  eat.frameDelay = 20;
  blink.frameDelay = 20;
  sad.frameDelay = 20;

  ground = new Ground(250, 590, 500, 20);
  rope = new Rope(6, {
    x:245, y:30
  });

  var fruitOptions = {
    density:0.001
  };

 fruit = Bodies.circle(300, 300, 15, fruitOptions);
 Matter.Composite.add(rope.body, fruit);

 fruitLink = new Link(rope, fruit);

 bunny = createSprite(420, 510, 100, 100);
 bunny.scale = 0.2;
 bunny.addAnimation("piscando", blink);
 bunny.addAnimation("comendo", eat);
 bunny.addAnimation("triste", sad);
 bunny.changeAnimation("piscando");

 //botão da tesoura
 button = createImg("./assets/cut_btn.png");
 button.position(220, 30);
 button.size(50, 50);
 button.mouseClicked(drop);

 ballon = createImg("./assets/balloon.png");
 ballon.position(10, 180);
 ballon.size(150, 100);
 ballon.mouseClicked(airBallon);

 mute = createImg("./assets/mute.png");
 mute.position(400, 10);
 mute.size(50, 50);
 mute.mouseClicked(muteBg);

  rectMode(CENTER);
  imageMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
}

function draw() 
{
  background(51);
  image(backgroundImg, width/2, height/2, 500, 600);
  Engine.update(engine);

  ground.display();
  rope.show();

  if(fruit !== null){
    image(fruitImg, fruit.position.x, fruit.position.y, 60, 60);
  }

  if(colisao(fruit, bunny)=== true){
    bunny.changeAnimation("comendo");
    eatSound.play();
    bgMusic.stop();
  }

  if(fruit !== null && fruit.position.y >= 550){
    bunny.changeAnimation("triste");
    sadSound.play();
    bgMusic.stop();
  }
   
  drawSprites();
}

function drop() {
  fruitLink.separar();
  fruitLink = null;
  rope.break();
  cutSound.play();
}

function colisao(corpo1, corpo2){
  if(corpo1 !== null){
    var distancia = dist(corpo1.position.x,corpo1.position.y,
       corpo2.position.x, corpo2.position.y);
       if(distancia <= 80){
        World.remove(world, fruit);
        fruit = null;
        return true;
       }
       else{
        return false;
       }
  }

}

function airBallon(){
  Matter.Body.applyForce(fruit, {x:0, y:0}, {x:0.01, y:0});
  airSound.play();
}

function muteBg(){
  if(bgMusic.isPlaying()){
    bgMusic.stop();
  }
  else{
    bgMusic.play()
  }
}
