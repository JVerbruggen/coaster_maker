class UI{
    constructor(sW, sH){
        this.sW = sW;
        this.sH = sH;
        this.drawables = [
            new UIGroup([
                new UIPane(0, this.sH-100, this.sW, 100, Color.SECONDARY),
                new UIButton(20, this.sH - 80, "New node", 60, 60),
                new UIButton(100, this.sH - 80, "Edit node", 60, 60)
            ])
        ];
    }

    clickEvent(point){
        let handled = this.drawables.some(d => d.hits(point) && d.click(point));
        return handled;
    }

    moveEvent(point){
        if(this.drawables.some(d => d.showClickHint(point))){
            cursor(HAND);
        }else{
            cursor(ARROW);
        }
    }

    draw(painter){
        this.drawables.forEach(d => d.draw(painter));
    }
}

class UIGroup{
    constructor(drawables, enabled=true){
        this.drawables = drawables;
        this.enabled = enabled;
    }

    hits(point){
        return this.drawables.some(d => d.hits(point));
    }

    click(point){
        return this.drawables.some(d => d.hits(point) && d.click(point));
    }

    draw(painter){
        if(!this.enabled) return;
        this.drawables.forEach(d => d.draw(painter));
    }

    showClickHint(point){
        return this.drawables.some(d => d.showClickHint(point));
    }
}

class UIElement{
    hits(point){
        return false;
    }

    click(point){
        return false;
    }

    draw(painter){
        return;
    }

    showClickHint(point){
        return false;
    }
}

class UISizedElement extends UIElement{
    constructor(x,y,w,h){
        super();

        this.x = x; 
        this.y = y; 
        this.w = w;
        this.h = h;
    }

    hits(point){
        return point.x >= this.x
            && point.x <= this.x + this.w
            && point.y >= this.y
            && point.y <= this.y + this.h;
    }

    click(point){
        return false;
    }

    showClickHint(point){
        return false;
    }
}

class UIButton extends UISizedElement{
    DEFAULT_SIZE = 30;

    constructor(x,y,text,w=UIButton.DEFAULT_SIZE,h=UIButton.DEFAULT_SIZE){
        super(x,y,w,h);
        this.text = text;
    }

    draw(painter){
        painter.paint_rectangle(this.x, this.y, this.w, this.h);
        painter.paint_text(this.x, this.y, this.w, this.h, this.text);
    }

    showClickHint(point){
        return this.hits(point);
    }

    click(point){
        let h = super.hits(point);
        if(h) alert(this.text + " was clicked");
        return h;
    }
}

class UIPane extends UISizedElement{
    constructor(x,y,w,h,color){
        super(x,y,w,h);
        this.color = color;
    }

    draw(painter){
        painter.paint_rectangle(this.x, this.y, this.w, this.y, this.color, this.color);
    }
}