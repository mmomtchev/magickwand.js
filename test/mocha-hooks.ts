exports.mochaHooks = {
  afterEach() {
    globalThis.gc!();
  }
};
