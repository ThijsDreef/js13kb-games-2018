precision highp float;

varying vec3 inputPos;

void main() {
  gl_FragColor = vec4(inputPos, 1.);
}
