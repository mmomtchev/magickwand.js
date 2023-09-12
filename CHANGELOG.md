# Changelog

## [0.9.0]

- TypeScript support
- Implicit convenience casting from strings to `Magick.Geometry` and `Magick.Color`, allows to write `new Magick.Image('640x480', 'black')` instead of `new Magick.Image(new Magick.Geometry('640x480'), new Magick.Color('black'))`

## [0.1.0] 2023-07-30

- `*Async` versions of most CPU-heavy classes, including `Image` and the filters

## [0.0.5] 2023-05-11

- Fully self-contained build with conan that can produce an universal binary on POSIX
- Fix and test the `DrawablePath` API

## [0.0.4] 2023-05-06

- Fix and test automatic rebuilding when installing from npm

## [0.0.3] 2023-05-05

- Render the package compatible with Node.js 14.x / 16.x

## [0.0.2] 2023-05-05

- Fix the install script

## [0.0.1] 2023-05-05

- First alpha release
