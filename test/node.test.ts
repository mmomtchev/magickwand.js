/**
 * Main unit test set for Node.js native
 */

import * as path from 'path';
import * as fs from 'fs';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

const imageFile = path.join(__dirname, 'data', 'wizard.gif');
const imageData = fs.readFileSync(imageFile);
console.log(imageFile, imageData, imageData.buffer, imageData.buffer.toString());
console.log(imageData[0], imageData.buffer[0]);
console.log(imageData.byteOffset);

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

TestImage(path.resolve(__dirname, 'data', 'wizard.gif'), assert, Magick, MagickCore);
const trimmeArraydBuffer = imageData.buffer.slice(imageData.byteOffset, imageData.byteOffset + imageData.length);
console.log(imageFile, imageData, imageData.buffer, trimmeArraydBuffer);
TestBlob(imageFile, trimmeArraydBuffer, assert, Magick);
TestColor(assert, Magick);
TestGeometry(assert, Magick);

const wizard = path.join(__dirname, 'data', 'wizard.gif');
TestStress(wizard, assert, Magick, MagickCore);
