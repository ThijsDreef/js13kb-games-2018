import Buffer from './webgl/Buffer';
import Shader from './webgl/Shader';

const canvas = document.querySelector('.c');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style = {};
document.body.style = 'padding: 0; margin: 0; overflow: hidden';

const gl = canvas.getContext("webgl");

gl.clearColor(0, 1, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
