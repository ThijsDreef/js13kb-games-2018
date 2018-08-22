class Physics {

    constructor() {
        this._colliders = [];
        this._terrain = [];
    }

    generateTerrain(xSize, ySize) {
        const positions = [];
        this._terrain = [];
        for (let x = 0; x < xSize; x++) {
            this._terrain.push([]);
            for (let y = 0; y < ySize; y++) {
                positions.push([x, -1, y]);
                
                this._terrain[x].push((Math.random() < 0.33));
                if (this._terrain[x][y]) {
                    positions.push([x, 1, y]);
                    positions.push([x, 0, y]);
                }
            }
        }
        console.log(this._terrain)
        return positions;
    }

    testAgainstTerrain(position, lastPosition) {
        const x = -Math.floor(0.5 + position[0]);
        const y = -Math.floor(0.5 + position[2]);
        const oldX = -Math.floor(0.5 + lastPosition[0]);
        const oldY = -Math.floor(0.5 + lastPosition[2]);
        console.log(oldY - y);
        if (x < 0 || y < 0 || x > this._terrain.length || y > this._terrain[x].length)
            return {hit: false};
        else 
            return {hit: this._terrain[x][y], collision: [oldX - x, oldY - y]};
    }
}

export default Physics;