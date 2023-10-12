all: build/imagemagick.js

build/conan.wasm.args: Makefile conanfile.txt
	( cd build && python3 -m conans.conan install .. -pr:b=default -pr:h=../emscripten.profile -of build --build=missing )
	sh configure_magick_wasm.sh
	sh build_magick_wasm.sh

build/imagemagick.js: swig/wasm/Magick++.cxx Makefile build/conan.wasm.args
	emcc \
		--embed-file="test/data/wizard.gif@wizard.gif" \
		-O2 \
		-sNO_DISABLE_EXCEPTION_CATCHING -sMODULARIZE \
		-DMAGICKCORE_HDRI_ENABLE=1 -DMAGICKCORE_QUANTUM_DEPTH=16 \
		--js-library=./node_modules/emnapi/dist/library_napi.js \
		-I./node_modules/emnapi/include \
		-I./node_modules/node-addon-api \
		-L./node_modules/emnapi/lib/wasm32-emscripten \
		-sEXPORTED_FUNCTIONS="['_napi_register_wasm_v1','_malloc','_free']" \
		-o $@ $< \
		-Ideps/ImageMagick/Magick++/lib -Ideps/ImageMagick/MagickWand -Ideps/ImageMagick \
		-Ldeps/ImageMagick/Magick++/lib/.libs -Ldeps/ImageMagick/MagickWand/.libs/ -Ldeps/ImageMagick/MagickCore/.libs \
		-lMagick++-7.Q16HDRI -lMagickWand-7.Q16HDRI -lMagickCore-7.Q16HDRI \
		--bind -lemnapi \
		${shell cat build/conan.wasm.args}

clean:
	rm -f build/*
