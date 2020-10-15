const curry = require('../src/index.js');

function add(a, b, c, d) {
  console.log(this);
  console.log(a + b + c + d);
}

var add = curry(add);

const obj = {};
obj.add = add;
obj.add(1)(2)(3)(4);
