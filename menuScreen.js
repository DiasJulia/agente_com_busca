class MenuScreen {

    constructor() {}


    Guide(){
        background(img_guide);
        let  ytext = 70
        let  xtext = 30
        
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
        circle(this.mouseX, this.mouseY, 10)
        text(this.mouseX+":"+ this.mouseY, 30, 20)
        pop()
      }

    Credits(){
        background(img_credit);
        let xtext = 40;
        let ytext = 100;
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
        circle(this.mouseX, this.mouseY, 10)
        text(this.mouseX+":"+ this.mouseY, 30, 20)
        pop()
      }

    PlayGame(){
        background(img_play);
        
        textSize(17)
        text("Escolha o tipo de busca",50,100);
        fill(100,90);
        rect(x,y+200,l,h, arr)
        
        fill(50)
        textFont(fontChango);
        textSize(17)
        text("voltar",x+35,y+220);
        
        push();
        fill(50);
        circle(this.mouseX, this.mouseY, 10)
        text(this.mouseX+":"+ this.mouseY, 30, 20)
        pop()
      }

    Menu(){
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
        circle(this.mouseX, this.mouseY, 10)
        textSize(10)
        text(this.mouseX+":"+ this.mouseY, 30, 20)
        pop()
        
      }

    mouseClicked(screen) {
  
        //controle screen de menu
        if(screen==0){
          if(this.mouseX>=x && this.mouseX<=(x+l) && this.mouseY>=y && this.mouseY<=(y+h)){
            screen=1;
          }
      
          if(this.mouseX>=x && this.mouseX<=(x+l) && this.mouseY>=(y+50) && this.mouseY<=(y+50+h)){
            screen=2;
          }
      
          if(this.mouseX>=x && this.mouseX<=(x+l) && this.mouseY>=(y+100) && this.mouseY<=(y+100+h)){
            screen=3;
          }
        }
        
        if(screen!=0){
          if(this.mouseX>=x && this.mouseX<=(x+l) && this.mouseY>=(y+200) && this.mouseY<=(y+200+h)){
            screen=0;
          }
        }
        
        
      }


}


