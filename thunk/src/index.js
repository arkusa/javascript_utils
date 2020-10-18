/**
 * @file thunkify
 * @desc 生成thunk函数的工具方法
 * @author askura
 * @date 2020-10-19
 */

function thunkify(func) {
  function acceptNextArgvs(...argvs) {
    const context = this;

    function acceptCallback(callback) {
      try {
        return func.call(context, ...argvs, applyOnce(callback));
      } catch (err) {
        return callback(err);
      }
    }

    return acceptCallback;
  }

  return acceptNextArgvs;
}

// 对回调函数需要加🔒, 保证只执行一次
// 这是由于thunkify往往和co一起使用
// 即：其总是和generatory 函数的自动执行息息相关
// 看一下下面的🌰
/*
 * function asyncLog(l, callback) {
 *   try {
 *     console.log(l);
 *     callback(null, l);
 *     callback(null, l);
 *   } catch(err) {
 *     callback(null, l);
 *     callback(null, l);
 *   }
 * }
 */
// 上面的🌰 会导致自动流程控制的yieldResult.value(next) 中的next被执行了2次
// 从而导致generator流程⏩了1个流程
function applyOnce(func) {
  let called = false;

  return function (...argvs) {
    if (called) return;

    called = true;
    func.call(this, ...argvs);
  };
}

export default thunkify;
