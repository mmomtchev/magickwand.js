const emnapi = require('@emnapi/runtime');
require('./imagemagick.js')()
  .then((mod) => {
    const binding = mod.emnapiInit({ context: emnapi.getDefaultContext() });
    const { Magick } = binding;
    // wizard.gif is embedded in the dist file
    const im = new Magick.Image('wizard.gif');
    console.log('wizard.gif', `${im.size().width()}x${im.size().height()}`);
  });
