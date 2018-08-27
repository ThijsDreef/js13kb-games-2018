import CubeGeometry from './webgl/CubeGeometry';
import Shader from './webgl/Shader';
import Matrix from './webgl/Matrix';
import Physics from './physics/Physics';
import Controller from './controls/Controller';
import Lights from './lighting/lights';

import levels from './data/data.json';

import vert from './shaders/main.vert';
import frag from './shaders/main.frag';

console.log(levels);

const canvas = document.querySelector('.c');
canvas.style['touch-action'] = 'none';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.body.style = 'padding: 0; margin: 0; overflow: hidden';

const gl = canvas.getContext("webgl", {preserveDrawingBuffer: true});
const shader = new Shader(gl, frag.replace(new RegExp('NR_OF_LIGHTS', 'g'), levels[0].lights.length), vert, {attribs: ['aPosition'], uniforms: ['uCamera', 'cameraPos', 'lightPositions', 'lightColors']});
const physics = new Physics();
const lights = new Lights(shader);
const controls = new Controller(canvas, physics);
const positions = physics.loadTerrain(levels[0]);
const cubeBuffer = new CubeGeometry(gl, positions);

for (let i = 0; i < levels[0].lights.length; i++) {
  lights.addLight(levels[0].lights[i]);
}

let matrix = new Matrix();
const p = new Matrix();

p.perspective(45, window.innerWidth / window.innerHeight, 0.0001, 100);

gl.clearColor(1, 1, 1, 1);
gl.enable(gl.DEPTH_TEST);

draw();

function draw() {
  controls.moveHandler();
  matrix.identity();
  const a = controls.getPos();

  matrix = matrix.rotateX(controls.getRot()[0]);
  matrix = matrix.rotateY(controls.getRot()[1]);
  matrix = matrix.translate(a);
  matrix = p.multiply(matrix);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  shader.bind();
  shader.uploadMat4(matrix.m,'uCamera');
  shader.uploadVec3([-a[0], -a[1] + 0.5, -a[2]], 'cameraPos');
  lights.updateShader();

  cubeBuffer.getBuffer().bind();
  cubeBuffer.getBuffer().point(shader, 'aPosition', 3, gl.FLOAT);
  gl.drawArrays(gl.TRIANGLES, 0, cubeBuffer._vertices.length / 3);

  requestAnimationFrame(draw);
}
