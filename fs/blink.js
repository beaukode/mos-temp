load("api_gpio.js");

let led = Cfg.get("board.led1.pin");
let onhi = Cfg.get("board.led1.active_high"); // LED on when high?
let dur = 100;
let btid;

GPIO.set_mode(led, GPIO.MODE_OUTPUT);

let setLed = function (on) {
  let level = onhi ? on : !on;
  GPIO.write(led, level);
};

function startBlink(int, duration) {
  dur = duration;
  if (btid) {
    Timer.del(btid);
    btid = undefined;
  }
  btid = Timer.set(
    int,
    Timer.REPEAT,
    function () {
      setLed(true);
      Timer.set(
        dur,
        0,
        function () {
          setLed(false);
        },
        null
      );
    },
    null
  );
}

function stopBlink() {
  if (btid) {
    Timer.del(btid);
    btid = undefined;
  }
  setLed(false);
}
