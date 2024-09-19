[options]
libzip/*:crypto=            False
glib/*:shared=              False
glib/*:fPIC=                False
glib/*:with_elf=            False
glib/*:with_mount=          False
glib/*:with_selinux=        False
jasper/*:with_libjpeg=      libjpeg-turbo
libtiff/*:jpeg=             libjpeg-turbo
libraw/*:with_jpeg=         libjpeg-turbo
cairo/*:with_xlib=          False
cairo/*:with_xlib_xrender=  False
cairo/*:with_xcb=           False
zstd/*:build_programs=      False
