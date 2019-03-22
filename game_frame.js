var m_scene = 0;
//0 - Loding
//1 - Title
//2 - Main
//3 - Result

var m_punch_image   = 0;
var m_brother_image = 0;
var m_brother_se    = [];
var m_src_num       = 0;
var m_src_loaded    = 0;

function loadImage() {
    m_punch_image = new Image();
    m_punch_image.src = "./image/punch.png";
    m_punch_image.onload = function(e) { m_src_loaded+=1; }
    m_src_num++;

    m_brother_image = new Image();
    m_brother_image.src = "./image/ani.png";
    m_brother_image.onload = function(e) { m_src_loaded+=1; }
    m_src_num++;
}

function loadAudio() {
    var tmp = source_se.split(',');
    var len = tmp.length;

    m_src_num += len;
    for(var i = 0; i < len; i++) {
        m_brother_se[i] = new Audio();
        m_brother_se[i].src ="./se/" + tmp[i];
        m_brother_se[i].oncanplaythrough = function(e) { m_src_loaded+=1; }
    }
}

window.onload = function () {
    m_scene = 0; //Loading
    loadImage();
    loadAudio();
    render();
};

function render() {
    var ctx = document.getElementById('canvas').getContext('2d');
    var tmp = m_scene;
    update();

    if(tmp == m_scene) {
        draw(ctx);
    }

    setTimeout(render, 33);
}


function update() {
    switch (m_scene) {
        case 0: lodingUpdate(); break;
        case 1: titleUpdate (); break;
        case 2: mainUpdate  (); break;
        case 3: resultUpdate(); break;
        default:
    }
}

function draw(ctx) {
    switch (m_scene) {
        case 0: lodingDraw(ctx); break;
        case 1: titleDraw (ctx); break;
        case 2: mainDraw  (ctx); break;
        case 3: resultDraw(ctx); break;
        default:
    }
}

// Loading ----- ----- ----- ----- -----

function lodingUpdate() {
    // Update
    if(m_src_num <= m_src_loaded)
    {
        m_scene = 1;
    }
}

function lodingDraw(ctx) {
    // Draw
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, 800, 600);

    ctx.fillStyle = 'rgb(255, 255, 255)';
    var prog = m_src_loaded / m_src_num;
    ctx.fillRect(0, 299, 800 * prog, 2);
}

// Title ----- ----- ----- ----- -----

function titleUpdate() {
    // Update
}

function titleDraw(ctx) {
    // Draw
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.fillRect(0, 0, 800, 600);
    ctx.drawImage(m_brother_image, 0, 0, 437, 485, 150, 200, 43.7*2, 48.5*2);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.textAlign = 'center';
    ctx.font = "50px 'メイリオ'";
    ctx.fillText("↑こいつを腹パンしろ！", 400, 350);

    ctx.font = "30px 'メイリオ'";
    ctx.fillText("上の画像を腹パンしたらゲームスタート", 400, 500);

}

// Main ----- ----- ----- ----- -----

function mainUpdate() {
    // Update
}

function mainDraw(ctx) {
    // Draw
}

// Result ----- ----- ----- ----- -----

function resultUpdate() {
    // Update
}

function resultDraw(ctx) {
    // Draw
}
