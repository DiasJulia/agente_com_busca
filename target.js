class Target {
    constructor(matrix) {
        let x = floor(Math.random() * BOARD_TILES);
        let y = floor(Math.random() * BOARD_TILES);
        while (matrix[x][y] == 3) {
            x = floor(Math.random() * BOARD_TILES);
            y = floor(Math.random() * BOARD_TILES);
        }
        this.food = createVector(TILE_SIZE / 2 + x * TILE_SIZE, TILE_SIZE / 2 + y * TILE_SIZE);
    }

    show() {
        stroke(0);
        strokeWeight(2);
        fill(255);
        circle(this.food.x, this.food.y, 16);
    }

    getFood() {
        return this.food;
    }
}