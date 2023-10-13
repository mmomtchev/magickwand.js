import * as IM from '../../swig/Magick++';

export default function(): () => Promise<{
  Magick: typeof IM.Magick,
  MagickCore: typeof IM.MagickCore
}>;
