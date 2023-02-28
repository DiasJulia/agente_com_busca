# Agente Autônomo com Busca
Sistema que implementa um Agente Autônomo atuando em um mapa gerado aleatoriamente com os algoritmos de busca DFS, BFS, Dijkstra, Prim e A*, ou seja, busca em profundidade, em largura, Custo Uniforme, Gulosa e A*

## Como executar
Recomendamos o uso do editor de texto Visual Studio Code, com a extensão Live Server:
1. Baixe o .zip dos arquivos
2. Descompacte a pasta
3. Abra o diretório no VSCode
4. Inicialize o servidor pelo live server
5. Acesse o servidor gerado no browser

Ou acesse a demonstração pelo editor do P5.js:
[Atividade 3.0: Projeto - Agente Autônomo com Busca](https://editor.p5js.org/DiasJulia/sketches/nYkwGohAj)

### Rodando o sistema
1. Selecione a opção de start:<br>
![image](https://user-images.githubusercontent.com/35414462/221892601-bcedcab0-c2f0-40d3-aa56-7b9fca69f01f.png)
2. Escolha o algoritmo de busca desejado:<br>
![image](https://user-images.githubusercontent.com/35414462/221893004-2f8ec815-3b92-430d-82b8-1a14327da04a.png)
3. Observe a Magia acontecer:<br>
![image](https://user-images.githubusercontent.com/35414462/221893352-ac8354f0-76bc-4f52-91bf-efb6045f4b6b.png)

O circulo com borda alaranjada representa o agente autônomo
O circulo menor, com borda preta representa o objetivo

Os quadrados com bordas vermelhas são aqueles que estão na fronteira do algoritmo, na iminencia de serem explorados
Os quadrados pintados de cinza são os que foram explorados pelo algoritmo em questão

A intensidade da cor de cada quadrado representa a dificuldade de se passar por aquele terreno, os terrenos mais claros são mais fáceis de atravessar. Os de cor mais intensa são obstáculos, impossíveis de atravessar. Observe a velocidade com que o agente atravessa cada cor de terreno.

## A Equipe
* Júlia Dias
* Tiago Lima
* Artur Bôa-Viagem
* Dário Vasconcelos
* Rodrigo Santos
* Ítallo Antônio
