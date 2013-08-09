# Node Wii Controller

Interface for Wiimote game controller into Node.js

Mac OSX driver: https://code.google.com/p/wjoy/

## Usage

    var wiiController = require('wii-controller')
    var wii = new wiiController

    wii.on("CWIID_BTN_1:press", function(key) {
      console.log("CWIID_BTN_1 press");
    });

    wii.on("CWIID_BTN_2:press", function(key) {
      console.log("CWIID_BTN_2 press");
    });

    wii.on("CWIID_BTN_HOME:press", function(key) {
      console.log("CWIID_BTN_HOME press");
    });

    wii.on("CWIID_BTN_LEFT:press", function(key) {
      console.log("CWIID_BTN_LEFT press (left)");
    });

    wii.on("CWIID_BTN_RIGHT:press", function(key) {
      console.log("CWIID_BTN_RIGHT press (right)");
    });

    wii.on("CWIID_BTN_RIGHT:release", function(key) {
      console.log("CWIID_BTN_RIGHT release");
    });


    wii.on("CWIID_BTN_A:press", function(key) {
      console.log("CWIID_BTN_A press");
    });

    wii.on("move", function(position) {
      console.log("move", position);
    });

## TODO

* rumble control
* LED control
* motion output

## Copyright

Copyright (c) 2013 Andrew Nesbitt. See [LICENSE](https://github.com/andrew/node-wii-controller/blob/master/LICENSE) for details.