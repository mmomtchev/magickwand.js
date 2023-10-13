import IM from 'node-magickwand/wasm';

function component() {
  const root = document.createElement('div');
  root.innerHTML = 'Loading ImageMagick...';

  IM.then(({ Magick, MagickCore, MagickVersion }) => {
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

    // Display the built-in wizard.gif by encoding it in base64
    const image = document.createElement('img');
    const wizard = new Magick.Image('wizard.gif');
    const blob = new Magick.Blob;
    wizard.write(blob);
    image.src = 'data:image/gif;base64,' + blob.base64();
    root.appendChild(image);

    // Download an image and load it in ImageMagick
    // This requires that CORS is enabled on the remote webserver
    // Otherwise the browser won't let the JS code access the raw image data
    fetch('https://xn--h1agbaj9c.xn--b1afuaj9c.com/wizard.png')
      .then((r) => r.arrayBuffer())
      .then((r) => {
        const blob = new Magick.Blob(r);
        const wizard = new Magick.Image;
        wizard.read(blob);

        wizard.resize('25%x25%');
        wizard.rotate(10);
        wizard.magick('GIF');

        // Display the image by converting the Magick.Blob to a JS Blob
        wizard.write(blob);
        const jsBlob = new Blob([blob.data()], { type: 'image/gif' });
        const image = document.createElement('img');
        image.src = window.URL.createObjectURL(jsBlob);
        root.appendChild(image);
      });
  });

  return root;
}

document.body.appendChild(component());
