declare const IM: Promise<typeof import('../swig/Magick++')>

declare type FSMode = 'r' | 'r+' | 'w' | 'wx' | 'w+' | 'wx+' | 'a' | 'ax' | 'a+' | 'ax+';

declare module '../swig/Magick++' {
  namespace FS {
    function open(path: string, mode?: FSMode): unknown;
    function close(file: unknown): void;
    function read(file: unknown, buffer: ArrayBufferView, offset: number, length: number, position?: number): void;
    function write(file: unknown, buffer: ArrayBufferView, offset: number, legnth: number, position?: number): void;
    function readFile(path: string, opts: { encoding?: 'binary', flags?: string}): Uint8Array;
    function readFile(path: string, opts: { encoding: 'utf8', flags?: string; }): string;
    function writeFile(path: string, data: Uint8Array, opts: { encoding?: 'binary', flags?: FSMode; }): void;
    function writeFile(path: string, data: string, opts: { encoding: 'utf8', flags?: FSMode; }): void;
  }
}

export default IM;
