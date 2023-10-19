import IM from 'node-magickwand/wasm';

IM.then(({ Magick, MagickCore, MagickVersion }) => {

  const magickBlob = new Magick.Blob;
  const magickImage = new Magick.Image;
  const status = document.getElementById('status');

  async function magickInfo() {
    const version = document.getElementById('im-version');
    version.innerHTML = MagickVersion;
    console.log(MagickVersion);

    const features = document.getElementById('im-features');
    features.innerHTML = MagickCore.GetMagickFeatures();

    const delegates = document.getElementById('im-delegates');
    delegates.innerHTML = MagickCore.GetMagickDelegates();
  }

  function dragHandler(event) {
    event.preventDefault();
  }

  function dropHandler(event) {
    event.preventDefault();
    console.log(event.dataTransfer.files[0], event.dataTransfer.items[0]);
    const image = event.dataTransfer.files[0];
    loadImage(image);
  }

  function loadHandler(event) {
    loadImage(event.target.files[0]);
  }

  function loadImage(file) {
    if (!(file instanceof Blob)) {
      console.warn('failed loading', file);
      return;
    }
    status.innerHTML = 'Loading';
    const reader = new FileReader();
    reader.onload = async (event) => {
      const b64 = event.target.result;
      if (!b64.startsWith('data:image/'))
        throw new Error('not an image');
      console.log('loaded', b64.length, 'bytes');
      const payload = b64.split(',', 2);
      await magickBlob.base64Async(payload[1]);
      await magickImage.readAsync(magickBlob);
      console.log(`size ${magickImage.size().width()}x${magickImage.size().height()}`);
      await displayImage();
    };

    reader.readAsDataURL(file);
  }

  async function displayImage() {
    status.innerHTML = 'Displaying';
    const blob = new Magick.Blob;
    status.innerHTML = 'Converting to PNG';
    await magickImage.magickAsync('png');
    status.innerHTML = 'Exporting to Blob';
    await magickImage.writeAsync(blob);
    status.innerHTML = 'Importing into the browser';
    const jsBlob = new Blob([blob.data()], { type: 'image/png' });
    const target = document.getElementById('target');
    target.src = URL.createObjectURL(jsBlob);
    status.innerHTML = 'Idle';
  }

  async function rotateImage() {
    if (!magickImage.isValid()) return;
    const r = parseFloat(document.getElementById('rotate').value || '0');
    status.innerHTML = 'Rotating';
    await magickImage.rotateAsync(r);
    await displayImage();
  }

  async function shearImage() {
    if (!magickImage.isValid()) return;
    const x = parseFloat(document.getElementById('shear-x').value || '0');
    const y = parseFloat(document.getElementById('shear-y').value || '0');
    status.innerHTML = 'Shearing';
    await magickImage.shearAsync(x, y);
    await displayImage();
  }

  magickInfo();
  const dropzone = document.getElementById('file');
  dropzone.addEventListener('dragover', dragHandler);
  dropzone.addEventListener('drop', dropHandler);
  dropzone.addEventListener('change', loadHandler);

  document.getElementById('btn-rotate').addEventListener('click', rotateImage);
  document.getElementById('btn-shear').addEventListener('click', shearImage);
});
