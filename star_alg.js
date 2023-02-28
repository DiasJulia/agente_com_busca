class starAlg{
    constructor(start, fields, goal){
        // Gera o grafo para navegação do algoritmo a partir da matriz de terrenos (fields)
        this.graph = []
        for (let i = 0; i < fields.length; i++) {
            this.graph[i]=[]
            for (let j =0; j<fields[i].length; j++){
                if(fields[i][j] >= cores.length-1)
                    continue
                let neighbors = []
                // Checa se os vizinhos em cada direção estrapolam as bordas ou se são paredes, 
                // caso contrário são adicionados ao grafo
                // Vizinho de cima
                if (i > 0 && fields[i-1][j] < cores.length-1)
                    neighbors.push([i-1, j, fields[i-1][j]+1])
                // Vizinho da esquerda
                if (j > 0 && fields[i][j-1] < cores.length-1)
                    neighbors.push([i, j-1, fields[i][j-1]+1])
                // Vizinho de baixo
                if (i < BOARD_TILES-1 && fields[i+1][j] < cores.length-1)
                    neighbors.push([i+1, j, fields[i+1][j]+1])
                // Vizinho da direita
                if (j < BOARD_TILES-1 && fields[i][j+1] < cores.length-1)
                    neighbors.push([i, j+1, fields[i][j+1]+1])
                this.graph[i][j] = neighbors
            }
        }
        // this.graph.forEach((line, index)=>{
        //     line.forEach((element, jindex)=>{
        //     })
        // })
        this.goalReached = false
        this.fields = fields
        this.path = []
        this.iteration = 0
        this.goal = goal 
        let x = start[1]
        let y = start[0]                                            // Objetivo: [x_position, y_position]
        this.frontier = [[[x, y, fields[x][y]], 0]]                     // Fila de vizinhos: [[graph_node, priority]] = [[[x_position, y_position, ground_cost], priority]]
        this.reached = [[[x, y, fields[x][y]], 0]]                      // Fila de vizinhos: [[graph_node, priority]] = [[[x_position, y_position, ground_cost], priority]]
        // Migalhas de pão:{x_position: y_position: [x_before_position, y_before_position]} 
        this.came_from = [[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]]    
        this.came_from[x][y] = null
        // Custo até o nó: {x_position: y_position: ground_cost}
        this.cost_so_far =  [[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]] 
        this.cost_so_far[x][y] = 0
        
        // this.cost_so_far[x][y] = 0

        // Loga a fronteira e os nós alcaçados
    }
    
    // Calcula distância entre o nó e o objetivo
    distanceToGoal (node){
        return (Math.sqrt(Math.pow(node[0]-this.goal[1], 2)+Math.pow(node[1]-this.goal[0], 2)))*10
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
                for(let k = 1; k < this.path.length; k++)
                    if(this.path[k][0]==i && this.path[k][1]==j)
                        fill("#FF6347")
                rect(j * TILE_SIZE, i * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
    }
    // Realiza uma iteração na busca, atualizando a fronteira e os nós alcançados
    update(){
        if(this.frontier.length > 0){
            // Sequestra o topo da pilha da fronteira e desestrutura a informação
            let actual = this.frontier.shift()
            let [[actual_x, actual_y, actual_ground_cost], actual_priority] = actual
            // Para cada vizinho do nó atual
            for(let neighbor of this.graph[actual_x][actual_y]){
                // Desestrutura sua informação
                let [neighbor_x, neighbor_y, neighbor_ground_cost] = neighbor
                
                // Analisa se chegou ao objetivo
                if(neighbor_x == this.goal[1] && neighbor_y == this.goal[0]){    
                    stroke(0)
                    fill("#FF6347")
                    rect(this.goal[0] * TILE_SIZE, this.goal[1] * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                    this.goalReached = true
                    this.path = [actual[0], this.goal.reverse()]
                    while(this.path[0] != null){
                        let head = this.path[0]
                        this.path.unshift(this.came_from[head[0]][head[1]])
                    }
                    let reversedPath = []
                    for(let tile of this.path.slice(1)){
                        stroke(0)
                        fill("#FF6347")
                        rect(tile[1] * TILE_SIZE, tile[0] * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                        reversedPath.push(tile.reverse())
                    }
                    return reversedPath
                }
                
                // Checa se o vizinho já foi alcaçado
                let alreadyReached = Boolean(this.cost_so_far[neighbor_x][neighbor_y]) || this.cost_so_far[neighbor_x][neighbor_y] == 0
                // Estabelece o custo do vizinho como a soma do custo até actual + custo de terreno do vizinho
                let new_cost = this.cost_so_far[actual_x][actual_y] + neighbor_ground_cost
                // Se o vizinho ainda não foi alcaçado ou tinha um cálculo de custo anterior mais alto que o desse caminho
                let frontierCondition = !alreadyReached || new_cost < this.cost_so_far[neighbor_x][neighbor_y]
                if (frontierCondition){
                    // Atualiza listas de dados dos nós
                    this.cost_so_far[neighbor_x][neighbor_y] = new_cost
                    this.came_from[neighbor_x][neighbor_y] = [actual_x, actual_y]
                    
                    // Calcula a prioridade que será dada a esse vizinho na análise da fronteira
                    let priority = new_cost + this.distanceToGoal(neighbor)
                    
                    // Inclui o vizinho fronteira
                    if(actual_priority > priority){
                        this.frontier.unshift([neighbor, priority])
                        if(alreadyReached)
                            for(let i=0; i<this.frontier.length; i++)
                                if(this.frontier[i][0][0] == neighbor_x && this.frontier[i][0][1] == neighbor_y)
                                    this.frontier.splice(i, 1);
                    }
                    else{
                        if(alreadyReached)
                            for(let i=0; i<this.frontier.length; i++)
                                if(this.frontier[i][0][0] == neighbor_x && this.frontier[i][0][1] == neighbor_y)
                                    this.frontier.splice(i, 1);
                        for(var i = 0; i < this.frontier.length; i++)
                            if (this.frontier[i][1] > priority)
                                break
                        this.frontier = [...this.frontier.slice(0,i), [neighbor, priority], ...this.frontier.slice(i)]
                    }
                    // Inclui o vizinho nos alcançados
                    this.reached.push([neighbor, priority])
                }
            }
            // Exibe a evolução do algoritmo
            this.showOff()
            
            // Loga a nova fronteira e os nós alcaçados
            this.iteration+=1
            
            return false
        }
        else{
            return true
        }
    }
}