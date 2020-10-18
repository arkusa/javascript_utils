/**
* @desc
* 将函数的返回值作为另一个函数的参数
* A(B(C())) -> compose(A, B, C)(C argvs);
* @author askura
* @date 2020-10-19
*/

const compose = (...funcs) =>
  funcs.reduce(
    (prev, func) =>
      (...argvs) =>
        prev(func.call(this, ...argvs))
  );

export default compose;
