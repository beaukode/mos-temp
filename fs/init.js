load("api_config.js");
load("api_events.js");
load("api_timer.js");
load("api_bme280.js");

load("wifi_monitor.js");

let lon = true;

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
