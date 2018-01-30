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

function addRect(e){
  mousePos = getMousePos(c, e);
  ctx.fillStyle = 'red'
  ctx.fillRect(mousePos.x,mousePos.y,20,20);
}

function drawBoard(ctx){
  ctx.fillStyle = 'black'
  ctx.lineWidth = 3;
  // draw circles
  drawCircle(ctx, 250, 80, 40);
  drawCircle(ctx, 100, 150, 40);
  drawCircle(ctx, 100, 300, 40);
  drawCircle(ctx, 100, 450, 40);
  drawCircle(ctx, 250, 520, 40);
  drawCircle(ctx, 400, 450, 40,);
  drawCircle(ctx, 400, 300, 40,);
  drawCircle(ctx, 400, 150, 40,);
  drawCircle(ctx, 250, 300, 40,);
  
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

var c;
var ctx;

function init() {
  c = document.getElementById("canvas");
  ctx = c.getContext("2d");
  drawBoard(ctx);
  
  document.addEventListener("click", addRect, false);
}
