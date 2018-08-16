precision highp float;

attribute vec3 aPosition;
varying vec3 inputPos;

uniform mat4 uCamera;
void main() {
  inputPos = aPosition;
  gl_Position = uCamera * vec4(aPosition, 1);
}
