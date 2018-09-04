class Lights {
    constructor(shader, nrOfLights) {
        this._shader = shader;
        this._lights = [];
        this._needsUpdate = true;
    }

    getLights() {
        return this._lights;
    }

    addLight(light) {
      light.position = light.positions[0].slice();
      light.toNr = 1;
      light.fromNr = 0;
      this._lights.push(light);
    }

    findById(id) {
        for (let i = 0; i < this._lights.length; i++) if (this._lights[i].id === id) return this._lights[i];
        return {};
    }

    removeById(id) {
        for (let i = 0; i < this._lights.length; i++) if (this._lights[i].id === id) this._lights.splice(i, 1);
    }

    // make sure shader is bound before updating
    updateShader() {
        if (!this._needsUpdate) return;
        const positions = [];
        const colors = [];
        for (let i = 0; i < this._lights.length; i++) {
            if (this._lights === null) break;
            this.updateLightPosition(this._lights[i]);
            positions.push(...this._lights[i].position);
            colors.push(...this._lights[i].color);
        }
        this._shader.uploadVec3(colors, 'lightColors');
        this._shader.uploadVec3(positions, 'lightPositions');

    }

    updateLightPosition(light) {
        window.light = light;
        let moved = false;
        if (!(light.position[0] > light.positions[light.toNr][0] - 0.1 && light.position[0] < light.positions[light.toNr][0] + 0.1)) {
            moved = true;
            light.position[0] = this.lerp(light.position[0], light.positions[light.toNr][0], 0.012375)
        }
        if (!(light.position[2] > light.positions[light.toNr][2] - 0.1 && light.position[2] < light.positions[light.toNr][2] + 0.1)) {
            moved = true;
            light.position[2] = this.lerp(light.position[2], light.positions[light.toNr][2], 0.012375);
        }
        if (!moved) {
            light.toNr++;
            light.toNr = light.toNr % light.positions.length;
        }
    }

    lerp(from, target, speed) {
        return from + speed * (target - from);
    }
}

export default Lights;
