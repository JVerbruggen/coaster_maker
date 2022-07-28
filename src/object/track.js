class Track{
    static create_new(nodeA, nodeB, curvature_type){
        return new Track(nodeA, nodeB, Curvature.from(curvature_type, nodeA, nodeB));
    }

    constructor(nodeA, nodeB, curvature){
        this.nodeA      = nodeA;
        this.nodeB      = nodeB;
        this.curvature  = curvature;
    }

    draw(painter){
        painter.set_color(0,0,0);
        this.curvature.draw(painter, this.nodeA, this.nodeB);
    }
}

class TrackNode{
    constructor(point, previous = null, next = null){
        this.point = point;
        this._previous = previous;
        this._previousTheta = 0;
        this._next = next;
        this._nextTheta = 0;
        this._hasUpdate = true;
        this._identifier = (Math.random() + 1).toString(36).substring(7);
    }

    hasUpdate(){
        if(this._hasUpdate){
            return true;
        }
        return false;
    }

    setUpdate(){
        this._hasUpdate = true;
    }

    resetUpdate(){
        this._hasUpdate = false;
    }

    _theta(dy, dx, offset = 0){
        return Math.atan2(dy,dx) + offset;
    }

    _thetaToPoint(theta, length=80){
        let x = Math.cos(theta) * length;
        let y = Math.sin(theta) * length;
        return new Point(x, y)
    }

    _bezier_theta(offset){
        let thetaDy = this._next.point.y - this._previous.point.y;
        let thetaDx = this._next.point.x - this._previous.point.x;
        return this._theta(thetaDy, thetaDx, offset);
    }

    _bezier_theta_point(neighborPoint, offset=0, lengthFactor = 0.45, minHandleSuggestion = 20){
        let theta = this._bezier_theta(offset);

        let neighborDy = this.point.y - neighborPoint.y;
        let neighborDx = this.point.x - neighborPoint.x;
        let neighborTheta = this._theta(neighborDy, neighborDx);
        let neighborDistance = Math.sqrt(neighborDy * neighborDy + neighborDx * neighborDx);

        let nettoTheta = neighborTheta - theta + Math.PI;
        let nettoLength = Math.cos(nettoTheta) * neighborDistance * lengthFactor;
        if(nettoLength < 0){
            nettoLength = -nettoLength;
            theta += Math.PI;
        }
        nettoLength = Math.max(minHandleSuggestion, nettoLength);

        let handlePoint = this._thetaToPoint(theta, nettoLength);
        return handlePoint.add(this.point);
    }

    bezier_theta_previous(){
        if(this._next == null) return new Point(this.point.x, this.point.y);
        return this._bezier_theta_point(this._previous.point, 0);
    }

    bezier_theta_next(){
        if(this._previous == null) return new Point(this.point.x, this.point.y);
        return this._bezier_theta_point(this._next.point, 0);
    }

    draw(painter){
        painter.set_color(255,255,0);
        painter.paint_circle(this.point.x, this.point.y, 10);
    }

    addNeighbor(neighbor){
        assert(this._previous == null || this._next == null, "Cannot add neighbor.");
        
        if(this._previous == null){
            this._previous = neighbor;
        }else if(this._next == null){
            this._next = neighbor;
        }
    }
}

class StarterTrackNode extends TrackNode{
    constructor(point, previous = null, next = null){
        super(point, previous, next);
    }

    addNeighbor(neighbor){
        assert(this._previous == null || this._next == null, "Cannot add neighbor.");

        if(this._next == null){
            this._next = neighbor;
        }else if(this._previous == null){
            this._previous = neighbor;
        }
    }
}

class Curvature{
    static STRAIGHT = 0;
    static SPLINE = 1;

    static from(type, nodeA, nodeB){
        let pointA = nodeA.point;
        let pointB = nodeB.point;
        switch(type){
            case Curvature.STRAIGHT: return new NoCurvature(pointA, pointB);
            case Curvature.SPLINE:
                return new SplineCurvature(nodeA, nodeB);
        }
    }
}

class NoCurvature{
    constructor(pointA, pointB){
        this.pointA     = pointA;
        this.pointB     = pointB;
    }

    draw(painter){
        painter.paint_line(this.pointA.x, this.pointA.y, this.pointB.x, this.pointB.y);
    }
}

class SplineCurvature{
    constructor(nodeA, nodeB){
        this.nodeA          = nodeA;
        this.nodeB          = nodeB;

        this.pointAHandle   = new Point(0,0);
        this.pointBHandle   = new Point(0,0);

        this.updateHandles();
    }

    updateHandles(){
        if(this.nodeA.hasUpdate()){
            this.pointAHandle = this.nodeA.bezier_theta_next();
        }
        if(this.nodeB.hasUpdate()){
            this.pointBHandle = this.nodeB.bezier_theta_previous();
        }
    }

    draw(painter){
        this.updateHandles();
        painter.paint_bezier(
            this.nodeA.point.x,     this.nodeA.point.y, 
            this.pointAHandle.x,    this.pointAHandle.y,
            this.pointBHandle.x,    this.pointBHandle.y,
            this.nodeB.point.x,     this.nodeB.point.y
        );
    }
}