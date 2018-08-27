precision highp float;

attribute vec3 aPosition;
attribute vec3 aColor;

varying vec3 color;
varying vec3 inputPos;

uniform mat4 uCamera;
void main() {
  color = aColor;
  inputPos = aPosition;
  gl_Position = uCamera * vec4(aPosition, 1);
}
