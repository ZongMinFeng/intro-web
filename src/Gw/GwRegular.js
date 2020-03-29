

var GwRegular={};

GwRegular.reg1=/^-?\d+$/;

GwRegular.phone=/^1[3456789]\d{9}$/;

GwRegular.certNo=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

//四位正实数
GwRegular.numeric4=/^[0-9]+(.[0-9]{0,4})?$/;

//两位正实数
GwRegular.numeric2=/^[0-9]+(.[0-9]{0,2})?$/;

//两位实数
GwRegular.numeric2_=/^-?[0-9]+(.[0-9]{0,2})?$/;

//正整数
GwRegular.num=/^[1-9][0-9]*$/;


export default GwRegular;
