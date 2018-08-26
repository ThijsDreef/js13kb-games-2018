class Lights {
    constructor(shader, nrOfLights) {
        this._shader = shader;
        this._lights = [];
        this._needsUpdate = true;
    }

    addLight(light) {
        console.log(light);
        
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
            positions.push(...this._lights[i].position);
            colors.push(...this._lights[i].color);
        }
        this._shader.uploadVec3(colors, 'lightColors');
        this._shader.uploadVec3(positions, 'lightPositions');

    }
}

export default Lights;