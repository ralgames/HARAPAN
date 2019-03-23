var m_scene = 0;
//0 - Loding
//1 - Title
//2 - Main
//3 - Result

var m_next_image    = 0;
var m_punch_image   = 0;
var m_brother_image = 0;
var m_brother_se    = [];
var m_src_num       = 0;
var m_src_loaded    = 0;
var m_mouse = { x: null, y:null };
var m_mouse_state   = 1;
//0 - is up
//1 - up
//2 - is down
//3 - down

var score = 0;
var is_space = false;

var ani = function(x, y) {
    this.x = x;
    this.y = y;
    this.harapan = false;
}

ani.prototype = {
    is_hit : function() {
        if(m_mouse.x < this.x-5                 ) { return false; }
        if(m_mouse.x > this.x-5+43.7*2+10       ) { return false; }
        if(m_mouse.y < this.y+25*2-5            ) { return false; }
        if(m_mouse.y > this.y-5+23.5*2+10+48.5*2) { return false; }
        return true;
    },

    teleport : function() {
        this.x = Math.random() * (780 - 43.7*2) + 10;
        this.y = Math.random() * (540 - 48.5*2) + 50;

        var r = Math.floor(Math.random() * m_brother_se.length);
        if(r > m_brother_se.length-1)
        {
            r = m_brother_se.length-1;
        }
        m_brother_se[r].play();
    }
    ,

    draw : function(ctx) {
        ctx.drawImage(m_brother_image, 0, 0, 437, 485, this.x, this.y, 43.7*2, 48.5*2);
    },

    draw_hit : function(ctx) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.fillRect(this.x-5, this.y+25*2-5, 43.7*2+10, 23.5*2+10);
    }
};

function loadImage() {
    m_punch_image = new Image();
    m_punch_image.src = "./image/punch.png";
    m_punch_image.onload = function(e) { m_src_loaded+=1; }
    m_src_num++;

    m_brother_image = new Image();
    m_brother_image.src = "./image/ani.png";
    m_brother_image.onload = function(e) { m_src_loaded+=1; }
    m_src_num++;

    m_next_image = new Image();
    m_next_image.src = "./image/next.png";
    m_next_image.onload = function(e) { m_src_loaded+=1; }
    m_src_num++;
}

function loadAudio() {
    var tmp = source_se.split(',');
    var len = tmp.length;

    m_src_num += len;
    for(var i = 0; i < len; i++) {
        m_brother_se[i] = new Audio();
        m_brother_se[i].src ="./se/" + tmp[i];
        m_brother_se[i].loop = false;
        m_brother_se[i].volume = 0.6;
        m_brother_se[i].oncanplaythrough = function(e) { m_src_loaded+=1; }
    }
}

window.onload = function () {
    var c = document.getElementById('canvas')
    c.addEventListener("mousedown", button_down, false);
    c.addEventListener("mouseup",   button_up, false);
    c.addEventListener("mousemove", mousemove, false);

    document.onkeyup = on_key_up;
    document.onkeydown = on_key_down;
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
    else {
        init();
    }

    setTimeout(render, 33);
}

function init() {
    switch (m_scene) {
        case 0: lodingInit(); break;
        case 1: titleInit (); break;
        case 2: mainInit  (); break;
        case 3: resultInit(); break;
        default:
    }
}

function update() {
    switch (m_scene) {
        case 0: lodingUpdate(); break;
        case 1: titleUpdate (); break;
        case 2: mainUpdate  (); break;
        case 3: resultUpdate(); break;
        default:
    }
    if(m_mouse_state == 0) { m_mouse_state = 1; }
    if(m_mouse_state == 2) { m_mouse_state = 3; }
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

var bro = null;

// Loading ----- ----- ----- ----- -----

function lodingInit() {

}

function lodingUpdate() {
    // Update
    if(m_src_num <= m_src_loaded)
    {
        bro = new ani(150, 200);
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

function titleInit() {
    score = 0;
    bro.x = 150;
    bro.y = 200;
}

function titleUpdate() {
    if(mouse_is_down() && bro.is_hit())
    {
        m_scene = 2;
    }
}

function titleDraw(ctx) {
    // Draw
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.fillRect(0, 0, 800, 600);
    bro.draw(ctx);

    drawPunch(ctx);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.textAlign = 'center';
    ctx.font = "50px 'メイリオ'";
    ctx.fillText("↑こいつを腹パンしろ！", 400, 350);

    ctx.font = "30px 'メイリオ'";
    ctx.fillText("上の画像を腹パンしたらゲームスタート(音量注意)", 400, 500);
}

// Main ----- ----- ----- ----- -----
var time;

function mainInit() {
    //30秒
    time = 30*30;
    score = 0;
    bro.teleport();
}

function mainUpdate() {
    // Update
    time--;
    if(time <= 0) {
        time = 0;
        m_scene = 3;
    }

    if(mouse_is_down() && bro.is_hit())
    {
        bro.teleport();
        score++;
    }
}

function mainDraw(ctx) {
    ctx.drawImage(m_next_image, 0, 0, 1280, 720, 0, 0, 800, 600);

    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fillRect(0, 0, 800, 600);
    // Draw
    ctx.font = "30px 'メイリオ'";
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillText("Time:" + Math.ceil(time/30) + "   Score:"+score, 400, 40);

    bro.draw(ctx);
    drawPunch(ctx);
}

// Result ----- ----- ----- ----- -----

function resultInit() {
    // Update
}

function resultUpdate() {
    if(is_space) {
        m_scene = 1;
    }
}

function resultDraw(ctx) {
    // Draw
    ctx.fillStyle = 'rgba(100, 100, 255,0.6)';
    ctx.fillRect(10, 40, 790, 590);

    ctx.font = "50px 'メイリオ'";
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillText("腹パンした回数："+score, 400, 300)

    ctx.font = "30px 'メイリオ'";
    ctx.fillText("スペースキーでスタート画面へ", 400, 500)
}

function drawPunch(ctx) {
    var p_x = -25.6*3;
    var p_y = 0;
    if(mouse_down()) {
        p_x += 20;
        p_y -= 20;
    }
    ctx.drawImage(m_punch_image, 0, 0, 256, 223, m_mouse.x+p_x, m_mouse.y+p_y, 25.6*3, 22.3*3);
}

function button_down(e) {
    m_mouse_state = 2; // is down
}

function button_up(e) {
    m_mouse_state = 0; // is up
}

function mousemove(e) {
    var rect = e.target.getBoundingClientRect();
    m_mouse.x = e.clientX - rect.left;
    m_mouse.y = e.clientY - rect.top;
}

function mouse_is_up()   { return m_mouse_state == 0; }
function mouse_up()      { return m_mouse_state == 1; }
function mouse_is_down() { return m_mouse_state == 2; }
function mouse_down()    { return m_mouse_state == 3; }

function on_key_down(e) {
    if(e.keyCode == 32)
    {
        is_space = true;
    }
}

function on_key_up(e) {
    if(e.keyCode == 32)
    {
        is_space = false;
    }
}
