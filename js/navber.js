document.getElementById('navber_js').innerHTML = '<nav class="navbar navbar-expand-lg navbar-dark bg-dark">' +
  '<a class="navbar-brand" href="#">腹パン</a>' +
  '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">' +
    '<span class="navbar-toggler-icon"></span>' +
  '</button>' +

  '<div class="collapse navbar-collapse" id="navbarSupportedContent">' +
    '<ul class="navbar-nav mr-auto"> ' +
      '<li class="nav-item active"> ' +
        '<a class="nav-link" href="index.html">トップページ <span class="sr-only">(current)</span></a> ' +
      '</li> ' +
      '<li class="nav-item dropdown"> ' +
        '<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
          'ゲーム ' +
        '</a> ' +
        '<div class="dropdown-menu" aria-labelledby="navbarDropdown">' +
          '<a class="dropdown-item" href="game.html">ゲームA</a>' +
        '</div>' +
      '</li>' +
    '</ul>' +
  '</div>' +
'</nav>';
