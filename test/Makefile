cpp-test: ../src/deps-stub.cc
	g++ \
		-fopenmp -DMAGICKCORE_HDRI_ENABLE=1 -DMAGICKCORE_QUANTUM_DEPTH=16 \
		-I../deps/ImageMagick/Magick++/lib -I../deps/ImageMagick \
		-o $@ $< \
		-L../deps/ImageMagick/Magick++/lib -lMagick++-7.Q16HDRI	
