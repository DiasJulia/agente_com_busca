var screen=0;
var choice=0;

const BOARD_TILES = 8;
const BOARD_SIZE = 400;
const TILE_SIZE = BOARD_SIZE / BOARD_TILES;
const cores = ['#bbf0e7', '#95e8da', '#0d917b', '#01382f'];

const delay = (milliseconds) => {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}


var img_menu;
var img_guide;
var img_credit;
var fontChango;

var x = 125
var y = 100
var l = 150
var h = 30
var arr = 15

function preload(){
img_play   = loadImage("imgs/3.jpg")
img_menu   = loadImage("imgs/4.jpg")
img_guide  = loadImage("imgs/5.png")
img_credit = loadImage("imgs/1.jpg")
fontChango = loadFont("font/Chango-Regular.ttf")
}

function setup() {
  createCanvas(BOARD_SIZE, BOARD_SIZE);
  world = new World();
  hasRun = false;
}

function draw() {
  if(screen!=4)background(img_menu)
  //inicializando a screen principal
  if(screen==0){
    menu();
  }
  //inicializando a screen 1
  if(screen==1){
    PlayGame();
  }
  if(screen==2){
    Guide();
  }
  if(screen==3){
    Credits();
  }
  if(screen == 4 && hasRun == false){
    hasRun = true;
    world.update();
  }
}