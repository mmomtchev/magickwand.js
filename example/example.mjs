import { Magick, MagickCore } from '../native/index.mjs';
import { fileURLToPath } from 'url';
import * as path from 'path';

// The famous ImageMagick wizard
const wizard = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'test', 'data', 'wizard.png');

// Read a new image (synchronously)
let im = new Magick.Image(wizard);
console.log(`${wizard}: ${im.size()}`);

// Read a new image (asynchronously)
im = new Magick.Image;
await im.readAsync(wizard);
console.log(`${wizard}: ${await im.sizeAsync()}`);

// Check if PNG support is built-in (it should be)
const infoPNG = new Magick.CoderInfo('PNG');
console.log(`PNG support: ${infoPNG && infoPNG.isReadable()}`);

// Convert it to PNG
await im.magickAsync('PNG');

// Extract specific JPEG EXIF data / PNG attributes / ...
console.log('EXIF DateTime:', await im.attributeAsync('EXIF:DateTime'));
console.log('PNG text field:', await im.attributeAsync('png:text'));

// Get all the metadata
// More info here: https://imagemagick.org/script/escape.php
console.log('All metadata: ', await im.formatExpressionAsync('%[*:*]'));

// Rescale and rotate it
await im.scaleAsync('160x212');
await im.rotateAsync(60);

// Display it in a window and continue execution (requires X11)
im.displayAsync()
  .catch(() => console.warn('X11 support not available'));

// displayAsync locks the previous image object
// until it completes executions
im = new Magick.Image(wizard);

// Make a copy and convert it to 256-color GIF
const im256 = new Magick.Image(im);
await im256.quantizeColorsAsync(256);
await im256.quantizeAsync();
await im256.magickAsync('GIF');
console.log(`Image colors before/after conversion: ${im.totalColors()}/${im256.totalColors()}`);

// Set compression/quality (JPEG/PNG)
im.quality(98);

// Write it to a binary blob and export it to Base64
const blob = new Magick.Blob;
await im.writeAsync(blob);
const b64 = await blob.base64Async();
console.log(`Base64 ${wizard} : ${b64.substring(0, 40)}...`);

// Import from Base64
await blob.base64Async(b64);
await im.readAsync(blob);
console.log(`${blob}`);

// Convert to RGBA (raw) and write it to a TypedArray
await im.magickAsync('RGBA');
// Conversion to Uint16 is automatic
const pixels = new Uint16Array(im.size().width() * im.size().height() * 4);
im.write(0, 0, im.size().width(), im.size().height(), 'RGBA', pixels);
console.log(`Get pixel from ${wizard} 0 : 0 = ${pixels[0]}`);

// Access pixels directly
const px = im.pixelColor(5, 5);
console.log(`${wizard} 5 : 5 = ${px}`
  + ` (RGBA=${px.pixelType() == Magick.Color.RGBAPixel})`
  + ` red=${px.quantumRed()} alpha=${px.quantumAlpha()}`);

// Produce HTML hex color
const rgb = new Magick.ColorRGB(px);
console.log('HTML color: ', '#' + [rgb.red(), rgb.green(), rgb.blue(), rgb.alpha()]
  .map((v) => Math.floor(v * 255).toString(16).padStart(2, '0')).join(''));

// Parse HTML hex color
const cl = new Magick.Color('#7f7f7f');
console.log('Parse from HTML color to IM internal representation: ', cl.toString());

// Apply blur
const im2 = new Magick.Image(im);
await im2.blurAsync(0.5);

// Compositing (overlaying)
const im3 = new Magick.Image(im.size(), new Magick.Color(0, 65535, 0, 32768));
await im2.compositeAsync(im3, '0x0+0+0', MagickCore.MultiplyCompositeOp);

// Crop
im.crop('10x8+5+5');
console.log(`After cropping: ${wizard}: ${im.size()}`);
