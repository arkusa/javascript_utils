/**
* @file 
* @desc 偏函数
* @author askura
* @date 2020-10-16
*/

const defaultPlaceholder = undefined;

function concat(argvs, nextArgvs, placeholder) {
  const result = [];
  let nextArgvsPointer = 0;

  for (let i = 0; i < argvs.length; i += 1) {
    const argv = argvs[i];

    if (argv !== placeholder) result.push(argv);
    else {
      result.push(nextArgvs[nextArgvsPointer]);
      nextArgvsPointer += 1;
    }
  }

  while(nextArgvsPointer < nextArgvs.length) {
    result.push(nextArgvs[nextArgvsPointer]);
    nextArgvsPointer += 1;
  }

  return result;
}

function partialFactory(placeholder) {

  function partial(func, ...argvs) {

    function acceptNextArgvs(...nextArgvs) {
      return func.call(this, ...concat(argvs, nextArgvs, placeholder));
    }

    function F() {}
    
    F.prototype = func.prototype;
    acceptNextArgvs.prototype = new F();
    acceptNextArgvs.prototype.constructor = acceptNextArgvs;
    acceptNextArgvs.toString = () => func.toString();

    return acceptNextArgvs;
  }

  return partial;
}


export partialFactory;
export defaultPlaceholder;
export default partialFactory(defaultPlaceholder);
