import _String from '../util/string';

//格式化金额
let formatPrice=function (price) {
    return _String.number_format(price, 2, '.', '');

};

//格式化金额
let formatPriceDot=function (price) {
    return _String.number_format(price, 2);

};

export {
    formatPrice,
    formatPriceDot,
}
