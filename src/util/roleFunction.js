export function role(that) {
  let FunctionArray = JSON.parse(localStorage.getItem('funcArray'));
  if (!FunctionArray) {
    return false;
  }
  let Function = {};
  for (let  i = 0; i < FunctionArray.length; i++) {
    Function[FunctionArray[i].funcId] = true;
  }

  that.Function = Function;
  return Function;
};
