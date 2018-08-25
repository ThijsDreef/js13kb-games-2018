class Physics {

    constructor() {
        this._colliders = [];
        this._terrain = [];
        this._p = document.createElement('p');
        this._p.style.position = 'absolute';
        this._p.style.top = '0';
        document.body.appendChild(this._p);
    }

    generateTerrain(xSize, ySize) {
        const positions = [];
        this._terrain = [];
        for (let x = 0; x < xSize; x++) {
            this._terrain.push([]);
            for (let y = 0; y < ySize; y++) {
                positions.push([x, -1, y]);
                if (x === 0 || x === xSize - 1) {
                    for (let j = 0; j < 3; j ++)
                        positions.push([x + ((x === 0) ? -1 : 1), j - 1, y]);
                }
                if (y === 0 || y === ySize - 1) {
                    for (let j = 0; j < 3; j ++)
                        positions.push([x, j - 1, y + ((y === 0) ? -1 : 1)]);
                }
                this._terrain[x].push((Math.random() < 0.33));
                if (this._terrain[x][y]) {
                    positions.push([x, 1, y]);
                    positions.push([x, 0, y]);
                }
            }
        }
        return positions;
    }

    testAgainstTerrain(position, lastPosition) {
        const x = -Math.floor(0.5 + position[0]);
        const y = -Math.floor(0.5 + position[2]);
        const oldX = -Math.floor(0.5 + lastPosition[0]);
        const oldY = -Math.floor(0.5 + lastPosition[2]);
        this._p.textContent = x + ' ' + y + ' ';
        if (x < 0 || y < 0 || x >= this._terrain.length || y >= this._terrain[x].length)
            return {hit: true, collision: [oldX - x, oldY - y]};
        else
            return {hit: (this._terrain[x][y]), collision: [oldX - x, oldY - y]};
    }
}

export default Physics;
