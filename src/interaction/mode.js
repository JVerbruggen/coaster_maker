class TrackEditingMode{
    constructor(context, coaster){
        this.context = context;
        this.selectedNode = null;
        this.selectedCoaster = coaster;
        this.curvatureType = Curvature.SPLINE
        this.nodeCreator = new StarterNodeCreator();
    }

    clickEvent(point){
        let node = this.nodeCreator.create_new(point);
        this.selectedCoaster.trackConfiguration.addNode(node);

        if(this.selectedNode != null){
            this._addTrackToCoaster(this.selectedCoaster, this.selectedNode, node);
            this._addNeighbors(this.selectedNode, node);
        }else{
            this.nodeCreator = new NormalNodeCreator();
        }

        this.selectedNode = node;
    }

    _addTrackToCoaster(coaster, nodeA, nodeB){
        coaster.trackConfiguration.addTrack(
            Track.create_new(nodeA, nodeB, this.curvatureType)
        );
    }

    _addNeighbors(nodeA, nodeB){
        nodeA.addNeighbor(nodeB);
        nodeB.addNeighbor(nodeA);
        nodeA.setUpdate();
        nodeB.setUpdate();
    }
}

class NormalNodeCreator{
    create_new(point){
        return new TrackNode(point);
    }
}

class StarterNodeCreator{
    create_new(point){
        return new StarterTrackNode(point);
    }
}