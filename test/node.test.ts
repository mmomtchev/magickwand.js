/**
 * Main unit test set for Node.js native
 */

import * as path from 'path';
import * as fs from 'fs';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const assert: Chai.AssertStatic = chai.assert;

import TestImage from './Image.shared';
import TestBlob from './Blob.shared';
import TestColor from './Color.shared';
import TestGeometry from './Geometry.shared';
import TestStress from './stress.shared';

import './CoderInfo.node';
import './Core.node';
import './Draw.node';
import './STL.node';

import { Magick, MagickCore } from 'magickwand.js/native';

const imageFile = path.join(__dirname, 'data', 'wizard.gif');
const imageBuffer = fs.readFileSync(imageFile);
// Alas, this is a horrible pitfall that cannot be avoided
// Buffers are allowed to reuse their underlying ArrayBuffer
// The ArrayBuffer type was selected because it works both in Node.js and in the browser
const imageData = imageBuffer.buffer.slice(imageBuffer.byteOffset, imageBuffer.byteOffset + imageBuffer.length);

TestImage(path.resolve(__dirname, 'data', 'wizard.gif'), assert, Magick, MagickCore);
TestBlob(imageFile, imageData, assert, Magick);
TestColor(assert, Magick);
TestGeometry(assert, Magick);

const wizard = path.join(__dirname, 'data', 'wizard.gif');
TestStress(wizard, assert, Magick, MagickCore);
