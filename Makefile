.PHONY: build flash

build:
	mos build --platform ESP8266 --local --build-var BOARD=esp8266
	mgos-combine-ubuntu -o build/output.bin

flash: build
	esptool.py --chip esp8266 --before no_reset write_flash -fs 4MB 0x0 build/output.bin