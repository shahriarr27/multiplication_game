var playing = false;
var score;
var count;
var timeleft;

document.getElementById('strt-btn').onclick = function(){
  if(playing == true){
    location.reload();
  }
  else{
    playing = true;
    score = 0;
    document.getElementById('score').innerHTML = score;
    show('timer')
    this.innerHTML = "Reset Game";
    timeleft = 60;
    countdown();
    document.getElementById('countdown').innerHTML = timeleft;
    generateQue();
  }
}

//ansbox click checkings

for(i=1; i<5; i++){
  document.getElementById('opt'+i).onclick = function(){
    if(playing == true){
      if(this.innerHTML == correctAns){
        score++;
        document.getElementById('score').innerHTML = score;
  
        hide('wrong');
        show('correct');
        setTimeout(function(){
          hide('correct');
        },1000);
  
        //generate new que
        generateQue();
      }
      else{
        hide('correct');
        show('wrong');
        setTimeout(function(){
          hide('wrong');
        },1000)
  
      }
    }
  }
}


//different functions

function countdown(){
  count = setInterval(function(){
    timeleft--; 
    document.getElementById('countdown').innerHTML = timeleft;
    if(timeleft == 0){
      clearInterval(count);
      hide("timer");
      alert('Game over! \nYour score is: ' + score);
      playing = false;
      document.getElementById('strt-btn').innerHTML = "Play Again";
    }
  },1000);
}

function hide(id){
  document.getElementById(id).style.display = "none"
}
function show(id){
  document.getElementById(id).style.display = "block"
}

function generateQue(){
  var x = 1+ Math.round(Math.random()*9);
  var y = 1+ Math.round(Math.random()*9);
  correctAns = x * y;


  document.getElementById('eqn-box').innerHTML = x + ' x ' + y;

  //position of correct ans
  var ansPos = 1+ Math.round(Math.random()*3);
  document.getElementById('opt'+ansPos).innerHTML = correctAns;

  var answers = [correctAns];

  //position of wrong ans
  for(i=1; i<5; i++){
    if(i !== ansPos){
      var wrongAns; 
      do{
        wrongAns = (1+ Math.round(Math.random()*9))*(1+ Math.round(Math.random()*9));
      }
      while(answers.indexOf(wrongAns)>-1);
      answers.push(wrongAns);
      document.getElementById('opt'+i).innerHTML = wrongAns;
    }
  }

}