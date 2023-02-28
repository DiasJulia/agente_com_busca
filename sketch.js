const BOARD_TILES = 8;
const BOARD_SIZE = 400;
const TILE_SIZE = BOARD_SIZE / BOARD_TILES;
const cores = ['#bbf0e7', '#95e8da', '#0d917b', '#01382f'];

const delay = (milliseconds) => {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

function setup() {
    createCanvas(BOARD_SIZE, BOARD_SIZE);

    world = new World();
    world.update();
}

function draw() {
    //background(220);


}