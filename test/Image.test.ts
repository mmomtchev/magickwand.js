import * as path from 'path';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const assert = chai.assert;

import { Magick, MagickCore } from 'node-magickwand';

import ImageTest from './Image.shared';

ImageTest(path.resolve(__dirname, 'data', 'wizard.gif'), assert, Magick, MagickCore);
