ZIP=zip
FILES=manifest.json tab_pinner.js pin_16.png pin_48.png pin_128.png
ARCHIVE=tab_pinner.zip

clean: $(ARCHIVE)
	rm -rf $(ARCHIVE)

pack: $(FILES) clean
	$(ZIP) $(ARCHIVE) $(FILES)

