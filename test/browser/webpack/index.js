import * as emnapi from '@emnapi/runtime';
import IM_import from '../../../lib/binding/wasm-wasm32/node-magickwand';

function component() {
  const root = document.createElement('div');
  root.innerHTML = 'Loading ImageMagick...';

  console.log('import', IM_import);
  IM_import().then((IM_emnapi) => {
    const IM = IM_emnapi.emnapiInit({ context: emnapi.getDefaultContext() });
    const { Magick, MagickCore, MagickVersion } = IM;
    root.innerHTML = '';

    const version = document.createElement('div');
    version.innerHTML = MagickVersion;

    const features = document.createElement('div');
    features.innerHTML = MagickCore.GetMagickFeatures();

    const delegates = document.createElement('div');
    delegates.innerHTML = MagickCore.GetMagickDelegates();

    root.appendChild(version);
    root.appendChild(features);
    root.appendChild(delegates);

    const image = document.createElement('img');
    const wizard = new Magick.Image('wizard.gif');
    const blob = new Magick.Blob;
    wizard.write(blob);
    image.src = 'data:image/gif;base64,' + blob.base64();
    root.appendChild(image);
  });

  return root;
}

document.body.appendChild(component());
