import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const assert = chai.assert;

import { Magick } from 'node-magickwand';

import TestGeometry from './Geometry.shared';

TestGeometry(assert, Magick);
