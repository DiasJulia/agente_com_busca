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
    }

    generateMap() {
        for (var i = 0; i < BOARD_TILES; i++) {
            for (var j = 0; j < BOARD_TILES; j++) {
                //random entre os 4 tipos de terreno
                stroke(0);
                strokeWeight(1);
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

        this.djikstraPath();
        // this.depthFirstSearch();
        this.agent.update();
    }

    delay(milliseconds) {
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }

    minDistance(dist, visited) {
        let min = Number.MAX_VALUE;
        let indexX = -1;
        let indexY = -1;
        console.log(dist);
        console.log("Terrenos: ", this.matriz_terrenos);
        //Testar a menor distância entre os adjacentes
        for (let v = 0; v < BOARD_TILES; v++) {
            for (let u = 0; u < BOARD_TILES; u++) {
                if (visited[v][u] == false && dist[v][u] < min && this.matriz_terrenos[v][u] != 3) {
                    console.log("checando: ", v, u, ": ", this.matriz_terrenos[v][u]);
                    min = dist[v][u];
                    indexX = v;
                    indexY = u;
                }
            }
        }
        console.log(indexX, indexY);
        return [indexX, indexY];
    }

    async djikstraAux() {

        //Origem para o ponto
        let origin = new Array(BOARD_TILES);
        for (var i = 0; i < BOARD_TILES; i++) {
            origin[i] = new Array(BOARD_TILES).fill(0);
            for (var j = 0; j < BOARD_TILES; j++) {
                origin[i][j] = Number.MAX_VALUE;
            }
        }

        let D = new Array(BOARD_TILES);
        for (var i = 0; i < BOARD_TILES; i++) {
            D[i] = new Array(BOARD_TILES).fill(0);
            for (var j = 0; j < BOARD_TILES; j++) {
                D[i][j] = Number.MAX_VALUE;
            }
        }

        let visited = new Array(BOARD_TILES);
        for (var i = 0; i < BOARD_TILES; i++) {
            visited[i] = new Array(BOARD_TILES).fill(0);
            for (var j = 0; j < BOARD_TILES; j++) {
                visited[i][j] = false;
            }
        }

        let discreteX = (this.agent.pos.x - TILE_SIZE / 2) / TILE_SIZE;
        let discreteY = (this.agent.pos.y - TILE_SIZE / 2) / TILE_SIZE;

        D[discreteX][discreteY] = 0;

        stroke(0);
        strokeWeight(1);
        fill(50);
        rect(discreteX * TILE_SIZE, discreteY * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        this.agent.show();
        for (var i = 0; i < BOARD_TILES * BOARD_TILES; i++) {

            await this.delay(1000);
            let index = this.minDistance(D, visited);

            // Marca visualmente o ponto já visitado pelo algoritmo
            visited[index[0]][index[1]] = true;
            stroke(0);
            strokeWeight(1);
            fill(50);
            rect(index[0] * TILE_SIZE, index[1] * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            this.agent.show();

            if ((this.food.x == TILE_SIZE / 2 + index[0] * TILE_SIZE) && (this.food.y == TILE_SIZE / 2 + index[1] * TILE_SIZE)) {
                console.log("Achei: ", index);
                break;
            }

            let Terreno;
            //atualizar a distância dos vértices adjacentes ( [x+1,y], [x,y+1], [x-1,y], [x,y-1]) com o valor do terreno atual
            if (index[0] < BOARD_TILES - 1) {
                Terreno = this.matriz_terrenos[index[0] + 1][index[1]] * 5;
                if (Terreno + D[index[0]][index[1]] < D[index[0] + 1][index[1]]) {
                    D[index[0] + 1][index[1]] = Terreno + 1 + D[index[0]][index[1]];
                    origin[index[0] + 1][index[1]] = [index[0], index[1]];
                }
            }
            if (index[1] < BOARD_TILES - 1) {
                Terreno = this.matriz_terrenos[index[0]][index[1] + 1] * 5;
                if (Terreno + D[index[0]][index[1]] < D[index[0]][index[1] + 1]) {
                    D[index[0]][index[1] + 1] = Terreno + 1 + D[index[0]][index[1]];
                    origin[index[0]][index[1] + 1] = [index[0], index[1]];
                }
            }
            if (index[0] > 0) {
                Terreno = this.matriz_terrenos[index[0] - 1][index[1]] * 5;
                if (Terreno + D[index[0]][index[1]] < D[index[0] - 1][index[1]]) {
                    D[index[0] - 1][index[1]] = Terreno + 1 + D[index[0]][index[1]];
                    origin[index[0] - 1][index[1]] = [index[0], index[1]];
                }
            }
            if (index[1] > 0) {
                Terreno = this.matriz_terrenos[index[0]][index[1] - 1] * 5;
                if (Terreno + D[index[0]][index[1]] < D[index[0]][index[1] - 1]) {
                    D[index[0]][index[1] - 1] = Terreno + 1 + D[index[0]][index[1]];
                    origin[index[0]][index[1] - 1] = [index[0], index[1]];
                }
            }
        }
    }

    async djikstraPath() {
        let pq = [];

        //Origem para o ponto
        let origin = new Array(BOARD_TILES);
        for (var i = 0; i < BOARD_TILES; i++) {
            origin[i] = new Array(BOARD_TILES).fill(0);
            for (var j = 0; j < BOARD_TILES; j++) {
                origin[i][j] = Number.MAX_VALUE;
            }
        }

        // Cria o array com os menores caminhos para cada ponto
        let D = new Array(BOARD_TILES);
        for (var i = 0; i < BOARD_TILES; i++) {
            D[i] = new Array(BOARD_TILES).fill(0);
            for (var j = 0; j < BOARD_TILES; j++) {
                D[i][j] = Number.MAX_VALUE;
            }
        }

        // Cria o array que indica caso aquele ponto já tenha sido visitado para cada ponto
        let visited = new Array(BOARD_TILES);
        for (var i = 0; i < BOARD_TILES; i++) {
            visited[i] = new Array(BOARD_TILES).fill(0);
            for (var j = 0; j < BOARD_TILES; j++) {
                visited[i][j] = false;
            }
        }

        // Pega a posição discreta do agente
        let discreteX = (this.agent.pos.x - TILE_SIZE / 2) / TILE_SIZE;
        let discreteY = (this.agent.pos.y - TILE_SIZE / 2) / TILE_SIZE;

        pq.push([0, discreteX, discreteY]);
        D[discreteX][discreteY] = 0;
        origin[discreteX][discreteY] = [-1, -1];

        stroke(0);
        strokeWeight(1);
        fill(50);
        rect(discreteX * TILE_SIZE, discreteY * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        this.agent.show();

        while (pq.length > 0) {
            pq.shift();

            await this.delay(100);
            let index = this.minDistance(D, visited);

            visited[index[0]][index[1]] = true;
            stroke(0);
            strokeWeight(1);
            fill(50);
            rect(index[0] * TILE_SIZE, index[1] * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            this.agent.show();

            if ((this.food.x == TILE_SIZE / 2 + index[0] * TILE_SIZE) && (this.food.y == TILE_SIZE / 2 + index[1] * TILE_SIZE)) {
                console.log("Achei: ", index);
                this.found = index;
                break;
            }

            let Terreno = this.matriz_terrenos[index[0]][index[1]] * 5;
            //atualizar a distância dos vértices adjacentes ( [x+1,y], [x,y+1], [x-1,y], [x,y-1]) com o valor do terreno atual
            if (index[0] < BOARD_TILES - 1) {
                Terreno = this.matriz_terrenos[index[0] + 1][index[1]] * 5;
                if (Terreno + D[index[0]][index[1]] < D[index[0] + 1][index[1]]) {
                    D[index[0] + 1][index[1]] = Terreno + 1 + D[index[0]][index[1]];
                    origin[index[0] + 1][index[1]] = [index[0], index[1]];
                    pq.push([D[index[0] + 1][index[1]],
                    [index[0] + 1],
                    [index[1]]
                    ]);
                    pq.sort((a, b) => {
                        if (a[0] == b[0]) return a[1] - b[1];
                        return a[0] - b[0];
                    });
                }
            }
            if (index[1] < BOARD_TILES - 1) {
                Terreno = this.matriz_terrenos[index[0]][index[1] + 1] * 5;
                if (Terreno + D[index[0]][index[1]] < D[index[0]][index[1] + 1]) {
                    D[index[0]][index[1] + 1] = Terreno + 1 + D[index[0]][index[1]];
                    origin[index[0]][index[1] + 1] = [index[0], index[1]];
                    pq.push([D[index[0]][index[1] + 1],
                    [index[0]],
                    [index[1] + 1]
                    ]);
                    pq.sort((a, b) => {
                        if (a[0] == b[0]) return a[1] - b[1];
                        return a[0] - b[0];
                    });
                }
            }
            if (index[0] > 0) {
                Terreno = this.matriz_terrenos[index[0] - 1][index[1]] * 5;
                if (Terreno + D[index[0]][index[1]] < D[index[0] - 1][index[1]]) {
                    D[index[0] - 1][index[1]] = Terreno + 1 + D[index[0]][index[1]];
                    origin[index[0] - 1][index[1]] = [index[0], index[1]];
                    pq.push([D[index[0] - 1][index[1]],
                    [index[0] - 1],
                    [index[1]]
                    ]);
                    pq.sort((a, b) => {
                        if (a[0] == b[0]) return a[1] - b[1];
                        return a[0] - b[0];
                    });
                }
            }
            if (index[1] > 0) {
                Terreno = this.matriz_terrenos[index[0]][index[1] - 1] * 5;
                if (Terreno + D[index[0]][index[1]] < D[index[0]][index[1] - 1]) {
                    D[index[0]][index[1] - 1] = Terreno + 1 + D[index[0]][index[1]];
                    origin[index[0]][index[1] - 1] = [index[0], index[1]];
                    pq.push([D[index[0]][index[1] - 1],
                    [index[0]],
                    [index[1] - 1]
                    ]);
                    pq.sort((a, b) => {
                        if (a[0] == b[0]) return a[1] - b[1];
                        return a[0] - b[0];
                    });
                }
            }
        }

        console.log("Achei ele, a posição é: ", this.found);
        let point = this.found;
        console.log("O caminho é: ");
        while (point[0] != -1) {
            console.log(point);
            this.agent.path.push(point);
            point = origin[point[0]][point[1]];
        }
        background(220);
        stroke(0);
        strokeWeight(1);
        this.generateMap();
        await this.delay(500);
        for (let index of this.agent.path) {
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

    async depthFirstSearch() {
        let origin = new Array(BOARD_TILES);
        for (let i = 0; i < BOARD_TILES; i++) {
            origin[i] = new Array(BOARD_TILES).fill(0);
        }

        let visited = new Array(BOARD_TILES);
        for (let i = 0; i < BOARD_TILES; i++) {
            visited[i] = new Array(BOARD_TILES).fill(false);
        }
        let discreteXX = (this.agent.pos.x - TILE_SIZE / 2) / TILE_SIZE;
        let discreteYY = (this.agent.pos.y - TILE_SIZE / 2) / TILE_SIZE;
        let stack = [];
        let start = [discreteXX, discreteYY];
        stack.push(start);

        while (stack.length > 0) {
            let current = stack[stack.length - 1];
            let x = current[0];
            let y = current[1];
            visited[x][y] = true;
            await this.delay(200);
            stroke(0);
            strokeWeight(1);
            fill(50);
            rect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            this.agent.show();
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
                    if (this.matriz_terrenos[neighborX][neighborY] == 3) {
                        continue;
                    }

                    if (!visited[neighborX][neighborY]) {
                        let neighbor = [neighborX, neighborY];
                        stack.push(neighbor);
                        flag = true;
                    }
                }
            }
            if (!flag)stack.pop();
        }
        this.generateMap()
        for (let index of stack) {
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
    }
}