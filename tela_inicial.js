function menu(){
  background(img_menu);
  
  textFont(fontChango);
  textSize(23)
  fill(220,20,60);
  text("Autonomous Agent",x-70,y-30)
  
  fill(100,90);
  rect(x,y,l,h, arr)
  
  textSize(15)
  fill(176,224,230);
  text("Play Game",x+28,y+20)
  
  fill(100,90);
  rect(x,y+50,l,h, arr)
  
  textSize(20)
  fill(176,224,230);
  text("Guide",x+40,y+70)
  
  fill(100,90);
  rect(x,y+100,l,h, arr)
  
  fill(176,224,230);
  text("Credits",x+30,y+120)
  
  fill(220,20,60)
  textSize(20)
  text("Cin UFPE",x+12,y+250)
  push();
  fill(180);
  circle(mouseX, mouseY, 10)
  textSize(10)
  text(mouseX+":"+ mouseY, 30, 20)
  pop()
  
}