const tileImgs = ['A','B','C','D','E','F','G','H','I','J','K','L'];
let tilesFlipped = [];
let tilesMatch = [];

function drawBoard(event) {
  event.preventDefault();
  welcome.style.display = 'none';
  board.style.display = 'flex';
  
  let gameTiles = playGame.numberOfTiles.value;
  let gameTileImgs = tileImgs.slice(0, gameTiles/2);
  gameTileImgs = gameTileImgs.doubleShuffle();
  
  for (i=0; i<gameTiles; i++) {
    let content = '';
    content += '<section class="tile" data-tile=" ' + i +'">';
    content += '<div class="front"></div>';
    content += '<div class="back"><img src="' + gameTileImgs[i] + '.png"></div>';
    content += '</section>';
	
    board.innerHTML += content;
  }
}

Array.prototype.doubleShuffle = function()
{
    let d;
    for(d = 0; d < this.length; d = d+2){
        this.splice(d+1,0, this[d]);
    }

    let i = (this.length), j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
    return this;
}

function twoTiles() {
  if(tilesFlipped.length >=2) {
    board.style.pointerEvents = "none";
    if(tilesMatch[0] == tilesMatch[1]) {
      tilesFlipped = [];
      tilesMatch = [];
      board.style.pointerEvents = "auto";
      setTimeout(endOfGame, 400);
    } else {
      setTimeout(flipBack, 1200);
    }
  }
}

function endOfGame() {
  if( board.getElementsByClassName('tile').length == board.getElementsByClassName('flipped').length) {
    //alert("Congrats! You got 'em all!!!")
    message.classList.add('showmessage');
  }
}

function newGame() {
  board.innerHTML = '';
  board.style.display = 'none';
  welcome.style.display = 'flex';
  message.classList.remove('showmessage');
}

function flipTile(event) {
  if(event.target !== event.currentTarget) {
     event.target.parentNode.classList.add("flipped");
    tilesFlipped.push(event.target.parentNode.getAttribute("data-tile"));
    tilesMatch.push(event.target.nextSibling.innerHTML);
    twoTiles();
    //setTimeout( function() { flipBack(tileNmbr) }, 1200);
    }
}

function flipBack() {
  let allTiles = board.getElementsByClassName("tile");
  allTiles[parseInt(tilesFlipped[0])].classList.remove("flipped");
  allTiles[parseInt(tilesFlipped[1])].classList.remove("flipped");
  tilesFlipped = [];
  tilesMatch = [];
  board.style.pointerEvents = "auto";
}


board.addEventListener("click", flipTile, false);
playGame.addEventListener("submit", drawBoard, false);
message.getElementsByTagName('button')[0].addEventListener('click', newGame, false);