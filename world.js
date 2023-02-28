class World {
    constructor() {
        this.terrain = new Terrain();
        this.matriz_terrenos = this.terrain.getMatrix();

        this.target = new Target(this.matriz_terrenos);
        this.food = this.target.getFood();

        let x = floor(Math.random() * BOARD_TILES);
        let y = floor(Math.random() * BOARD_TILES);
        while (this.matriz_terrenos[x][y] == 3) {
            x = floor(Math.random() * BOARD_TILES);
            y = floor(Math.random() * BOARD_TILES);
        }

        this.initialAgentX = TILE_SIZE / 2 + x * TILE_SIZE;
        this.initialAgentY = TILE_SIZE / 2 + y * TILE_SIZE;
        this.agent = new Vehicle(this.initialAgentX, this.initialAgentY);

        this.seeker = new Seeker(this.matriz_terrenos, this.food, this.agent);
    }

    async update() {
        this.terrain.generateMap();
        this.agent = new Vehicle(this.initialAgentX, this.initialAgentY);
        this.seeker = new Seeker(this.matriz_terrenos, this.food, this.agent);
        this.target.show();

        this.agent.reset();
        this.agent.show();

        this.seeker.resetVisited();
        this.seeker.resetDist();
        switch (algorithm_chosen) {
            case 'a_star':
                await this.seeker.AStarSearch();
                break;
            case 'prim':
                await this.seeker.GreedySearch();
                break;
            case 'djikstra':
                await this.seeker.djikstraSearch();
                break;
            case 'bfs':
                await this.seeker.BreadthFirstSearch();
                break;
            case 'dfs':
                await this.seeker.depthFirstSearch();
                break;
            default:
                break;
        }
        console.log(this.seeker.path.length)
        if (this.seeker.path.length != 0 || (this.agent.pos.x == this.target.food.x && this.agent.pos.y == this.target.food.y)) {
            await this.showSolution(this.seeker.path);

            await delay(1000);
            await this.createPath(this.seeker.path);
            await delay(1000);

            alert("Sucesso");
        } else {
            alert("Não deu");
        }
        //screen = 0;
    }

    async createPath(pathArray) {
        for (let index of pathArray) {
            stroke(0);
            strokeWeight(1);
            fill(cores[this.matriz_terrenos[index[0]][index[1]]])
            rect(index[0] * TILE_SIZE, index[1] * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            const dir = createVector(index[0] * TILE_SIZE + TILE_SIZE / 2, index[1] * TILE_SIZE + TILE_SIZE / 2);

            while (this.agent.pos.x != index[0] * TILE_SIZE + TILE_SIZE / 2 || this.agent.pos.y != index[1] * TILE_SIZE + TILE_SIZE / 2) {
                if (this.terrain.matrix[index[0]][index[1]] == 0) {
                    this.agent.seek(dir, 2);
                }
                if (this.terrain.matrix[index[0]][index[1]] == 1) {
                    this.agent.seek(dir, 1);
                }
                if (this.terrain.matrix[index[0]][index[1]] == 2) {
                    this.agent.seek(dir, 0.5);
                }
                this.agent.update();

                this.terrain.generateMap();

                this.target.show();
                this.agent.show();
                await delay(5);
            }
        }
        alert("Agent has collected the food!");
    }

    async showSolution(solution) {
        console.log(solution);
        this.terrain.generateMap();

        for (let index of solution) {
            await delay(100);
            stroke(0);
            strokeWeight(3);
            fill(cores[this.matriz_terrenos[index[0]][index[1]]])
            rect(index[0] * TILE_SIZE, index[1] * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            this.agent.show();
            this.target.show();
        }
    }
}