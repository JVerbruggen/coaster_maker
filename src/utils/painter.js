class P5Painter{
    set_color(r,g,b,weight=2){
        strokeWeight(weight);
        stroke(r,g,b);
    }

    paint_bezier(xa,ya,xca,yca,xcb,ycb,xb,yb){
        this.set_color(0,0,0);
        noFill();
        bezier(xa,ya,xca,yca,xcb,ycb,xb,yb);

        // this.set_color(255,0,0,3);
        // line(xa,ya,xca,yca);

        // this.set_color(0,255,0,5);
        // line(xb,yb,xcb,ycb);

        // this.set_color(200,200,200);
        // line(xa,ya,xb,yb);
    }

    paint_line(xa,ya,xb,yb){
        line(xa,ya,xb,yb);
    }

    paint_circle(x,y,radius){
        // fill(255,0,0);
        this.set_color(255,0,0);
        circle(x,y,radius*2);
        // noFill();
    }
}