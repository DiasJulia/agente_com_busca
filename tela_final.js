function PlayGame() {
    background(img_play);

    textSize(17)
    text("Escolha o tipo de busca", 50, 100);
    fill(100, 90);
    rect(x, y + 200, l, h, arr)

    //BFS
    textFont(fontChango);
    textSize(17)
    fill(84)
    rect(x, y + 25, l, h, arr)
    fill(220, 20, 60)
    text("BFS", x + 55, y + 45);

    //PRIM
    textFont(fontChango);
    textSize(17)
    fill(84)
    rect(x, y + 95, l, h, arr)
    fill(220, 20, 60)
    text("PRIM", x + 50, y + 115);

    //Djikstra
    textFont(fontChango);
    textSize(17)
    fill(84)
    rect(x, y + 60, l, h, arr)
    fill(220, 20, 60)
    text("Djikstra", x + 30, y + 80);

    textFont(fontChango);
    textSize(17)
    fill(84)
    rect(x, y + 130, l, h, arr)
    fill(220, 20, 60)
    text("DFS", x + 55, y + 150);

    textFont(fontChango);
    textSize(17)
    fill(84)
    rect(x, y + 165, l, h, arr)
    fill(220, 20, 60)
    text("A*", x + 60, y + 185);

    fill(50)
    textFont(fontChango);
    textSize(17)
    text("voltar", x + 35, y + 220);

    push();
    fill(50);
    circle(mouseX, mouseY, 10)
    text(mouseX + ":" + mouseY, 30, 20)
    pop()
}