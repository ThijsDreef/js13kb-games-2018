class Controller {
  constructor(canvas) {
      this._pos = [0, 0, 0];
      this._rot = [0, 0, 0];
      this._setupEventListeners(canvas);
      this._canvas = canvas;
      this._locked = false;
      this._lastX = 0;
      this._sensitivity = 2;
      this._down = [];
      this._up = [];
      this._mobileMove = [0, 0, 0];
      this._lastX = 0;
      for (let i = 0; i < 255; i++) {
        this._down.push(false);
        this._up.push(true);
      }
  }

  _dpadHandler(e) {
    let x = e.clientX / this._controlHeight;
    let y = (e.clientY - this._controlHeight) / this._controlHeight;
    x -= 0.5;
    y -= 0.5;
    this._mobileMove[0] = -x * 0.08;
    this._mobileMove[2] = y * 0.08;
    this._lastPointer = e;


  }
  _pointerDownAndUpHandler(e) {
    this._lastX = e.clientX;
    this._lastY = e.clientY;
  }

  _pointerHandler(e) {
    this._rot[1] += ((e.clientX - this._lastX) / window.innerWidth) * 5;
    this._rot[0] += ((e.clientY - this._lastY) / window.innerHeight) * 2;
    this._lastX = e.clientX;
    this._lastY = e.clientY;

  }

  _clickHandler() {
	if (!this._locked) {
      this._canvas.requestPointerLock();
    }
  }

  _pointerLockHandler(e) {
    this._locked = !this._locked;
  }

  _mouseHandler(e) {
    this._rot[1] += -((e.movementX / window.innerWidth) * this._sensitivity);
    this._rot[0] += -((e.movementY / window.innerHeight) * this._sensitivity);
    
  }

  _keyBoardHandler(e) {
    if (e.type === 'keydown') {

      this._up[e.keyCode] = false;
      this._down[e.keyCode] = true;
    }
    else {
      this._up[e.keyCode] = true;
      this._down[e.keyCode] = false;

    }
  }

  mobileMoveHandler() {
	this._pos[0] += (this._mobileMove[0] * Math.cos(this._rot[1]) - this._mobileMove[2] * Math.sin(this._rot[1]));
    this._pos[1] += this._mobileMove[1];
    this._pos[2] += -this._mobileMove[0] * Math.sin(this._rot[1]) - this._mobileMove[2] * Math.cos(this._rot[1]);
  }
  
  desktopMoveHandler() {
	const moveVector = [0, 0, 0];
    for (let i = 0; i < this._down.length; i++) {
      const char = (!this._down[i]) ? i : 0;
      switch (char) {
        case 65:
        moveVector[0] -= 0.05;
        break;
        case 87:
        moveVector[2] += 0.05;
        break;
        case 83:
        moveVector[2] -= 0.05;
        break;
        case 68:
        moveVector[0] += 0.05;
        break;
        default:

      }

    }
    this._pos[0] += moveVector[0] * Math.cos(this._rot[1]) - moveVector[2] * Math.sin(this._rot[1]);
    this._pos[1] += moveVector[1];
    this._pos[2] += -moveVector[0] * Math.sin(this._rot[1]) - moveVector[2] * Math.cos(this._rot[1]);
  }

  moveHandler() {
	this._rot[0] = Math.min(Math.max(-0.6, this._rot[0]), 0.9)
	if (this._mobile) this.mobileMoveHandler();
	else this.desktopMoveHandler();


  }

  _pointerUpHandler(e)  {

    if (e.pointerId === this._lastPointer.pointerId) {
      this._mobileMove[0] = 0;
      this._mobileMove[2] = 0;
    }
  }

  _setupEventListeners(canvas) {
    if (window.orientation === undefined) {
	  this._mobile = false;
      document.addEventListener('pointerlockchange', this._pointerLockHandler.bind(this));
      canvas.addEventListener('click', this._clickHandler.bind(this));
      canvas.addEventListener('mousemove', this._mouseHandler.bind(this));
      document.addEventListener('keydown', this._keyBoardHandler.bind(this));
      document.addEventListener('keyup', this._keyBoardHandler.bind(this));
    }
    else {
	  this._mobile = true;
      canvas.addEventListener('pointermove', this._pointerHandler.bind(this));
      canvas.addEventListener('pointerup', this._pointerDownAndUpHandler.bind(this));
      canvas.addEventListener('pointerdown', this._pointerDownAndUpHandler.bind(this));
      const div = document.querySelector('.control');
      div.addEventListener('pointerup', this._pointerUpHandler.bind(this));
      div.addEventListener('pointermove', this._dpadHandler.bind(this));
      this._mobileControls = document.querySelector('.control');
      this._mobileControls.style.position = 'absolute';
      this._mobileControls.style.backgroundColor = 'orange';
      this._topOffset = (window.innerHeight / 2);
      this._controlHeight = window.innerHeight / 2;
      this._mobileControls.style.top = this._topOffset + 'px';
      this._mobileControls.style.width = (window.innerHeight / 2) + 'px';
      this._mobileControls.style.height = (window.innerHeight / 2) + 'px';
    }
  }


  getRot() {
    return this._rot;
  }

  getPos() {
    return this._pos;
  }

}

export default Controller;
