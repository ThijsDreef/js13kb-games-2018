precision highp float;

varying vec3 inputPos;

uniform vec3 cameraPos;

void main() {
  gl_FragColor.xyzw = vec4(clamp(1. - length(cameraPos - inputPos) / 4., 0., 1.), 0., 0., 1.);

}
