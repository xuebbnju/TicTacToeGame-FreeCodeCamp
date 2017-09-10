// var game={
//    selector:false,
//    numbers


// }


$(document).ready(function(){
 
if(n==0){ onitGame();}

   
});
var selector,num,n=0;
var  firstMoves=['0','2','4','6','8'];
var       corners=[0,2,6,8];
var       edges=[1,7,3,5];
var       routes=[
        [0,1,2],[3,4,5],[6,7,8],
         [0,3,6],[1,4,7],[2,5,8],
       [0,4,8],[2,4,6]];
var  player=[],
     numbers=[],
     moves=[],  
     result=[];


function onitGame(){
  n++;
  
  
      
     $('#start').one('click',function () {
        
       num=0;
       numbers=[0,0,0,0,0,0,0,0,0];
     
      result=[0,0,0,0,0,0,0];
      
      moves=[];
      player=[];
    
     
     $('#selector').addClass('show');
     $('.select').one('click',function () {
      
        if(this.id=="o"){
            selector=true;

          }else{

          selector=false;
         }
        $('#selector').removeClass('show');
         $('.select').off('click');
         
        startGame();
      
      
    });
    
});

}


//startGame
function startGame(){
       	
         console.log('第'+n+'次游戏start');  
    
       var firstMove=firstMoves[Math.floor(Math.random()*5)];
          draw((firstMove),!selector,false);

       $('canvas').each(function(index){
      
       if(numbers[index]==0){
         $(this).on('click',function(){
            var id=this.id;

            
            draw(id,selector,true);
         
           
            freeMove();
          
        
      });
    

       }
       

    });
     


      
      
		 
	}
	

//freemove
function freeMove(){
  
    switch(num){
    case 2:sencondMove();break;
    case 4: case 6: case 8: move();break;

    }
   
   
 
}
function sencondMove(){

  var id;
  if(moves[0]==4){
    if(corners.indexOf(player[0])!=-1){
        id=8-player[0];
    }else{
       if(edges.indexOf(player[0])<2){
        id=player[0]-1;
       }else{
        id=player[0]+3;
       }
        
    }
  }else{
    if(player[0]==4){
      id=8-moves[0];
    }else{
       id=4;
        
    }

  }
   
   
  
  draw(id,!selector,false);
  
}
function move(){
  
  

  var id,i;
  if(result.indexOf(2)!=-1){
   for(i=0;i<3;i++){
       if(numbers[ routes[result.indexOf(2)][i]]==0){
        id= routes[result.indexOf(2)][i];
        break;
       }
     }
     
  }else if(result.indexOf(-2)!=-1){
    
     for(i=0;i<3;i++){
       if(numbers[ routes[result.indexOf(-2)][i]]==0){
        id= routes[result.indexOf(-2)][i];
        break;
       }
     }
    
  }else{
    
     id=getMax();
  }
 
 
   draw(id,!selector,false);
  
}
function getMax(){
  var i,j,res=[],max=[],m;
  for(i=0;i<8;i++){
      if(result[i]==1){
        res.push(i);
      }
     }
  for(i=0;i<9;i++){
   if(numbers[i]==0){
      max.push([i,0]);
    for(j=0;j<res.length;j++){
     if(routes[j].indexOf(i)!=-1){
           max[max.length-1][1]++;
        }
      }

      }


  }
   m=max.reduce(function (x,y) {  
        return [x][1]>[y][1]?x:y;  
    });  
  

  return m[0];
}

//clear
function clearCanvas()  { 
   var c,cxt;
    for (var i = 0; i <9; i++) {
	     c=document.getElementById(''+i);  
       cxt=c.getContext("2d");  
      
    cxt.fillStyle="#000";  
    cxt.beginPath();  
    cxt.fillRect(0,0,c.width,c.height);  
    cxt.closePath(); 
    } 
 }

 //checkwin
 
 function updateResult(){
   var r,i;
  for(i=0;i<8;i++){
    r=numbers[routes[i][0]]+numbers[routes[i][1]]+numbers[routes[i][2]];
    result[i]=r;
   

  }

 }
function checkWin(selector) {
  
   
  if(selector){
     
    if(result.indexOf(-3)!=-1){
      showResult('您赢了');
     
      return false;
    }
  }else{
     
     if(result.indexOf(3)!=-1){
       showResult('您输了！');
     
       return false;
    }
  }
 if(num==9){
    
   showResult('平局!');
     return false;
  }
  

  

}
//showResult
function showResult(str){
    $('canvas').each(function(index){      
         $(this).off('click');     
    });
    $('#start').off('click');
     $('#result-text').text(str);
 $('#result').addClass('show');
 $('#check').one('click',function(
  ){
   $('#result').removeClass('show');
   $('#result-text').text("");

   clearCanvas();
   onitGame();

 });


}
//draw

function draw(id,selector,play){


var intId=parseInt(id);
  if(play){
        numbers[intId]=-1;
        player.push(intId);
      }else{
        numbers[intId]=1;
        moves.push(intId);
      }
	var c=document.getElementById(id)
     var ctx=c.getContext("2d");
    
       ctx.strokeStyle = "#fff";
       if(selector){
       	
          ctx.beginPath();
		      ctx.arc(75,75,20,0,2*Math.PI);
	     	  ctx.stroke();
       }else{
        
       	   ctx.beginPath();
           ctx.moveTo(65,65);
           ctx.lineTo(85,85);
           ctx.stroke();
            
           ctx.closePath();
           ctx.beginPath();
           ctx.moveTo(65,85);
           ctx.lineTo(85,65);
            ctx.stroke();
            ctx.closePath();

       }
      num++;

      
     

      updateResult();
     
     checkWin(play);
     }

    

