import IM from 'node-magickwand/wasm';

IM.then(({ Magick, MagickCore, MagickVersion }) => {

  const magickImage = new Magick.Image;
  const status = document.getElementById('status')!;

  async function magickInfo() {
    const version = document.getElementById('im-version')!;
    version.innerHTML = MagickVersion;
    console.log(MagickVersion);

    const features = document.getElementById('im-features')!;
    features.innerHTML = MagickCore.GetMagickFeatures();

    const delegates = document.getElementById('im-delegates')!;
    delegates.innerHTML = MagickCore.GetMagickDelegates();
  }

  function dragHandler(event: DragEvent) {
    event.preventDefault();
  }

  function dropHandler(event: DragEvent) {
    event.preventDefault();
    console.log(event.dataTransfer?.files[0], event.dataTransfer?.items[0]);
    const image = event.dataTransfer?.files[0];
    loadImage(image);
  }

  function loadHandler(event: Event) {
    const target = event.target as HTMLInputElement;
    loadImage(target?.files?.[0]);
  }

  function loadImage(file: File | undefined) {
    if (!(file instanceof Blob)) {
      console.warn('failed loading', file);
      return;
    }
    status.innerHTML = 'Loading';
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const b64 = event.target!.result! as string;
        if (!b64.startsWith('data:image/'))
          throw new Error('not an image');
        console.log('loaded', b64.length, 'bytes');
        const payload = b64.split(',', 2);
        console.log(b64.substring(0, 100));
        status.innerHTML = 'Decoding Base64';
        const magickBlob = new Magick.Blob;
        await magickBlob.base64Async(payload[1]);
        status.innerHTML = 'Decoding image';
        await magickImage.readAsync(magickBlob);
        console.log(`size ${magickImage.size().width()}x${magickImage.size().height()}`);
        await displayImage();
      } catch (e) {
        status.innerHTML = 'Idle';
        console.error(e);
      }
    };
    reader.onerror = (error) => {
      status.innerHTML = 'Idle';
      console.error(error);
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
    const target = document.getElementById('target') as HTMLImageElement;
    target.src = URL.createObjectURL(jsBlob);
    status.innerHTML = 'Idle';
  }

  function MagickControlComponent(name: string, argCount: number, argNames?: string[], defaultArgs?: number[]) {
    const root = document.createElement('div');
    root.className = 'm-2 p-1 border d-flex flex-column';

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
      status.innerHTML = `Calling Magick.Image.${name}Async(${args.join(',')})`;
      (magickImage as any)[`${name}Async`].apply(magickImage, args)
        .then(displayImage)
        .catch((e: Error) => {
          console.error(e);
        })
        .then(() => void (status.innerHTML = 'Idle'));
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
  controls.appendChild(MagickControlComponent('rotate', 1, ['angle']));
  controls.appendChild(MagickControlComponent('shear', 2, ['x', 'y']));
  controls.appendChild(MagickControlComponent('blur', 2, ['radius', 'sigma'], [1, 0.5]));
  controls.appendChild(MagickControlComponent('edge', 1));
  controls.appendChild(MagickControlComponent('emboss', 2, ['radius', 'sigma'], [1, 0.5]));
});
