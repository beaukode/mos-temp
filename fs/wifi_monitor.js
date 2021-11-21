load("blink.js");

let net = false;

Event.WIFI_BASE = Event.baseNumber("WFI");
Event.WIFI_STA_DISCONNECTED = Event.WIFI_BASE;
Event.WIFI_STA_CONNECTING = Event.WIFI_BASE + 1;
Event.WIFI_STA_CONNECTED = Event.WIFI_BASE + 2;
Event.WIFI_STA_IP_ACQUIRED = Event.WIFI_BASE + 3;

startBlink(1000, 100); // Start in disconnected state

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
    startBlink(100, 100); // Fast blink on ip waiting
  },
  null
);

Event.on(
  Event.WIFI_STA_IP_ACQUIRED,
  function () {
    net = true;
    stopBlink();
  },
  null
);
