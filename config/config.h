/* config/config.h.cmake.  Hand crafted from config/config.h.in.  */
/* config/config.h.in.  Generated from configure.ac by autoheader.  */

/* Define if building universal (internal helper macro) */
/* #undef AC_APPLE_UNIVERSAL_BUILD */

/* Define if you have AUTOTRACE library */
/* #undef AUTOTRACE_DELEGATE */

/* Define if coders and filters are to be built as modules. */
/* #undef BUILD_MODULES */

/* Define if you have the bzip2 library */
/* #undef BZLIB_DELEGATE */

/* Define if you have the zip library */
/* #undef ZIP_DELEGATE */

/* Define if you have CAIRO library */
/* #undef CAIRO_DELEGATE */

/* permit enciphering and deciphering image pixels */
#define CIPHER_SUPPORT

/* Define to 1 if the `closedir' function returns void instead of `int'. */
/* #undef CLOSEDIR_VOID */

/* coders subdirectory. */
#define CODER_DIRNAME "coders"

/* Directory where architecture-dependent configuration files live. */
#define CONFIGURE_PATH "/usr/local/etc/ImageMagick-7/"

/* Subdirectory of lib where architecture-dependent configuration files live.
   */
#define CONFIGURE_RELATIVE_PATH "ImageMagick-7"

/* Define if you have DJVU library */
/* #undef DJVU_DELEGATE */

/* Directory where ImageMagick documents live. */
#define DOCUMENTATION_PATH "/usr/local/share/doc/ImageMagick-7/"

/* Define if you have Display Postscript */
/* #undef DPS_DELEGATE */

/* exclude deprecated methods in MagickCore API */
#define EXCLUDE_DEPRECATED

/* Directory where executables are installed. */
#define EXECUTABLE_PATH "/usr/local/bin/"

/* Define if you have FFTW library */
/* #undef FFTW_DELEGATE */

/* filter subdirectory. */
#define FILTER_DIRNAME "filters"

/* Define if you have FLIF library */
/* #undef FLIF_DELEGATE */

/* Define if you have FONTCONFIG library */
#define FONTCONFIG_DELEGATE

/* Define if you have FlashPIX library */
/* #undef FPX_DELEGATE */

/* Define if you have FREETYPE library */
#define FREETYPE_DELEGATE

/* Define if you have Ghostscript library or framework */
/* #undef GS_DELEGATE */

/* Define if you have GVC library */
/* #undef GVC_DELEGATE */

/* Define to 1 if you have the `acosh' function. */
/* #undef HAVE_ACOSH */

/* Define to 1 if you have the <arm/limits.h> header file. */
/* #undef HAVE_ARM_LIMITS_H */

/* Define to 1 if you have the <arpa/inet.h> header file. */
/* #undef HAVE_ARPA_INET_H */

/* Define to 1 if you have the `asinh' function. */
/* #undef HAVE_ASINH */

/* Define to 1 if you have the `atanh' function. */
/* #undef HAVE_ATANH */

/* Define to 1 if you have the `atexit' function. */
#define HAVE_ATEXIT 1

/* Define to 1 if you have the `atoll' function. */
#define HAVE_ATOLL 1

/* define if bool is a built-in type */
/* #undef HAVE_BOOL */

/* Define to 1 if you have the `cabs' function. */
#define HAVE_CABS 1

/* Define to 1 if you have the `carg' function. */
#define HAVE_CARG 1

/* Define to 1 if you have the `cimag' function. */
#define HAVE_CIMAG 1

/* Define to 1 if you have the `clock' function. */
#define HAVE_CLOCK 1

/* Define to 1 if you have the `clock_getres' function. */
#define HAVE_CLOCK_GETRES 1

/* Define to 1 if you have clock_gettime. */
#define HAVE_CLOCK_GETTIME 1

/* Define to 1 if clock_gettime supports CLOCK_REALTIME. */
#define HAVE_CLOCK_REALTIME 1

/* Define to 1 if you have the <CL/cl.h> header file. */
/* #undef HAVE_CL_CL_H */

/* Define to 1 if you have the <complex.h> header file. */
#define HAVE_COMPLEX_H 1

/* Define to 1 if you have the `creal' function. */
#define HAVE_CREAL 1

/* Define to 1 if you have the `ctime_r' function. */
#define HAVE_CTIME_R 1

/* Define to 1 if you have the declaration of `pread', and to 0 if you don't.
   */
#define HAVE_DECL_PREAD 1

/* Define to 1 if you have the declaration of `pwrite', and to 0 if you don't.
   */
#define HAVE_DECL_PWRITE 1

/* Define to 1 if you have the declaration of `strerror_r', and to 0 if you
   don't. */
#define HAVE_DECL_STRERROR_R 1

/* Define to 1 if you have the declaration of `strlcpy', and to 0 if you
   don't. */
#define HAVE_DECL_STRLCPY 0

/* Define to 1 if you have the declaration of `tzname', and to 0 if you don't.
   */
#define HAVE_DECL_TZNAME 1

/* Define to 1 if you have the declaration of `vsnprintf', and to 0 if you
   don't. */
#define HAVE_DECL_VSNPRINTF 1

/* Define to 1 if you have the `directio' function. */
/* #undef HAVE_DIRECTIO */

/* Define to 1 if you have the <dirent.h> header file, and it defines `DIR'.
   */
#define HAVE_DIRENT_H 1

/* Define to 1 if you have the <dlfcn.h> header file. */
#define HAVE_DLFCN_H 1

/* Define to 1 if you don't have `vprintf' but do have `_doprnt.' */
/* #undef HAVE_DOPRNT */

/* Define to 1 if the system has the type `double_t'. */
/* #undef HAVE_DOUBLE_T */

/* Define to 1 if you have the `erf' function. */
/* #undef HAVE_ERF */

/* Define to 1 if you have the <errno.h> header file. */
#define HAVE_ERRNO_H 1

/* Define to 1 if you have the `execvp' function. */
#define HAVE_EXECVP 1

/* Define to 1 if you have the `fchmod' function. */
#define HAVE_FCHMOD 1

/* Define to 1 if you have the <fcntl.h> header file. */
#define HAVE_FCNTL_H 1

/* Define to 1 if the system has the type `float_t'. */
/* #undef HAVE_FLOAT_T */

/* Define to 1 if you have the `floor' function. */
/* #undef HAVE_FLOOR */

/* Define to 1 if you have the `fork' function. */
#define HAVE_FORK 1

/* Define to 1 if fseeko (and presumably ftello) exists and is declared. */
#define HAVE_FSEEKO 1

/* Define to 1 if you have the `ftime' function. */
#define HAVE_FTIME 1

/* Define to 1 if you have the `ftruncate' function. */
#define HAVE_FTRUNCATE 1

/* Define to 1 if you have the `getcwd' function. */
#define HAVE_GETCWD 1

/* Define to 1 if you have the `getc_unlocked' function. */
#define HAVE_GETC_UNLOCKED 1

/* Define to 1 if you have the `getdtablesize' function. */
#define HAVE_GETDTABLESIZE 1

/* Define to 1 if you have the `getexecname' function. */
/* #undef HAVE_GETEXECNAME */

/* Define to 1 if you have the `getpagesize' function. */
#define HAVE_GETPAGESIZE 1

/* Define to 1 if you have the `getpid' function. */
#define HAVE_GETPID 1

/* Define to 1 if you have the `getrlimit' function. */
#define HAVE_GETRLIMIT 1

/* Define to 1 if you have the `getrusage' function. */
#define HAVE_GETRUSAGE 1

/* Define to 1 if you have the `gettimeofday' function. */
#define HAVE_GETTIMEOFDAY 1

/* Define to 1 if you have the `gmtime_r' function. */
#define HAVE_GMTIME_R 1

/* Compile with hugepage support */
/* #undef HAVE_HUGEPAGES */

/* Define to 1 if the system has the type `intmax_t'. */
#define HAVE_INTMAX_T 1

/* Define to 1 if the system has the type `intptr_t'. */
#define HAVE_INTPTR_T 1

/* Define to 1 if you have the <inttypes.h> header file. */
#define HAVE_INTTYPES_H 1

/* Define to 1 if you have the `isnan' function. */
#define HAVE_ISNAN 1

/* Define to 1 if you have the `j0' function. */
/* #undef HAVE_J0 */

/* Define to 1 if you have the `j1' function. */
/* #undef HAVE_J1 */

/* Define if you have the <lcms2.h> header file. */
/* #undef HAVE_LCMS2_H */

/* Define if you have the <lcms2/lcms2.h> header file. */
/* #undef HAVE_LCMS2_LCMS2_H */

/* Define if you have the <libraw/libraw.h> header file. */
/* #undef HAVE_LIBRAW_LIBRAW_H */

/* Define if you have the <libheif/heif.h> header file. */
#define HAVE_LIBHEIF_HEIF_H

/* Define to 1 if you have the `gcov' library (-lgcov). */
/* #undef HAVE_LIBGCOV */

/* Define to 1 if you have the <limits.h> header file. */
#define HAVE_LIMITS_H 1

/* Define to 1 if you have the <linux/unistd.h> header file. */
#define HAVE_LINUX_UNISTD_H 1

/* Define to 1 if you have the `lltostr' function. */
/* #undef HAVE_LLTOSTR */

/* Define to 1 if you have the <locale.h> header file. */
#define HAVE_LOCALE_H 1

/* Define to 1 if the system has the type `locale_t'. */
/* #undef HAVE_LOCALE_T */

/* Define to 1 if you have the `localtime_r' function. */
#define HAVE_LOCALTIME_R 1

/* Define to 1 if the system has the type `long double'. */
#define HAVE_LONG_DOUBLE 1

/* Define to 1 if the type `long double' works and has more range or precision
   than `double'. */
#define HAVE_LONG_DOUBLE_WIDER 1

/* Define to 1 if the system has the type `long long int'. */
#define HAVE_LONG_LONG_INT 1

/* Define to 1 if you have the `lstat' function. */
/* #undef HAVE_LSTAT */

/* Define to 1 if you have the <machine/param.h> header file. */
/* #undef HAVE_MACHINE_PARAM_H */

/* Define to 1 if you have the <mach-o/dyld.h> header file. */
/* #undef HAVE_MACH_O_DYLD_H */

/* Define to 1 if <wchar.h> declares mbstate_t. */
/* #undef HAVE_MBSTATE_T */

/* Define to 1 if you have the `memmove' function. */
#define HAVE_MEMMOVE 1

/* Define to 1 if you have the <memory.h> header file. */
#define HAVE_MEMORY_H 1

/* Define to 1 if you have the `memset' function. */
#define HAVE_MEMSET 1

/* Define to 1 if you have the `mkstemp' function. */
#define HAVE_MKSTEMP 1

/* Define to 1 if you have a working `mmap' system call. */
#define HAVE_MMAP 1

/* Define to 1 if you have the `munmap' function. */
#define HAVE_MUNMAP 1

/* define if the compiler implements namespaces */
/* #undef HAVE_NAMESPACES */

/* Define if g++ supports namespace std. */
/* #undef HAVE_NAMESPACE_STD */

/* Define to 1 if you have the `nanosleep' function. */
#define HAVE_NANOSLEEP 1

/* Define to 1 if you have the <ndir.h> header file, and it defines `DIR'. */
/* #undef HAVE_NDIR_H */

/* Define to 1 if you have the <netinet/in.h> header file. */
#define HAVE_NETINET_IN_H 1

/* Define to 1 if you have the `newlocale' function. */
#define HAVE_NEWLOCALE 1

/* Define to 1 if you have the <OpenCL/cl.h> header file. */
/* #undef HAVE_OPENCL_CL_H */

/* Define to 1 if you have the <OS.h> header file. */
/* #undef HAVE_OS_H */

/* Define to 1 if you have the `pclose' function. */
#define HAVE_PCLOSE 1

/* Define to 1 if you have the `poll' function. */
#define HAVE_POLL 1

/* Define to 1 if you have the `popen' function. */
#define HAVE_POPEN 1

/* Define to 1 if you have the `posix_fadvise' function. */
#define HAVE_POSIX_FADVISE 1

/* Define to 1 if you have the `posix_fallocate' function. */
#define HAVE_POSIX_FALLOCATE 1

/* Define to 1 if you have the `posix_madvise' function. */
#define HAVE_POSIX_MADVISE 1

/* Define to 1 if you have the `posix_memalign' function. */
#define HAVE_POSIX_MEMALIGN 1

/* Define to 1 if you have the `posix_spawnp' function. */
#define HAVE_POSIX_SPAWNP 1

/* Define to 1 if you have the `pow' function. */
/* #undef HAVE_POW */

/* Define to 1 if you have the `pread' function. */
#define HAVE_PREAD 1

/* Define to 1 if you have the <process.h> header file. */
/* #undef HAVE_PROCESS_H */

/* Define if you have POSIX threads libraries and header files. */
#define HAVE_PTHREAD

/* Have PTHREAD_PRIO_INHERIT. */
/* #undef HAVE_PTHREAD_PRIO_INHERIT */

/* Define to 1 if you have the `pwrite' function. */
#define HAVE_PWRITE 1

/* Define to 1 if you have the `qsort_r' function. */
#define HAVE_QSORT_R 1

/* Define to 1 if you have the `raise' function. */
#define HAVE_RAISE 1

/* Define to 1 if you have the `rand_r' function. */
#define HAVE_RAND_R 1

/* Define to 1 if you have the `readlink' function. */
#define HAVE_READLINK 1

/* Define to 1 if you have the `realpath' function. */
#define HAVE_REALPATH 1

/* Define to 1 if you have the `seekdir' function. */
#define HAVE_SEEKDIR 1

/* Define to 1 if you have the `select' function. */
#define HAVE_SELECT 1

/* Define to 1 if you have the `sendfile' function. */
#define HAVE_SENDFILE 1

/* Define to 1 if you have the `setlocale' function. */
#define HAVE_SETLOCALE 1

/* Define to 1 if you have the `setvbuf' function. */
#define HAVE_SETVBUF 1

/* X11 server supports shape extension */
/* #undef HAVE_SHAPE */

/* X11 server supports shared memory extension */
/* #undef HAVE_SHARED_MEMORY */

/* Define to 1 if you have the `sigaction' function. */
#define HAVE_SIGACTION 1

/* Define to 1 if you have the `sigemptyset' function. */
#define HAVE_SIGEMPTYSET 1

/* Define to 1 if you have the `socket' function. */
#define HAVE_SOCKET 1

/* Define to 1 if you have the `spawnvp' function. */
/* #undef HAVE_SPAWNVP */

/* Define to 1 if you have the `sqrt' function. */
/* #undef HAVE_SQRT */

/* Define to 1 if you have the `stat' function. */
#define HAVE_STAT 1

/* Define to 1 if you have the <stdarg.h> header file. */
/* #undef HAVE_STDARG_H */

/* Define to 1 if stdbool.h conforms to C99. */
/* #undef HAVE_STDBOOL_H */

/* Define to 1 if you have the <stdint.h> header file. */
#define HAVE_STDINT_H 1

/* Define to 1 if you have the <stdlib.h> header file. */
#define HAVE_STDLIB_H 1

/* define if the compiler supports ISO C++ standard library */
/* #undef HAVE_STD_LIBS */

/* Define to 1 if you have the `strcasecmp' function. */
#define HAVE_STRCASECMP 1

/* Define to 1 if you have the `strchr' function. */
#define HAVE_STRCHR 1

/* Define to 1 if you have the `strcspn' function. */
#define HAVE_STRCSPN 1

/* Define to 1 if you have the `strdup' function. */
#define HAVE_STRDUP 1

/* Define to 1 if you have the `strerror' function. */
#define HAVE_STRERROR 1

/* Define to 1 if you have the `strerror_r' function. */
#define HAVE_STRERROR_R 1

/* Define to 1 if cpp supports the ANSI # stringizing operator. */
#define HAVE_STRINGIZE 1

/* Define to 1 if you have the <strings.h> header file. */
#define HAVE_STRINGS_H 1

/* Define to 1 if you have the <string.h> header file. */
#define HAVE_STRING_H 1

/* Define to 1 if you have the `strlcat' function. */
/* #undef HAVE_STRLCAT */

/* Define to 1 if you have the `strlcpy' function. */
/* #undef HAVE_STRLCPY */

/* Define to 1 if you have the `strncasecmp' function. */
#define HAVE_STRNCASECMP 1

/* Define to 1 if you have the `strpbrk' function. */
#define HAVE_STRPBRK 1

/* Define to 1 if you have the `strrchr' function. */
#define HAVE_STRRCHR 1

/* Define to 1 if you have the `strspn' function. */
#define HAVE_STRSPN 1

/* Define to 1 if you have the `strstr' function. */
#define HAVE_STRSTR 1

/* Define to 1 if you have the `strtod' function. */
/* #undef HAVE_STRTOD */

/* Define to 1 if you have the `strtod_l' function. */
#define HAVE_STRTOD_L 1

/* Define to 1 if you have the `strtol' function. */
#define HAVE_STRTOL 1

/* Define to 1 if you have the `strtoul' function. */
#define HAVE_STRTOUL 1

/* Define to 1 if `tm_zone' is a member of `struct tm'. */
#define HAVE_STRUCT_TM_TM_ZONE 1

/* Define to 1 if you have the <sun_prefetch.h> header file. */
/* #undef HAVE_SUN_PREFETCH_H */

/* Define to 1 if you have the `symlink' function. */
#define HAVE_SYMLINK 1

/* Define to 1 if you have the `sysconf' function. */
#define HAVE_SYSCONF 1

/* Define to 1 if you have the <sys/dir.h> header file, and it defines `DIR'.
   */
/* #undef HAVE_SYS_DIR_H */

/* Define to 1 if you have the <sys/ipc.h> header file. */
#define HAVE_SYS_IPC_H 1

/* Define to 1 if you have the <sys/mman.h> header file. */
#define HAVE_SYS_MMAN_H 1

/* Define to 1 if you have the <sys/ndir.h> header file, and it defines `DIR'.
   */
/* #undef HAVE_SYS_NDIR_H */

/* Define to 1 if you have the <sys/param.h> header file. */
#define HAVE_SYS_PARAM_H 1

/* Define to 1 if you have the <sys/resource.h> header file. */
#define HAVE_SYS_RESOURCE_H 1

/* Define to 1 if you have the <sys/select.h> header file. */
#define HAVE_SYS_SELECT_H 1

/* Define to 1 if you have the <sys/sendfile.h> header file. */
#define HAVE_SYS_SENDFILE_H 1

/* Define to 1 if you have the <sys/socket.h> header file. */
#define HAVE_SYS_SOCKET_H 1

/* Define to 1 if you have the <sys/stat.h> header file. */
#define HAVE_SYS_STAT_H 1

/* Define to 1 if you have the <sys/syslimits.h> header file. */
/* #undef HAVE_SYS_SYSLIMITS_H */

/* Define to 1 if you have the <sys/timeb.h> header file. */
#define HAVE_SYS_TIMEB_H 1

/* Define to 1 if you have the <sys/times.h> header file. */
#define HAVE_SYS_TIMES_H 1

/* Define to 1 if you have the <sys/time.h> header file. */
#define HAVE_SYS_TIME_H 1

/* Define to 1 if you have the <sys/types.h> header file. */
#define HAVE_SYS_TYPES_H 1

/* Define to 1 if you have the <sys/wait.h> header file. */
#define HAVE_SYS_WAIT_H 1

/* Define to 1 if you have the `telldir' function. */
#define HAVE_TELLDIR 1

/* Define to 1 if you have the `tempnam' function. */
#define HAVE_TEMPNAM 1

/* Define to 1 if you have the <tiffconf.h> header file. */
#define HAVE_TIFFCONF_H 1

/* Define to 1 if you have the `TIFFIsBigEndian' function. */
#define HAVE_TIFFISBIGENDIAN 1

/* Define to 1 if you have the `TIFFIsCODECConfigured' function. */
#define HAVE_TIFFISCODECCONFIGURED 1

/* Define to 1 if you have the `TIFFMergeFieldInfo' function. */
#define HAVE_TIFFMERGEFIELDINFO 1

/* Define to 1 if you have the `TIFFReadEXIFDirectory' function. */
#define HAVE_TIFFREADEXIFDIRECTORY 1

/* Define to 1 if you have the `TIFFSetErrorHandlerExt' function. */
#define HAVE_TIFFSETERRORHANDLEREXT 1

/* Define to 1 if you have the `TIFFSetTagExtender' function. */
#define HAVE_TIFFSETTAGEXTENDER 1

/* Define to 1 if you have the `TIFFSetWarningHandlerExt' function. */
#define HAVE_TIFFSETWARNINGHANDLEREXT 1

/* Define to 1 if you have the `TIFFSwabArrayOfTriples' function. */
#define HAVE_TIFFSWABARRAYOFTRIPLES 1

/* Define to 1 if you have the `times' function. */
#define HAVE_TIMES 1

/* Define to 1 if your `struct tm' has `tm_zone'. Deprecated, use
   `HAVE_STRUCT_TM_TM_ZONE' instead. */
#define HAVE_TM_ZONE 1

/* Define to 1 if you don't have `tm_zone' but do have the external array
   `tzname'. */
/* #undef HAVE_TZNAME */

/* Define to 1 if the system has the type `uintmax_t'. */
#define HAVE_UINTMAX_T 1

/* Define to 1 if the system has the type `uintptr_t'. */
#define HAVE_UINTPTR_T 1

/* Define to 1 if you have the `ulltostr' function. */
/* #undef HAVE_ULLTOSTR */

/* Define to 1 if you have the <unistd.h> header file. */
#define HAVE_UNISTD_H 1

/* Define to 1 if the system has the type `unsigned long long int'. */
#define HAVE_UNSIGNED_LONG_LONG_INT 1

/* Define to 1 if you have the `uselocale' function. */
#define HAVE_USELOCALE 1

/* Define to 1 if you have the `usleep' function. */
#define HAVE_USLEEP 1

/* Define to 1 if you have the `utime' function. */
#define HAVE_UTIME 1

/* Define to 1 if you have the <utime.h> header file. */
#define HAVE_UTIME_H 1

/* Define to 1 if you have the `vfork' function. */
#define HAVE_VFORK 1

/* Define to 1 if you have the <vfork.h> header file. */
/* #undef HAVE_VFORK_H */

/* Define to 1 if you have the `vfprintf' function. */
#define HAVE_VFPRINTF 1

/* Define to 1 if you have the `vfprintf_l' function. */
/* #undef HAVE_VFPRINTF_L */

/* Define to 1 if you have the `vprintf' function. */
#define HAVE_VPRINTF 1

/* Define to 1 if you have the `vsnprintf' function. */
#define HAVE_VSNPRINTF 1

/* Define to 1 if you have the `vsnprintf_l' function. */
/* #undef HAVE_VSNPRINTF_L */

/* Define to 1 if you have the `vsprintf' function. */
#define HAVE_VSPRINTF 1

/* Define to 1 if you have the `waitpid' function. */
#define HAVE_WAITPID 1

/* Define to 1 if you have the <wchar.h> header file. */
#define HAVE_WCHAR_H 1

/* Define to 1 if you have the <windows.h> header file. */
/* #undef HAVE_WINDOWS_H */

/* Define to 1 if `fork' works. */
/* #undef HAVE_WORKING_FORK */

/* Define to 1 if `vfork' works. */
/* #undef HAVE_WORKING_VFORK */

/* Define to 1 if you have the <xlocale.h> header file. */
/* #undef HAVE_XLOCALE_H */

/* Define to 1 if you have the `_aligned_malloc' function. */
/* #undef HAVE__ALIGNED_MALLOC */

/* Define to 1 if the system has the type `_Bool'. */
#define HAVE__BOOL 1

/* Define to 1 if you have the `_exit' function. */
#define HAVE__EXIT 1

/* Define to 1 if you have the `_NSGetExecutablePath' function. */
/* #undef HAVE__NSGETEXECUTABLEPATH */

/* Define to 1 if you have the `_pclose' function. */
/* #undef HAVE__PCLOSE */

/* Define to 1 if you have the `_popen' function. */
/* #undef HAVE__POPEN */

/* Define to 1 if you have the `_wfopen' function. */
/* #undef HAVE__WFOPEN */

/* Define to 1 if you have the `_wstat' function. */
/* #undef HAVE__WSTAT */

/* define if your compiler has __attribute__ */
#define HAVE___ATTRIBUTE__

/* Whether hdri is enabled or not */
/* #undef HDRI_ENABLE_OBSOLETE_IN_H */

/* Define if you have libheif library */
#define HEIC_DELEGATE

/* Define if you have jemalloc memory allocation library */
/* #undef HASJEMALLOC */

/* Define if you have umem memory allocation library */
/* #undef HASUMEM */

/* Directory where ImageMagick architecture headers live. */
#define INCLUDEARCH_PATH "/usr/local/include/"

/* Directory where ImageMagick headers live. */
#define INCLUDE_PATH "/usr/local/include/"

/* ImageMagick is formally installed under prefix */
#define INSTALLED_SUPPORT ON

/* Define if you have JBIG library */
/* #undef JBIG_DELEGATE */

/* Define if you have JPEG library */
#define JPEG_DELEGATE

/* Define if you have JXL library */
/* #undef JXL_DELEGATE */

/* Define if you have LCMS library */
/* #undef LCMS_DELEGATE */

/* Define if you have OPENJP2 library */
#define LIBOPENJP2_DELEGATE

/* Directory where architecture-dependent files live. */
#define LIBRARY_PATH "/usr/local/lib/ImageMagick-7/"

/* Subdirectory of lib where ImageMagick architecture dependent files are
   installed. */
#define LIBRARY_RELATIVE_PATH "lib/ImageMagick-7"

/* Binaries in libraries path base name (will be during install linked to bin)
   */
#define LIB_BIN_BASEDIRNAME "bin"

/* Define if you have LQR library */
/* #undef LQR_DELEGATE */

/* Define if using libltdl to support dynamically loadable modules and OpenCL
   */
/* #undef LTDL_DELEGATE */

/* Native module suffix */
/* #undef LTDL_MODULE_EXT */

/* Define to the sub-directory where libtool stores uninstalled libraries. */
/* #undef LT_OBJDIR */

/* Define if you have LZMA library */
#define LZMA_DELEGATE

/* Define to prepend to default font search path. */
#define MAGICK_FONT_PATH "/usr/share/fonts/"

/* Target Host CPU */
#define MAGICK_TARGET_CPU x86_64

/* Target Host OS */
#define MAGICK_TARGET_OS "Linux"

/* Target Host Vendor */
#define MAGICK_TARGET_VENDOR "Linux"

/* Module directory name without ABI part. */
#define MODULES_BASEDIRNAME modules

/* Module directory dirname */
#define MODULES_DIRNAME "modules"

/* Magick API method prefix */
/* #undef NAMESPACE_PREFIX */

/* Magick API method prefix tag */
/* #undef NAMESPACE_PREFIX_TAG */

/* Define if you have OPENEXR library */
/* #undef OPENEXR_DELEGATE */

/* Name of package */
#define PACKAGE "ImageMagick"

/* Define to the address where bug reports for this package should be sent. */
#define PACKAGE_BUGREPORT "https://github.com/ImageMagick/ImageMagick/issues"

/* Define to the full name of this package. */
#define PACKAGE_NAME "ImageMagick"

/* Define to the full name and version of this package. */
#define PACKAGE_STRING "ImageMagick"-7.1.1

/* Define to the one symbol short name of this package. */
#define PACKAGE_TARNAME "ImageMagick"

/* Define to the home page for this package. */
#define PACKAGE_URL "https://imagemagick.org"

/* Define to the version of this package. */
#define PACKAGE_VERSION 1.15.1

/* Define if you have PANGOCAIRO library */
/* #undef PANGOCAIRO_DELEGATE */

/* Define if you have PANGO library */
/* #undef PANGO_DELEGATE */

/* enable pipes (|) in filenames */
/* #undef PIPES_SUPPORT */

/* enable POSIX support file tree on Windows */
/* #undef POSIX_ON_WINDOWS_SUPPORT */

/* Define if you have PNG library */
#define PNG_DELEGATE

/* Define to necessary symbol if this constant uses a non-standard name on
   your system. */
/* #undef PTHREAD_CREATE_JOINABLE */

/* Pixel cache threshold in MB (defaults to available memory) */
/* #undef PixelCacheThreshold */

/* Number of bits in a pixel Quantum (8/16/32/64) */
/* #undef QUANTUM_DEPTH_OBSOLETE_IN_H */

/* Define if you have RAQM library */
/* #undef RAQM_DELEGATE */

/* Define if you have LIBRAW library */
/* #undef RAW_R_DELEGATE */

/* Define as the return type of signal handlers (`int' or `void'). */
#define RETSIGTYPE void

/* Define if you have RSVG library */
/* #undef RSVG_DELEGATE */

/* Define to the type of arg 1 for `select'. */
/* #undef SELECT_TYPE_ARG1 */

/* Define to the type of args 2, 3 and 4 for `select'. */
/* #undef SELECT_TYPE_ARG234 */

/* Define to the type of arg 5 for `select'. */
/* #undef SELECT_TYPE_ARG5 */

/* Setjmp/longjmp are thread safe */
#define SETJMP_IS_THREAD_SAFE

/* Sharearch directory name without ABI part. */
#define SHAREARCH_BASEDIRNAME share

/* Sharearch directory dirname */
#define SHAREARCH_DIRNAME "share"

/* Directory where architecture-independent configuration files live. */
#define SHARE_PATH "/usr/local/share/ImageMagick-7/"

/* Subdirectory of lib where architecture-independent configuration files
   live. */
#define SHARE_RELATIVE_PATH "ImageMagick-7"

/* The size of `double', as computed by sizeof. */
#define SIZEOF_DOUBLE 8

/* The size of `double_t', as computed by sizeof. */
/* #undef SIZEOF_DOUBLE_T */

/* The size of `float', as computed by sizeof. */
#define SIZEOF_FLOAT 4

/* The size of `float_t', as computed by sizeof. */
/* #undef SIZEOF_FLOAT_T */

/* The size of `long double', as computed by sizeof. */
#define SIZEOF_LONG_DOUBLE 16

/* The size of `off_t', as computed by sizeof. */
#define SIZEOF_OFF_T 8

/* The size of `signed int', as computed by sizeof. */
#define SIZEOF_SIGNED_INT 4

/* The size of `signed long', as computed by sizeof. */
#define SIZEOF_SIGNED_LONG 8

/* The size of `signed long long', as computed by sizeof. */
#define SIZEOF_SIGNED_LONG_LONG 8

/* The size of `signed short', as computed by sizeof. */
#define SIZEOF_SIGNED_SHORT 2

/* The size of `size_t', as computed by sizeof. */
#define SIZEOF_SIZE_T 8

/* The size of `ssize_t', as computed by sizeof. */
#define SIZEOF_SSIZE_T 8

/* The size of `unsigned int', as computed by sizeof. */
#define SIZEOF_UNSIGNED_INT 4

/* The size of `unsigned int*', as computed by sizeof. */
#define SIZEOF_UNSIGNED_INTP 8

/* The size of `unsigned long', as computed by sizeof. */
#define SIZEOF_UNSIGNED_LONG 8

/* The size of `unsigned long long', as computed by sizeof. */
#define SIZEOF_UNSIGNED_LONG_LONG 8

/* The size of `void *', as computed by sizeof. */
#define SIZEOF_VOID_P 8

/* The size of `unsigned short', as computed by sizeof. */
#define SIZEOF_UNSIGNED_SHORT 2

/* Define to 1 if the `S_IS*' macros in <sys/stat.h> do not work properly. */
/* #undef STAT_MACROS_BROKEN */

/* Define to 1 if you have the ANSI C header files. */
#define STDC_HEADERS 1

/* Define to 1 if strerror_r returns char *. */
/* #undef STRERROR_R_CHAR_P */

/* Define if you have POSIX threads libraries and header files. */
#define THREAD_SUPPORT

/* Define if you have TIFF library */
#define TIFF_DELEGATE

/* Define to 1 if you can safely include both <sys/time.h> and <time.h>. */
/* #undef TIME_WITH_SYS_TIME */

/* Define to 1 if your <sys/time.h> declares `struct tm'. */
/* #undef TM_IN_SYS_TIME */

/* Enable extensions on AIX 3, Interix.  */
#ifndef _ALL_SOURCE
/* #undef _ALL_SOURCE */
#endif
/* Enable GNU extensions on systems that have them (emscripten is an unassuming GNU).  */
#ifndef _GNU_SOURCE
   #ifdef __EMSCRIPTEN__
      #define _GNU_SOURCE
   #else
      #define _GNU_SOURCE
   #endif
#endif
/* Enable threading extensions on Solaris.  */
#ifndef _POSIX_PTHREAD_SEMANTICS
/* #undef _POSIX_PTHREAD_SEMANTICS */
#endif
/* Enable extensions on HP NonStop.  */
#ifndef _TANDEM_SOURCE
/* #undef _TANDEM_SOURCE */
#endif
/* Enable general extensions on Solaris.  */
#ifndef __EXTENSIONS__
/* #undef __EXTENSIONS__ */
#endif


/* Version number of package */
#define VERSION "7.1.1"

/* Define if you have WEBPMUX library */
#define WEBPMUX_DELEGATE

/* Define if you have WEBP library */
#define WEBP_DELEGATE

/* Define to use the Windows GDI32 library */
/* #undef WINGDI32_DELEGATE */

/* Define if using the dmalloc debugging malloc package */
/* #undef WITH_DMALLOC */

/* Define if you have WMF library */
/* #undef WMF_DELEGATE */

/* Define WORDS_BIGENDIAN to 1 if your processor stores words with the most
   significant byte first (like Motorola and SPARC, unlike Intel). */
#if defined AC_APPLE_UNIVERSAL_BUILD
# if defined __BIG_ENDIAN__
#  define WORDS_BIGENDIAN 1
# endif
#else
# ifndef WORDS_BIGENDIAN
/* #undef WORDS_BIGENDIAN */
# endif
#endif

/* Location of X11 configure files */
/* #undef X11_CONFIGURE_PATH */

/* Define if you have X11 library */
/* #undef X11_DELEGATE */

/* Define if you have XML library */
#define XML_DELEGATE

/* Define to 1 if the X Window System is missing or not being used. */
#define X_DISPLAY_MISSING 1

/* Build self-contained, embeddable, zero-configuration ImageMagick */
#define ZERO_CONFIGURATION_SUPPORT 0

/* Define if you have ZLIB library */
#define ZLIB_DELEGATE

/* Define if you have ZSTD library */
#define ZSTD_DELEGATE

/* Enable large inode numbers on Mac OS X 10.5.  */
#ifndef _DARWIN_USE_64_BIT_INODE
# define _DARWIN_USE_64_BIT_INODE 1
#endif

/* Number of bits in a file offset, on hosts where this is settable. */
#define _FILE_OFFSET_BITS 64

/* enable run-time bounds-checking */
/* #undef _FORTIFY_SOURCE */

/* Define to 1 to make fseeko visible on some hosts (e.g. glibc 2.2). */
#define _LARGEFILE_SOURCE 1

/* Define for large files, on AIX-style hosts. */
/* #undef _LARGE_FILES */

/* Define to 1 if on MINIX. */
/* #undef _MINIX */

/* Define this for the OpenCL Accelerator */
/* #undef _OPENCL */

/* Define to 2 if the system does not provide POSIX.1 features except with
   this defined. */
#define _POSIX_1_SOURCE 2

/* Define to 1 if you need to in order for `stat' and other things to work. */
/* #undef _POSIX_SOURCE */

/* Define for Solaris 2.5.1 so the uint32_t typedef from <sys/synch.h>,
   <pthread.h>, or <semaphore.h> is not used. If the typedef were allowed, the
   #define below would cause a syntax error. */
/* #undef _UINT32_T */

/* Define for Solaris 2.5.1 so the uint64_t typedef from <sys/synch.h>,
   <pthread.h>, or <semaphore.h> is not used. If the typedef were allowed, the
   #define below would cause a syntax error. */
/* #undef _UINT64_T */

/* Define for Solaris 2.5.1 so the uint8_t typedef from <sys/synch.h>,
   <pthread.h>, or <semaphore.h> is not used. If the typedef were allowed, the
   #define below would cause a syntax error. */
/* #undef _UINT8_T */

/* Define to 1 if type `char' is unsigned and you are not using gcc.  */
#ifndef __CHAR_UNSIGNED__
/* #undef __CHAR_UNSIGNED__ */
#endif

/* Define to appropriate substitue if compiler does not have __func__ */
#define __func__ __func__

/* Define to empty if `const' does not conform to ANSI C. */
/* #undef const */

/* Define to `int' if <sys/types.h> doesn't define. */
#define gid_t int

/* Define to `__inline__' or `__inline' if that's what the C compiler
   calls it, or to nothing if 'inline' is not supported under any name.  */
#ifndef __cplusplus
#define inline inline
#endif

/* Define to the type of a signed integer type of width exactly 16 bits if
   such a type exists and the standard includes do not define it. */
/* #undef int16_t */

/* Define to the type of a signed integer type of width exactly 32 bits if
   such a type exists and the standard includes do not define it. */
/* #undef int32_t */

/* Define to the type of a signed integer type of width exactly 64 bits if
   such a type exists and the standard includes do not define it. */
/* #undef int64_t */

/* Define to the type of a signed integer type of width exactly 8 bits if such
   a type exists and the standard includes do not define it. */
/* #undef int8_t */

/* Define to the widest signed integer type if <stdint.h> and <inttypes.h> do
   not define. */
/* #undef intmax_t */

/* Define to the type of a signed integer type wide enough to hold a pointer,
   if such a type exists, and if the system does not define it. */
/* #undef intptr_t */

/* Define to a type if <wchar.h> does not define. */
/* #undef mbstate_t */

/* Define to `int' if <sys/types.h> does not define. */
#define mode_t int

/* Define to `long int' if <sys/types.h> does not define. */
/* #undef off_t */

/* Define to `int' if <sys/types.h> does not define. */
#define pid_t int

/* Define to the equivalent of the C99 'restrict' keyword, or to
   nothing if this is not supported.  Do not define if restrict is
   supported directly.  */
#define restrict __restrict
/* Work around a bug in Sun C++: it does not support _Restrict or
   __restrict__, even though the corresponding Sun C compiler ends up with
   "#define restrict _Restrict" or "#define restrict __restrict__" in the
   previous line.  Perhaps some future version of Sun C++ will work with
   restrict; if so, hopefully it defines __RESTRICT like Sun C does.  */
#if defined __SUNPRO_CC && !defined __RESTRICT
# define _Restrict
# define __restrict__
#endif

/* Define to `unsigned int' if <sys/types.h> does not define. */
/* #undef size_t */

/* Define to `int' if <sys/types.h> does not define. */
/* #undef ssize_t */

/* Define to `int' if <sys/types.h> doesn't define. */
#define uid_t int

/* Define to the type of an unsigned integer type of width exactly 16 bits if
   such a type exists and the standard includes do not define it. */
/* #undef uint16_t */

/* Define to the type of an unsigned integer type of width exactly 32 bits if
   such a type exists and the standard includes do not define it. */
/* #undef uint32_t */

/* Define to the type of an unsigned integer type of width exactly 64 bits if
   such a type exists and the standard includes do not define it. */
/* #undef uint64_t */

/* Define to the type of an unsigned integer type of width exactly 8 bits if
   such a type exists and the standard includes do not define it. */
/* #undef uint8_t */

/* Define to the widest unsigned integer type if <stdint.h> and <inttypes.h>
   do not define. */
/* #undef uintmax_t */

/* Define to the type of an unsigned integer type wide enough to hold a
   pointer, if such a type exists, and if the system does not define it. */
/* #undef uintptr_t */

/* Define as `fork' if `vfork' does not work. */
#define vfork fork

/* Define to empty if the keyword `volatile' does not work. Warning: valid
   code using `volatile' can become incorrect without. Disable with care. */
#define volatile 
