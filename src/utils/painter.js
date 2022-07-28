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
        noFill();
        circle(x,y,radius*2);
    }

    paint_rectangle(x,y,w,h,color=Color.BLACK,fillColor=Color.WHITE){
        let weight = 2;
        this.set_color(color.r, color.g, color.b, weight);
        fill(fillColor.r,fillColor.g,fillColor.b);
        rect(x,y,w-weight,h-(weight*2));
    }

    paint_text(x,y,w,h,value,color=Color.BLACK){
        this.set_color(color.r, color.g, color.b, 1);
        noFill();
        textAlign(CENTER, CENTER);
        text(value,x,y,w,h);
    }
}

class P5DebugPainter extends P5Painter{
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
}

class Color{
    static WHITE = new Color(255,255,255);
    static BLACK = new Color(0,0,0);
    static PRIMARY = new Color(255,0,0);
    static SECONDARY = new Color(200,200,200);

    constructor(r,g,b,a=255){
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}