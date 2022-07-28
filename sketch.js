var wx;
var wy;

var painter;
var environment;
var context;
var coaster;
var mode;
var ui;

function setup() {
    wx = window.innerWidth;
    wy = window.innerHeight;

    // painter = new P5Painter();
    painter = new P5DebugPainter();
    environment = new Environment();
    context = new Context(environment);
    ui = new UI(wx, wy);

    coaster = Coaster.create_new();
    environment._coasters.push(coaster);
    
    mode = new TrackEditingMode(context, coaster);
    

    createCanvas(wx, wy);
}
  
function draw() {
    clear();
    noStroke();
    fill(255,255,255)
    rect(0,0,wx,wy);

    environment.draw(painter);
    ui.draw(painter);
}

function _currentPoint(){
    let x = mouseX;
    let y = mouseY;
    return new Point(x,y);
}

function mouseClicked(){
    let point = _currentPoint();

    if(ui.clickEvent(point)) return;
    mode.clickEvent(point);
}

function mouseMoved(){
    let point = _currentPoint();

    ui.moveEvent(point);  
}