// 转换成单参函数
export const defaultExecRule = ({ func, argvs }) =>
  argvs.length >= func.length;

// 执行的条件是
// add(1)(2)();
// 没有限制参数数量
export const extraCallExecRule = ({ nextArgvs )) =>
  nextArgvs === undefined;
