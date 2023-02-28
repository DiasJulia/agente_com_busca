class Seeker {
    constructor(matrix, food, agent) {
        this.matrix = matrix;
        this.food = food;
        this.agent = agent;

        this.path = [];

        this.discreteX = (this.agent.pos.x - TILE_SIZE / 2) / TILE_SIZE;
        this.discreteY = (this.agent.pos.y - TILE_SIZE / 2) / TILE_SIZE;

        // Cria o array com os menores caminhos para cada ponto
        this.Dist = new Array(BOARD_TILES);
        for (var i = 0; i < BOARD_TILES; i++) {
            this.Dist[i] = new Array(BOARD_TILES).fill(Number.MAX_VALUE);
        }

        // Cria o array que indica caso aquele ponto já tenha sido visitado para cada ponto
        this.visited = new Array(BOARD_TILES);
        for (var i = 0; i < BOARD_TILES; i++) {
            this.visited[i] = new Array(BOARD_TILES).fill(false);
        }
    }

    resetDist() {
        this.Dist = new Array(BOARD_TILES);
        for (var i = 0; i < BOARD_TILES; i++) {
            this.Dist[i] = new Array(BOARD_TILES).fill(Number.MAX_VALUE);
        }
    }

    resetVisited() {
        this.visited = new Array(BOARD_TILES);
        for (let i = 0; i < BOARD_TILES; i++) {
            this.visited[i] = new Array(BOARD_TILES).fill(false);
        }
    }

    markTile(i, j, value) {
        console.log("aaa", i, j);
        this.visited[i][j] = value;
        stroke(0);
        strokeWeight(1);
        fill(50);
        rect(i * TILE_SIZE, j * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        this.agent.show();
    }

    markTileAsFringe(i, j) {
        if (!this.visited[i][j]) {
            stroke('red');
            strokeWeight(1);
            fill(cores[this.matrix[i][j]]);
            rect(i * TILE_SIZE, j * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            stroke(0);
            fill(255);
            circle(this.food.x, this.food.y, 16);
            this.agent.show();
        }
    }

    async depthFirstSearch() {
        let stack = [];
        let start = [this.discreteX, this.discreteY];
        stack.push(start);

        while (stack.length > 0) {
            let current = stack[stack.length - 1];
            let x = current[0];
            let y = current[1];

            await delay(100);
            this.markTile(x, y, true);

            if ((this.food.x == TILE_SIZE / 2 + x * TILE_SIZE) && (this.food.y == TILE_SIZE / 2 + y * TILE_SIZE)) {
                break;
            }
            let flag = false;
            for (let i = -1; i <= 1 && !flag; i++) {
                for (let j = -1; j <= 1 && !flag; j++) {
                    if ((i == 0 && j == 0) || (Math.abs(i) == 1 && Math.abs(j) == 1)) {
                        continue;
                    }
                    let neighborX = x + i;
                    let neighborY = y + j;

                    if (neighborX < 0 || neighborX >= BOARD_TILES || neighborY < 0 || neighborY >= BOARD_TILES) {
                        continue;
                    }
                    if (this.matrix[neighborX][neighborY] == 3) {
                        continue;
                    }

                    if (!this.visited[neighborX][neighborY]) {
                        let neighbor = [neighborX, neighborY];
                        this.markTileAsFringe(neighborX, neighborY);
                        stack.push(neighbor);
                        flag = true;
                    }
                }
            }
            if (!flag) stack.pop();
        }

        this.path = stack;

        return stack;
    }

    minDistance(dist, visited) {
        let min = Number.MAX_VALUE;
        let indexX = -1;
        let indexY = -1;
        //Testar a menor distância entre os adjacentes
        for (let v = 0; v < BOARD_TILES; v++) {
            for (let u = 0; u < BOARD_TILES; u++) {
                if (visited[v][u] == false && dist[v][u] < min && this.matrix[v][u] != 3) {
                    min = dist[v][u];
                    indexX = v;
                    indexY = u;
                }
            }
        }
        return [indexX, indexY];
    }

    async BreadthFirstSearch() {
        let pq = [];

        //Origem para o ponto
        let origin = new Array(BOARD_TILES);
        for (var i = 0; i < BOARD_TILES; i++) {
            origin[i] = new Array(BOARD_TILES).fill(0);
            for (var j = 0; j < BOARD_TILES; j++) {
                origin[i][j] = Number.MAX_VALUE;
            }
        }

        pq.push([0, this.discreteX, this.discreteY]);
        this.Dist[this.discreteX][this.discreteY] = 0;
        origin[this.discreteX][this.discreteY] = [-1, -1];

        await delay(100);
        this.markTile(this.discreteX, this.discreteY, false);

        while (pq.length > 0) {

            pq.shift();

            let index = this.minDistance(this.Dist, this.visited);
            if (index[0] == -1) {
                alert("Sem saída!");
                this.path = [];
                return [];
            }

            await delay(200);
            this.markTile(index[0], index[1], true);

            if ((this.food.x == TILE_SIZE / 2 + index[0] * TILE_SIZE) && (this.food.y == TILE_SIZE / 2 + index[1] * TILE_SIZE)) {
                console.log("Achei: ", index);
                this.found = index;
                break;
            }

            //Opção que anda na diagonal
            let x = index[0];
            let y = index[1];
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    //Opção sem andar na diagonal
                    if (Math.abs(i) == 1 && Math.abs(j) == 1) { continue; }
                    if (i + x > -1 && i + x < BOARD_TILES && j + y > -1 && j + y < BOARD_TILES) {
                        if (1 < this.Dist[x + i][y + j]) { //Confere se não está na fronteira
                            delay(100);
                            this.markTileAsFringe(x + i, y + j);
                            this.Dist[x + i][y + j] = 1; //Marca como explorável, mas sem definir distância
                            origin[x + i][y + j] = [x, y];
                            pq.push([this.Dist[x + i][y + j],
                                [x + i],
                                [y + j]
                            ]);
                            pq.sort((a, b) => {
                                if (a[0] == b[0]) return a[1] - b[1];
                                return a[0] - b[0];
                            });
                            console.log(this.Dist);
                        }
                    }
                }
            }
        }

        let point = this.found;

        while (point[0] != -1) {
            this.path.push(point);
            point = origin[point[0]][point[1]];
        }

        return this.path.reverse();
    }


    async djikstraSearch() {
        let pq = [];

        //Origem para o ponto
        let origin = new Array(BOARD_TILES);
        for (var i = 0; i < BOARD_TILES; i++) {
            origin[i] = new Array(BOARD_TILES).fill(0);
            for (var j = 0; j < BOARD_TILES; j++) {
                origin[i][j] = Number.MAX_VALUE;
            }
        }

        pq.push([0, this.discreteX, this.discreteY]);
        this.Dist[this.discreteX][this.discreteY] = 0;
        origin[this.discreteX][this.discreteY] = [-1, -1];

        await delay(100);
        this.markTile(this.discreteX, this.discreteY, false);

        while (pq.length > 0) {

            pq.shift();

            let index = this.minDistance(this.Dist, this.visited);
            if (index[0] == -1) {
                alert("Sem saída!");
                this.path = [];
                return [];
            }

            await delay(200);
            this.markTile(index[0], index[1], true);

            if ((this.food.x == TILE_SIZE / 2 + index[0] * TILE_SIZE) && (this.food.y == TILE_SIZE / 2 + index[1] * TILE_SIZE)) {
                console.log("Achei: ", index);
                this.found = index;
                break;
            }

            //Opção que anda na diagonal
            let x = index[0];
            let y = index[1];
            let Terreno;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    //Opção sem andar na diagonal
                    if (Math.abs(i) == 1 && Math.abs(j) == 1) { continue; }
                    if (i + x > -1 && i + x < BOARD_TILES && j + y > -1 && j + y < BOARD_TILES) {
                        delay(100);
                        this.markTileAsFringe(x + i, y + j);
                        Terreno = this.matrix[x + i][y + j] * 3;
                        if (Terreno + this.Dist[x][y] < this.Dist[x + i][y + j]) {
                            this.Dist[x + i][y + j] = Terreno + this.Dist[x][y];
                            origin[x + i][y + j] = [x, y];
                            pq.push([this.Dist[x + i][y + j],
                                [x + i],
                                [y + j]
                            ]);
                            pq.sort((a, b) => {
                                if (a[0] == b[0]) return a[1] - b[1];
                                return a[0] - b[0];
                            });
                        }
                    }
                }
            }
        }

        let point = this.found;

        while (point[0] != -1) {
            this.path.push(point);
            point = origin[point[0]][point[1]];
        }

        return this.path.reverse();
    }

    heuristic(a, b) {
        return abs(a[0] - b[0]) + abs(a[1] - b[1])
    }

    async GreedySearch() {
        let pq = [];

        //Origem para o ponto
        let origin = new Array(BOARD_TILES);
        for (var i = 0; i < BOARD_TILES; i++) {
            origin[i] = new Array(BOARD_TILES).fill(0);
            for (var j = 0; j < BOARD_TILES; j++) {
                origin[i][j] = Number.MAX_VALUE;
            }
        }

        pq.push([0, this.discreteX, this.discreteY]);
        this.Dist[this.discreteX][this.discreteY] = 0;
        origin[this.discreteX][this.discreteY] = [-1, -1];

        await delay(100);
        this.markTile(this.discreteX, this.discreteY, false);

        while (pq.length > 0) {

            pq.shift();

            let index = this.minDistance(this.Dist, this.visited);
            if (index[0] == -1) {
                alert("Sem saída!");
                this.path = [];
                return [];
            }

            await delay(200);
            this.markTile(index[0], index[1], true);

            let posX = TILE_SIZE / 2 + index[0] * TILE_SIZE;
            let posY = TILE_SIZE / 2 + index[1] * TILE_SIZE;

            if ((this.food.x == TILE_SIZE / 2 + index[0] * TILE_SIZE) && (this.food.y == TILE_SIZE / 2 + index[1] * TILE_SIZE)) {
                console.log("Achei: ", index);
                this.found = index;
                break;
            }

            //Opção que anda na diagonal
            let x = index[0];
            let y = index[1];
            let Terreno;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    //Opção sem andar na diagonal
                    if (i == 0 && j == 0) continue;
                    if (Math.abs(i) == 1 && Math.abs(j) == 1) { continue; }
                    if (i + x > -1 && i + x < BOARD_TILES && j + y > -1 && j + y < BOARD_TILES) {
                        delay(100);
                        this.markTileAsFringe(x + i, y + j);
                        Terreno = this.heuristic([this.food.x, this.food.y], [posX, posY]);
                        if (Terreno < this.Dist[x + i][y + j] && !this.visited[x + i][y + j]) {
                            this.Dist[x + i][y + j] = Terreno;
                            origin[x + i][y + j] = [x, y];
                            pq.push([this.Dist[x + i][y + j],
                                [x + i],
                                [y + j]
                            ]);
                            pq.sort((a, b) => {
                                if (a[0] == b[0]) return a[1] - b[1];
                                return a[0] - b[0];
                            });
                        }
                    }
                }
            }
        }
        let point = this.found;
        console.log(point);
        await delay(100);
        while (point[0] != -1) {
            this.path.push(point);
            console.log(origin)
            point = origin[point[0]][point[1]];
            console.log(point);
        }
        return this.path.reverse();
    }

    async AStarSearch() {
        let pq = [];

        //Origem para o ponto
        let origin = new Array(BOARD_TILES);
        for (var i = 0; i < BOARD_TILES; i++) {
            origin[i] = new Array(BOARD_TILES).fill(0);
            for (var j = 0; j < BOARD_TILES; j++) {
                origin[i][j] = Number.MAX_VALUE;
            }
        }

        pq.push([0, this.discreteX, this.discreteY]);
        this.Dist[this.discreteX][this.discreteY] = 0;
        origin[this.discreteX][this.discreteY] = [-1, -1];

        await delay(100);
        this.markTile(this.discreteX, this.discreteY, false);

        while (pq.length > 0) {

            pq.shift();

            let index = this.minDistance(this.Dist, this.visited);
            if (index[0] == -1) {
                alert("Sem saída!");
                this.path = [];
                return [];
            }

            await delay(200);
            this.markTile(index[0], index[1], true);

            let posX = TILE_SIZE / 2 + index[0] * TILE_SIZE;
            let posY = TILE_SIZE / 2 + index[1] * TILE_SIZE;

            if ((this.food.x == TILE_SIZE / 2 + index[0] * TILE_SIZE) && (this.food.y == TILE_SIZE / 2 + index[1] * TILE_SIZE)) {
                console.log("Achei: ", index);
                this.found = index;
                break;
            }

            //Opção que anda na diagonal
            let x = index[0];
            let y = index[1];
            let Terreno;
            let cost;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    //Opção sem andar na diagonal
                    if (Math.abs(i) == 1 && Math.abs(j) == 1) { continue; }
                    if (i + x > -1 && i + x < BOARD_TILES && j + y > -1 && j + y < BOARD_TILES) {
                        delay(100);
                        this.markTileAsFringe(x + i, y + j);
                        Terreno = this.matrix[x + i][y + j] * 3;
                        cost = this.heuristic([this.food.x, this.food.y], [posX, posY]);
                        if (Terreno + cost + this.Dist[x][y] < this.Dist[x + i][y + j]) {
                            this.Dist[x + i][y + j] = Terreno + cost + this.Dist[x][y];
                            origin[x + i][y + j] = [x, y];
                            pq.push([this.Dist[x + i][y + j],
                                [x + i],
                                [y + j]
                            ]);
                            pq.sort((a, b) => {
                                if (a[0] == b[0]) return a[1] - b[1];
                                return a[0] - b[0];
                            });
                        }
                    }
                }
            }
        }

        let point = this.found;

        while (point[0] != -1) {
            this.path.push(point);
            point = origin[point[0]][point[1]];
        }

        return this.path.reverse();
    }

}