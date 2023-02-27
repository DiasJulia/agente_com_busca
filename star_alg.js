class starAlg{
    constructor(start, fields, goal){
        // Gera o grafo para navegação do algoritmo a partir da matriz de terrenos (fields)
        this.graph = []
        for (let i = 0; i < fields.length; i++) {
            this.graph[i]=[]
            for (let j =0; j<fields[i].length; j++){
                let neighbors = []
                // Checa se os vizinhos em cada direção estrapolam as bordas ou se são paredes, 
                // caso contrário são adicionados ao grafo
                // Vizinho de cima
                if (i > 0 && fields[i-1][j] < cores.length-1)
                    neighbors.push([i-1, j, fields[i-1][j]])
                // Vizinho da esquerda
                if (j > 0 && fields[i][j-1] < cores.length-1)
                    neighbors.push([i, j-1, fields[i][j-1]])
                // Vizinho de baixo
                if (i < BOARD_TILES-1 && fields[i+1][j] < cores.length-1)
                    neighbors.push([i+1, j, fields[i+1][j]])
                // Vizinho da direita
                if (j < BOARD_TILES-1 && fields[i][j+1] < cores.length-1)
                    neighbors.push([i, j+1, fields[i][j+1]])
                this.graph[i][j] = neighbors
            }
        }
        // this.graph.forEach((line, index)=>{
        //     console.log(`line: ${index}:`)
        //     line.forEach((element, jindex)=>{
        //         console.log(`col ${jindex}: ${JSON.stringify(element)}`)
        //     })
        // })
        this.fields = fields
        this.path = []
        this.iteration = 0
        this.goal = goal 
        let x = start[1]
        let y = start[0]                                            // Objetivo: [x_position, y_position]
        this.frontier = [[[x, y, fields[x][y]], 0]]                     // Fila de vizinhos: [[graph_node, priority]] = [[[x_position, y_position, ground_cost], priority]]
        this.reached = [[[x, y, fields[x][y]], 0]]                      // Fila de vizinhos: [[graph_node, priority]] = [[[x_position, y_position, ground_cost], priority]]
        this.came_from = Array(BOARD_TILES).fill(Array(BOARD_TILES))    // Migalhas de pão:{x_position: y_position: [x_before_position, y_before_position]} 
        this.came_from[x][y] = null
        this.cost_so_far = Array(BOARD_TILES).fill(Array(BOARD_TILES))  // Custo até o nó: {x_position: y_position: ground_cost}
        this.cost_so_far[x][y] = null

        // Loga a fronteira e os nós alcaçados
        console.log("\n-----------------------//-----------------------")
        // console.log("Iteração:", 0)
        // console.log("goal:", this.goal)
        // console.log("frontier:", this.frontier)
        // console.log("reached:", this. reached)
    }

    // Compara dois Arrays
    equalsCheck(a, b){
        return a.length === b.length && a.every((v, i) => v === b[i])
    }
    // Calcula distância entre o nó e o objetivo
    distanceToGoal (node){
        return Math.floor(Math.sqrt(Math.pow(node[0]-this.goal[0], 2)+Math.pow(node[1]-this.goal[1], 2)))
    }
    // Exibe o avaço do algoritmo
    showOff(){
        for(let i = 0; i < BOARD_TILES; i++){
            for(let j = 0; j < BOARD_TILES; j++){
                stroke(0)
                fill(cores[this.fields[i][j]])
                for(let k = 0; k < this.reached.length; k++){
                    if(this.reached[k][0][0]==i && this.reached[k][0][1]==j)
                        fill("#FFA07A")
                }
                for(let k = 0; k < this.frontier.length; k++)
                    if(this.frontier[k][0][0]==i && this.frontier[k][0][1]==j)
                        fill("#FF7F50")
                for(let k = 0; k < this.path.length; k++)
                    if(this.path[k][0][0]==i && this.path[k][0][1]==j)
                        fill("#FF6347")
                rect(j * TILE_SIZE, i * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
    }
    // Realiza uma iteração na busca, atualizando a fronteira e os nós alcançados
    update(){
        if(this.frontier.length > 0){
            // Sequestra o topo da pilha da fronteira e desestrutura a informação
            console.log("frontier before:", JSON.stringify(this.frontier))
            let actual = this.frontier.shift()
            console.log("frontier after:", JSON.stringify(this.frontier))
            let [[actual_x, actual_y, actual_ground_cost], actual_priority] = actual
            // Interrompe a busca se chegou ao objetivo
            if(actual_x == this.goal[0] && actual_y == this.goal[1]){
                console.log("Reached!")
                let path = [this.goal]
                while(path[0] != null){
                    print(path[0])
                    path.unshift(this.came_from[path[0][0]][path[0][1]])
                }
                return true
            }
            
            print("neighbors:", this.graph[actual_x][actual_y])
            // Para cada nó vizinho de actual
            this.graph[actual_x][actual_y].forEach((neighbor) => {
                print("actual:", actual_x, actual_y)
                // Desestrutura sua informação
                let [neighbor_x, neighbor_y, neighbor_ground_cost] = neighbor
                // Estabelece o custo do vizinho como a soma do custo até actual + custo de terreno do vizinho
                let new_cost = this.cost_so_far[actual_x][actual_y] + neighbor_ground_cost
                console.log(`condition to ${neighbor} - ${this.cost_so_far[neighbor_x][neighbor_y]} - ${new_cost}`, (!(this.cost_so_far[neighbor_x][neighbor_y])) || new_cost < this.cost_so_far[neighbor_x][neighbor_y])
                // Checa se o vizinho já foi alcaçado
                let alreadyReached = false
                for(let i = 0; i < this.reached.length; i++) {
                    if(this.reached[i][0][0] == neighbor_x && this.reached[i][0][1] == neighbor_y)
                        alreadyReached = true
                }
                // Se o vizinho ainda não foi alcaçado ou tinha um cálculo de custo anterior mais alto que o desse ca][nho
                if (!alreadyReached || new_cost < this.cost_so_far[neighbor_x][neighbor_y]){
                    if(!alreadyReached)
                        for(let i=0; i<this.frontier.length; i++)
                            if(this.frontier[i][0][0] == neighbor_x && this.frontier[i][0][1] == neighbor_y)
                                this.frontier.splice(i, 1);
                    
                    this.cost_so_far[neighbor_x][neighbor_y] = new_cost
                    this.came_from[neighbor_x][neighbor_y] = [actual_x, actual_y]
                    
                    // Calcula a prioridade que será dada a esse vizinho na análise
                    let priority = new_cost + this.distanceToGoal(neighbor)
                    // Inclui o vizinho fronteira
                    if(actual_priority > priority)
                        this.frontier.unshift([neighbor, priority])
                    else
                        for(var i = 0; i < this.frontier.length; i++)
                            if (this.frontier[i][1] > priority)
                                break
                        this.frontier = [...this.frontier.slice(0,i), [neighbor, priority], ...this.frontier.slice(i)]
                    this.reached.push([neighbor, priority])
                }
            })
            // Exibe a evolução do algoritmo
            this.showOff()
            
            // Loga a nova fronteira e os nós alcaçados
            this.iteration+=1
            // console.log("\nIteração:", this.iteration)
            // console.log("frontier:", this.frontier)
            // console.log("reached:", this.reached)
            
            return false
        }
        else{
            console.log("We're stucked!")
            return true
        }
    }
}