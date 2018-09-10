import Level from './level';
import levelData from './data/data.json';

const canvas = document.querySelector('.c');
const gl = canvas.getContext("webgl", {preserveDrawingBuffer: true});
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

canvas.style['touch-action'] = 'none';
document.body.style = 'padding: 0; margin: 0; overflow: hidden';

gl.enable(gl.DEPTH_TEST);
gl.viewport(0, 0, canvas.width, canvas.height);

const level = new Level(canvas, gl, levelData);
level.menu();