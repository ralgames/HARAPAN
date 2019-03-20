var gameScene = function() {
  this.scene = 0; // 0-Title, 1-GameMain, 2-Result
};

gameScene.prototype = {
  update: function() {
    switch (this.scene) {
      case 0: titleUpdate();  break;
      case 1: mainUpdate();   break;
      case 2: resultUpdate(); break;
      default:
        alert('無効な値です');
    }
  }
};

function titleUpdate() {
  // Update
}

function mainUpdate() {
  // Update
}

function resultUpdate() {
  // Update
}

window.onload = function() {
  renderer();
};

function renderer() {
  var ctx = document.getElementById('canvas').getContext('2d');
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect(0, 0, 800, 600);

  setTimeout(renderer, 33);
}
