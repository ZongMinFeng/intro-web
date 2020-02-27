
  var _String = {};

  _String.trim = function (str) {
    return (str || "").replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "");
  };

  _String.splitAndTrim = function (str, spliter) {
    var result = str.split(spliter);
    for (var i = 0; i < result.length; i++) {
      result[i] = _String.trim(result[i]);
    }
    return result;
  };

  _String.format = function () {
    if (arguments.length === 0)
      return null;
    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
      var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
      str = str.replace(re, arguments[i]);
    }
    return str;
  };

  _String.toInt = function (str, defaultValue) {
    var result = parseInt(str, 10);
    return (isNaN(result)) ? defaultValue : result;
  };

  _String.toFloat = function (str, defaultValue) {
    var result = parseFloat(str);
    return (isNaN(result)) ? defaultValue : result;
  };

  _String.HTMLEncode = function (text) {
    var converter = document.createElement("DIV");
    converter.innerText = text;
    converter.textContent = text;
    var output = converter.innerHTML;
    converter = null;
    output = output.replace(/"/g, "&quot;");
    output = output.replace(/'/g, "&apos;");
    return output;
  };

  _String.HTMLDecode = function (html) {
    var converter = document.createElement("DIV");
    converter.innerHTML = html;
    var output = converter.innerText || converter.textContent;
    converter = null;
    return output;
  };

  _String.zeros = function (value, length, right) {
    var res = "" + value;
    for (; res.length < length; res = right ? res + '0' : '0' + res) {
    }
    return res;
  };

  _String.camelize = function (str, lowFirstLetter) {
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.substring(1);
  };

/**
 * 金额格式化
 * @param number
 * @param decimals
 * @param dec_point
 * @param thousands_sep
 * @returns {string}
 */
  _String.number_format=function (number, decimals, dec_point, thousands_sep){
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function(n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.ceil(n * k) / k;
        };

    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    var re = /(-?\d+)(\d{3})/;
    while(re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + sep + "$2");
    }

    if((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
  };

/**
 * 取消金额格式化
 * @param e
 * @returns {number}
 */
  _String.rmoney=function(e){
    return parseFloat(e.replace(/[^\d\.-]/g, ""));
};


// module.exports= _String
export default _String
