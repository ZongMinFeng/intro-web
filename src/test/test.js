/**
 * 用于代码测试
 */
import {aEb} from "../Gw/GwArray";
// let {aEb}=require('../Gw/GwArray');
let a={
  x:1,
  y:2,
  z:[1, 2, 3]
};

let b={
  x:1,
  y:2,
  z:[1, 3, 2]
};

let equalFunc=function (a, b) {
  return a.join(',')===b.join(',');
};

let funcArray=[];
funcArray['z']=equalFunc;
console.log(aEb(a, b, funcArray));
