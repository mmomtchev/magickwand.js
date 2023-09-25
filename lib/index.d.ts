export * from '../swig/Magick++';

declare module '../swig/Magick++' {
  namespace std {
    interface coderInfoArray {
      [Symbol.iterator](): Iterator<Magick.CoderInfo>;
    }
  }
}
