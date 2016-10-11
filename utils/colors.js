// Node String Colors Support. (global version) (https://git.io/colors)
// Usage console.log(green("Hello world!")
const _c = require('util').inspect.colors;
Object.keys(_c).forEach(c =>global[c] = s =>`\x1b[${_c[c][0]}m${s}\x1b[${_c[c][1]}m`);
