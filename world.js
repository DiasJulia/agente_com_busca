class World {
    constructor() {
        this.matriz_terrenos = new Array(BOARD_TILES);
        for (var i = 0; i < BOARD_TILES; i++) {
            this.matriz_terrenos[i] = new Array(BOARD_TILES).fill(0);
        }

        let T = 4;
        //para cada um dos quadrados
        for (var i = 0; i < BOARD_TILES; i++) {
            for (var j = 0; j < BOARD_TILES; j++) {
                //random entre os 4 tipos de terreno
                T = floor(Math.random() * 4);
                this.matriz_terrenos[i][j] = T;

                stroke(0);
                fill(cores[T]);
                rect(j * TILE_SIZE, i * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }

        let x = floor(Math.random() * BOARD_TILES);
        let y = floor(Math.random() * BOARD_TILES);
        while (this.matriz_terrenos[y][x] == 3) {
            x = floor(Math.random() * BOARD_TILES);
            y = floor(Math.random() * BOARD_TILES);
        }
        this.food = createVector(TILE_SIZE / 2 + x * TILE_SIZE, TILE_SIZE / 2 + y * TILE_SIZE);

        x = floor(Math.random() * BOARD_TILES);
        y = floor(Math.random() * BOARD_TILES);
        while (this.matriz_terrenos[y][x] == 3) {
            x = floor(Math.random() * BOARD_TILES);
            y = floor(Math.random() * BOARD_TILES);
        }
        this.agent = new Vehicle(TILE_SIZE / 2 + x * TILE_SIZE, TILE_SIZE / 2 + y * TILE_SIZE);
    }

    getFood() {
        return this.food;
    }

    update() {
        stroke(0);
        fill(255);
        circle(this.food.x, this.food.y, 16);
        stroke(0);
        fill(168);
        this.agent.show();
        // this.agent.djikstraAux(this.matriz_terrenos);
        this.agent.update();
    }
}