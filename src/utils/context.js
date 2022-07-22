class Context{
    constructor(environment){
        this._environment = environment;
    }

    get environment(){
        return this._environment;
    }
}

class Coaster{
    static create_new(){
        return new Coaster(new TrackConfiguration());
    }

    constructor(trackConfiguration){
        this.trackConfiguration = trackConfiguration;
    }

    draw(painter){
        this.trackConfiguration.draw(painter);
    }
}

class TrackConfiguration{
    constructor(nodes = [], tracks = []){
        this._nodes = nodes;
        this._tracks = tracks;
    }

    get nodes(){
        return this._nodes;
    }

    get tracks(){
        return this._tracks; 
    }

    draw(painter){
        this.nodes.forEach(n => n.draw(painter));
        this.tracks.forEach(t => t.draw(painter));

        this.nodes.forEach(n => n.resetUpdate());
    }

    addNode(node){
        this._nodes.push(node);
    }

    addTrack(track){
        this._tracks.push(track);
    }
}