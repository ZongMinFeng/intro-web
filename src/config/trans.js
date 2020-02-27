
module.exports = {
  "CustQryNum": "10",
  "TransSale": "1",
  "TransVoid": "3",
  "TransData": {
    "OrderSuccess": {
      "Status": "1",
      "Desc": "订单成功"
    },
    "OrderFail": {
      "Status": "2",
      "Desc": "订单失败"
    },
    "OrderRevoked": {
      "Status": "3",
      "Desc": "订单撤销"
    },
    "OrderPre": {
      "Status": "4",
      "Desc": "订单预上送"
    },
    "OrderUnknown": {
      "Status": "9",
      "Desc": "状态未知"
    },
    Cash: "1",
    AliPay: "2",
    WeChat: "3",
    BankCard: "4",
    BlendPay: "9",
    BlendMode: "1", 
    OtherMode: "2", 
    CashText: "现金",
    AliPayText: "支付宝",
    WeChatText: "微信",
    BankCardText: "银行卡",
    BlendPayText: "组合"
  },
  Sotre: {
    CalcType: {
      NoWipe: {
        Status: "9",
        Desc: "不抹零"
      },
      WipeCent: {
        Status: "1",
        Desc: "抹分"
      },
      WipeCorner: {
        Status: "2",
        Desc: "抹角"
      },
      FiveCorner: {
        Status: "3",
        Desc: "四舍五入到角"
      }
    },
    StockControl: {
      Control: {
        Status: "1",
        Desc: "库存控制",
        Memo: "库存不足时不允许交易"
      },
      Prompt: {
        Status: "2",
        Desc: "库存提示",
        Memo: "库存不足时提示收银员，由收银员确认是否继续交易"
      }
    },
    Flag: {
      Enable: {
        Status: "1",
        Desc: "启用"
      },
      Disable: {
        Status: "2",
        Desc: "停用"
      }
    },
    OwnerFlag: { 
      Shopkeeper: {
        Flag: 1,
        Value: "OWNER"
      },
      Orther: {
        Flag: 2,
        Value: ""
      }

    },
    CopyGoods: {
      Enable: {
        Status: "1",
        Desc: "复制"
      },
      Disable: {
        Status: "2",
        Desc: "不复制"
      }
    }
  }

}
