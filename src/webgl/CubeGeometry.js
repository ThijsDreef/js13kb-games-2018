import Buffer from './Buffer';

class CubeGeometry {
  constructor(gl, positions) {
    this._gl = gl;
    this._buffer = new Buffer(gl, []);
    this._colorBuffer = new Buffer(gl, []);
    this.setupBuffer(positions)
  }
  //size problems? refractor this please....
  setupBuffer(positions) {
    this._vertices = [];
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
    for (let i = 0; i < this._vertices.length; i++) {
      this._colors.push(Math.random());
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
