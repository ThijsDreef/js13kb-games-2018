import Buffer from "./webgl/Buffer";
import Shader from "./webgl/Shader";
import vert from "./shaders/plane.vert";
import frag from "./shaders/plane.frag";


class Background {

    constructor(gl, resolution) {
        this._gl = gl;
        this._resolution = resolution;
        console.log(this._resolution)
        this.draw = this.draw.bind(this);
        this._buffer = new Buffer(gl, new Float32Array([-1, -1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1]));
        console.log(this._buffer);
        this._shader = new Shader(gl, frag, vert, {attribs: ['aPosition'], uniforms: ['uTime', 'uResolution']});
        this._baseTime = new Date().getTime();
    }
    
    draw() {
        this._gl.clear(this._gl.DEPTH_BUFFER_BIT | this._gl.COLOR_BUFFER_BIT);
        this._shader.bind();
        this._shader.uploadFloat((this._baseTime - new Date().getTime()) * 0.001, 'uTime');
        this._shader.uploadVec2(this._resolution);
        this._buffer.bind();
        this._buffer.point(this._shader, 'aPosition', 2, this._gl.FLOAT);
        this._gl.drawArrays(this._gl.TRIANGLES, 0, 6);

        if (this._drawing) requestAnimationFrame(this.draw);
    }

    startDraw() {
        this._drawing = true;
        requestAnimationFrame(this.draw);
    }

    stopDraw() {
        this._drawing = false;
    }
}

export default Background;