class Music {
    constructor() {
        this._context = new AudioContext()
        this._oscilator = this._context.createOscillator()
        this._gain = this._context.createGain()
        this._oscilator.connect(this._gain)
        this._gain.connect(this._context.destination)
        this._oscilator.start(0)
        this._updateNote = this._updateNote.bind(this);
        this._frequencies = [261.6, 277.2, 293.7, 261.6, 293.7, 277.2, 311.1, 329.6, 349.2, 392, 293.7, 277.2, 293.7, 261.6];
        this._speeds = [250, 300, 325, 350, 325, 350, 375, 380, 330, 310, 280, 300, 325]
        this._current = 0;
        this.speed = 1.25;
        
        this._update = false;
        requestAnimationFrame(this._updateNote);
    }

    _updateNote() {
        // console.log(this._current);
        this._current++;
        this._current = this._current % this._frequencies.length;
        this._oscilator.frequency.value = (this._frequencies[this._current] * this.speed);
        setTimeout(this._updateNote, this._speeds[this._current] * this.speed);

    }
}

export default Music;