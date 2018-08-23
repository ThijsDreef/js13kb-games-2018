precision highp float;

varying vec3 inputPos;

uniform vec3 cameraPos;

void main() {
  float lightDistance = 1. - length(cameraPos - inputPos) * 0.25;
  gl_FragColor.xyzw = vec4(lightDistance, lightDistance, lightDistance, 1.);
}
