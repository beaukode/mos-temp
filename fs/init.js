load("api_config.js");
load("api_events.js");
load("api_gpio.js");
load("api_timer.js");
load("api_bme280.js");

Event.WIFI_BASE = Event.baseNumber("WFI");
Event.WIFI_STA_DISCONNECTED = Event.WIFI_BASE;
Event.WIFI_STA_CONNECTING = Event.WIFI_BASE + 1;
Event.WIFI_STA_CONNECTED = Event.WIFI_BASE + 2;
Event.WIFI_STA_IP_ACQUIRED = Event.WIFI_BASE + 3;

let led = Cfg.get("board.led1.pin"); // Built-in LED GPIO number
let onhi = Cfg.get("board.led1.active_high"); // LED on when high?
let lon = true;
let btid;
let bdur;
let net = false;

let setLED = function (on) {
  let level = onhi ? on : !on;
  GPIO.write(led, level);
};

GPIO.set_mode(led, GPIO.MODE_OUTPUT);

function startBlink(int, dur) {
  bdur = dur;
  if (btid) {
    Timer.del(btid);
    btid = undefined;
  }
  btid = Timer.set(
    int,
    Timer.REPEAT,
    function () {
      setLED(true);
      Timer.set(
        bdur,
        0,
        function () {
          setLED(false);
        },
        null
      );
    },
    null
  );
}

startBlink(1000, 100);

Event.on(
  Event.WIFI_STA_DISCONNECTED,
  function () {
    net = false;
    startBlink(1000, 100);
  },
  null
);

Event.on(
  Event.WIFI_STA_CONNECTED,
  function () {
    startBlink(100, 100);
  },
  null
);

Event.on(
  Event.WIFI_STA_IP_ACQUIRED,
  function () {
    net = true;
    startBlink(10000, 100);
  },
  null
);

let prometheus_init = ffi("void prometheus_init()");
let prometheus_update = ffi("void prometheus_update(double)");
prometheus_init();

let bme = BME280.createSPI();
Timer.set(
  1000,
  Timer.REPEAT,
  function () {
    let temp = bme.readTemp() - 1;
    print("TEMP", temp);
    prometheus_update(temp);
  },
  null
);

print("JS READY");
