import compose from '../src/index.mjs';


function log(argv) {
  console.log(argv);

  return argv + 1;
}

compose(log, log, log, log)(1);
