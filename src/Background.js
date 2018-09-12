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
        this._shader = new Shader(gl, frag, vert, {attribs: ['aPosition'], uniforms: ['uTime', 'uAspect']});
        this._baseTime = new Date().getTime();
        this._aspect = [resolution[0] / resolution[1], resolution[1] / resolution[0]];
        if (this._aspect[0] > this._aspect[1]) {
			this._aspect[1] = 1;
		} else {
			this._aspect[0] = 1;
		}
    }
    
    draw() {
        this._gl.clear(this._gl.DEPTH_BUFFER_BIT | this._gl.COLOR_BUFFER_BIT);
        this._shader.bind();
        this._shader.uploadFloat((this._baseTime - new Date().getTime()) * 0.001, 'uTime');
        this._shader.uploadVec2(this._aspect, 'uAspect');
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
