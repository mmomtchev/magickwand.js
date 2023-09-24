export * from './Magick++';

declare module './Magick++' {
  namespace std {
    interface coderInfoArray {
      [Symbol.iterator](): Iterator<Magick.CoderInfo>;
    }
  }
}
