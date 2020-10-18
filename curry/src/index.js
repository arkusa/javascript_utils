/**
 * @file 
 * @desc
 * @author askura
 * @date 2020-10-15
*/

import globalThis from '@ungap/globalThis';

import {
  defaultExecRule,
  extraCallExecRule,
} from './rules';

function curryFactory(execRule = defaultExecRule) {
    
  function curry(func, ...argvs) {
    let context = null;
    
    function acceptNextArgvs(...nextArgvs) {
      context = (this === undefined || this === globalThis)
        ? context
        : this;
  
      argvs = argvs.concat(nextArgvs);

      const ret = execRule({ func, argvs, nextArgvs })
        ? func.call(context, ...argvs)
        : acceptNextArgvs;
  
      return ret;
    }
  
    function F() {}
  
    F.prototype = func.prototype;
    acceptNextArgvs.prototype = new F();
    acceptNextArgvs.prototype.constructor = acceptNextArgvs;
    acceptNextArgvs.prototype.toString = () => func.toString();
  
    return acceptNextArgvs;
  }

  return curry;
}

export default curryFactory();

export {
  curryFactory,
  defaultExecRule,
  extraCallExecRule,
}
