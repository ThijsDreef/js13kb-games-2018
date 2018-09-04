import CubeGeometry from './webgl/CubeGeometry';
import Shader from './webgl/Shader';
import Matrix from './webgl/Matrix';
import Physics from './physics/Physics';
import Controller from './controls/Controller';
import Lights from './lighting/lights';

import vert from './shaders/main.vert';
import frag from './shaders/main.frag';

class Level {
    constructor(canvas, gl, levels) {
        this._canvas = canvas;
        this._gl = gl;
        this._levels = levels;
        this._boundPlay = this.play.bind(this);
        this._physics = new Physics();
        this.time = 0;
        this._fluctateRange = 0.05;
        this._range = 0.7;
        this._p = new Matrix();
        this._p.perspective(45, window.innerWidth / window.innerHeight, 0.01, 100);
        this._matrix = new Matrix();
        this._model = new Matrix();
        
        this._controls = new Controller(canvas, this._physics);
    }

    playLevel(id) {
        this._shader = new Shader(this._gl, frag.replace(new RegExp('NR_OF_LIGHTS', 'g'), this._levels[0].lights.length), vert, {attribs: ['aPosition', 'aColor'], uniforms: ['fluctate', 'uModel','range', 'uCamera', 'cameraPos', 'lightPositions', 'lightColors']});
        this._lights = new Lights(this._shader);
        this._positions = this._physics.loadTerrain(this._levels[id]);
        this._walls = new CubeGeometry(this._gl, this._positions.wall);
        this._ground = new CubeGeometry(this._gl, this._positions.ground);

        for (let i = 0; i < this._levels[id].lights.length; i++) {
            this._lights.addLight(this._levels[id].lights[i]);
        }
          
        this._pickUpBuffer = [];
        this._pickups = [];
        for (let i = 0; i < this._levels[0].pickups.length; i++) {
            this._pickups.push(this._levels[0].pickups[i]);
            this._pickUpBuffer.push(new CubeGeometry(this._gl, [[0, 0, 0]], this._levels[0].pickups[i].color));
        }

        this.play();
    }

    drawCubeBuffer(cubeGeometry) {
        cubeGeometry.getBuffer().bind();
        cubeGeometry.getBuffer().point(this._shader, 'aPosition', 3, this._gl.FLOAT);
        cubeGeometry.getColorBuffer().bind();
        cubeGeometry.getColorBuffer().point(this._shader, 'aColor', 3, this._gl.FLOAT);
        this._gl.drawArrays(this._gl.TRIANGLES, 0, cubeGeometry._vertices.length / 3);
    }

    play() {
        this.time += 0.02;
        const fluctate = Math.cos(this.time) * this._fluctateRange;
        this._controls.moveHandler();
        this._matrix.identity();
        const a = this._controls.getPos();
      
        this._matrix = this._matrix.rotateX(this._controls.getRot()[0]);
        this._matrix = this._matrix.rotateY(this._controls.getRot()[1]);
        this._matrix = this._matrix.translate(a);
        this._matrix = this._p.multiply(this._matrix);
        if (this._physics.testPlayerAgainstLights([-a[0], -a[1], -a[2]], this._lights.getLights())) {
        //   alert('you died');
        }
      
        this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
        this._model.identity();
      
        this._shader.bind();
        this._shader.uploadMat4(this._matrix.m,'uCamera');
        this._shader.uploadMat4(this._model.m, 'uModel');
      
        this._shader.uploadVec3([-a[0], -a[1] + 0.5, -a[2]], 'cameraPos');
        this._shader.uploadFloat(this._range + fluctate, 'range');
        this._shader.uploadFloat(fluctate, 'fluctate');
      
        this._lights.updateShader();
        this.drawCubeBuffer(this._walls);
        this.drawCubeBuffer(this._ground);
      
        for (let i = 0; i < this._pickUpBuffer.length; i++) {
          this._model.identity();
          this._model = this._model.translate(this._pickups[i].position);
          this._model = this._model.scale([0.2, 0.2, 0.2]);
          this._model = this._model.rotateY(this.time);
          this._model = this._model.rotateX(this.time);
          this._shader.uploadMat4(this._model.m, 'uModel');
          this.drawCubeBuffer(this._pickUpBuffer[i]);
        }

        requestAnimationFrame(this._boundPlay);
    }
}

export default Level;