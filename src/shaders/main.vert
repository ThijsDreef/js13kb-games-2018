precision highp float;

attribute vec3 aPosition;
attribute vec3 aColor;

varying vec3 color;
varying vec3 inputPos;

uniform mat4 uCamera;
uniform mat4 uModel;
void main() {
  color = aColor;
  inputPos = (uModel * vec4(aPosition, 1)).xyz;
  gl_Position = uCamera * uModel * vec4(aPosition, 1);
}
