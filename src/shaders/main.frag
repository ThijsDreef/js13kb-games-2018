precision highp float;

varying vec3 inputPos;

void main() {
  gl_FragColor = vec4(inputPos, 1.);
  gl_FragColor.w = 1.;
}
