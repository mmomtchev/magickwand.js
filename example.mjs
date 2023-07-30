import IM from './lib/index.js';
import { fileURLToPath } from 'url';
import * as path from 'path';

const Magick = IM.Magick;

// The famous ImageMagick wizard
const wizard = path.join(path.dirname(fileURLToPath(import.meta.url)), 'test', 'data', 'wizard.png');

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

// Rescale and rotate it
await im.scaleAsync(new Magick.Geometry('160x212'));
await im.rotateAsync(60);

// Display it and continue execution (requires X11)
im.displayAsync();

// displayAsync locks the previous image object
// until it completes executions
im = new Magick.Image(wizard);

// Write it to a binary blob and export it to Base64
const blob = new Magick.Blob;
await im.writeAsync(blob);
const b64 = await blob.base64Async();
console.log(`${wizard} : ${b64.substring(0, 40)}...`);

// Import from Base64
await blob.base64Async(b64);
await im.readAsync(blob);
console.log(`${blob}`);

// Convert to RGBA (raw) and write it to a TypedArray
await im.magickAsync('RGBA');
// Conversion to Uint16 is automatic
const pixels = new Uint16Array(im.size().width() * im.size().height() * 4);
im.write(0, 0, im.size().width(), im.size().height(), 'RGBA', pixels);
console.log(`${wizard} 0 : 0 = ${pixels[0]}`);

// Access pixels directly
const px = im.pixelColor(5, 5);
console.log(`${wizard} 5 : 5 = ${px}`
  + ` (RGBA=${px.pixelType() == Magick.Color.RGBAPixel})`
  + ` red=${px.quantumRed()} alpha=${px.quantumAlpha()}`);

// Apply blur
const im2 = new Magick.Image(im);
await im2.blurAsync(0.5);

// Compositing (overlaying)
const im3 = new Magick.Image(im.size(), new Magick.Color(0, 65535, 0, 32768));
await im2.compositeAsync(im3, new Magick.Geometry(0, 0), IM.MagickCore.MultiplyCompositeOp);

// Crop
im.crop(new Magick.Geometry("10x8+5+5"));
console.log(`${wizard}: ${im.size()}`);
