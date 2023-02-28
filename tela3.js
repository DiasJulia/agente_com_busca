function Credits(){
  background(img_credit);
  var xtext = 40;
  var ytext = 100;
  textSize(20)
  textFont(fontChango);
  fill(255);

  text("Crédits:", xtext,ytext-20)
  textSize(16)
  text("Game developed for the",xtext,ytext+15);
  text("Intelligent Systems' course by:", xtext,ytext+30)
  textFont(fontChango);
  textSize(17)
  fill(220,20,60);
  text("Arthur Bôa-Viagem", 40,170);
  text("Dário", xtext,185);
  text("Ítalo Ântonio", xtext,200);
  text("Júlia Dias", xtext,215);
  text("Rodrigo Santos", xtext, 230);
  text("Tiago Lima", xtext,245);
  
  fill(100,90);
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