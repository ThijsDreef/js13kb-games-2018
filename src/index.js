import Buffer from './webgl/Buffer';
import CubeGeometry from './webgl/CubeGeometry';
import Shader from './webgl/Shader';
import Matrix from './webgl/Matrix';
import Controller from './controls/Controller';

import vert from './shaders/main.vert';
import frag from './shaders/main.frag';


const canvas = document.querySelector('.c');
const desktop = new Controller(canvas);

canvas.style['touch-action'] = 'none';
console.log(canvas);
canvas.width = window.innerWidth;

canvas.height = window.innerHeight;
// canvas.style = {};
document.body.style = 'padding: 0; margin: 0; overflow: hidden';

let matrix = new Matrix();
matrix.translate([0, 0, -4]);

matrix = matrix.rotateY(1.8);
const gl = canvas.getContext("webgl", {preserveDrawingBuffer: true});
const shader = new Shader(gl, frag, vert, {attribs: ['aPosition'], uniforms: ['uCamera']});
gl.enable(gl.DEPTH_TEST);
const positions = [];

 for (let i = 0; i < 100; i ++)
   positions.push([Math.floor((Math.random() * 2 - 1) * 5), Math.floor((Math.random() * 2 - 1) * 2), Math.floor((Math.random() * 2 - 1) * 5)]);

const cubeBuffer = new CubeGeometry(gl, positions);

gl.clearColor(1, 1, 1, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
shader.bind();
shader.uploadMat4(matrix.m,'uCamera');
cubeBuffer.getBuffer().bind();
cubeBuffer.getBuffer().point(shader, 'aPosition', 3, gl.FLOAT);

let i = 0;
draw();
function draw() {
  desktop.buttonHandler();
  matrix = new Matrix();
  const p = new Matrix();
  p.perspective(45, window.innerWidth / window.innerHeight, 0.001, 100);
  i += 0.02;
  matrix = matrix.translate(desktop.getPos());
  matrix = matrix.rotateY(desktop.getRot()[1]);

  matrix = p.multiply(matrix);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  shader.bind();
  shader.uploadMat4(matrix.m,'uCamera');
  cubeBuffer.getBuffer().bind();
  cubeBuffer.getBuffer().point(shader, 'aPosition', 3, gl.FLOAT);
  gl.drawArrays(gl.TRIANGLES, 0, cubeBuffer._vertices.length / 3);
  requestAnimationFrame(draw);
}
