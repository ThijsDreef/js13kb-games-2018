import Buffer from './webgl/Buffer';
import CubeGeometry from './webgl/CubeGeometry';
import Shader from './webgl/Shader';
import Matrix from './webgl/Matrix';
import Controller from './controls/Controller';

import vert from './shaders/main.vert';
import frag from './shaders/main.frag';


const canvas = document.querySelector('.c');
const controls = new Controller(canvas);

canvas.style['touch-action'] = 'none';

canvas.width = window.innerWidth;

canvas.height = window.innerHeight;

document.body.style = 'padding: 0; margin: 0; overflow: hidden';

let matrix = new Matrix();
matrix.translate([0, 0, -4]);

matrix = matrix.rotateY(1.8);
const gl = canvas.getContext("webgl", {preserveDrawingBuffer: true});
const shader = new Shader(gl, frag, vert, {attribs: ['aPosition'], uniforms: ['uCamera', 'cameraPos']});
gl.enable(gl.DEPTH_TEST);
const positions = [];
const grid = [];
for (let i = 0; i < 10; i++) {
  const subGrid = [];
  for (let j = 0; j < 10; j++) {
    subGrid.push(false);
  }
  grid.push(subGrid);
}
addLayerToGrid(grid, 0.2, -1);

function addLayerToGrid(grid, thresHold, layer) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === false && Math.random() > thresHold) {
        positions.push([i, layer, j]);
        grid[i][j] = true;
      }
    }
  }
  if (layer < 2) addLayerToGrid(grid, 0, layer + 1);
}
const cubeBuffer = new CubeGeometry(gl, positions);

gl.clearColor(1, 1, 1, 1);
const p = new Matrix();
p.perspective(45, window.innerWidth / window.innerHeight, 0.001, 100);

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
  shader.uploadVec3([-a[0], -a[1], -a[2]], 'cameraPos');

  cubeBuffer.getBuffer().bind();
  cubeBuffer.getBuffer().point(shader, 'aPosition', 3, gl.FLOAT);

  gl.drawArrays(gl.TRIANGLES, 0, cubeBuffer._vertices.length / 3);

  requestAnimationFrame(draw);
}
