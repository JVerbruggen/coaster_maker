class Point{
    constructor(x, y){
        this._x = x;
        this._y = y;
    }

    get x(){
        return this._x;
    }

    get y(){
        return this._y;
    }

    equals(other){
        return this.x == other.x && this.y == other.y;
    }

    add(x, y){
        if(x == 0 && y == 0) return this;
        return new Point(this.x + x, this.t + y);
    }

    add(point){
        if(point.x == 0 && point.y == 0) return this;
        return new Point(this.x + point.x, this.y + point.y);
    }

    
}