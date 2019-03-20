window.onload = function ()
{
  renderer();
};

function renderer()
{
  var ctx = document.getElementById('canvas').getContext('2d');
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect(0, 0, 800, 600);

  setTimeout(renderer, 33);
}
