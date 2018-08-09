/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, winningScore;
init();
var lastDice ;
document.querySelector('.btn-roll').addEventListener('click', function() {
  if(gamePlaying){
    //1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice1 = Math.floor(Math.random() * 6) +1;

    //Display the result for both dice
    var diceDom = document.querySelector('.dice');
    diceDom.style.display = 'block';
    diceDom.src = 'dice-' + dice + '.png';

    var diceDom1 = document.querySelector('.dice1');
    diceDom1.style.display = 'block';
    diceDom1.src = 'dice-' + dice1 + '.png';
    // check if didn't roll two 6's in a row
    if(lastDice === 6 && dice || dice1 === 6){
      scores[activePlayer] = 0;
    document.querySelector('#score-' + activePlayer).textContent = '0';
    nextPlayer();
    }// check if current roll isnt 1 if so add score to current
    else if(dice !== 1 || dice1 !== 1) {
     //add score
     roundScore += dice + dice1;
     document.querySelector('#current-' + activePlayer).textContent = roundScore;
   }// check if either dice = 1 if so remove current score
   else{
      roundScore = 0;
      document.querySelector('#current-' + activePlayer).textContent = '0';
      //next player
      nextPlayer();
    }
  }
    lastDice = dice;
  });
document.querySelector('.btn-hold').addEventListener('click', function() {
  if(gamePlaying){
    //add current score to global scores
    scores[activePlayer] += roundScore;
    //update the ui
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    //check if someone won the game
      var input = document.getElementById('winning_score').value;
      if(input){
         winningScore = input;
      }else{
        winningScore = 100;
      };
    if(scores[activePlayer] >= winningScore){
      document.getElementById('name-' + activePlayer).textContent ='Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.dice1').style.display = 'none';
      document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
      gamePlaying = false;
    } else{
      nextPlayer();
    }

  }

});

//document.querySelector('.input-field').addEventListener('click', function(){

function nextPlayer(){
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

      document.getElementById('current-0').textContent = '0';
      document.getElementById('current-1').textContent = '0';

      document.querySelector('.player-0-panel').classList.toggle('active');
      document.querySelector('.player-1-panel').classList.toggle('active');

      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.dice1').style.display = 'none';

}
document.querySelector('.btn-new').addEventListener('click', init);
function init(){
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice1').style.display = 'none';

  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent ='Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
