// Creates an object with x and y defined, set to the mouse position relative to the state's canvas
// If you wanna be super-correct this can be tricky, we have to worry about padding and borders
function getMousePos(canvas, evt){
  var rect = canvas.getBOundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function addRect(e){
  var mx = getMouse(e);
  ctx.fillRect(50,50,20,20,'red');
}

var c;
var ctx;

function init() {
  c = document.getElementById("canvas");
  ctx = c.getContext("2d");
  
  document.addEventListener("click", addRect, false);
}
