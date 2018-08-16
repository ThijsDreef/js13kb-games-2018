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
        positions[i][0] - 1, positions[i][1] - 1, positions[i][2] - 1,
        1 + positions[i][0], 1 + positions[i][1], positions[i][2] - 1,
        1 + positions[i][0], positions[i][1] - 1, positions[i][2] - 1,
        positions[i][0] - 1, positions[i][1] - 1, positions[i][2] - 1,
        positions[i][0] - 1, 1 + positions[i][1], positions[i][2] - 1,
        1 + positions[i][0], 1 + positions[i][1], positions[i][2] - 1,
        //two plane
        positions[i][0] - 1, positions[i][1] - 1, positions[i][2] + 1,
        1 + positions[i][0], 1 + positions[i][1], positions[i][2] + 1,
        1 + positions[i][0], positions[i][1] - 1, positions[i][2] + 1,
        positions[i][0] - 1, positions[i][1] - 1, positions[i][2] + 1,
        positions[i][0] - 1, 1 + positions[i][1], positions[i][2] + 1,
        1 + positions[i][0], 1 + positions[i][1], positions[i][2] + 1,
        //third plane
        positions[i][0] + 1, positions[i][1] - 1, positions[i][2] - 1,
        1 + positions[i][0], 1 + positions[i][1], positions[i][2] + 1,
        1 + positions[i][0], positions[i][1] - 1, positions[i][2] + 1,
        positions[i][0] + 1, positions[i][1] + 1, positions[i][2] - 1,
        1 + positions[i][0], 1 + positions[i][1], positions[i][2] + 1,
        1 + positions[i][0], positions[i][1] - 1, positions[i][2] - 1,
        //fourth plane
        positions[i][0] - 1, positions[i][1] - 1, positions[i][2] - 1,
        positions[i][0] - 1, 1 + positions[i][1], positions[i][2] + 1,
        positions[i][0] - 1, positions[i][1] - 1, positions[i][2] + 1,
        positions[i][0] - 1, positions[i][1] + 1, positions[i][2] - 1,
        positions[i][0] - 1, 1 + positions[i][1], positions[i][2] + 1,
        positions[i][0] - 1, positions[i][1] - 1, positions[i][2] - 1,
        //fifth plane
        positions[i][0] - 1, positions[i][1] + 1, positions[i][2] + 1,
        positions[i][0] + 1, positions[i][1] + 1, positions[i][2] + 1,
        positions[i][0] - 1, positions[i][1] + 1, positions[i][2] - 1,
        positions[i][0] + 1, positions[i][1] + 1, positions[i][2] - 1,
        positions[i][0] + 1, positions[i][1] + 1, positions[i][2] + 1,
        positions[i][0] - 1, positions[i][1] + 1, positions[i][2] - 1,
        //sixth plane
        positions[i][0] - 1, positions[i][1] - 1, positions[i][2] + 1,
        positions[i][0] + 1, positions[i][1] - 1, positions[i][2] + 1,
        positions[i][0] - 1, positions[i][1] - 1, positions[i][2] - 1,
        positions[i][0] + 1, positions[i][1] - 1, positions[i][2] - 1,
        positions[i][0] + 1, positions[i][1] - 1, positions[i][2] + 1,
        positions[i][0] - 1, positions[i][1] - 1, positions[i][2] - 1,
      )
    }
    this._buffer.buffer(new Float32Array(this._vertices));
  }

  getBuffer() {
    return this._buffer;
  }

  createEdges(translation) {
    return [
      [translation[0] - 1, translation[1] - 1, translation[2] - 1],
      [1 + translation[0], 1 + translation[1], translation[2] - 1],
      [1 + translation[0], translation[1] - 1, translation[2] - 1],
      [1 + translation[0], 1 + translation[1], 1 + translation[2]],
      [translation[0] - 1, 1 + translation[1], 1 + translation[2]],
      [translation[0] - 1, translation[1] - 1, 1 + translation[2]],
      [translation[0] - 1, 1 + translation[1], translation[2] - 1],
      [1 + translation[0], translation[1] - 1, 1 + translation[2]]
    ]
  }
}

export default CubeGeometry;
