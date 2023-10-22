import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const assert = chai.assert;

import { Magick } from 'magickwand.js';

import TestColor from './Color.shared';

TestColor(assert, Magick);
