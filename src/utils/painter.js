class P5Painter{
    set_color(r,g,b,weight=2){
        strokeWeight(weight);
        stroke(r,g,b);
    }

    paint_bezier(xa,ya,xca,yca,xcb,ycb,xb,yb){
        this.set_color(0,0,0,2);
        noFill();
        bezier(xa,ya,xca,yca,xcb,ycb,xb,yb);
    }

    paint_line(xa,ya,xb,yb){
        line(xa,ya,xb,yb);
    }

    paint_circle(x,y,radius){
        this.set_color(255,0,0);
        circle(x,y,radius*2);
    }
}

class P5DebugPainter{
    set_color(r,g,b,weight=2){
        strokeWeight(weight);
        stroke(r,g,b);
    }

    paint_bezier(xa,ya,xca,yca,xcb,ycb,xb,yb){
        this.set_color(0,0,0,2);
        noFill();
        bezier(xa,ya,xca,yca,xcb,ycb,xb,yb);

        this.set_color(255,0,0,1);
        line(xa,ya,xca,yca);

        this.set_color(0,255,0,1);
        line(xb,yb,xcb,ycb);

        this.set_color(200,200,200,1);
        line(xa,ya,xb,yb);
    }

    paint_line(xa,ya,xb,yb){
        line(xa,ya,xb,yb);
    }

    paint_circle(x,y,radius){
        this.set_color(255,0,0);
        circle(x,y,radius*2);
    }
}