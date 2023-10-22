import * as path from 'path';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const assert = chai.assert;

import { Magick, MagickCore } from 'magickwand.js';

import ImageTest from './Image.shared';

ImageTest(path.resolve(__dirname, 'data', 'wizard.gif'), assert, Magick, MagickCore);
