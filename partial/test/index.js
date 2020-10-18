import partial from '../src/index.js';

console.log(partial, 'partial');

function test() {
  function add(...argvs) {
    console.log(this);
    console.log(argvs);
    console.log(argvs.reduce((total, current) => total + current, 0));
  } 


  add = partial(add, 1, undefined, 2, undefined);
  add(1, 2, 3);

  const obj = { a: 1 };
  obj.add = add;

  obj.add(2, 3, 4);
}

test();
