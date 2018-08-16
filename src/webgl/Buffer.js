const AB = 0x8892;
const SD = 0x88E4;
class Buffer {
  constructor(gl, data) {
    this._gl = gl;
    this.id = gl.createBuffer();
    this.buffer(data);
  }

  bind() {
    this._gl.bindBuffer(AB, this.id);
  }

  buffer(data){
    this.bind();
    this._gl.bufferData(AB, data, SD);
  }

  point(shader, attrib, size, type) {
    this.bind();
    const attribLocation = shader.attribs[attrib];
    this._gl.enableVertexAttribArray(attribLocation);
    this._gl.vertexAttribPointer(attribLocation, size, type, false, 0, 0);
  }
}

export default Buffer;
