class World {
    constructor() {
        let T = 4;
        //para cada um dos quadrados
        this.matriz_terrenos = new Array(BOARD_TILES);
        for (var i = 0; i < BOARD_TILES; i++) {
            this.matriz_terrenos[i] = new Array(BOARD_TILES).fill(0);
            for (var j = 0; j < BOARD_TILES; j++) {
                //random entre os 4 tipos de terreno
                T = floor(Math.random() * 4);
                this.matriz_terrenos[i][j] = T;
                console.log(this.matriz_terrenos);
                stroke(0);
                fill(cores[T]);
                rect(i * TILE_SIZE, j * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
        console.log(this.matriz_terrenos);

        let x = floor(Math.random() * BOARD_TILES);
        let y = floor(Math.random() * BOARD_TILES);
        while (this.matriz_terrenos[x][y] == 3) {
            x = floor(Math.random() * BOARD_TILES);
            y = floor(Math.random() * BOARD_TILES);
        }
        this.food = createVector(TILE_SIZE / 2 + x * TILE_SIZE, TILE_SIZE / 2 + y * TILE_SIZE);

        x = floor(Math.random() * BOARD_TILES);
        y = floor(Math.random() * BOARD_TILES);
        while (this.matriz_terrenos[x][y] == 3) {
            x = floor(Math.random() * BOARD_TILES);
            y = floor(Math.random() * BOARD_TILES);
        }
        this.agent = new Vehicle(TILE_SIZE / 2 + x * TILE_SIZE, TILE_SIZE / 2 + y * TILE_SIZE);

        this.seeker = new Seeker(this.matriz_terrenos, this.food, this.agent);
    }

    async update() {
        stroke(0);
        fill(255);
        circle(this.food.x, this.food.y, 16);
        stroke(0);
        fill(168);
        this.agent.show();

        await this.seeker.depthFirstSearch();

        await this.showSolution(this.seeker.path);

    }

    generateMap() {
        for (var i = 0; i < BOARD_TILES; i++) {
            for (var j = 0; j < BOARD_TILES; j++) {
                //random entre os 4 tipos de terreno
                stroke(0);
                fill(cores[this.matriz_terrenos[i][j]]);
                rect(i * TILE_SIZE, j * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
        stroke(0);
        fill(255);
        circle(this.food.x, this.food.y, 16);
        stroke(0);
        fill(168);
        this.agent.show();
    }

    async showSolution(solution) {
        console.log(solution);
        background(220);
        stroke(0);
        strokeWeight(1);
        this.generateMap();

        for (let index of solution) {
            await delay(100);
            stroke(0);
            strokeWeight(3);
            fill(cores[this.matriz_terrenos[index[0]][index[1]]])
            rect(index[0] * TILE_SIZE, index[1] * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            this.agent.show();
        }
        stroke(0);
        strokeWeight(2);
        fill(255);

        circle(this.food.x, this.food.y, 16);

        console.log(origin);
    }
}