class Environment{
    constructor(){
        this._coasters = [];
    }

    draw(painter){
        this._coasters.forEach(c => c.draw(painter));
    }
}