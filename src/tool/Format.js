import _String from '../util/string';

//格式化金额
let formatPrice=function (price) {
    return _String.number_format(price, 2, '.', '');

};

//格式化金额
let formatPriceDot=function (price) {
    return _String.number_format(price, 2);

};

/**
 * 格式化后台时间
 * @param dateStr
 * @returns {string}
 */
let toDate=function(dateStr) {
    if (dateStr == null) {
        return '未知';
    }
    let Y = dateStr.substring(0, 4) + '-';
    let M = dateStr.substring(5, 7) + '-';
    let D = dateStr.substring(8, 10) + ' ';
    let h = dateStr.substring(11, 13) + ':';
    let m = dateStr.substring(14, 16) + ':';
    let s = dateStr.substring(17, 19);
    return Y + M + D + h + m + s;
};

export {
    formatPrice,
    formatPriceDot,
    toDate,
}

