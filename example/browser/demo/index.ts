import IM from 'magickwand.js/wasm';
import pkg from '../../../package.json';

IM.then(({ Magick, MagickCore, MagickVersion }) => {

  /**
   * The internal state:
   *  a loaded image
   *  a status message
   */
  const magickImage = new Magick.Image;
  const status = document.getElementById('status')!;

  async function magickInfo() {
    const pkgVersion = document.getElementById('mw-version')!;
    pkgVersion.innerHTML = pkg.version;

    const version = document.getElementById('im-version')!;
    version.innerHTML = MagickVersion;
    console.log(MagickVersion);

    const features = document.getElementById('im-features')!;
    features.innerHTML = MagickCore.GetMagickFeatures();

    const delegates = document.getElementById('im-delegates')!;
    delegates.innerHTML = MagickCore.GetMagickDelegates();
  }

  /**
   * Prevent the browser from handling the dragging
   * 
   * @param event UI browser event
   */
  function dragHandler(event: DragEvent) {
    event.preventDefault();
  }

  /**
   * Load the image in a File struct after a drag&drop
   * 
   * @param event UI browser event
   */
  function dropHandler(event: DragEvent) {
    event.preventDefault();
    console.log(event.dataTransfer?.files[0], event.dataTransfer?.items[0]);
    const image = event.dataTransfer?.files[0];
    loadImage(image);
  }

  /**
   * Load the image in a File struct after a click
   * 
   * @param event UI browser event
   */
  function loadHandler(event: Event) {
    const target = event.target as HTMLInputElement;
    loadImage(target?.files?.[0]);
  }

  /**
   * Enable the spinner and block the UI
   */
  function spinnerEnable(msg: string) {
    status.innerHTML = msg;
    document.getElementById('spinner')!.classList.remove('d-none');
    const btns = document.getElementsByTagName('button');
    for (let i = 0; i < btns.length; i++) {
      btns[i].classList.add('disabled');
    }
  }

  /**
   * Disable the spinner and enable the UI
   */
  function spinnerDisable() {
    status.innerHTML = 'Idle';
    document.getElementById('spinner')!.classList.add('d-none');
    const btns = document.getElementsByTagName('button');
    for (let i = 0; i < btns.length; i++) {
      btns[i].classList.remove('disabled');
    }
  }

  /**
   * @param file Load an image in a File struct
   */
  function loadImage(file: File | undefined) {
    if (!(file instanceof Blob)) {
      console.warn('failed loading', file);
      return;
    }
    spinnerEnable('Loading');
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const b64 = event.target!.result! as string;
        if (!b64.startsWith('data:image/'))
          throw new Error('not an image');
        console.log('loaded', b64.length, 'bytes');
        const payload = b64.split(',', 2);
        spinnerEnable('Decoding Base64');
        const magickBlob = new Magick.Blob;
        await magickBlob.base64Async(payload[1]);
        spinnerEnable('Decoding image');
        await magickImage.readAsync(magickBlob);
        const type = magickImage.magick();
        console.log(`detected ${type} image, size ${magickImage.size().width()}x${magickImage.size().height()}`);
        await displayImage();
      } catch (e) {
        spinnerDisable();
        console.error(e);
      }
    };
    reader.onerror = (error) => {
      spinnerDisable();
      console.error(error);
    };

    reader.readAsDataURL(file);
  }

  /**
   * Display the stored image
   */
  async function displayImage() {
    spinnerEnable('Displaying');
    const blob = new Magick.Blob;
    if (!['PNG', 'JPEG', 'GIF', 'WEBP'].includes(magickImage.magick())) {
      spinnerEnable('Converting to WEBP');
      await magickImage.magickAsync('WEBP');
    }
    await magickImage.writeAsync(blob);
    spinnerEnable('Importing into the browser');
    const jsBlob = new Blob([blob.data()], { type: `image/${magickImage.magick().toLowerCase()}` });
    const target = document.getElementById('target') as HTMLImageElement;
    target.src = URL.createObjectURL(jsBlob);
    spinnerDisable();
  }

  /**
   * Create the HTML input boxes and the button for each method.
   * Create and attach a click handler.
   * 
   * @param name ImageMagick method
   * @param argCount number of parameters
   * @param argNames optional names for the parameters
   * @param defaultArgs optional default values for the parameters
   * @returns HTMLElement
   */
  function MagickControlComponent(name: string, argCount: number, argNames?: string[], defaultArgs?: number[]) {
    // The root div with the border
    const root = document.createElement('div');
    root.className = 'm-2 p-1 border d-flex flex-column';

    // The input boxes
    for (let i = 0; i < argCount; i++) {
      const param = document.createElement('div');
      param.className = 'd-flex flex-row justify-content-between align-items-center';
      root.appendChild(param);

      const label = document.createElement('label');
      label.setAttribute('for', `${name}-${i}`);
      label.innerHTML = argNames?.[i] ?? `arg${i}`;
      label.className = 'me-1';
      param.appendChild(label);

      const input = document.createElement('input');
      input.setAttribute('id', `${name}-${i}`);
      input.setAttribute('name', `${name}-${i}`);
      input.setAttribute('type', 'number');
      input.setAttribute('value', defaultArgs?.[i]?.toString() ?? '0');
      param.appendChild(input);
    }

    // The button
    const btn = document.createElement('button');
    btn.setAttribute('id', `${name}-btn`);
    btn.className = 'm-1 btn btn-secondary';
    btn.innerHTML = name;
    root.appendChild(btn);

    btn.addEventListener('click', () => {
      if (!magickImage.isValid()) return;
      const args = [];
      for (let i = 0; i < argCount; i++) {
        args[i] = parseFloat((document.getElementById(`${name}-${i}`) as HTMLInputElement).value || '0');
      }
      spinnerEnable(`Calling Magick.Image.${name}Async(${args.join(', ')})`);
      (magickImage as any)[`${name}Async`].apply(magickImage, args)
        .then(displayImage)
        .catch((e: Error) => {
          console.error(e);
        })
        .then(spinnerDisable);
    });

    return root;
  }

  magickInfo();
  const dropzone = document.getElementById('dropzone') as HTMLLabelElement;
  dropzone.addEventListener('dragover', dragHandler);
  dropzone.addEventListener('drop', dropHandler);
  const input = document.getElementById('file') as HTMLInputElement;
  input.addEventListener('change', loadHandler);

  const controls = document.getElementById('controls') as HTMLDivElement;
  controls.appendChild(MagickControlComponent('flip', 0));
  controls.appendChild(MagickControlComponent('flop', 0));
  controls.appendChild(MagickControlComponent('rotate', 1, ['angle']));
  controls.appendChild(MagickControlComponent('roll', 2, ['columns', 'rows']));
  controls.appendChild(MagickControlComponent('shear', 2, ['x', 'y']));
  controls.appendChild(MagickControlComponent('blur', 2, ['radius', 'sigma'], [1, 0.5]));
  controls.appendChild(MagickControlComponent('gaussianBlur', 2, ['width', 'sigma'], [1, 0.5]));
  controls.appendChild(MagickControlComponent('wave', 2, ['amplitude', 'wavelength'], [25, 150]));
  controls.appendChild(MagickControlComponent('edge', 1));
  controls.appendChild(MagickControlComponent('reduceNoise', 1));
  controls.appendChild(MagickControlComponent('spread', 1));
  controls.appendChild(MagickControlComponent('oilPaint', 1));
  controls.appendChild(MagickControlComponent('solarize', 1));
  controls.appendChild(MagickControlComponent('sharpen', 2, ['radius', 'sigma']));
  controls.appendChild(MagickControlComponent('segment', 2, ['cluster', 'smoothing'], [1, 1.5]));
  controls.appendChild(MagickControlComponent('implode', 1, ['factor']));
  controls.appendChild(MagickControlComponent('emboss', 2, ['radius', 'sigma'], [1, 0.5]));
  controls.appendChild(MagickControlComponent('modulate', 3, ['brightness', 'saturation', 'hue'], [1, 0.5]));
  controls.appendChild(MagickControlComponent('motionBlur', 3, ['radius', 'sigma', 'angle'], [1, 0.5]));
});
