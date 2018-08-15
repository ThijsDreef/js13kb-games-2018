class Shader {
  constructor(gl, frag, vert, info) {
    this._gl = gl;
    this.rawAttribs = info.attribs;
    this.rawUniforms = info.uniforms;
    this.program = gl.createProgram();
    this.vs = gl.createShader(gl.VERTEX_SHADER);
    this.fs = gl.createShader(gl.FRAGMENT_SHADER);
    this.compileShader(this._gl, this.vs, vert);
    this.compileShader(this._gl, this.fs, frag);

    gl.attachShader(this.program, this.vs);
    gl.attachShader(this.program, this.fs);
    gl.linkProgram(this.program);

    if (Program.debug && !gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      warn(gl.getProgramInfoLog(this.program));
    }

    this.grabParameters();
  }

  uploadInt(data, name) {
    this.gl.uniform1i(this.uniforms[name], data);
  }

  uploadFloat(data, name) {
    this._gl.uniform1f(this.uniforms[name], data);
  }

  uploadVec2(data, name) {
    this._gl.uniform2fv(this.uniforms[name], data);
  }

  uploadVec3(data, name) {
    this._gl.uniform3fv(this.uniforms[name], data);
  }

  uploadVec4(data, name) {
    this._gl.uniform4fv(this.uniforms[name], data);

  }

  uploadMat4(data, name) {
    this._gl.uniformMatrix4fv(this.uniforms[name], false, data);
  }

  grabParameters() {
    this.uniforms = [];
    for (let i = 0; i < this.rawUniforms.length; i++) {
      this.uniforms[this.rawUniforms[i]] = (this._gl.getUniformLocation(this.program, this.rawUniforms[i]));
    }
    this.attribs = [];
    for (let i = 0; i < this.rawAttribs.length; i++) {
      this.attribs[this.rawAttribs[i]] = (this._gl.getAttrib(this.program, this.rawAttribs[i]));
    }
  }

  compileShader(gl, shader, code){
    gl.shaderSource(shader, code);
    gl.compileShader(shader);

    if (Program.debug && !gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      warn(gl.getShaderInfoLog(shader));
      warn(formatCode(code));
      return false;
    }

    return true;
  }
}

export default Shader;
