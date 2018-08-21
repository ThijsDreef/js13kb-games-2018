precision highp float;

varying vec3 inputPos;

uniform vec3 cameraPos;

void main() {
  gl_FragColor = clamp(length(inputPos - cameraPos) , 0., 1.) * vec4(inputPos, 1.);
}
