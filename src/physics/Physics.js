class Physics {

    constructor() {
        this._colliders = [];
        this._terrain = [];
	this._p = document.createElement('p');
	this._p.style.position = 'absolute';
	this._p.style.top = '0';
	document.body.appendChild(this._p);
    }

    _debug(playerPos) {
	let string = '';
	for (let x = 0; x < this._terrain.length; x++) {
	  for(let y = 0; y < this._terrain[x].length; y++) {
	    if (x == playerPos[0] && playerPos[2] == y)	string += ' p ';
	    else {
		if (this._terrain[x][y])
		  string += ' w ';
		else
		  string += ' e ';
	    }
	  }
	  string += '\r\n';
        }
	this._p.textContent = string;
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
        this._p.textContent = x + ' ' + y + ' ' + oldX + ' ' + oldY;
	this._debug([x, 0, y]);
        if (x < 0 || y < 0 || x > this._terrain.length || y > this._terrain[x].length)
            return {hit: false};
        else
            return {hit: (this._terrain[x][y] && (this._terrain[oldX][y] || this._terrain[x][oldY])), collision: [oldX - x, oldY - y]};
    }
}

export default Physics;
