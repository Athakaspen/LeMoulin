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

function initializeBoard(){
  loc.push(new Location(0, 100, 150, [1,3,4], new Piece('L')));
  loc.push(new Location(1, 250, 80,  [0,2], new Piece('E')));
  loc.push(new Location(2, 400, 150, [1,4,5], new Piece('M')));
  loc.push(new Location(3, 100, 300, [0,6], new Piece('N')));
  loc.push(new Location(4, 250, 300, [0,2,6,8]));
  loc.push(new Location(5, 400, 300, [2,8], new Piece('O')));
  loc.push(new Location(6, 100, 450, [3,4,7], new Piece('I')));
  loc.push(new Location(7, 250, 520, [6,8], new Piece('L')));
  loc.push(new Location(8, 400, 450, [4,5,7], new Piece('U')));
  console.log(loc);
}

// function to construct Piece objects
function Piece(value){
  this.value = value;
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
  mousePos = getMousePos(c, e);
  ctx.fillStyle = 'blue';
  ctx.fillRect(mousePos.x,mousePos.y,20,20);
}

// Function to draw the board for the game
function drawBoard(ctx){
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
  ctx.font = radius*(4/3) + "px Arial";
  console.log(ctx.font);
  for (var i=0; i<loc.length; i++){
    drawPiece(loc[i]);
  }
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

function drawPiece(location){
  // check that the location has a piece before attempting to draw
  if (location.piece !== null){
    // draw circle
    ctx.fillStyle = pieceColor;
    ctx.beginPath();
    ctx.arc(location.x, location.y, radius-2, 0, 2*Math.PI);
    ctx.fill();
    ctx.closePath();
    // draw text centered on piece
    ctx.fillStyle = textColor;
    ctx.textAlign = "center";
    ctx.fillText(location.piece.value, location.x, location.y+(radius/2));
  }
}

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

function init() {
  c = document.getElementById("canvas");
  ctx = c.getContext("2d");
  initializeBoard();

  drawBoard(ctx);
  
  document.addEventListener("click", clickHandler, false);
}
