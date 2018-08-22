precision highp float;

varying vec3 inputPos;

uniform vec3 cameraPos;

void main() {
  float x = mod(inputPos.x, 1.);
  float y = mod(inputPos.y, 0.5);
  float z = mod(inputPos.z, 1.);
  y = 1. - y;
  gl_FragColor.xyzw = vec4(clamp(1. - length(cameraPos - inputPos) / 2., 0., 1.) + 0.1, 0., 0, 1.);

}
