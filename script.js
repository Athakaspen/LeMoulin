var c;
var ctx;
// array to hold game board locations
var loc = [];
// value to set location radii
var radius = 40;
// colors
var boardColor = 'black';
var pieceColor = 'red';
var textColor = 'white';

var StartPos = ['L', 'E', 'M', 'N', '', 'O', 'I', 'L', 'U'];


var moves = 0;
var time = 0;
var timer;

function init() {
  c = document.getElementById("canvas");
  ctx = c.getContext("2d");
  initializeBoard(StartPos);

  drawBoard();
  
  document.addEventListener("click", clickHandler, false);
}


// Creates an object with x and y defined, set to the mouse position relative to the state's canvas
// If you wanna be super-correct this can be tricky, we have to worry about padding and borders
function getMousePos(canvas, evt){
  var rect = canvas.getBoundingClientRect();
  var margintop = parseInt(getComputedStyle(canvas, null).getPropertyValue("margin-top"));
  var marginLeft = parseInt(getComputedStyle(canvas, null).getPropertyValue("margin-left"));
  var borderTop = parseInt(getComputedStyle(canvas, null).getPropertyValue("border-top-width"));
  var borderLeft = parseInt(getComputedStyle(canvas, null).getPropertyValue("border-left-width"));

  return {
    x: evt.clientX - rect.left - marginLeft - borderLeft,
    y: evt.clientY - rect.top - marginLeft - borderTop
  };
}

function initializeBoard(boardState){
  loc = [];
  loc.push(new Location(0, 100, 150, [1,3,4], new Piece(boardState[0])));
  loc.push(new Location(1, 250, 80,  [0,2], new Piece(boardState[1])));
  loc.push(new Location(2, 400, 150, [1,4,5], new Piece(boardState[2])));
  loc.push(new Location(3, 100, 300, [0,6], new Piece(boardState[3])));
  loc.push(new Location(4, 250, 300, [0,2,6,8]));
  loc.push(new Location(5, 400, 300, [2,8], new Piece(boardState[5])));
  loc.push(new Location(6, 100, 450, [3,4,7], new Piece(boardState[6])));
  loc.push(new Location(7, 250, 520, [6,8], new Piece(boardState[7])));
  loc.push(new Location(8, 400, 450, [4,5,7], new Piece(boardState[8])));
  console.log(loc);
  moves = 0;
  time = 0;
  clearInterval(timer);
  timer = setInterval(function(){time++; drawTimer();}, 1000);
}

// return a valid scramble string
function generateScramble(){
  // just to test
  var scrambleArray = ['L', 'E', 'M', 'O', 'U', 'L', 'I', 'N'];
  
  for (var i = scrambleArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var x = scrambleArray[i];
    scrambleArray[i] = scrambleArray[j];
    scrambleArray[j] = x;
  }
  scrambleArray.splice(4,0,'');
  return scrambleArray;
}

function scramble(){
  initializeBoard(generateScramble());
  drawBoard();
}

function reset(){
  initializeBoard(StartPos);
  drawBoard();
}

// function to construct Piece objects
function Piece(value){
  // letter on the piece
  this.value = value;
  // stage of movement animation, used to animate piece movement
  this.moveStage = 0;
  // previous location of piece, used to animate piece movement
  this.lastLoc = null;
}

// function to construct Location objects
function Location(index, x, y, links, piece){
  this.index = index;
  this.x = x;
  this.y = y;
  this.links = links;
  this.piece = piece || null;
}

function clickHandler(e){
  m = getMousePos(c, e);
  
  // check if the click was on any location
  for(var i=0; i<loc.length; i++){
    // using equation for circle to determine if click was on a location
    if(Math.pow(m.x-loc[i].x, 2) + Math.pow(m.y-loc[i].y, 2) <= Math.pow(radius, 2)){
      //console.log(i);
      // Check that there's a piece at the location clicked
      if(loc[i].piece !== null){
        // check if any adjacent locations are free
        for (var j=0; j<loc[i].links.length; j++){
          if (loc[loc[i].links[j]].piece === null){
            // So now that everything is checked, move the piece.
            loc[loc[i].links[j]].piece = loc[i].piece;
            loc[loc[i].links[j]].piece.lastLoc = i;
            loc[loc[i].links[j]].piece.moveStage = 10;
            loc[i].piece = null;
            moves++;
            drawBoard();
          }
        }
      }
    }
  }


  // Places a blue square wherever you click
  //ctx.fillStyle = 'blue';
  //ctx.fillRect(mousePos.x,mousePos.y,20,20);
}

// Function to draw the board for the game
function drawBoard(){
  //console.log ("drawing board...");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = boardColor;
  ctx.lineWidth = 4;
  // draw circles at each location (as defined in initializeBoard())
  drawCircle(ctx, loc[0].x, loc[0].y, radius);
  drawCircle(ctx, loc[1].x, loc[1].y, radius);
  drawCircle(ctx, loc[2].x, loc[2].y, radius);
  drawCircle(ctx, loc[3].x, loc[3].y, radius);
  drawCircle(ctx, loc[4].x, loc[4].y, radius);
  drawCircle(ctx, loc[5].x, loc[5].y, radius);
  drawCircle(ctx, loc[6].x, loc[6].y, radius);
  drawCircle(ctx, loc[7].x, loc[7].y, radius);
  drawCircle(ctx, loc[8].x, loc[8].y, radius);
  
  // draw lines
  drawLine(215, 95, 135, 135);
  drawLine(285, 95, 365, 135);
  drawLine(215, 505, 135, 465);
  drawLine(285, 505, 365, 465);

  drawLine(100, 190, 100, 260);
  drawLine(100, 340, 100, 410);
  drawLine(400, 190, 400, 260);
  drawLine(400, 340, 400, 410);

  drawLine(128, 178, 222, 272);
  drawLine(372, 178, 278, 272);
  drawLine(128, 422, 222, 328);
  drawLine(372, 422, 278, 328);

  // draw pieces
  //console.log(ctx.font);
  for (var i=0; i<loc.length; i++){
    drawPiece(loc[i]);
  }
  
  // draw time and move counts
  drawTimer();
  drawMoves();
}

function drawCircle(ctx, x, y, r){
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2*Math.PI);
  ctx.stroke();
  ctx.closePath();
}

function drawLine(x1, y1, x2, y2){
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}

var isMovement = false;
function drawPiece(location){
  // check that the location has a piece before attempting to draw
  if (location.piece !== null){
    // special instructions if a piece is moving
    if (location.piece.moveStage>0){
      // draw circle
      ctx.fillStyle = pieceColor;
      ctx.beginPath();
      ctx.arc(location.x + (loc[location.piece.lastLoc].x - location.x)*(location.piece.moveStage/10),
              location.y + (loc[location.piece.lastLoc].y - location.y)*(location.piece.moveStage/10),
              radius-2, 0, 2*Math.PI);
      ctx.fill();
      ctx.closePath();
      // draw text centered on piece
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.fillText(location.piece.value,
                   location.x + (loc[location.piece.lastLoc].x - location.x)*(location.piece.moveStage/10),
                   location.y + (loc[location.piece.lastLoc].y - location.y)*(location.piece.moveStage/10)+(radius/2));
      location.piece.moveStage--;
      isMovement = true;
      setTimeout(drawBoard, 10);
    }
    else{
      // draw circle
      ctx.fillStyle = pieceColor;
      ctx.beginPath();
      ctx.arc(location.x, location.y, radius-2, 0, 2*Math.PI);
      ctx.fill();
      ctx.closePath();
      // draw text centered on piece
      ctx.font = radius*(4/3) + "px Arial";
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.fillText(location.piece.value, location.x, location.y+(radius/2));
    }
  }
}

function drawMoves(){
  ctx.font = "30px Arial";
  ctx.fillStyle = 'black';
  ctx.textAlign = "left";
  ctx.fillText("Moves - " + moves, 10, 590);
}

// draw the timer on screen
function drawTimer(){
  // clear timer area
  ctx.clearRect(300, 550, 200, 550);
  
  ctx.font = "30px Arial";
  ctx.fillStyle = 'black';
  ctx.textAlign = "right";
  var seconds;
  if (time%60<10){
    seconds = '0' + time%60;
  } else {
    seconds = time%60;
  }
  ctx.fillText("Time - " + Math.floor(time/60) + ":" + seconds , 490, 590);
}
