precision highp float;

varying vec3 inputPos;
varying vec3 color;

uniform vec3 lightPositions[NR_OF_LIGHTS];
uniform vec3 lightColors[NR_OF_LIGHTS];

uniform float range;
uniform float fluctate;
uniform vec3 cameraPos;

uniform float uTime;

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define NUM_OCTAVES 5

float fbm ( in vec2 _st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5),
                    -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(_st);
        _st = rot * _st * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

void main() {
  float lightDistance = 1. - length(cameraPos - inputPos) * range;
  lightDistance = clamp(lightDistance, 0., 1.);
  gl_FragColor = vec4(lightDistance, lightDistance, lightDistance, 1.);
  for (int i = 0; i < NR_OF_LIGHTS; i++) {
    lightDistance = 1. - length(lightPositions[i] - inputPos) * 0.7 + fluctate;
    lightDistance = clamp(lightDistance, 0., 1.);
    vec2 p = inputPos.xz;
    float f = fbm(p);
    f *= fbm(inputPos.xy + 0.05 *uTime);
    f *= fbm(inputPos.yz - 0.02 * uTime);
    gl_FragColor += vec4(vec3(lightDistance) * f * 4. * lightColors[i], 1.);
  }
  gl_FragColor.xyz *= color;

  gl_FragColor.w = 1.;
}
