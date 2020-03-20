import * as md5 from "./md5";
import * as jsonSha256 from "./jsonSha256";
import {PERMISSIONS} from "../tool/permission";
import {pubRandom} from "./pub";
import {formatPrice} from "../tool/Format";

const common = require('./common.js');
const cfg = require("../config/cfg.js");

const instGetAllById = (me, instId, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        urlParams.url = cfg.service.instGetAllById.url + '/' + cfg.service.instGetAllById.action;
        urlParams.txnId = cfg.service.instGetAllById.txnId;
        if (instId) {
            send.specInstId = instId;
        }
        urlParams.send = send;
        urlParams.noSing = true
        let singArray = {};
        urlParams.singArray = singArray;
        let that = this;

        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    })
};

const instTellersGetByCons = (me, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        urlParams.url = cfg.service.instTellersGetByCons.url + '/' + cfg.service.instTellersGetByCons.action;
        urlParams.txnId = cfg.service.instTellersGetByCons.txnId;
        urlParams.send = send;
        urlParams.noSing = true;
        let singArray = {};
        urlParams.singArray = singArray;
        let that = this;

        common.sendServer(urlParams, me, Toast).then((res) => {
            resolve(res)
        }, (res) => {
            reject(res)
        });
    })
};

const instRolesGetByCons = (me, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        urlParams.url = cfg.service.instRolesGetByCons.url + '/' + cfg.service.instRolesGetByCons.action;
        urlParams.txnId = cfg.service.instRolesGetByCons.txnId;
        urlParams.send = send;
        urlParams.noSing = true
        let singArray = {};
        urlParams.singArray = singArray;
        let that = this;

        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    })
};

const roleFuncsGetByCons = (me, roleId, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        urlParams.url = cfg.service.roleFuncsGetByCons.url + '/' + cfg.service.roleFuncsGetByCons.action;
        urlParams.txnId = cfg.service.roleFuncsGetByCons.txnId;
        send.roleId = roleId;
        urlParams.send = send;
        urlParams.noSing = true
        let singArray = {};
        urlParams.singArray = singArray;
        let that = this;

        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    })
};

const tellerRolesGetByCons = (me, tellerId, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        urlParams.url = cfg.service.tellerRolesGetByCons.url + '/' + cfg.service.tellerRolesGetByCons.action;
        urlParams.txnId = cfg.service.tellerRolesGetByCons.txnId;
        send.specTellerId = tellerId;
        urlParams.send = send;
        urlParams.noSing = true;
        let singArray = {};
        urlParams.singArray = singArray;
        let that = this;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    })
};

const tellerFuncsGetByCons = (me, tellerId, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        urlParams.url = cfg.service.tellerFuncsGetByCons.url + '/' + cfg.service.tellerFuncsGetByCons.action;
        urlParams.txnId = cfg.service.tellerFuncsGetByCons.txnId;
        send.specTellerId = tellerId;
        urlParams.send = send;
        urlParams.noSing = true;
        urlParams.errInfoFlag = true;
        let singArray = {};
        urlParams.singArray = singArray;
        let that = this;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    })
};

const tellerInstsGetByCons = (me, tellerId, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        urlParams.url = cfg.service.tellerInstsGetByCons.url + '/' + cfg.service.tellerInstsGetByCons.action;
        urlParams.txnId = cfg.service.tellerInstsGetByCons.txnId;
        send.specTellerId = tellerId;
        urlParams.send = send;
        urlParams.noSing = true;
        let singArray = {};
        urlParams.singArray = singArray;
        let that = this;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    })
};

const instGetById = (me, instId, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        urlParams.url = cfg.service.instGetById.url + '/' + cfg.service.instGetById.action;
        urlParams.txnId = cfg.service.instGetById.txnId;
        send.specInstId = instId
        urlParams.send = send
        urlParams.noSing = true
        let singArray = {}
        urlParams.singArray = singArray
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
}

const unitPreservation = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        urlParams.url = cfg.service.unitPreservation.url + '/' + cfg.service.unitPreservation.action;
        urlParams.txnId = cfg.service.unitPreservation.txnId;
        send.buildingInstId = params.buildingInstId;
        send.unitName = params.unitName;
        urlParams.send = send
        let singArray = {
            buildingInstId: send.buildingInstId
        };
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

const unitModification = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        urlParams.url = cfg.service.unitModification.url + '/' + cfg.service.unitModification.action;
        urlParams.txnId = cfg.service.unitModification.txnId;
        send.unitId = params.unitId;
        send.unitName = params.unitName;
        urlParams.send = send;
        let singArray = {
            unitId: send.unitId
        };
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

const unitGetByCons = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        urlParams.url = cfg.service.unitGetByCons.url + '/' + cfg.service.unitGetByCons.action;
        urlParams.txnId = cfg.service.unitGetByCons.txnId;
        send.buildingInstId = params.buildingInstId;
        urlParams.send = send;
        urlParams.noSing = true;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

const deviceModification = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};
        urlParams.url = cfg.service.deviceModification.url + '/' + cfg.service.deviceModification.action;
        urlParams.txnId = cfg.service.deviceModification.txnId;
        send.deviceId = params.deviceId;
        singArray.deviceId = params.deviceId;
        if (params.deviceName != null) {
            send.deviceName = params.deviceName;
        }
        if (params.status != null) {
            send.status = params.status;
            singArray.status = params.status;
        }
        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

const deviceGetByCons = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        urlParams.url = cfg.service.deviceGetByCons.url + '/' + cfg.service.deviceGetByCons.action;
        urlParams.url += '?page=' + params.page + '&pageSize=' + params.pageSize;
        urlParams.txnId = cfg.service.deviceGetByCons.txnId;
        if (params.specInstId != null) {
            send.specInstId = params.specInstId;
        }
        urlParams.send = send
        urlParams.noSing = true
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

const deviceGetById = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        urlParams.url = cfg.service.deviceGetById.url + '/' + cfg.service.deviceGetById.action;
        urlParams.txnId = cfg.service.deviceGetById.txnId;
        if (params.deviceId != null) {
            send.deviceId = params.deviceId;
        }
        if (params.unitId != null) {
            send.unitId = params.unitId;
        }
        urlParams.send = send
        urlParams.noSing = true
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

const deviceOpenDoorModification = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let singArray = {};
        let send = {};
        urlParams.url = cfg.service.deviceOpenDoorModification.url + '/' + cfg.service.deviceOpenDoorModification.action;
        urlParams.txnId = cfg.service.deviceOpenDoorModification.txnId;
        if (params.deviceId != null) {
            send.deviceId = params.deviceId;
            singArray.deviceId = send.deviceId;
        }
        if (params.unitId != null) {
            send.unitId = params.unitId;
            singArray.unitId = send.unitId;
        }
        urlParams.send = send
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

const assignDeviceModification = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let singArray = {};
        let send = {};
        urlParams.url = cfg.service.assignDeviceModification.url + '/' + cfg.service.assignDeviceModification.action;
        urlParams.txnId = cfg.service.assignDeviceModification.txnId;
        if (params.deviceId != null) {
            send.deviceId = params.deviceId;
            singArray.deviceId = send.deviceId;
        }
        if (params.specInstId != null) {
            send.specInstId = params.specInstId;
            singArray.specInstId = send.specInstId;
        }
        if (params.deviceName != null) {
            urlParams.deviceName = params.deviceName;
        }

        urlParams.send = send
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

const bindDeviceModification = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let singArray = {};
        let send = {};
        let header = {};
        urlParams.url = cfg.service.bindDeviceModification.url + '/' + cfg.service.bindDeviceModification.action;
        urlParams.txnId = cfg.service.bindDeviceModification.txnId;
        if (params.deviceId != null) {
            send.deviceId = params.deviceId;
            singArray.deviceId = send.deviceId;
        }
        if (params.unitId != null) {
            send.unitId = params.unitId;
            singArray.unitId = send.unitId;
        }
        if (params.operFlag != null) {
            header.operFlag = params.operFlag;
        }
        if (params.buildingInstId != null) {
            send.buildingInstId = params.buildingInstId;
            singArray.buildingInstId = send.buildingInstId;
        }

        urlParams.send = send
        urlParams.singArray = singArray;
        let count = Object.keys(header).length;
        if (count > 0) {
            urlParams.header = header;
        }
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

const resourcePreservation = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let singArray = {};
        let send = {};
        urlParams.url = cfg.service.resourcePreservation.url + '/' + cfg.service.resourcePreservation.action;
        urlParams.txnId = cfg.service.resourcePreservation.txnId;
        if (params.resourceName != null) {
            send.resourceName = params.resourceName;
        }
        if (params.specInstId != null) {
            send.specInstId = params.specInstId;
            singArray.specInstId = send.specInstId;
        }
        if (params.resourceType != null) {
            send.resourceType = params.resourceType;
            singArray.resourceType = send.resourceType;
        }
        if (params.resourceUrl != null) {
            send.resourceUrl = params.resourceUrl;
            singArray.resourceUrl = send.resourceUrl;
        }
        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

const resourceModification = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let singArray = {};
        let send = {};
        urlParams.url = cfg.service.resourceModification.url + '/' + cfg.service.resourceModification.action;
        urlParams.txnId = cfg.service.resourceModification.txnId;
        if (params.resourceId != null) {
            send.resourceId = params.resourceId;
            singArray.resourceId = send.resourceId;
        }
        if (params.resourceName != null) {
            send.resourceName = params.resourceName;
        }
        if (params.resourceUrl != null) {
            send.resourceUrl = params.resourceUrl;
            singArray.resourceUrl = send.resourceUrl;
        }
        if (params.status != null) {
            send.status = params.status;
            singArray.status = send.status;
        }
        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

const resourceClear = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let singArray = {};
        let send = {};
        urlParams.url = cfg.service.resourceClear.url + '/' + cfg.service.resourceClear.action;
        urlParams.txnId = cfg.service.resourceClear.txnId;
        if (params.resourceId != null) {
            send.resourceId = params.resourceId;
            singArray.resourceId = send.resourceId;
        }
        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

const resourceGetByCons = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        urlParams.url = cfg.service.resourceGetByCons.url + '/' + cfg.service.resourceGetByCons.action;
        urlParams.url += '?page=' + params.page + '&pageSize=' + params.pageSize;
        urlParams.txnId = cfg.service.resourceGetByCons.txnId;
        if (params.specInstId != null) {
            send.specInstId = params.specInstId;
        }
        urlParams.send = send;
        urlParams.noSing = true;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

const houseGetByCons = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};
        urlParams.url = cfg.service.houseGetByCons.url + '/' + cfg.service.houseGetByCons.action;
        urlParams.txnId = cfg.service.houseGetByCons.txnId;

        if (params.buildingInstId != null) {
            send.buildingInstId = params.buildingInstId;
        }
        if (params.unitId != null) {
            send.unitId = params.unitId;
        }

        urlParams.send = send;
        urlParams.noSing = true;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

const sendFile = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let index = params.index;
        urlParams.url = cfg.service.sendFile.url + '/' + cfg.service.sendFile.action;
        urlParams.url += '?index=' + index;

        urlParams.txnId = cfg.service.sendFile.txnId;

        let goodsFileNames = [];
        goodsFileNames.push(params.file.name);

        let send = new FormData();
        send.append("uploadFileNames", params.file);
        urlParams.singArray = {
            index: index,
        };

        urlParams.send = send;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

const pubRes2DevPreservation = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};
        urlParams.url = cfg.service.pubRes2DevPreservation.url + '/' + cfg.service.pubRes2DevPreservation.action;
        urlParams.txnId = cfg.service.pubRes2DevPreservation.txnId;

        if (params.playInterv != null) {
            send.playInterv = params.playInterv;
            singArray.playInterv = params.playInterv;
        }
        if (params.resList != null) {
            send.resList = params.resList;
            params.resList.forEach((value) => {
                singArray[value] = value;
            });
        }
        if (params.devList != null) {
            send.devList = params.devList;
            params.devList.forEach((value) => {
                singArray[value] = value;
            });
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

const devAndResGetByCons = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};
        urlParams.url = cfg.service.devAndResGetByCons.url + '/' + cfg.service.devAndResGetByCons.action;
        urlParams.txnId = cfg.service.devAndResGetByCons.txnId;

        if (params.resourceId != null) {
            send.resourceId = params.resourceId;
        } else {
            send.deviceId = params.deviceId;
        }

        urlParams.noSing = true;
        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

const funcPreservation = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        urlParams.url = cfg.service.funcPreservation.url + '/' + cfg.service.funcPreservation.action;
        urlParams.txnId = cfg.service.funcPreservation.txnId;

        send.funcId = params.funcId;
        send.parentFuncId = params.parentFuncId;
        send.funcName = params.funcName;
        send.funcDesc = params.funcDesc;

        urlParams.noSing = true;
        urlParams.send = send;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

const synchronizeResModification = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};
        urlParams.url = cfg.service.synchronizeResModification.url + '/' + cfg.service.synchronizeResModification.action;
        urlParams.txnId = cfg.service.synchronizeResModification.txnId;

        if (params.strList != null) {
            send.strList = params.strList;
            params.strList.forEach((value) => {
                singArray[value] = value;
            });
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

const devAndResClear = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};
        urlParams.url = cfg.service.devAndResClear.url + '/' + cfg.service.devAndResClear.action;
        urlParams.txnId = cfg.service.devAndResClear.txnId;

        if (params.resourceId != null) {
            send.resourceId = params.resourceId;
            singArray.resourceId = params.resourceId;
        }

        if (params.deviceId != null) {
            send.deviceId = params.deviceId;
            singArray.deviceId = params.deviceId;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

const housePreservation = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};
        urlParams.url = cfg.service.housePreservation.url + '/' + cfg.service.housePreservation.action;
        urlParams.txnId = cfg.service.housePreservation.txnId;

        if (params.unitId != null) {
            send.unitId = params.unitId;
            singArray.unitId = params.unitId;
        }

        if (params.buildingInstId != null) {
            send.buildingInstId = params.buildingInstId;
            singArray.buildingInstId = params.buildingInstId;
        }

        if (params.floor != null) {
            send.floor = params.floor;
        }

        if (params.houseNum != null) {
            send.houseNum = params.houseNum;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

const houseModification = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};
        urlParams.url = cfg.service.houseModification.url + '/' + cfg.service.houseModification.action;
        urlParams.txnId = cfg.service.houseModification.txnId;

        if (params.houseId != null) {
            send.houseId = params.houseId;
            singArray.houseId = params.houseId;
        }

        if (params.floor != null) {
            send.floor = params.floor;
        }

        if (params.houseNum != null) {
            send.houseNum = params.houseNum;
        }

        if (params.status != null) {
            send.status = params.status;
            singArray.status = params.status;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

const houseGetById = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        urlParams.url = cfg.service.houseGetById.url + '/' + cfg.service.houseGetById.action;
        urlParams.txnId = cfg.service.houseGetById.txnId;

        if (params.houseId != null) {
            send.houseId = params.houseId;
        }

        urlParams.send = send;
        urlParams.noSing = true;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

const houseClear = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};
        urlParams.url = cfg.service.houseClear.url + '/' + cfg.service.houseClear.action;
        urlParams.txnId = cfg.service.houseClear.txnId;

        if (params.houseId != null) {
            send.houseId = params.houseId;
            singArray.houseId = params.houseId;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

const houseInsBatch = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};
        urlParams.url = cfg.service.houseInsBatch.url + '/' + cfg.service.houseInsBatch.action;
        urlParams.txnId = cfg.service.houseInsBatch.txnId;

        if (params.buildingInstId != null) {
            send.buildingInstId = params.buildingInstId;
            singArray.buildingInstId = params.buildingInstId;
        }

        if (params.fileName != null) {
            send.fileName = params.fileName;
            singArray.fileName = params.fileName;
        }

        if (params.uploadFileName != null) {
            send.uploadFileName = params.uploadFileName;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

const roomerPreservation = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};
        urlParams.url = cfg.service.roomerPreservation.url + '/' + cfg.service.roomerPreservation.action;
        urlParams.txnId = cfg.service.roomerPreservation.txnId;

        if (params.specInstId != null) {
            send.specInstId = params.specInstId;
            singArray.specInstId = params.specInstId;
        }

        if (params.roomerName != null) {
            send.roomerName = params.roomerName;
        }

        if (params.roomerPhone != null) {
            send.roomerPhone = params.roomerPhone;
            singArray.roomerPhone = params.roomerPhone;
        }

        if (params.certType != null) {
            send.certType = params.certType + '';
            singArray.certType = send.certType;
        }

        if (params.certNo != null) {
            send.certNo = params.certNo;
            singArray.certNo = send.certNo;
        }

        if (params.groupType != null) {
            send.groupType = params.groupType + '';
            singArray.groupType = send.groupType;
        }

        if (params.sex != null) {
            send.sex = params.sex;
            singArray.sex = params.sex;
        }

        if (params.nation != null) {
            send.nation = params.nation;
        }

        if (params.nationality != null) {
            send.nationality = params.nationality;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

const roomer2HousePreservation = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};
        urlParams.url = cfg.service.roomer2HousePreservation.url + '/' + cfg.service.roomer2HousePreservation.action;
        urlParams.txnId = cfg.service.roomer2HousePreservation.txnId;

        if (params.houseId != null) {
            send.houseId = params.houseId;
            singArray.houseId = params.houseId;
        }

        if (params.buildingInstId != null) {
            send.buildingInstId = params.buildingInstId;
            singArray.buildingInstId = params.buildingInstId;
        }

        if (params.property != null) {
            send.property = params.property;
            singArray.property = params.property;
        }

        if (params.roomerName != null) {
            send.roomerName = params.roomerName;
        }

        if (params.roomerPhone != null) {
            send.roomerPhone = params.roomerPhone;
            singArray.roomerPhone = params.roomerPhone;
        }

        if (params.certType != null) {
            send.certType = params.certType + '';
            singArray.certType = send.certType;
        }

        if (params.certNo != null) {
            send.certNo = params.certNo;
            singArray.certNo = send.certNo;
        }

        if (params.groupType != null) {
            send.groupType = params.groupType + '';
            singArray.groupType = send.groupType;
        }

        if (params.sex != null) {
            send.sex = params.sex;
            singArray.sex = params.sex;
        }

        if (params.nation != null) {
            send.nation = params.nation;
        }

        if (params.nationality != null) {
            send.nationality = params.nationality;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};


const roomerModification = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};
        urlParams.url = cfg.service.roomerModification.url + '/' + cfg.service.roomerModification.action;
        urlParams.txnId = cfg.service.roomerModification.txnId;

        if (params.roomerId != null) {
            send.roomerId = params.roomerId;
            singArray.roomerId = params.roomerId;
        }

        if (params.roomerName != null) {
            send.roomerName = params.roomerName;
        }

        if (params.roomerPhone != null) {
            send.roomerPhone = params.roomerPhone;
            singArray.roomerPhone = params.roomerPhone;
        }

        if (params.certType != null) {
            send.certType = params.certType + '';
            singArray.certType = send.certType;
        }

        if (params.certNo != null) {
            send.certNo = params.certNo;
            singArray.certNo = send.certNo;
        }

        if (params.groupType != null) {
            send.groupType = params.groupType + '';
            singArray.groupType = send.groupType;
        }

        if (params.sex != null) {
            send.sex = params.sex;
            singArray.sex = params.sex;
        }

        if (params.nation != null) {
            send.nation = params.nation;
        }

        if (params.nationality != null) {
            send.nationality = params.nationality;
        }

        if (params.status != null) {
            send.status = params.status;
            singArray.status = params.status;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

const roomerGetByCons = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        urlParams.url = cfg.service.roomerGetByCons.url + '/' + cfg.service.roomerGetByCons.action;
        urlParams.url += '?page=' + params.page + '&pageSize=' + params.pageSize;
        urlParams.txnId = cfg.service.roomerGetByCons.txnId;
        if (params.specInstId != null) {
            send.specInstId = params.specInstId;
        }
        if (params.roomerPhone != null) {
            send.roomerPhone = params.roomerPhone;
        }
        if (params.roomerName != null) {
            send.roomerName = params.roomerName;
        }
        urlParams.send = send;
        urlParams.noSing = true;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};


const roomerClear = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};
        urlParams.url = cfg.service.roomerClear.url + '/' + cfg.service.roomerClear.action;
        urlParams.txnId = cfg.service.roomerClear.txnId;

        if (params.roomerId != null) {
            send.roomerId = params.roomerId;
            singArray.roomerId = params.roomerId;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};


const house2RoomerGetByCons = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};
        urlParams.url = cfg.service.house2RoomerGetByCons.url + '/' + cfg.service.house2RoomerGetByCons.action;
        urlParams.txnId = cfg.service.house2RoomerGetByCons.txnId;

        if (params.houseId != null) {
            send.houseId = params.houseId;
            singArray.houseId = params.houseId;
        }
        if (params.roomerId != null) {
            send.roomerId = params.roomerId;
            singArray.roomerId = params.roomerId;
        }
        if (params.roomerPhone != null) {
            send.roomerPhone = params.roomerPhone;
            singArray.roomerPhone = params.roomerPhone;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};


const house2RoomerPreservation = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};
        urlParams.url = cfg.service.house2RoomerPreservation.url + '/' + cfg.service.house2RoomerPreservation.action;
        urlParams.txnId = cfg.service.house2RoomerPreservation.txnId;

        if (params.houseId != null) {
            send.houseId = params.houseId;
            singArray.houseId = params.houseId;
        }

        if (params.roomerId != null) {
            send.roomerId = params.roomerId;
            singArray.roomerId = params.roomerId;
        }

        if (params.property != null) {
            send.property = params.property;
            singArray.property = params.property;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};


const house2RoomerModification = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};
        urlParams.url = cfg.service.house2RoomerModification.url + '/' + cfg.service.house2RoomerModification.action;
        urlParams.txnId = cfg.service.house2RoomerModification.txnId;

        if (params.id != null) {
            send.id = params.id;
            singArray.id = params.id;
        }

        if (params.property != null) {
            send.property = params.property;
            singArray.property = params.property;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};


const house2RoomerClear = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};
        urlParams.url = cfg.service.house2RoomerClear.url + '/' + cfg.service.house2RoomerClear.action;
        urlParams.txnId = cfg.service.house2RoomerClear.txnId;

        if (params.id != null) {
            send.id = params.id;
            singArray.id = params.id;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};


const instOpenDoorBatch = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let singArray = {};
        let send = {};
        urlParams.url = cfg.service.instOpenDoorBatch.url + '/' + cfg.service.instOpenDoorBatch.action;
        urlParams.txnId = cfg.service.instOpenDoorBatch.txnId;

        if (params.specInstId != null) {
            send.specInstId = params.specInstId;
            singArray.specInstId = send.specInstId;
        }

        urlParams.send = send
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};


const batchGetByCons = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        urlParams.url = cfg.service.batchGetByCons.url + '/' + cfg.service.batchGetByCons.action;
        urlParams.url += '?page=' + params.page + '&pageSize=' + params.pageSize;
        urlParams.txnId = cfg.service.batchGetByCons.txnId;
        if (params.batchId != null) {
            send.batchId = params.batchId;
        }
        if (params.batchType != null) {
            send.batchType = params.batchType;
        }
        if (params.uploadFileName != null) {
            send.uploadFileName = params.uploadFileName;
        }
        if (params.specTellerId != null) {
            send.specTellerId = params.specTellerId;
        }
        if (params.status != null) {
            send.status = params.status;
        }
        urlParams.send = send;
        urlParams.noSing = true;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

const cardGetByCons = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        urlParams.url = cfg.service.cardGetByCons.url + '/' + cfg.service.cardGetByCons.action;
        urlParams.url += '?page=' + params.page + '&pageSize=' + params.pageSize;
        urlParams.txnId = cfg.service.cardGetByCons.txnId;
        if (params.cardId != null) {
            send.cardId = params.cardId;
        }
        if (params.unitId != null) {
            send.unitId = params.unitId;
        }
        urlParams.send = send;
        urlParams.noSing = true;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};


const cardPreservation = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};
        urlParams.url = cfg.service.cardPreservation.url + '/' + cfg.service.cardPreservation.action;
        urlParams.txnId = cfg.service.cardPreservation.txnId;

        if (params.cardId != null) {
            send.cardId = params.cardId;
            singArray.cardId = params.cardId;
        }

        if (params.unitId != null) {
            send.unitId = params.unitId;
            singArray.unitId = params.unitId;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

const synchronizeCardModification = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};
        urlParams.url = cfg.service.synchronizeCardModification.url + '/' + cfg.service.synchronizeCardModification.action;
        urlParams.txnId = cfg.service.synchronizeCardModification.txnId;

        if (params.cardId != null) {
            send.cardId = params.cardId;
            singArray.cardId = params.cardId;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

const roomerInsBatch = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};
        urlParams.url = cfg.service.roomerInsBatch.url + '/' + cfg.service.roomerInsBatch.action;
        urlParams.txnId = cfg.service.roomerInsBatch.txnId;

        if (params.specInstId != null) {
            send.specInstId = params.specInstId;
            singArray.specInstId = params.specInstId;
        }

        if (params.fileName != null) {
            send.fileName = params.fileName;
            singArray.fileName = params.fileName;
        }

        if (params.uploadFileName != null) {
            send.uploadFileName = params.uploadFileName;
        }

        let header = {};
        if (params.operFlag != null) {
            header.operFlag = params.operFlag;
        }
        urlParams.header = header;

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

const synchronizeDeviceModification = (me, params, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};
        urlParams.url = cfg.service.synchronizeDeviceModification.url + '/' + cfg.service.synchronizeDeviceModification.action;
        urlParams.txnId = cfg.service.synchronizeDeviceModification.txnId;

        if (params.deviceId != null) {
            send.deviceId = params.deviceId;
            singArray.deviceId = params.deviceId;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                // 失败
                reject(res)
            }
        );
    });
};


/**
 * 1.3.2.2.1  新增子公司 /addInst
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const addInst = (me, params) => {
    console.log("addInst params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};
        urlParams.url = cfg.service.addInst.url;
        urlParams.txnId = cfg.service.addInst.txnId;

        if (params.specInstId) {
            send.specInstId = params.specInstId;
            singArray.specInstId = params.specInstId;
        }
        send.instName = params.instName;
        if (params.instLevel) {
            send.instLevel = params.instLevel;
            singArray.instLevel = params.instLevel;
        }
        send.tellerName = params.tellerName;
        if (params.tellerId) {
            send.tellerId = params.tellerId;
            singArray.tellerId = params.tellerId;
        }
        if (params.tellerPhone) {
            send.tellerPhone = params.tellerPhone;
            singArray.tellerPhone = params.tellerPhone;
        }
        if (params.tellerFuncMap) {
            send.tellerFuncMap = params.tellerFuncMap;
            singArray.tellerFuncMap = params.tellerFuncMap;
        }

        urlParams.send = send;
        // urlParams.noSing = true;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

const getAllInstById = (me, instId, Toast) => {
    console.log("getAllInstById params", instId); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        urlParams.url = cfg.service.getAllInstById.url;
        urlParams.txnId = cfg.service.getAllInstById.txnId;
        send.specInstId = instId;
        urlParams.send = send;
        urlParams.noSing = true;
        let singArray = {};
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.2.2  查询机构信息  /getInstById
 * @param me
 * @param instId
 * @param Toast
 * @returns {Promise<any>}
 */
const getInstById = (me, instId, Toast) => {
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        urlParams.url = cfg.service.getInstById.url;
        urlParams.txnId = cfg.service.getInstById.txnId;
        send.specInstId = instId;
        urlParams.send = send;
        urlParams.noSing = true;
        let singArray = {};
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me, Toast).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.1.1  新增 /addGooCategory  位图索引201
 * @param me
 * @param instId
 * @param Toast
 * @returns {Promise<any>}
 */
const addGooCategory = (me, params) => {
    console.log("addGooCategory params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = cfg.service.addGooCategory.url;
        urlParams.txnId = cfg.service.addGooCategory.txnId;

        if (params.categoryLevel) {
            send.categoryLevel = params.categoryLevel;
            singArray.categoryLevel = params.categoryLevel;
        }
        if (params.parentCategory) {
            send.parentCategory = params.parentCategory;
            singArray.parentCategory = params.parentCategory;
        }
        if (params.categoryName) {
            send.categoryName = params.categoryName;
        }

        urlParams.send = send;
        // urlParams.noSing = true;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.1.2  删除  /deleteGooCategoryById   位图索引202
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const deleteGooCategoryById = (me, params) => {
    console.log("deleteGooCategoryById params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = cfg.service.deleteGooCategoryById.url;
        urlParams.txnId = cfg.service.deleteGooCategoryById.txnId;

        if (params.categoryId) {
            send.categoryId = params.categoryId;
            singArray.categoryId = params.categoryId;
        }

        urlParams.send = send;
        // urlParams.noSing = true;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.1.3  根据主键修改  /updateGooCategoryById   位图索引203
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const updateGooCategoryById = (me, params) => {
    console.log("updateGooCategoryById params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = cfg.service.updateGooCategoryById.url;
        urlParams.txnId = cfg.service.updateGooCategoryById.txnId;

        if (params.categoryId) {
            send.categoryId = params.categoryId;
            singArray.categoryId = params.categoryId;
        }
        if (params.version) {
            send.version = params.version;
            singArray.version = params.version;
        }
        if (params.categoryName) {
            send.categoryName = params.categoryName;
        }
        if (params.sortOrder) {
            send.sortOrder = params.sortOrder;
            singArray.sortOrder = params.sortOrder;
        }
        if (params.status) {
            send.status = params.status;
            singArray.status = params.status;
        }

        urlParams.send = send;
        // urlParams.noSing = true;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.1.5  查询指定分类的子分类
 * @param me
 * @param instId
 * @param Toast
 * @returns {Promise<any>}
 */
const listGooCategorysByPid = (me, params) => {
    console.log("listGooCategorysByPid params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = cfg.service.listGooCategorysByPid.url;
        urlParams.txnId = cfg.service.listGooCategorysByPid.txnId;

        if (params.categoryId) {
            send.categoryId = params.categoryId;
            singArray.categoryId = params.categoryId;
        }
        if (params.categoryLevel) {
            send.categoryLevel = params.categoryLevel;
            singArray.categoryLevel = params.categoryLevel;
        }

        urlParams.send = send;
        // urlParams.noSing = true;

        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.3.2  查询公司所有部门 /listInstDepartments
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const listInstDepartments = (me, params) => {
    console.log("listInstDepartments params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        urlParams.url = cfg.service.listInstDepartments.url;
        urlParams.txnId = cfg.service.listInstDepartments.txnId;

        send.specInstId = params.specInstId;

        urlParams.send = send;
        urlParams.noSing = true;
        let singArray = {};
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.3.1  新增部门 /addDepartmentInfo
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const addDepartmentInfo = (me, params) => {
    console.log("addDepartmentInfo params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        urlParams.url = cfg.service.addDepartmentInfo.url;
        urlParams.txnId = cfg.service.addDepartmentInfo.txnId;

        send.specInstId = params.specInstId;
        send.departmentName = params.departmentName;

        urlParams.send = send;
        // urlParams.noSing = true;
        let singArray = {
            specInstId: params.specInstId,
        };
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.4.1  新增部门职位 /addDepartmentPosition
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const addDepartmentPosition = (me, params) => {
    console.log("addDepartmentPosition params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        // urlParams.noSing = true;
        urlParams.url = cfg.service.addDepartmentPosition.url;
        urlParams.txnId = cfg.service.addDepartmentPosition.txnId;

        if (params.specDepartmentId) {
            send.specDepartmentId = params.specDepartmentId;
            singArray.specDepartmentId = params.specDepartmentId;
        }
        if (params.positionName) {
            send.positionName = params.positionName;
        }
        if (params.funcMap) {
            send.funcMap = params.funcMap;
            singArray.funcMap = params.funcMap;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.4.2  查询部门职位 /listDepartmentPosition
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const listDepartmentPosition = (me, params) => {
    console.log("listDepartmentPosition params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        urlParams.url = cfg.service.listDepartmentPosition.url;
        urlParams.txnId = cfg.service.listDepartmentPosition.txnId;
        send.specDepartmentId = params.specDepartmentId;

        urlParams.send = send;
        urlParams.noSing = true;
        let singArray = {};
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.4.3  修改部门职位 /updateDepartmentPosition
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const updateDepartmentPosition = (me, params) => {
    console.log("updateDepartmentPosition params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = cfg.service.updateDepartmentPosition.url;
        urlParams.txnId = cfg.service.updateDepartmentPosition.txnId;

        if (params.positionId) {
            send.positionId = params.positionId;
            singArray.positionId = params.positionId;
        }
        if (params.version) {
            send.version = params.version;
            singArray.version = params.version;
        }
        if (params.positionName) {
            send.positionName = params.positionName;
        }
        if (params.funcMap) {
            send.funcMap = params.funcMap;
            singArray.funcMap = params.funcMap;
        }

        urlParams.send = send;
        // urlParams.noSing = true;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.4.4  删除部门职位 /deleteDepartmentPosition
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const deleteDepartmentPosition = (me, params) => {
    console.log("deleteDepartmentPosition params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = cfg.service.deleteDepartmentPosition.url;
        urlParams.txnId = cfg.service.deleteDepartmentPosition.txnId;

        if (params.positionId) {
            send.positionId = params.positionId;
            singArray.positionId = params.positionId;
        }

        urlParams.send = send;
        // urlParams.noSing = true;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.5.1  新增部门员工 /addTellerInfo
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const addTellerInfo = (me, params) => {
    console.log("addTellerInfo params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        // urlParams.noSing = true;
        urlParams.url = cfg.service.addTellerInfo.url;
        urlParams.txnId = cfg.service.addTellerInfo.txnId;

        if (params.specDepartmentId) {
            send.specDepartmentId = params.specDepartmentId;
            singArray.specDepartmentId = params.specDepartmentId;
        }
        if (params.specTellerId) {
            send.specTellerId = params.specTellerId;
            singArray.specTellerId = params.specTellerId;
        }
        if (params.tellerName) {
            send.tellerName = params.tellerName;
        }
        if (params.tellerPhone) {
            send.tellerPhone = params.tellerPhone;
            singArray.tellerPhone = params.tellerPhone;
        }
        if (params.tellerPositionIds) {
            send.tellerPositionList = [];
            params.tellerPositionIds.forEach((item, index) => {
                let tmp = {
                    "recycleSeq": index + 1 + '',
                    "positionId": item
                };
                send.tellerPositionList.push(tmp);
            });
            singArray.tellerPositionList = send.tellerPositionList;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.5.3  查询部门所有员工（分页） /listDepartmentTeller?currentPage=1&pageSize=10
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const listDepartmentTeller = (me, params) => {
    console.log("listDepartmentTeller params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        urlParams.url = cfg.service.listDepartmentTeller.url;
        urlParams.url += '?currentPage=' + params.currentPage + '&pageSize=' + params.pageSize;
        urlParams.txnId = cfg.service.listDepartmentTeller.txnId;

        send.specDepartmentId = params.specDepartmentId;

        urlParams.send = send;
        urlParams.noSing = true;
        let singArray = {};
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.5.4  查询部门员工信息 /getTellerInfoById
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const getTellerInfoById = (me, params) => {
    console.log("getTellerInfoById params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        urlParams.url = cfg.service.getTellerInfoById.url;
        urlParams.txnId = cfg.service.getTellerInfoById.txnId;

        send.specDepartmentId = params.specDepartmentId;
        send.specTellerId = params.specTellerId;

        urlParams.send = send;
        urlParams.noSing = true;
        let singArray = {};
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.5.5  修改部门员工 /updateTellerInfo
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const updateTellerInfo = (me, params) => {
    console.log("updateTellerInfo params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = cfg.service.updateTellerInfo.url;
        urlParams.txnId = cfg.service.updateTellerInfo.txnId;

        if (params.specTellerId) {
            send.specTellerId = params.specTellerId;
            singArray.specTellerId = params.specTellerId;
        }
        if (params.version) {
            send.version = params.version;
            singArray.version = params.version;
        }
        if (params.specDepartmentId) {
            send.specDepartmentId = params.specDepartmentId;
            singArray.specDepartmentId = params.specDepartmentId;
        }
        if (params.tellerPhone) {
            send.tellerPhone = params.tellerPhone;
            singArray.tellerPhone = params.tellerPhone;
        }
        if (params.tellerName) {
            send.tellerName = params.tellerName;
        }
        if (params.tellerPositionIds) {
            let tellerPositionList = [];
            params.tellerPositionIds.forEach((item, index) => {
                let position = {};
                position.positionId = item;
                position.recycleSeq = index + 1 + '';
                tellerPositionList.push(position);
            });
            send.tellerPositionList = tellerPositionList;
            singArray.tellerPositionList = tellerPositionList;
        }

        urlParams.send = send;
        // urlParams.noSing = true;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.5.6  删除部门员工 /deleteDepartmentTeller
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const deleteDepartmentTeller = (me, params) => {
    console.log("deleteDepartmentTeller params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = cfg.service.deleteDepartmentTeller.url;
        urlParams.txnId = cfg.service.deleteDepartmentTeller.txnId;
        // urlParams.noSing = true;

        if (params.specTellerId) {
            send.specTellerId = params.specTellerId;
            singArray.specTellerId = params.specTellerId;
        }
        if (params.specDepartmentId) {
            send.specDepartmentId = params.specDepartmentId;
            singArray.specDepartmentId = params.specDepartmentId;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.5.7  重置员工密码 /resetTellerPwd
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const resetTellerPwd = (me, params) => {
    console.log("resetTellerPwd params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = cfg.service.resetTellerPwd.url;
        urlParams.txnId = cfg.service.resetTellerPwd.txnId;
        // urlParams.noSing = true;

        if (params.specTellerId) {
            send.specTellerId = params.specTellerId;
            singArray.specTellerId = params.specTellerId;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.2.4  查询所有单位  /listAllUnitinfos  位图索引209
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const listAllUnitinfos = (me, params) => {
    console.log("listAllUnitinfos params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        urlParams.url = cfg.service.listAllUnitinfos.url;
        urlParams.txnId = cfg.service.listAllUnitinfos.txnId;

        urlParams.send = send;
        urlParams.noSing = true;
        let singArray = {};
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 *1.3.2.2.1  新增物资单位
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const addGooUnitinfo = (me, params) => {
    console.log("addGooUnitinfo params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = cfg.service.addGooUnitinfo.url;
        urlParams.txnId = cfg.service.addGooUnitinfo.txnId;

        if (params.unitName) {
            send.unitName = params.unitName;
        }

        urlParams.send = send;
        // urlParams.noSing = true;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.2.2  删除  /deleteGooUnitinfoById  位图索引207
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const deleteGooUnitinfoById = (me, params) => {
    console.log("deleteGooUnitinfoById params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = cfg.service.deleteGooUnitinfoById.url;
        urlParams.txnId = cfg.service.deleteGooUnitinfoById.txnId;

        if (params.id) {
            send.id = params.id;
            singArray.id = params.id;
        }

        urlParams.send = send;
        // urlParams.noSing = true;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.2.3  根据主键查询  /getGooUnitinfoById 位图索引208
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const getGooUnitinfoById = (me, params) => {
    console.log("getGooUnitinfoById params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = cfg.service.getGooUnitinfoById.url;
        urlParams.txnId = cfg.service.getGooUnitinfoById.txnId;

        if (params.id) {
            send.id = params.id;
            singArray.id = params.id;
        }

        urlParams.send = send;
        urlParams.noSing = true;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.3  获取物资ID   位图索引210
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const genGoodsId = (me, params) => {
    console.log("genGoodsId params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = cfg.service.genGoodsId.url;
        urlParams.txnId = cfg.service.genGoodsId.txnId;
        // urlParams.noSing = true;

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 *1.3.2.4   图片上传  位图索引211
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const sendPicture = (me, params) => {
    console.log("sendPicture params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let singArray = {};

        urlParams.url = cfg.service.sendPicture.url;
        urlParams.url += '?goodsId=' + params.goodsId + '&index=' + params.index + '&operFlag=' + params.operFlag;
        urlParams.txnId = cfg.service.sendPicture.txnId;
        urlParams.header = {
            'Content-Type': 'multipart/form-data'
        };

        // FormData 对象
        let send = new FormData();
        // 文件对象
        send.append("goodsFileNames", params.goodsFileNames);
        singArray.goodsId = params.goodsId;
        singArray.index = params.index;
        singArray.operFlag = params.operFlag;

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 *1.3.2.5.5  分页查询指定条件的物资信息  /listGoodsinfosByConditions?currentPage=1&pageSize=10   位图索引216
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const listGoodsinfosByConditions = (me, params) => {
    console.log("listGoodsinfosByConditions params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = cfg.service.listGoodsinfosByConditions.url;
        urlParams.url += '?currentPage=' + params.currentPage + '&pageSize=' + params.pageSize;
        urlParams.txnId = cfg.service.listGoodsinfosByConditions.txnId;
        urlParams.noSing = true;

        if (params.categoryId) {
            send.categoryId = params.categoryId;
        }
        if (params.goodsName) {
            send.goodsName = params.goodsName;
        }
        if (params.isSerial) {
            send.isSerial = params.isSerial;
        }
        if (params.begNowPrice) {
            send.goodsFileNames = params.begNowPrice;
        }
        if (params.endNowPrice) {
            send.endNowPrice = params.endNowPrice;
        }
        if (params.status) {
            send.status = params.status;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.5.1  新增 /addGooTGoodsinfo  位图索引212
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const addGooTGoodsinfo = (me, params) => {
    console.log("addGooTGoodsinfo params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = cfg.service.addGooTGoodsinfo.url;
        urlParams.txnId = cfg.service.addGooTGoodsinfo.txnId;
        // urlParams.noSing = true;

        if (params.goodsId) {
            send.goodsId = params.goodsId;
            singArray.goodsId = params.goodsId;
        }
        if (params.categoryId) {
            send.categoryId = params.categoryId;
            singArray.categoryId = params.categoryId;
        }
        if (params.goodsName) {
            send.goodsName = params.goodsName;
        }
        if (params.mainPicture) {
            send.mainPicture = params.mainPicture;
            singArray.mainPicture = params.mainPicture;
        }
        if (params.goodsImgs) {
            send.goodsImgs = params.goodsImgs;
            singArray.goodsImgs = params.goodsImgs;
        }
        if (params.goodsType) {
            send.goodsType = params.goodsType;
        }
        if (params.unitId) {
            send.unitId = params.unitId;
            singArray.unitId = params.unitId;
        }
        if (params.memo) {
            send.memo = params.memo;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.1.1.2  退出登录  /loginOut   索引121  验签
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const loginOut = (me, params) => {
    console.log("loginOut params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = cfg.service.loginOut.url;
        urlParams.txnId = cfg.service.loginOut.txnId;
        // urlParams.noSing = true;

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.1.5.8  检查用户注册情况 /checkTellerId 索引118
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const checkTellerId = (me, params) => {
    console.log("checkTellerId params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = cfg.service.checkTellerId.url;
        urlParams.txnId = cfg.service.checkTellerId.txnId;
        // urlParams.noSing = true;

        if (params.specDepartmentId) {
            send.specDepartmentId = params.specDepartmentId;
            singArray.specDepartmentId = params.specDepartmentId;
        }
        if (params.specTellerId) {
            send.specTellerId = params.specTellerId;
            singArray.specTellerId = params.specTellerId;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.1.6.9  修改密码 /chgTellerPwd  索引119    验签
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const chgTellerPwd = (me, params) => {
    console.log("chgTellerPwd params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = cfg.service.chgTellerPwd.url;
        urlParams.txnId = cfg.service.chgTellerPwd.txnId;
        // urlParams.noSing = true;

        if (params.oldPwd) {
            let EncPwd = params.tellerId + params.oldPwd.length + params.oldPwd;
            let EncPwdMd5 = md5.hex_md5(EncPwd);
            let EncPwdSha = jsonSha256.SHA256(params.tellerId + EncPwdMd5);
            send.oldPwd = EncPwdSha.toUpperCase().substring(0, 32);
            singArray.oldPwd = send.oldPwd;
        }
        if (params.newPwd) {
            let EncPwd = params.tellerId + params.newPwd.length + params.newPwd;
            let EncPwdMd5 = md5.hex_md5(EncPwd);
            let EncPwdSha = jsonSha256.SHA256(params.tellerId + EncPwdMd5);
            send.newPwd = EncPwdSha.toUpperCase().substring(0, 32);
            singArray.newPwd = send.newPwd;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 *1.3.1.6.2  员工兼职 /addTellerDepartment  索引113  验签
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const addTellerDepartment = (me, params) => {
    console.log("addTellerDepartment params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        // urlParams.noSing = true;
        urlParams.url = cfg.service.addTellerDepartment.url;
        urlParams.txnId = cfg.service.addTellerDepartment.txnId;

        if (params.specDepartmentId) {
            send.specDepartmentId = params.specDepartmentId;
            singArray.specDepartmentId = params.specDepartmentId;
        }
        if (params.specTellerId) {
            send.specTellerId = params.specTellerId;
            singArray.specTellerId = params.specTellerId;
        }
        if (params.tellerPositonList) {
            send.tellerPositionList = [];
            params.tellerPositonList.forEach((item, index) => {
                let tmp = {
                    "recycleSeq": index + 1 + '',
                    "positionId": item
                };
                send.tellerPositionList.push(tmp);
            });
            singArray.tellerPositionList = send.tellerPositionList;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.1.1  部门切换  /departmentLogin   索引120  验签
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const departmentLogin = (me, params) => {
    console.log("departmentLogin params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        // urlParams.noSing = true;
        urlParams.url = cfg.service.departmentLogin.url;
        urlParams.txnId = cfg.service.departmentLogin.txnId;

        if (params.specDepartmentId) {
            send.specDepartmentId = params.specDepartmentId;
            singArray.specDepartmentId = params.specDepartmentId;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.5.2  删除  /deleteGooTGoodsinfoById   位图索引213
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const deleteGooTGoodsinfoById = (me, params) => {
    console.log("deleteGooTGoodsinfoById params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        // urlParams.noSing = true;
        urlParams.url = cfg.service.deleteGooTGoodsinfoById.url;
        urlParams.txnId = cfg.service.deleteGooTGoodsinfoById.txnId;

        if (params.goodsId) {
            send.goodsId = params.goodsId;
            singArray.goodsId = params.goodsId;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.5.4  根据主键查询  /getGooTGoodsinfoById  位图索引215
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const getGooTGoodsinfoById = (me, params) => {
    console.log("getGooTGoodsinfoById params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        // urlParams.noSing = true;
        urlParams.url = cfg.service.getGooTGoodsinfoById.url;
        urlParams.txnId = cfg.service.getGooTGoodsinfoById.txnId;

        if (params.goodsId) {
            send.goodsId = params.goodsId;
            singArray.goodsId = params.goodsId;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.5.3  根据主键修改  /updateGooTGoodsinfoById   位图索引214
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const updateGooTGoodsinfoById = (me, params) => {
    console.log("updateGooTGoodsinfoById params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = cfg.service.updateGooTGoodsinfoById.url;
        urlParams.txnId = cfg.service.updateGooTGoodsinfoById.txnId;
        // urlParams.noSing = true;

        if (params.goodsId) {
            send.goodsId = params.goodsId;
            singArray.goodsId = params.goodsId;
        }
        if (params.version) {
            send.version = params.version;
            singArray.version = params.version;
        }
        if (params.categoryId) {
            send.categoryId = params.categoryId;
            singArray.categoryId = params.categoryId;
        }
        if (params.goodsName) {
            send.goodsName = params.goodsName;
        }
        if (params.mainPicture) {
            send.mainPicture = params.mainPicture;
            singArray.mainPicture = params.mainPicture;
        }
        if (params.goodsImgs) {
            send.goodsImgs = params.goodsImgs;
            singArray.goodsImgs = params.goodsImgs;
        }
        if (params.goodsType) {
            send.goodsType = params.goodsType;
        }
        if (params.unitId) {
            send.unitId = params.unitId;
            singArray.unitId = params.unitId;
        }
        if (params.memo) {
            send.memo = params.memo;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.6.4  根据主键查询  /getGoodsProductmanualById  位图索引220
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const getGoodsProductmanualById = (me, params) => {
    console.log("getGoodsProductmanualById params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = cfg.service.getGoodsProductmanualById.url;
        urlParams.txnId = cfg.service.getGoodsProductmanualById.txnId;
        urlParams.noSing = true;

        if (params.goodsId) {
            send.goodsId = params.goodsId;
            singArray.goodsId = params.goodsId;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 *1.3.2.6.1  新增 /addGoodsProductmanual   位图索引217
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const addGoodsProductmanual = (me, params) => {
    console.log("addGoodsProductmanual params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = cfg.service.addGoodsProductmanual.url;
        urlParams.txnId = cfg.service.addGoodsProductmanual.txnId;
        // urlParams.noSing = true;

        if (params.goodsId) {
            send.goodsId = params.goodsId;
            singArray.goodsId = params.goodsId;
        }
        if (params.productManual) {
            send.productManual = params.productManual;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 *1.3.2.6.3  根据主键修改  /updateGoodsProductmanualById  位图索引219
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const updateGoodsProductmanualById = (me, params) => {
    console.log("updateGoodsProductmanualById params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = cfg.service.updateGoodsProductmanualById.url;
        urlParams.txnId = cfg.service.updateGoodsProductmanualById.txnId;
        // urlParams.noSing = true;

        if (params.goodsId) {
            send.goodsId = params.goodsId;
            singArray.goodsId = params.goodsId;
        }
        if (params.version) {
            send.version = params.version;
            singArray.version = params.version;
        }
        if (params.productManual) {
            send.productManual = params.productManual;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.7.1  新增 /addGoodsQualitycertify  位图索引221
 * @param {*} me
 * @param {*} params
 */
const addGoodsQualitycertify = (me, params) => {
    console.log("addGoodsQualitycertify params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = cfg.service.addGoodsQualitycertify.url;
        urlParams.txnId = cfg.service.addGoodsQualitycertify.txnId;
        // urlParams.noSing = true;

        if (params.goodsId) {
            send.goodsId = params.goodsId;
            singArray.goodsId = params.goodsId;
        }
        if (params.qualityCertificate) {
            send.qualityCertificate = params.qualityCertificate;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.7.2  删除  /deleteGoodsQualitycertifyById   位图索引222
 * @param {*} me
 * @param {*} params
 */
const deleteGoodsQualitycertifyById = (me, params) => {
    console.log("deleteGoodsQualitycertifyById params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = cfg.service.deleteGoodsQualitycertifyById.url;
        urlParams.txnId = cfg.service.deleteGoodsQualitycertifyById.txnId;
        // urlParams.noSing = true;

        if (params.goodsId) {
            send.goodsId = params.goodsId;
            singArray.goodsId = params.goodsId;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.7.3  根据主键修改  /updateGoodsQualitycertifyById  位图索引223
 * @param {*} me
 * @param {*} params
 */
const updateGoodsQualitycertifyById = (me, params) => {
    console.log("updateGoodsQualitycertifyById params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = cfg.service.updateGoodsQualitycertifyById.url;
        urlParams.txnId = cfg.service.updateGoodsQualitycertifyById.txnId;
        // urlParams.noSing = true;

        if (params.goodsId) {
            send.goodsId = params.goodsId;
            singArray.goodsId = params.goodsId;
        }
        if (params.version) {
            send.version = params.version;
            singArray.version = params.version;
        }
        if (params.qualityCertificate) {
            send.qualityCertificate = params.qualityCertificate;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.7.4  根据主键查询  /getGoodsQualitycertifyById  位图索引224
 * @param {*} me
 * @param {*} params
 */
const getGoodsQualitycertifyById = (me, params) => {
    console.log("getGoodsQualitycertifyById params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = cfg.service.getGoodsQualitycertifyById.url;
        urlParams.txnId = cfg.service.getGoodsQualitycertifyById.txnId;
        urlParams.noSing = true;

        if (params.goodsId) {
            send.goodsId = params.goodsId;
            singArray.goodsId = params.goodsId;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 *1.3.2.8.1  新增 /addGoodsserial  位图索引225
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const addGoodsserial = (me, params) => {
    console.log("addGoodsserial params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = cfg.service.addGoodsserial.url;
        urlParams.txnId = cfg.service.addGoodsserial.txnId;
        // urlParams.noSing = true;

        if (params.goodsId) {
            send.goodsId = params.goodsId;
            singArray.goodsId = params.goodsId;
        }
        if (params.serialList) {
            send.serialList = params.serialList;
            singArray.serialList = [];
            let serailInfo = {};
            serailInfo.recycleSeq = params.serialList[0].recycleSeq;
            serailInfo.goodsImgs = params.serialList[0].goodsImgs;
            serailInfo.mainPicture = params.serialList[0].mainPicture;
            singArray.serialList.push(serailInfo);
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.8.6  根据物资id查询系列信息  /listGoodsserialsByGoodsId  位图索引230
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const listGoodsserialsByGoodsId = (me, params) => {
    console.log("listGoodsserialsByGoodsId params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = cfg.service.listGoodsserialsByGoodsId.url;
        urlParams.txnId = cfg.service.listGoodsserialsByGoodsId.txnId;
        urlParams.noSing = true;

        if (params.goodsId) {
            send.goodsId = params.goodsId;
            singArray.goodsId = params.goodsId;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.8.2  主键删除  /deleteGoodsserialById   位图索引226
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const deleteGoodsserialById = (me, params) => {
    console.log("deleteGoodsserialById params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = cfg.service.deleteGoodsserialById.url;
        urlParams.txnId = cfg.service.deleteGoodsserialById.txnId;
        // urlParams.noSing = true;

        if (params.specGoodsId) {
            send.specGoodsId = params.specGoodsId;
            singArray.specGoodsId = params.specGoodsId;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.8.3  根据物资id删除  /deleteGoodsserialByGoodsId   位图索引227
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const deleteGoodsserialByGoodsId = (me, params) => {
    console.log("deleteGoodsserialByGoodsId params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = cfg.service.deleteGoodsserialByGoodsId.url;
        urlParams.txnId = cfg.service.deleteGoodsserialByGoodsId.txnId;
        // urlParams.noSing = true;

        if (params.goodsId) {
            send.goodsId = params.goodsId;
            singArray.goodsId = params.goodsId;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.8.4  根据主键修改  /updateGoodsserialById   位图索引228
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const updateGoodsserialById = (me, params) => {
    console.log("updateGoodsserialById params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = cfg.service.updateGoodsserialById.url;
        urlParams.txnId = cfg.service.updateGoodsserialById.txnId;
        // urlParams.noSing = true;

        if (params.specGoodsId) {
            send.specGoodsId = params.specGoodsId;
            singArray.specGoodsId = params.specGoodsId;
        }
        if (params.version) {
            send.version = params.version;
            singArray.version = params.version;
        }
        if (params.specColor) {
            send.specColor = params.specColor;
        }
        if (params.specSize) {
            send.specSize = params.specSize;
        }
        if (params.specMaterial) {
            send.specMaterial = params.specMaterial;
        }
        if (params.goodsImgs) {
            send.goodsImgs = params.goodsImgs;
            singArray.goodsImgs = params.goodsImgs;
        }
        if (params.goodsName) {
            send.goodsName = params.goodsName;
        }
        if (params.goodsType) {
            send.goodsType = params.goodsType;
        }
        if (params.memo) {
            send.memo = params.memo;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.3.1  分页查询批次信息  /listBatchsByCon?currentPage=1&pageSize=10 位图索引 31
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const listBatchsByCon = (me, params) => {
    console.log("listBatchsByCon params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = PERMISSIONS.listBatchsByCon.url;
        urlParams.url += '?currentPage=' + params.currentPage + '&pageSize=' + params.pageSize;
        urlParams.txnId = PERMISSIONS.listBatchsByCon.txnId;
        urlParams.noSing = true;

        if (params.status) {
            send.status = params.status;
        }
        if (params.batchFlag) {
            send.batchFlag = params.batchFlag;
        }
        if (params.batchName) {
            send.batchName = params.batchName;
        }
        if (params.ladingBill) {
            send.ladingBill = params.ladingBill;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.3.2  新增批次(集装箱)  /addBatchinfo 位图索引 32
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const addBatchinfo = (me, params) => {
    console.log("addBatchinfo params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = PERMISSIONS.addBatchinfo.url;
        urlParams.txnId = PERMISSIONS.addBatchinfo.txnId;
        // urlParams.noSing = true;

        if (params.batchFlag) {
            send.batchFlag = params.batchFlag;
            singArray.batchFlag = params.batchFlag;
        }
        if (params.batchName) {
            send.batchName = params.batchName;
        }
        if (params.memo) {
            send.memo = params.memo;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.3.4  主键删除批次(集装箱)  /deleteBatchinfoById 位图索引34
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const deleteBatchinfoById = (me, params) => {
    console.log("deleteBatchinfoById params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = PERMISSIONS.deleteBatchinfoById.url;
        urlParams.txnId = PERMISSIONS.deleteBatchinfoById.txnId;
        // urlParams.noSing = true;

        if (params.batchId) {
            send.batchId = params.batchId;
            singArray.batchId = params.batchId;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.3.3    主键修改批次(集装箱)  /updateBatchinfo  位图索引33
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const updateBatchinfo = (me, params) => {
    console.log("updateBatchinfo params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = PERMISSIONS.updateBatchinfo.url;
        urlParams.txnId = PERMISSIONS.updateBatchinfo.txnId;
        // urlParams.noSing = true;

        if (params.batchId) {
            send.batchId = params.batchId;
            singArray.batchId = params.batchId;
        }
        if (params.version) {
            send.version = params.version;
            singArray.version = params.version;
        }
        if (params.batchName) {
            send.batchName = params.batchName;
        }
        if (params.memo) {
            send.memo = params.memo;
        }


        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.3.5    主键查询批次(集装箱)  /getBatchinfoById 位图索引35
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const getBatchinfoById = (me, params) => {
    console.log("getBatchinfoById params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = PERMISSIONS.getBatchinfoById.url;
        urlParams.txnId = PERMISSIONS.getBatchinfoById.txnId;
        urlParams.noSing = true;

        if (params.batchId) {
            send.batchId = params.batchId;
            singArray.batchId = params.batchId;
        }


        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.3.7    批次(集装箱)录入采购物资 /addBatchGoods   位图索引37
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const addBatchGoods = (me, params) => {
    console.log("addBatchGoods params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = PERMISSIONS.addBatchGoods.url;
        urlParams.txnId = PERMISSIONS.addBatchGoods.txnId;
        // urlParams.noSing = true;

        if (params.batchId) {
            send.batchId = params.batchId;
            singArray.batchId = params.batchId;
        }

        if (params.goodsList) {
            send.goodsList = params.goodsList;
            singArray.goodsList = [];
            let item = {};
            let itemTmp = params.goodsList[0];
            item.recycleSeq = itemTmp.recycleSeq;
            item.batchGoodsId = itemTmp.batchGoodsId;
            item.tellerBuyPrice = itemTmp.tellerBuyPrice;
            item.tellerBuyCount = itemTmp.tellerBuyCount;
            singArray.goodsList.push(item);
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 *1.3.3.13    分页查询指定条件的系列  /listSerialsByConditions?currentPage=1&pageSize=10
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const listSerialsByConditions = (me, params) => {
    console.log("listSerialsByConditions params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = PERMISSIONS.listSerialsByConditions.url;
        urlParams.url += '?currentPage=' + params.currentPage + '&pageSize=' + params.pageSize;
        urlParams.txnId = PERMISSIONS.listSerialsByConditions.txnId;
        urlParams.noSing = true;

        if (params.categoryId) {
            send.categoryId = params.categoryId;
        }
        if (params.goodsName) {
            send.goodsName = params.goodsName;
        }
        if (params.goodsType) {
            send.goodsType = params.goodsType;
        }
        if (params.status) {
            send.status = params.status;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.3.6    分页查询批次(集装箱)对应物资 /listBatchGoodsByCon?currentPage=1&pageSize=40  位
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const listBatchGoodsByCon = (me, params) => {
    console.log("listBatchGoodsByCon params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = PERMISSIONS.listBatchGoodsByCon.url;
        urlParams.url += '?currentPage=' + params.currentPage + '&pageSize=' + params.pageSize;
        urlParams.txnId = PERMISSIONS.listBatchGoodsByCon.txnId;
        urlParams.noSing = true;

        if (params.batchId) {
            send.batchId = params.batchId;
        }
        if (params.batchName) {
            send.batchName = params.batchName;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.3.8    主键修改采购批次物资信息 /updateBatchGoodsById   位图索引38
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const updateBatchGoodsById = (me, params) => {
    console.log("updateBatchGoodsById params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = PERMISSIONS.updateBatchGoodsById.url;
        urlParams.txnId = PERMISSIONS.updateBatchGoodsById.txnId;
        // urlParams.noSing = true;

        if (params.id) {
            send.id = params.id;
            singArray.id = params.id;
        }
        if (params.version) {
            send.version = params.version;
            singArray.version = params.version;
        }
        if (params.tellerBuyPrice) {
            send.tellerBuyPrice = params.tellerBuyPrice;
            singArray.tellerBuyPrice = params.tellerBuyPrice;
        }
        if (params.tellerBuyCount) {
            send.tellerBuyCount = params.tellerBuyCount;
            singArray.tellerBuyCount = params.tellerBuyCount;
        }
        if (params.memo) {
            send.memo = params.memo;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.3.9    主键删除批次物资 /deleteBatchGoodsById  位图索引39
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const deleteBatchGoodsById = (me, params) => {
    console.log("deleteBatchGoodsById params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = PERMISSIONS.deleteBatchGoodsById.url;
        urlParams.txnId = PERMISSIONS.deleteBatchGoodsById.txnId;
        // urlParams.noSing = true;

        if (params.id) {
            send.id = params.id;
            singArray.id = params.id;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.3.10    主键查询批次物资 /getBatchGoodsById 位图索引40
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const getBatchGoodsById = (me, params) => {
    console.log("getBatchGoodsById params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = PERMISSIONS.getBatchGoodsById.url;
        urlParams.txnId = PERMISSIONS.getBatchGoodsById.txnId;
        urlParams.noSing = true;

        if (params.id) {
            send.id = params.id;
            singArray.id = params.id;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.3.11    提交批次运单号 /uptBatchLadingBill 位图索引41
 * @param mecreateOrder
 * @param params
 * @returns {Promise<any>}
 */
const uptBatchLadingBill = (me, params) => {
    console.log("uptBatchLadingBill params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = PERMISSIONS.uptBatchLadingBill.url;
        urlParams.txnId = PERMISSIONS.uptBatchLadingBill.txnId;
        // urlParams.noSing = true;

        if (params.batchId) {
            send.batchId = params.batchId;
            singArray.batchId = params.batchId;
        }
        if (params.version) {
            send.version = params.version;
            singArray.version = params.version;
        }
        if (params.ladingBill) {
            send.ladingBill = params.ladingBill;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.3.12    批次物资入库 /uptBatchRealCount 位图索引42
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const uptBatchRealCount = (me, params) => {
    console.log("uptBatchRealCount params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = PERMISSIONS.uptBatchRealCount.url;
        urlParams.txnId = PERMISSIONS.uptBatchRealCount.txnId;
        // urlParams.noSing = true;

        if (params.batchId) {
            send.batchId = params.batchId;
            singArray.batchId = params.batchId;
        }
        if (params.goodsList) {
            send.goodsList = params.goodsList;
            singArray.goodsList = params.goodsList;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.1.3.2    修改公司信息 /updateInstInfo    索引122  验签
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const updateInstInfo = (me, params) => {
    console.log("updateInstInfo params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = PERMISSIONS.updateInstInfo.url;
        urlParams.txnId = PERMISSIONS.updateInstInfo.txnId;
        // urlParams.noSing = true;

        if (params.specInstId) {
            send.specInstId = params.specInstId;
            singArray.specInstId = params.specInstId;
        }
        if (params.version) {
            send.version = params.version;
            singArray.version = params.version;
        }
        if (params.instName) {
            send.instName = params.instName;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.1.4.4    删除部门信息 /deleteDepartmentInfo  索引124  验签
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const deleteDepartmentInfo = (me, params) => {
    console.log("deleteDepartmentInfo params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = PERMISSIONS.deleteDepartmentInfo.url;
        urlParams.txnId = PERMISSIONS.deleteDepartmentInfo.txnId;
        // urlParams.noSing = true;

        if (params.specDepartmentId) {
            send.specDepartmentId = params.specDepartmentId;
            singArray.specDepartmentId = params.specDepartmentId;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.1.4.3    修改部门信息 /updateDepartmentInfo  索引123  验签
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const updateDepartmentInfo = (me, params) => {
    console.log("updateDepartmentInfo params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = PERMISSIONS.updateDepartmentInfo.url;
        urlParams.txnId = PERMISSIONS.updateDepartmentInfo.txnId;
        // urlParams.noSing = true;

        if (params.specDepartmentId) {
            send.specDepartmentId = params.specDepartmentId;
            singArray.specDepartmentId = params.specDepartmentId;
        }
        if (params.version) {
            send.version = params.version;
            singArray.version = params.version;
        }
        if (params.departmentName) {
            send.departmentName = params.departmentName;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.4.1    批次物资提交本地价格 /submitLocalPrice  位图索引 51
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const submitLocalPrice = (me, params) => {
    console.log("submitLocalPrice params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = PERMISSIONS.submitLocalPrice.url;
        urlParams.txnId = PERMISSIONS.submitLocalPrice.txnId;
        // urlParams.noSing = true;

        if (params.batchId) {
            send.batchId = params.batchId;
            singArray.batchId = params.batchId;
        }
        if (params.goodsList) {
            send.goodsList = params.goodsList;
            singArray.goodsList = params.goodsList;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.4.2批次物资计算建议价格 /cacSuggestPrice  位图索引 52
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const cacSuggestPrice = (me, params) => {
    console.log("cacSuggestPrice params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = PERMISSIONS.cacSuggestPrice.url;
        urlParams.txnId = PERMISSIONS.cacSuggestPrice.txnId;
        // urlParams.noSing = true;

        if (params.batchId) {
            send.batchId = params.batchId;
            singArray.batchId = params.batchId;
        }
        if (params.goodsList) {
            send.goodsList = params.goodsList;
            singArray.goodsList = params.goodsList;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 批次物资提交申报零售价 /submitReportPrice  位图索引 53
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const submitReportPrice = (me, params) => {
    console.log("submitReportPrice params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = PERMISSIONS.submitReportPrice.url;
        urlParams.txnId = PERMISSIONS.submitReportPrice.txnId;
        // urlParams.noSing = true;

        if (params.batchId) {
            send.batchId = params.batchId;
            singArray.batchId = params.batchId;
        }
        if (params.goodsList) {
            send.goodsList = params.goodsList;
            singArray.goodsList = params.goodsList;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.4.4批次物资上架 /putonBatch  位图索引 54
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const putonBatch = (me, params) => {
    console.log("putonBatch params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = PERMISSIONS.putonBatch.url;
        urlParams.txnId = PERMISSIONS.putonBatch.txnId;
        // urlParams.noSing = true;

        if (params.batchId) {
            send.batchId = params.batchId;
            singArray.batchId = params.batchId;
        }
        if (params.goodsList) {
            send.goodsList = params.goodsList;
            singArray.goodsList = params.goodsList;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.2.1.2     首页内容--/wxIndexContent?currentPage=1 无权限无验签
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const wxIndexContent = (me, params) => {
    console.log("wxIndexContent params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = PERMISSIONS.wxIndexContent.url;
        urlParams.url += '?currentPage=' + params.currentPage;
        urlParams.txnId = PERMISSIONS.wxIndexContent.txnId;
        // urlParams.noSing = true;

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 *1.2.4.1获取所有配置--getAllConfig  无需授权无验签
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const getAllConfig = (me, params) => {
    console.log("getAllConfig params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = PERMISSIONS.getAllConfig.url;
        urlParams.txnId = PERMISSIONS.getAllConfig.txnId;
        // urlParams.noSing = true;

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.1.4根据主键查询  /getGooCategoryById  位图索引204
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const getGooCategoryById = (me, params) => {
    console.log("getGooCategoryById params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = PERMISSIONS.getGooCategoryById.url;
        urlParams.txnId = PERMISSIONS.getGooCategoryById.txnId;
        urlParams.noSing = true;

        if (params.categoryId != null) {
            send.categoryId = params.categoryId;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.2.8.5根据主键查询  /getGoodsserialById  位图索引229
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const getGoodsserialById = (me, params) => {
    console.log("getGoodsserialById params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = PERMISSIONS.getGoodsserialById.url;
        urlParams.txnId = PERMISSIONS.getGoodsserialById.txnId;
        urlParams.noSing = true;

        if (params.specGoodsId != null) {
            send.specGoodsId = params.specGoodsId;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.2.5.3 下单 /createOrder 位图索引10
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const createOrder = (me, params) => {
    console.log("createOrder params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = PERMISSIONS.createOrder.url;
        urlParams.txnId = PERMISSIONS.createOrder.txnId;
        // urlParams.noSing = true;

        //内部订单
        params.orderFlag = '1';
        if (params.orderFlag != null && params.orderFlag !== '') {
            send.orderFlag = params.orderFlag;
            singArray.orderFlag = params.orderFlag;
        }
        if (params.orderAmt != null && params.orderAmt !== '') {
            send.orderAmt = formatPrice(params.orderAmt);
            singArray.orderAmt = formatPrice(params.orderAmt);
        }
        if (params.goodsAllNum != null && params.goodsAllNum !== '') {
            send.goodsAllNum = params.goodsAllNum + '';
            singArray.goodsAllNum = params.goodsAllNum + '';
        }
        if (params.buyerMessage != null && params.buyerMessage !== '') {
            send.buyerMessage = params.buyerMessage;
        }
        if (params.orderDetailList != null && params.orderDetailList !== '') {
            send.orderDetailList = params.orderDetailList;
            singArray.orderDetailList = params.orderDetailList;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.6.1查询所有订单  /listAllOrders?currentPage=1&pageSize=10   位图索引 11
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const listAllOrders = (me, params) => {
    console.log("listAllOrders params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};
        urlParams.noSing = true;

        urlParams.url = PERMISSIONS.listAllOrders.url;
        urlParams.url += '?currentPage=' + params.currentPage + '&pageSize=' + params.pageSize;
        urlParams.txnId = PERMISSIONS.listAllOrders.txnId;

        send.status = params.status;

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.6.2确认订单库存  /confirmOrderStock 位图索引 12
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const confirmOrderStock = (me, params) => {
    console.log("confirmOrderStock params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = PERMISSIONS.confirmOrderStock.url;
        urlParams.txnId = PERMISSIONS.confirmOrderStock.txnId;
        // urlParams.noSing = true;

        if (params.orderId != null && params.orderId !== '') {
            send.orderId = params.orderId;
            singArray.orderId = params.orderId;
        }
        // if (params.version != null && params.version !== '') {
        //     send.version = params.version;
        //     singArray.version = params.version;
        // }
        if (params.memo != null && params.memo !== '') {
            send.memo = params.memo + '';
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.6.3确认订单收款  /confirmOrderPay  位图索引 13
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const confirmOrderPay = (me, params) => {
    console.log("confirmOrderStock params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = PERMISSIONS.confirmOrderPay.url;
        urlParams.txnId = PERMISSIONS.confirmOrderPay.txnId;
        // urlParams.noSing = true;

        if (params.orderId != null && params.orderId !== '') {
            send.orderId = params.orderId;
            singArray.orderId = params.orderId;
        }
        // if (params.version != null && params.version !== '') {
        //     send.version = params.version;
        //     singArray.version = params.version;
        // }
        if (params.memo != null && params.memo !== '') {
            send.memo = params.memo + '';
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.6.4确认订单发货  /confirmOrderSend  位图索引 14
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const confirmOrderSend = (me, params) => {
    console.log("confirmOrderSend params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = PERMISSIONS.confirmOrderSend.url;
        urlParams.txnId = PERMISSIONS.confirmOrderSend.txnId;
        // urlParams.noSing = true;

        if (params.orderId != null && params.orderId !== '') {
            send.orderId = params.orderId;
            singArray.orderId = params.orderId;
        }
        // if (params.version != null && params.version !== '') {
        //     send.version = params.version;
        //     singArray.version = params.version;
        // }
        if (params.memo != null && params.memo !== '') {
            send.memo = params.memo + '';
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.3.6.5关闭订单 /closeOrder   位图索引 15
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const closeOrder = (me, params) => {
    console.log("closeOrder params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = PERMISSIONS.closeOrder.url;
        urlParams.txnId = PERMISSIONS.closeOrder.txnId;
        // urlParams.noSing = true;

        if (params.orderId != null && params.orderId !== '') {
            send.orderId = params.orderId;
            singArray.orderId = params.orderId;
        }
        // if (params.version != null && params.version !== '') {
        //     send.version = params.version;
        //     singArray.version = params.version;
        // }
        if (params.memo != null && params.memo !== '') {
            send.memo = params.memo + '';
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.2.4.3获取产品说明书和质保证书--getManualCertify  无需授权无验签
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const getManualCertify = (me, params) => {
    console.log("getManualCertify params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = PERMISSIONS.getManualCertify.url;
        urlParams.txnId = PERMISSIONS.getManualCertify.txnId;
        urlParams.noSing = true;

        if (params.goodsId != null && params.goodsId !== '') {
            send.goodsId = params.goodsId;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.2.4.2获取上架物资具体信息--getSerialBySpecGoodsId  无需授权无验签
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const getSerialBySpecGoodsId = (me, params) => {
    console.log("getManualCertify params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = PERMISSIONS.getSerialBySpecGoodsId.url;
        urlParams.txnId = PERMISSIONS.getSerialBySpecGoodsId.txnId;
        urlParams.noSing = true;

        if (params.specGoodsId != null && params.specGoodsId !== '') {
            send.specGoodsId = params.specGoodsId;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 * 1.2.5.2我的订单  /listMyOrders?currentPage=1&pageSize=4 无权限无验签
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const listMyOrders = (me, params) => {
    console.log("listMyOrders params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};
        urlParams.noSing = true;

        urlParams.url = PERMISSIONS.listMyOrders.url;
        urlParams.url += '?currentPage=' + params.currentPage + '&pageSize=' + params.pageSize;
        urlParams.txnId = PERMISSIONS.listMyOrders.txnId;

        send.status = params.status;

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

/**
 *1.3.1.3.5更换子公司管理员 /chgInstAdmin    索引125  验签
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const chgInstAdmin = (me, params) => {
    console.log("chgInstAdmin params", params); //debug
    return new Promise((resolve, reject) => {
        let urlParams = {};
        let send = {};
        let singArray = {};
        // urlParams.noSing = true;

        urlParams.url = PERMISSIONS.chgInstAdmin.url;
        urlParams.txnId = PERMISSIONS.chgInstAdmin.txnId;

        if (params.specInstId != null && params.specInstId !== '') {
            send.specInstId = params.specInstId;
            singArray.specInstId = params.specInstId;
        }
        if (params.specTellerId != null && params.specTellerId !== '') {
            send.specTellerId = params.specTellerId;
            singArray.specTellerId = params.specTellerId;
        }
        if (params.tellerName != null && params.tellerName !== '') {
            send.tellerName = params.tellerName;
        }
        if (params.tellerPhone != null && params.tellerPhone !== '') {
            send.tellerPhone = params.tellerPhone;
            singArray.tellerPhone = params.tellerPhone;
        }

        urlParams.send = send;
        urlParams.singArray = singArray;
        common.sendServer(urlParams, me).then(
            (res) => {
                resolve(res)
            }, (res) => {
                reject(res)
            }
        );
    });
};

export {
    instGetAllById,
    instTellersGetByCons,
    instRolesGetByCons,
    roleFuncsGetByCons,
    tellerRolesGetByCons,
    tellerFuncsGetByCons,
    tellerInstsGetByCons,
    instGetById,
    unitPreservation,
    unitGetByCons,
    deviceGetByCons,
    resourceGetByCons,
    houseGetByCons,
    deviceGetById,
    deviceOpenDoorModification,
    assignDeviceModification,
    bindDeviceModification,
    unitModification,
    deviceModification,
    sendFile,
    resourcePreservation,
    resourceModification,
    pubRes2DevPreservation,
    devAndResGetByCons,
    funcPreservation,
    synchronizeResModification,
    devAndResClear,
    housePreservation,
    houseModification,
    houseGetById,
    houseClear,
    roomerPreservation,
    roomerGetByCons,
    roomer2HousePreservation,
    roomerModification,
    roomerClear,
    house2RoomerGetByCons,
    instOpenDoorBatch,
    houseInsBatch,
    batchGetByCons,
    cardPreservation,
    cardGetByCons,
    synchronizeCardModification,
    house2RoomerClear,
    house2RoomerPreservation,
    house2RoomerModification,
    roomerInsBatch,
    resourceClear,
    synchronizeDeviceModification,
    getAllInstById,
    getInstById,
    listGooCategorysByPid,
    addGooCategory,
    deleteGooCategoryById,
    updateGooCategoryById,
    listInstDepartments,
    addDepartmentInfo,
    addDepartmentPosition,
    listDepartmentPosition,
    updateDepartmentPosition,
    deleteDepartmentPosition,
    listDepartmentTeller,
    getTellerInfoById,
    addTellerInfo,
    updateTellerInfo,
    deleteDepartmentTeller,
    resetTellerPwd,
    addInst,
    listAllUnitinfos,
    addGooUnitinfo,
    deleteGooUnitinfoById,
    getGooUnitinfoById,
    genGoodsId,
    sendPicture,
    listGoodsinfosByConditions,
    addGooTGoodsinfo,
    loginOut,
    checkTellerId,
    chgTellerPwd,
    addTellerDepartment,
    departmentLogin,
    deleteGooTGoodsinfoById,
    getGooTGoodsinfoById,
    updateGooTGoodsinfoById,
    getGoodsProductmanualById,
    addGoodsProductmanual,
    updateGoodsProductmanualById,
    addGoodsQualitycertify,
    deleteGoodsQualitycertifyById,
    updateGoodsQualitycertifyById,
    getGoodsQualitycertifyById,
    addGoodsserial,
    listGoodsserialsByGoodsId,
    deleteGoodsserialById,
    deleteGoodsserialByGoodsId,
    updateGoodsserialById,
    listBatchsByCon,
    addBatchinfo,
    deleteBatchinfoById,
    updateBatchinfo,
    getBatchinfoById,
    addBatchGoods,
    listSerialsByConditions,
    listBatchGoodsByCon,
    updateBatchGoodsById,
    deleteBatchGoodsById,
    getBatchGoodsById,
    uptBatchLadingBill,
    uptBatchRealCount,
    updateInstInfo,
    deleteDepartmentInfo,
    updateDepartmentInfo,
    submitLocalPrice,
    cacSuggestPrice,
    submitReportPrice,
    putonBatch,
    wxIndexContent,
    getAllConfig,
    getGooCategoryById,
    getGoodsserialById,
    createOrder,
    listAllOrders,
    confirmOrderStock,
    confirmOrderPay,
    confirmOrderSend,
    closeOrder,
    getManualCertify,
    getSerialBySpecGoodsId,
    listMyOrders,
    chgInstAdmin
};
