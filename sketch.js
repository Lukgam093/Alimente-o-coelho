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

var backgroundImg, fruitImg, rabbitImg;

var fruitLink;

function preload() {
  backgroundImg = loadImage("./assets/background.png");
  fruitImg = loadImage("./assets/melon.png");
  rabbitImg = loadImage("./assets/blink_1.png");
}

function setup() 
{
  createCanvas(500,600);
  engine = Engine.create();
  world = engine.world;

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

 bunny = createSprite(250, 510, 100, 100);
 bunny.addImage(rabbitImg);
 bunny.scale = 0.2;

 //botão da tesoura
 button = createImg("./assets/cut_btn.png");
 button.position(220, 30);
 button.size(50, 50);
 button.mouseClicked(drop);

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

  image(fruitImg, fruit.position.x, fruit.position.y, 60, 60);
   
  drawSprites();
}

function drop() {
  fruitLink.separar();
  fruitLink = null;
  rope.break();
}



