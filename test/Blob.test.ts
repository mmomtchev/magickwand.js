import * as path from 'path';
import * as fs from 'fs';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const assert = chai.assert;

import { Magick } from 'node-magickwand';

import TestBlob from './Blob.shared';

const imageFile = path.join(__dirname, 'data', 'wizard.png');
const imageData = fs.readFileSync(imageFile);

TestBlob(imageFile, imageData.buffer, assert, Magick);
