function Guide(){
  background(img_guide);
  var ytext = 70
  var xtext = 30
  
  textSize(12)
  fill(255)
  text("jogo de agente autônomo consiste em um         ambiente",xtext,ytext);
  
  text("virtual com diferentes terrenos onde o ",xtext,ytext+15);
  
  text("agente deve coletar comida. O agente",xtext,ytext+30);
  
  text("utiliza algoritmos de busca de melhor,",xtext,ytext+45);
  
  text("caminho. O objetivo é coletar a maior  ",xtext,ytext+60);
  text("quantidade de comida possível em diferentes  ",xtext,ytext+75);
  text("terrenos, sobre direntes obstáculos "   ,xtext,ytext+90);
  text("enquanto o agente recebe recompensas ",xtext,ytext+105);
  text("O jogo é desafiador e dinâmico,  ",xtext,ytext+120);
  text("proporcionando uma experiência única ",xtext,ytext+135);
  text("para o jogador ",xtext,ytext+150);


  
  
  fill(100,90)
  rect(x,y+200,l,h, arr)
  
  fill(50)
  textFont(fontChango);
  textSize(17)
  text("voltar",x+35,y+220);
  push();
  fill(180);
  circle(mouseX, mouseY, 10)
  text(mouseX+":"+ mouseY, 30, 20)
  pop()
}