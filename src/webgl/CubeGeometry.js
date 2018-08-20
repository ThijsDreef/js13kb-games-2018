import Buffer from './Buffer';

class CubeGeometry {
  constructor(gl, positions) {
    this._gl = gl;
    this._buffer = new Buffer(gl, []);
    this.setupBuffer(positions)
  }
  //size problems? refractor this please....
  setupBuffer(positions) {
  	this._vertices = [];
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
    this._buffer.buffer(new Float32Array(this._vertices));
  }

  getBuffer() {
    return this._buffer;
  }
}

export default CubeGeometry;
