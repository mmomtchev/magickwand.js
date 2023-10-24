import IM from 'magickwand.js/wasm';

async function component() {
  const root = document.createElement('div');
  root.innerHTML = 'Loading imagemagick.js...';

  // The browser WASM version features asynchronous loading
  // This is inevitable since the WASM transpilation API itself is asynchronous
  const { Magick, MagickCore, MagickVersion } = await IM;

  root.innerHTML = '';  

  const version = document.createElement('div');
  version.innerHTML = MagickVersion;
  console.log(MagickVersion);

  const features = document.createElement('div');
  features.innerHTML = MagickCore.GetMagickFeatures();

  const delegates = document.createElement('div');
  delegates.innerHTML = MagickCore.GetMagickDelegates();

  root.appendChild(version);
  root.appendChild(features);
  root.appendChild(delegates);

  {
    // Display the built-in wizard.gif by encoding it in base64
    const image = document.createElement('img');
    const wizard = new Magick.Image('wizard.gif');
    const blob = new Magick.Blob;
    wizard.write(blob);
    image.src = 'data:image/gif;base64,' + blob.base64();
    root.appendChild(image);
  }

  // Download an image and load it in ImageMagick
  // This requires that either the image is served from the same origin
  // or that CORS is enabled on the remote webserver
  // Otherwise the browser won't let the JS code access the raw image data
  fetch('wizard.png')
    .then(async (r) => {
      const ab = await r.arrayBuffer();
      const blob = new Magick.Blob(ab);
      const wizard = new Magick.Image;
      await wizard.readAsync(blob);

      await wizard.resizeAsync('150%x150%');
      await wizard.rotateAsync(10);
      await wizard.magickAsync('WEBP');

      // Display the image by converting the Magick.Blob to a JS Blob
      wizard.write(blob);
      const jsBlob = new Blob([blob.data()], { type: 'image/webp' });
      const image = document.createElement('img');
      image.src = URL.createObjectURL(jsBlob);
      root.appendChild(image);
    });

  {
    // Generate a checkered image in WEBP format
    const size = 20;
    const pixels = new Uint8Array(size * size * 3);
    for (let x = 0; x < size; x++)
      for (let y = 0; y < size; y++) {
        pixels[x * 3 + y * size * 3] = 0;
        pixels[x * 3 + y * size * 3 + 1] = (x + y) % 2 ? 0 : 200;
        pixels[x * 3 + y * size * 3 + 2] = (x + y) % 2 ? 200 : 0;
      }
    const im = new Magick.Image;
    await im.readAsync(size, size, 'RGB', pixels);
    await im.scaleAsync('200x200');
    await im.magickAsync('WEBP');
    const blob = new Magick.Blob;
    await im.writeAsync(blob);

    // Convert Magick.Blob to JS blob and display it directly
    const jsBlob = new Blob([blob.data()], { type: 'image/webp' });
    const image = document.createElement('img');
    image.src = URL.createObjectURL(jsBlob);
    root.appendChild(image);
  }

  return root;
}

component().then((comp) => window.document.body.appendChild(comp));
