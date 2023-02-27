const BOARD_TILES = 8;
const BOARD_SIZE = 400;
const TILE_SIZE = BOARD_SIZE / BOARD_TILES;
const cores = ['#bbf0e7', '#95e8da', '#0d917b', '#01382f'];

function setup() {
    createCanvas(BOARD_SIZE, BOARD_SIZE);

    world = new World();
    // Configura o algoritmo com as informações do mundo
    if(true) // Controle
        alg = new starAlg(
            start = [
                Math.floor(world.agent.pos.x/TILE_SIZE), 
                Math.floor(world.agent.pos.y/TILE_SIZE)
            ], 
            fields = world.matriz_terrenos, 
            goal = [
                Math.floor(world.getFood().x/TILE_SIZE),
                Math.floor(world.getFood().y/TILE_SIZE)
            ]
        )
        
}

let endOfSearch = false
setInterval(function draw() {
    while(!endOfSearch)
        endOfSearch = alg.update()   
        
    // 
    world.update();
}, 1000)