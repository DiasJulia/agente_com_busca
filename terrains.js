class Terrain {
    constructor() {
        let T;
        this.matrix = new Array(BOARD_TILES);
        for (var i = 0; i < BOARD_TILES; i++) {
            this.matrix[i] = new Array(BOARD_TILES).fill(0);
            for (var j = 0; j < BOARD_TILES; j++) {
                //random entre os 4 tipos de terreno
                T = floor(Math.random() * 4);
                this.matrix[i][j] = T;
                //console.log(this.matrix);
                stroke(0);
                fill(cores[T]);
                rect(i * TILE_SIZE, j * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
        //console.log(this.matrix);
    }

    generateMap() {
        for (var i = 0; i < BOARD_TILES; i++) {
            for (var j = 0; j < BOARD_TILES; j++) {
                //random entre os 4 tipos de terreno
                stroke(0);
                strokeWeight(1);
                fill(cores[this.matrix[i][j]]);
                rect(i * TILE_SIZE, j * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
    }

    getMatrix() {
        return this.matrix;
    }
}