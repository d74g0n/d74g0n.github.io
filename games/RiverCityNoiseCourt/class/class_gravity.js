class gravity {
    constructor() {
        this.g = 0.0001;
        this.ag = 0;
    }


    updateForces() {
        this.ag += this.g;
    }

    tick() {
        this.updateForces();
    }

    value() {
        return this.ag;
    }

}
