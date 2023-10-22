import * as path from 'path';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { Magick, MagickCore } from 'magickwand.js';

chai.use(chaiAsPromised);
const assert = chai.assert;

const wizard = path.join(__dirname, 'data', 'wizard.gif');

import StressTest from './stress.shared';

StressTest(wizard, assert, Magick, MagickCore);
