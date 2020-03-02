import * as md5 from "./md5";
import * as jsonSha256 from "./jsonSha256";

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
      }
    );
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
  console.log("addInst params", params);//debug
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
  console.log("getAllInstById params", instId);//debug
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
  console.log("addGooCategory params", params);//debug
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
  console.log("deleteGooCategoryById params", params);//debug
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
  console.log("updateGooCategoryById params", params);//debug
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
  console.log("listGooCategorysByPid params", params);//debug
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
  console.log("listInstDepartments params", params);//debug
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
  console.log("addDepartmentInfo params", params);//debug
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
  console.log("addDepartmentPosition params", params);//debug
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
  console.log("listDepartmentPosition params", params);//debug
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
  console.log("updateDepartmentPosition params", params);//debug
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
  console.log("deleteDepartmentPosition params", params);//debug
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
  console.log("addTellerInfo params", params);//debug
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
  console.log("listDepartmentTeller params", params);//debug
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
  console.log("getTellerInfoById params", params);//debug
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
  console.log("updateTellerInfo params", params);//debug
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
    if (params.tellerPositonIds) {
      send.tellerPositonIds = params.tellerPositonIds;
      // singArray.tellerPositonIds=params.tellerPositonIds;
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
  console.log("deleteDepartmentTeller params", params);//debug
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
  console.log("resetTellerPwd params", params);//debug
  return new Promise((resolve, reject) => {
    let urlParams = {};
    let send = {};
    urlParams.url = cfg.service.resetTellerPwd.url;
    urlParams.txnId = cfg.service.resetTellerPwd.txnId;

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
 * 1.3.2.2.4  查询所有单位  /listAllUnitinfos  位图索引209
 * @param me
 * @param params
 * @returns {Promise<any>}
 */
const listAllUnitinfos = (me, params) => {
  console.log("listAllUnitinfos params", params);//debug
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
  console.log("addGooUnitinfo params", params);//debug
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
  console.log("deleteGooUnitinfoById params", params);//debug
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
  console.log("getGooUnitinfoById params", params);//debug
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
  console.log("genGoodsId params", params);//debug
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
  console.log("sendPicture params", params);//debug
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
    singArray.goodsId=params.goodsId;
    singArray.index=params.index;
    singArray.operFlag=params.operFlag;

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
  console.log("listGoodsinfosByConditions params", params);//debug
  return new Promise((resolve, reject) => {
    let urlParams = {};
    let send = {};
    let singArray = {};

    urlParams.url = cfg.service.listGoodsinfosByConditions.url;
    urlParams.url += '?currentPage=' + params.currentPage + '&&pageSize=' + params.pageSize;
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
  console.log("addGooTGoodsinfo params", params);//debug
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
  console.log("loginOut params", params);//debug
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
  console.log("checkTellerId params", params);//debug
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

const chgTellerPwd = (me, params) => {
  console.log("chgTellerPwd params", params);//debug
  return new Promise((resolve, reject) => {
    let urlParams = {};
    let send = {};
    let singArray = {};

    urlParams.url = cfg.service.chgTellerPwd.url;
    urlParams.txnId = cfg.service.chgTellerPwd.txnId;
    // urlParams.noSing = true;

    if (params.oldpwd) {
      let EncPwd = params.tellerId + params.oldpwd.length + params.oldpwd;
      let EncPwdMd5 = md5.hex_md5(EncPwd);
      let EncPwdSha = jsonSha256.SHA256(params.tellerId + EncPwdMd5);
      send.oldpwd = EncPwdSha.toUpperCase().substring(0, 32);
      singArray.oldpwd = send.oldpwd;
    }
    if (params.newpwd) {
      let EncPwd = params.tellerId + params.newpwd.length + params.newpwd;
      let EncPwdMd5 = md5.hex_md5(EncPwd);
      let EncPwdSha = jsonSha256.SHA256(params.tellerId + EncPwdMd5);
      send.newpwd = EncPwdSha.toUpperCase().substring(0, 32);
      singArray.newpwd = send.newpwd;
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
  chgTellerPwd
};
