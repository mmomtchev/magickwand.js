/**
 * This is a workaround for the incompatibility
 * between tsconfig paths and package.json exports.
 * 
 * It allows to use 'magickwand.js/native' in the tests
 * so that the tests can be run both from inside the package
 * and with the package installed in node_modules.
 * 
 * https://github.com/microsoft/TypeScript/issues/60460
 */

export * from '../native/index.cjs';
import IM from '../native/index.cjs';
export default IM;
