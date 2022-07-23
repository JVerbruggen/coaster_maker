var wx;
var wy;

var painter;
var environment;
var context;
var coaster;
var mode;

function setup() {
    wx = window.innerWidth;
    wy = window.innerHeight;

    // painter = new P5Painter();
    painter = new P5DebugPainter();
    environment = new Environment();
    context = new Context(environment);

    coaster = Coaster.create_new();
    environment._coasters.push(coaster);
    
    mode = new TrackEditingMode(context, coaster);
    

    createCanvas(wx, wy);
}
  
function draw() {
    clear();
    noStroke();
    rect(0,0,wx,wy);
    fill(255,255,255)

    environment.draw(painter);
}

function mouseClicked(){
    let x = mouseX;
    let y = mouseY;

    mode.clickEvent(new Point(x,y));
}