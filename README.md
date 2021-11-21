# Prerequisites

- Mongoose OS cli tool `mos` [https://mongoose-os.com/docs/mongoose-os/quickstart/setup.md#1-download-and-install-mos-tool]
- Esptool `esptool.py` [https://github.com/espressif/esptool#easy-installation]
- Mgos combine to convert built firmware to a flashable bin `mgos-combine-ubuntu` [https://github.com/yaourdt/mgos-combine]
- GNU make
- An ESP8266 hardware (I'm using a NodeMCU v3 4MB)
- A BME280/BMP280 3.3v connected on SPI port

# ch340 usb to serial problem

Usb to serial interface on my NodeMCU (CH-340) seems to have problem (during device reset) with some linux kernel [https://github.com/espressif/esptool/issues/656]

I can't flash directly with `mos flash`, but it work when :
- Put manually hardware on flash mode : Hold flash button and push reset button
- Convert Mongoose OS firmware to bin with Mgos combine
- Flash binary with `esptool --before no_reset`
- Manually reset after flash

# GPIO15 (SPI Slave Select) problem

My hardware do not boot if something is wired on GPIO15 (D8 on board). I moved to GPIO5 (D1 on board) by setting `spi.cs0_gpio` in `mos.yml`

# Flash device

Run `make flash`