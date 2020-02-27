/**
 * 得到32位随机字符（字母大小写和数字）
 * @returns {string}
 */
const get32randString = () => {
  let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  let nums = "";
  for (var i = 0; i < 32; i++) {
    let id = parseInt(Math.random() * 61);
    nums += chars[id];
  }
  return nums;
};

/**
 *两个字符串异或
 */
const getXorString = (tr1, str2) => {
  var a = '0x' + str1;
  var b = '0x' + str2;
  var c = (parseInt(a) ^ parseInt(b)).toString(16);
  console.log(c);
  return c;
};

/**
 *时间戳转时间
 */
const num2Date = (dateNum) => {
  if (dateNum == null || dateNum === '') {
    return '未知';
  }
  let date = new Date(dateNum);
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
};

//金额，数字格式化
const number_format = (number, decimals, dec_point, thousands_sep) => {
  /*
  　　 * 参数说明：
  　　 * number：要格式化的数字
  　　 * decimals：保留几位小数
  　　 * dec_point：小数点符号
  　　 * thousands_sep：千分位符号
  　　 * */
  number = (number + '').replace(/[^0-9+-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.ceil(n * k) / k;
    };

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

//取消格式化
const rmoney = (e) => {
  return parseFloat(e.replace(/[^\d\.-]/g, ""));
};

/**
 * 十六进制转换二进制(本次转换的方法没有考虑带小数点的情况)
 *如果长度没有超过13位，可以用parseInt("125adf8", 16).toString(2) = '1001001011010110111111000',
 * @param str
 * @returns {string}
 */
const hex_to_bin = (str) => {
  let strBin = '';
  for (let i = 0; i < Math.ceil(str.length / 12); i++) {
    // 由于转int时，最前面的0会被去掉，先在最前面加上F，然后再删除
    let strTmp = parseInt('F' + str.substr(i * 12, 12), 16).toString(2)
    strBin += strTmp.substr(4, strTmp.length);
  }
  return strBin
};

export {
  get32randString,
  getXorString,
  num2Date,
  number_format,
  rmoney,
  hex_to_bin
}
