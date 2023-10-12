const emnapi = require('@emnapi/runtime');
require('./build/imagemagick.js')()
  .then((mod) => {
    const binding = mod.emnapiInit({ context: emnapi.getDefaultContext() });
    const { Magick, MagickCore, MagickVersion } = binding;
    console.log(MagickVersion);
    console.log(MagickCore.GetMagickFeatures());
    console.log(MagickCore.GetMagickDelegates());
    // wizard.gif is embedded in the dist file
    const im = new Magick.Image('wizard.gif');
    console.log('wizard.gif', `${im.size().width()}x${im.size().height()}`);
  });
