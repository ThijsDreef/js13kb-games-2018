precision highp float;

varying vec3 inputPos;

uniform vec3 lightPositions[NR_OF_LIGHTS];
uniform vec3 lightColors[NR_OF_LIGHTS];

uniform vec3 cameraPos;

void main() {
  float lightDistance = 1. - length(cameraPos - inputPos) * 0.45;
  lightDistance = clamp(lightDistance, 0., 1.);
  gl_FragColor = vec4(lightDistance, lightDistance, lightDistance, 1.);
  for (int i = 0; i < NR_OF_LIGHTS; i++) {
    lightDistance = 1. - length(lightPositions[i] - inputPos) * 0.45;
    lightDistance = clamp(lightDistance, 0., 1.);
    gl_FragColor += vec4(vec3(lightDistance) * lightColors[i], 1.);
  }

  gl_FragColor.w = 1.;
}
