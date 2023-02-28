function mouseClicked() {
  
  //controle screen de menu
  if(screen==0){
    if(mouseX>=x && mouseX<=(x+l) && mouseY>=y && mouseY<=(y+h)){
      screen=1;
    }

    if(mouseX>=x && mouseX<=(x+l) && mouseY>=(y+50) && mouseY<=(y+50+h)){
      screen=2;
    }

    if(mouseX>=x && mouseX<=(x+l) && mouseY>=(y+100) && mouseY<=(y+100+h)){
      screen=3;
    }
  }
  
  
  if(screen!=0){
    if(mouseX>=x && mouseX<=(x+l) && mouseY>=(y+200) && mouseY<=(y+200+h)){
      screen=0;
    }
  }
  rect(x,y+25,l,h, arr)

  if(screen==1) {
    if(mouseX>=x && mouseX<=(x+l) && mouseY>=(y+25) && mouseY<=(y+25+h)){
      screen=4;
      algorithm_chosen = 'bfs';
    }
    if(mouseX>=x && mouseX<=(x+l) && mouseY>=(y+60) && mouseY<=(y+60+h)){
      screen=4;
      algorithm_chosen = 'djikstra';
    }
    if(mouseX>=x && mouseX<=(x+l) && mouseY>=(y+95) && mouseY<=(y+95+h)){
      screen=4;
      algorithm_chosen = 'prim';
    }
    if(mouseX>=x && mouseX<=(x+l) && mouseY>=(y+130) && mouseY<=(y+130+h)){
      screen=4;
      algorithm_chosen = 'dfs';
    }
    if(mouseX>=x && mouseX<=(x+l) && mouseY>=(y+165) && mouseY<=(y+165+h)){
      screen=4;
      algorithm_chosen = 'a_star';
    }
  }
}