import Buffer from './buffer';

class CubeGeometry {
  constructor(gl, positions) {
    this._gl = gl;
    this._buffer = new Buffer(gl, null);
    this.setupBuffer(positions)
  }
  
  setupBuffer(positions) {
	this._vertices = [];
	for (let i = 0; i < positions.length; i++) {
		for (let j = 0; j < 72; j++) {
			this._vertices.push(Math.random());
		}
	this._buffer.buffer(new Float32Array(this._vertices));
  }

  getBuffer() {
    return this._buffer;
  }
}

export default CubeGeometry;
