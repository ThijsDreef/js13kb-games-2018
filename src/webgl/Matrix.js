class Matrix {
  constructor() {
    this.m = [];
    this.identity();
  }

  identity() {
    for (let i = 0 ; i < 16; i ++)
      this.m.push(0);
    for (let i = 0; i < 16; i += 5)
      this.m[i] = 1;
  }

  perspective(fov, aspect, zNear, zFar) {
    let fovY = fov * Math.PI / 180;
    let tangent = Math.tan(fovY / 2 ); // tangent of half fovY
    let height = zNear * tangent;         // half height of near plane
    let width = height * aspect;   // half width of near plane

    this.m[0] = 2 * zNear / (width - -width);
    this.m[5] = 2 * zNear / (height - -height);
    this.m[8] = (width + -width) / (width - -width);
    this.m[9] = (height + -height) / (height - -height);
    this.m[10] = -(zFar + zNear) / (zFar - zNear);
    this.m[11] = -1;
    this.m[14] = -(2 * zFar * zNear) / (zFar - zNear);
  }

  multiply(m) {
    let out = new Matrix();
    for (let i = 0; i < 16; i++)
      out.m[i] = this.m[i % 4] * m.m[Math.floor((i | 1) / 4) * 4] + this.m[i % 4 + 4] * m.m[(Math.floor((i | 1) / 4) * 4) + 1] + this.m[i % 4 + 8] * m.m[Math.floor((i | 1) / 4) * 4 + 2] + this.m[i % 4 + 12] * m.m[Math.floor((i | 1) / 4) * 4 + 3];
    return out;
  }

  translate(position) {
    let m = new Matrix();
    for (let i = 0; i < 3; i++) {
      m.m[i + 12] = position[i];
    }
    return m.multiply(this);
  }

  rotateY(radians) {
    let m = new Matrix();
    m.m[0] = Math.cos(radians);
		m.m[2] = Math.sin(radians);
		m.m[5] = 1;
		m.m[8] = -Math.sin(radians);
		m.m[10] = Math.cos(radians);
    m.m[15] = 1;
    return m.multiply(this);
  }

  rotateX(radians) {
    let m = new Matrix();
    m.m[0] = 1;
    m.m[5] = Math.cos(radians);
		m.m[6] = -Math.sin(radians);
  	m.m[9] = Math.sin(radians);
  	m.m[10] = Math.cos(radians);
    m.m[15] = 1;
    return m.multiply(this);
  }
}

export default Matrix;
