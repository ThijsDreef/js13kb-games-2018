class Physics {

    constructor() {
        this._colliders = [];
        this._terrain = [];
        this._p = document.createElement('p');
        this._p.style.position = 'absolute';
        this._p.style.top = '0';
        document.body.appendChild(this._p);
    }

    testPlayerAgainstLights(player, lights) {
        for (let i = 0; i < lights.length; i++) {
            if (Math.abs(lights[i].position[0] - player[0]) < 0.25)
                if (Math.abs(lights[i].position[2] - player[2]) < 0.25)
                   return true;
        }
        return false;
    }

    loadTerrain(data) {
        const wall = [];
        const ground = [];
        this._terrain = [];
        for (let x = 0; x < data.grid.length; x++) {
            this._terrain.push([]);
            for (let y = 0; y < data.grid[x].length; y++) {
                this._terrain[x].push(false);
                if (x === 0 || x === data.grid.length - 1) {
                    for (let j = 0; j < 3; j ++)
                        wall.push([x + ((x === 0) ? -1 : 1), j - 1, y]);
                }
                if (y === 0 || y === data.grid[x].length - 1) {
                    for (let j = 0; j < 3; j ++)
                        wall.push([x, j - 1, y + ((y === 0) ? -1 : 1)]);
                }
                if (data.grid[x][y] === 0) {
                    ground.push([x, -1, y]);
                } else if (data.grid[x][y] === 1) {
                    this._terrain[x][y] = true;
                    for (let i = 0; i < 2; i++)
                        wall.push([x, i, y]);
                }
            }
        }
        return {wall, ground};
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
                this._terrain[x].push((Math.random() < 0.1));
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
        if (x < 0 || y < 0 || x >= this._terrain.length || y >= this._terrain[x].length)
            return {hit: true, collision: [oldX - x, oldY - y]};
        else
            return {hit: (this._terrain[x][y]), collision: [oldX - x, oldY - y]};
    }
}

export default Physics;
