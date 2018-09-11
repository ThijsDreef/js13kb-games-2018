import CubeGeometry from './webgl/CubeGeometry';
import Shader from './webgl/Shader';
import Matrix from './webgl/Matrix';
import Physics from './physics/Physics';
import Controller from './controls/Controller';
import Lights from './lighting/lights';
import Background from './Background';

import vert from './shaders/main.vert';
import frag from './shaders/main.frag';

class Level {
    constructor(canvas, gl, levels) {
        gl.cullFace(gl.FRONT_AND_BACK);
        this._background = new Background(gl,[canvas.width, canvas.height]);
        this._canvas = canvas;
        this._gl = gl;
        this._levels = levels;
        this._physics = new Physics();
        this.time = 0;
        this._fluctateRange = 0.05;
        this._range = 0.7;
        this._p = new Matrix();
        this._p.perspective(45, window.innerWidth / window.innerHeight, 0.01, 100);
        this._matrix = new Matrix();
        this._model = new Matrix();
        this._controls = new Controller(canvas, this._physics);
        this._setUpGameOver();
        this._targetBuffer = new CubeGeometry(this._gl, [[0,0,0]]);

        this._boundPlay = this.play.bind(this);
        this._boundPlayLevel = this.playLevel.bind(this);
        this._setupMenu();
    }

    playLevel(id) {
        this._levelId = id;
        this._shader = new Shader(this._gl, frag.replace(new RegExp('NR_OF_LIGHTS', 'g'), this._levels[0].lights.length), vert, {attribs: ['aPosition', 'aColor'], uniforms: ['fluctate', 'uModel','range', 'uCamera', 'cameraPos', 'lightPositions', 'lightColors']});
        this._lights = new Lights(this._shader);
        this._positions = this._physics.loadTerrain(this._levels[id]);
        this._walls = new CubeGeometry(this._gl, this._positions.wall);
        this._ground = new CubeGeometry(this._gl, this._positions.ground);
        this._controls.setPos(this._levels[id].playerPosition);
        for (let i = 0; i < this._levels[id].lights.length; i++) {
            this._lights.addLight(this._levels[id].lights[i]);
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

    _setupMenu() {
        const div = document.createElement('div');
        div.style.position = 'absolute';
        div.className = 'menu';
        div.style.top = '0';
        const title = document.createElement('h1');
        title.textContent = 'Menu';
        div.appendChild(title);
        for (let i = 0; i < this._levels.length; i++) {
            const button = document.createElement('button');
            button.textContent = 'play level: ' + (i + 1);
            button.addEventListener('click', ()=> {
                this._boundPlayLevel(i)
                this.closeMenu();
            });
            div.appendChild(button);
        }
        this._menu = div;
    }

    _setUpGameOver() {
        const div = document.createElement('div');
        const title = document.createElement('h1');
        const replay = document.createElement('button');
        const menu = document.createElement('button');
        div.className = 'menu';
        div.style.position = 'absolute';
        div.style.top = '0';

        title.textContent = 'Game Over';
        div.appendChild(title);

        replay.addEventListener('click', ()=>{
            this.closeGameOver();
            this.playLevel(this._levelId);

        });
        replay.textContent = 'replay';

        menu.addEventListener('click', ()=>{
            this.closeGameOver();
            this.menu();
        });

        menu.textContent = 'menu';

        div.appendChild(title);
        div.appendChild(replay);
        div.appendChild(menu);
        

        this._gameOver = div;
    }

    gameOver() {
        this._background.startDraw();
        this._gl.clear(this._gl.COLOR_BUFFER_BIT);
        this._controls.releasePointer();
        document.body.appendChild(this._gameOver);
    }

    closeGameOver() {
        this._background.stopDraw();
        document.body.removeChild(this._gameOver);
    }

    menu() {
        this._background.startDraw();
        this._gl.clear(this._gl.COLOR_BUFFER_BIT);
        this._controls.releasePointer();
        document.body.appendChild(this._menu);
    }

    closeMenu() {
        this._background.stopDraw();
        document.body.removeChild(this._menu);
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
            this.gameOver();
            return;
        } else {
            const dx = Math.abs((-a[0]) - this._levels[this._levelId].target[0]);
            const dy = Math.abs((-a[2]) - this._levels[this._levelId].target[2]);
            if (Math.sqrt(dx * dx + dy * dy) < 0.25) {
                this.menu();
                return;
            }
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
      
        this._model.identity();
        this._model = this._model.translate(this._levels[this._levelId].target);
        this._model = this._model.scale([0.2, 0.2, 0.2]);
        this._model = this._model.rotateY(this.time);
        this._model = this._model.rotateX(this.time);
        this._shader.uploadMat4(this._model.m, 'uModel');
        this.drawCubeBuffer(this._targetBuffer);

        requestAnimationFrame(this._boundPlay);
    }
}

export default Level;
