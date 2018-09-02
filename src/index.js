import CubeGeometry from './webgl/CubeGeometry';
import Shader from './webgl/Shader';
import Matrix from './webgl/Matrix';
import Physics from './physics/Physics';
import Controller from './controls/Controller';
import Lights from './lighting/lights';

import levels from './data/data.json';

import vert from './shaders/main.vert';
import frag from './shaders/main.frag';

const canvas = document.querySelector('.c');
canvas.style['touch-action'] = 'none';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.body.style = 'padding: 0; margin: 0; overflow: hidden';

const gl = canvas.getContext("webgl", {preserveDrawingBuffer: true});
const shader = new Shader(gl, frag.replace(new RegExp('NR_OF_LIGHTS', 'g'), levels[0].lights.length), vert, {attribs: ['aPosition', 'aColor'], uniforms: ['fluctate', 'uModel','range', 'uCamera', 'cameraPos', 'lightPositions', 'lightColors']});
const physics = new Physics();
const lights = new Lights(shader);
const controls = new Controller(canvas, physics);


const positions = physics.loadTerrain(levels[0]);
const walls = new CubeGeometry(gl, positions.wall);
const ground = new CubeGeometry(gl, positions.ground);

for (let i = 0; i < levels[0].lights.length; i++) {
  lights.addLight(levels[0].lights[i]);
}

const pickUpBuffer = [];
const pickups = [];
for (let i = 0; i < levels[0].pickups.length; i++) {
    pickups.push(levels[0].pickups[i]);
    pickUpBuffer.push(new CubeGeometry(gl, [[0, 0, 0]], levels[0].pickups[i].color));
}
let matrix = new Matrix();
const p = new Matrix();

p.perspective(45, window.innerWidth / window.innerHeight, 0.0001, 100);

gl.clearColor(1, 1, 1, 1);
gl.enable(gl.DEPTH_TEST);

let range = 0.6;
let fluctate = 0;
const fluctateRange = 0.05;
let o = 0;

let model = new Matrix();

draw();

function drawCubeBuffer(cubeGeometry) {
  cubeGeometry.getBuffer().bind();
  cubeGeometry.getBuffer().point(shader, 'aPosition', 3, gl.FLOAT);
  cubeGeometry.getColorBuffer().bind();
  cubeGeometry.getColorBuffer().point(shader, 'aColor', 3, gl.FLOAT);
  gl.drawArrays(gl.TRIANGLES, 0, cubeGeometry._vertices.length / 3);
}
function draw() {
  o += 0.02;
  fluctate = Math.cos(o) * fluctateRange;
  controls.moveHandler();
  matrix.identity();
  const a = controls.getPos();

  matrix = matrix.rotateX(controls.getRot()[0]);
  matrix = matrix.rotateY(controls.getRot()[1]);
  matrix = matrix.translate(a);
  matrix = p.multiply(matrix);
  if (physics.testPlayerAgainstLights([-a[0], -a[1], -a[2]], lights.getLights())) {
    
  }

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  model.identity();

  shader.bind();
  shader.uploadMat4(matrix.m,'uCamera');
  shader.uploadMat4(model.m, 'uModel');

  shader.uploadVec3([-a[0], -a[1] + 0.5, -a[2]], 'cameraPos');
  shader.uploadFloat(range + fluctate, 'range');
  shader.uploadFloat(fluctate, 'fluctate');

  lights.updateShader();
  drawCubeBuffer(walls);
  drawCubeBuffer(ground);

  for (let i = 0; i < pickUpBuffer.length; i++) {
    model.identity();
    model = model.translate(pickups[i].position);
    model = model.scale([0.2, 0.2, 0.2]);
    model = model.rotateY(o);
    model = model.rotateX(o);
    shader.uploadMat4(model.m, 'uModel');
    drawCubeBuffer(pickUpBuffer[i]);
  }

  requestAnimationFrame(draw);
}
