var HID = require('node-hid'),
  colors = require('colors'),
  events = require('events'),
  util = require('util');

var dead = 10

var buttons = {
  CWIID_BTN_2: {
    block: 1,
    bitwise: 100
  },
  CWIID_BTN_1: {
    block: 1,
    bitwise: 10
  },
  CWIID_BTN_B: {
    block: 0,
    bitwise: 100000
  },
  CWIID_BTN_A: {
    block: 0,
    bitwise: 10000
  },
  CWIID_BTN_MINUS: {
    block: 0,
    bitwise: 10000000
  },
  CWIID_BTN_HOME: {
    block: 1,
    bitwise: 1
  },
  CWIID_BTN_LEFT: {
    block: 0,
    bitwise: 1
  },
  CWIID_BTN_RIGHT: {
    block: 0,
    bitwise: 10
  },
  CWIID_BTN_DOWN: {
    block: 0,
    bitwise: 1000
  },
  CWIID_BTN_UP: {
    block: 0,
    bitwise: 100
  },
  CWIID_BTN_PLUS: {
    block: 0,
    bitwise: 1000000
  },
  CWIID_NUNCHUK_BTN_Z: {
    block: 1,
    bitwise: 10000
  },
  CWIID_NUNCHUK_BTN_C: {
    block: 1,
    bitwise: 1000
  }
}

function wiiController() {

  var devices = HID.devices();

  this.states = {};

    devices.forEach((function(d) {
      if(typeof d === 'object' && d.product.toLowerCase().indexOf('wiimote') !== -1) {

        device = new HID.HID(d.path)
      }
    }).bind(this))

    try{
      this.hid = device

      for (var key in buttons) {
        this[key] = 0;
      }
      this.states.x = 0;
      this.states.y = 0;
      this.hid.read(this.interpretData.bind(this));
    }
    catch ( ex ){
      console.log( 'error: '.red, 'Wii controller could not be found.' );
    }
}

util.inherits(wiiController, events.EventEmitter);

wiiController.prototype.interpretData = function(error, data) {

  y = data[11]
  if (y >= 128){
    // up
    y = (128 - (y - 128))
  } else {
    // down
    y =  - y
  }

  x = data[10]
  if (x >= 128){
    // right
    x = (128 - (x - 128))
  } else {
    // left
    x =  - x
  }

    if(x ^ this.x | y ^ this.y){
      if (x > -1*dead && x < dead ){
        x = 0
      }
      if (y > -1*dead && y < dead ){
        y = 0
      }

      this.emit('move', {x: x, y: y})
      this.states.x = x
      this.states.y = y
    }

  for (var key in buttons) {
    var address = buttons[key]
    var state = data[address.block] & parseInt(address.bitwise, 2);

    if(state ^ this.states[key]){
      this.emit((state ? key+':press': key+':release'), key);
      this.states[key] = state;
    }
  }

  this.hid.read(this.interpretData.bind(this));
}

module.exports = wiiController
