import Buffer from './Buffer';

class CubeGeometry {
  constructor(gl, positions, color) {
    this._gl = gl;
    this._buffer = new Buffer(gl, []);
    this._colorBuffer = new Buffer(gl, []);
    this.setupBuffer(positions, color)
  }
  //size problems? refractor this please....
  setupBuffer(positions, color) {
    this._vertices = [];
    this._positions = positions;
    this._colors = [];
  	for (let i = 0; i < positions.length; i++) {
      this._vertices.push(
        //one plane
        positions[i][0] - 0.5, positions[i][1] - 0.5, positions[i][2] - 0.5,
        0.5 + positions[i][0], 0.5 + positions[i][1], positions[i][2] - 0.5,
        0.5 + positions[i][0], positions[i][1] - 0.5, positions[i][2] - 0.5,
        positions[i][0] - 0.5, positions[i][1] - 0.5, positions[i][2] - 0.5,
        positions[i][0] - 0.5, 0.5 + positions[i][1], positions[i][2] - 0.5,
        0.5 + positions[i][0], 0.5 + positions[i][1], positions[i][2] - 0.5,
        //two plane
        positions[i][0] - 0.5, positions[i][1] - 0.5, positions[i][2] + 0.5,
        0.5 + positions[i][0], 0.5 + positions[i][1], positions[i][2] + 0.5,
        0.5 + positions[i][0], positions[i][1] - 0.5, positions[i][2] + 0.5,
        positions[i][0] - 0.5, positions[i][1] - 0.5, positions[i][2] + 0.5,
        positions[i][0] - 0.5, 0.5 + positions[i][1], positions[i][2] + 0.5,
        0.5 + positions[i][0], 0.5 + positions[i][1], positions[i][2] + 0.5,
        //third plane
        positions[i][0] + 0.5, positions[i][1] - 0.5, positions[i][2] - 0.5,
        0.5 + positions[i][0], 0.5 + positions[i][1], positions[i][2] + 0.5,
        0.5 + positions[i][0], positions[i][1] - 0.5, positions[i][2] + 0.5,
        positions[i][0] + 0.5, positions[i][1] + 0.5, positions[i][2] - 0.5,
        0.5 + positions[i][0], 0.5 + positions[i][1], positions[i][2] + 0.5,
        0.5 + positions[i][0], positions[i][1] - 0.5, positions[i][2] - 0.5,
        //fourth plane
        positions[i][0] - 0.5, positions[i][1] - 0.5, positions[i][2] - 0.5,
        positions[i][0] - 0.5, 0.5 + positions[i][1], positions[i][2] + 0.5,
        positions[i][0] - 0.5, positions[i][1] - 0.5, positions[i][2] + 0.5,
        positions[i][0] - 0.5, positions[i][1] + 0.5, positions[i][2] - 0.5,
        positions[i][0] - 0.5, 0.5 + positions[i][1], positions[i][2] + 0.5,
        positions[i][0] - 0.5, positions[i][1] - 0.5, positions[i][2] - 0.5,
        //fifth plane
        positions[i][0] - 0.5, positions[i][1] + 0.5, positions[i][2] + 0.5,
        positions[i][0] + 0.5, positions[i][1] + 0.5, positions[i][2] + 0.5,
        positions[i][0] - 0.5, positions[i][1] + 0.5, positions[i][2] - 0.5,
        positions[i][0] + 0.5, positions[i][1] + 0.5, positions[i][2] - 0.5,
        positions[i][0] + 0.5, positions[i][1] + 0.5, positions[i][2] + 0.5,
        positions[i][0] - 0.5, positions[i][1] + 0.5, positions[i][2] - 0.5,
        //sixth plane
        positions[i][0] - 0.5, positions[i][1] - 0.5, positions[i][2] + 0.5,
        positions[i][0] + 0.5, positions[i][1] - 0.5, positions[i][2] + 0.5,
        positions[i][0] - 0.5, positions[i][1] - 0.5, positions[i][2] - 0.5,
        positions[i][0] + 0.5, positions[i][1] - 0.5, positions[i][2] - 0.5,
        positions[i][0] + 0.5, positions[i][1] - 0.5, positions[i][2] + 0.5,
        positions[i][0] - 0.5, positions[i][1] - 0.5, positions[i][2] - 0.5,
      )
    }
    for (let i = 0; i < this._vertices.length; i += 6 * 3) {
      for (let j = 0; j < 2 * 3; j++) {
        if (color !== undefined) this._colors.push(color[0],color[1],color[2]);
        else this._colors.push(1, 1, 1);
      }
    }
    this._buffer.buffer(new Float32Array(this._vertices));
    this._colorBuffer.buffer(new Float32Array(this._colors));
  }

  getBuffer() {
    return this._buffer;
  }

  getColorBuffer() {
    return this._colorBuffer;
  }
}

export default CubeGeometry;
