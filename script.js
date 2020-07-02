// jshint esversion:6
// Constants
const started = 0;
const ended = 1;

// HTML elements
const playerSpan = document.getElementById('player');
const gameTable = document.getElementById('game');
const game = {
  state:started,
  turn:'x',
  move:0
};

function endGame(winner)
{
  if(winner)
  {
    alert("Game over ! Winner is "+winner);
  }
  else
  {
    alert("Game over ! Draw");
  }

  game.state = ended;

}

function restartGame()
{
  if(Math.random()>0.5) game.turn = 'x';
  else game.turn = 'o';

  game.state = started;
  game.move = 0;
  
  Array.from(document.getElementsByTagName('td')).forEach(cell =>{
    cell.textContent='';
  });

}

function nextTurn()
{
  if(game.state===ended) return;
  game.move++;
  if(game.turn==='x') game.turn = 'o';
  else game.turn = 'x';

  if(game.move===9) endGame();

  playerSpan.textContent = game.turn;
}

function isSeqCaptured(arrayOf3Cells)
{
  let winningCombo = game.turn+game.turn + game.turn;
  if(arrayOf3Cells.map(i => i.textContent).join('')===winningCombo)
  {
    endGame(game.turn);
  }
}

function isRowCaptured(row)
{
  let tableRow = Array.from(gameTable.children[0].children[row-1].children);
  isSeqCaptured(tableRow);
}

function isColCaptured(col)
{
  let tableCol =
  [
    gameTable.children[0].children[0].children[col-1],
    gameTable.children[0].children[1].children[col-1],
    gameTable.children[0].children[2].children[col-1]
  ];

  // console.log(tableCol);
  isSeqCaptured(tableCol);
}

function isDiagCaptured(row,col)
{
  if(row!==col && row+col !== 4) return;

  let diag1 =
  [
    gameTable.children[0].children[0].children[0],
    gameTable.children[0].children[1].children[1],
    gameTable.children[0].children[2].children[2]
  ];

  let diag2 =
  [
    gameTable.children[0].children[0].children[2],
    gameTable.children[0].children[1].children[1],
    gameTable.children[0].children[2].children[0]
  ];

  isSeqCaptured(diag1);
  isSeqCaptured(diag2);

}

function boxClicked(row,col)
{
  if(game.state===ended)
  {
  alert("Game ended ! Restart to play Again !");
  return ;
  }

  console.log("boxClicked "+row +" "+col);

  let clickedBox = gameTable.children[0].children[row-1].children[col-1];
  clickedBox.textContent = game.turn;
  isRowCaptured(row);
  isColCaptured(col);
  isDiagCaptured(row,col);

  nextTurn();
}
