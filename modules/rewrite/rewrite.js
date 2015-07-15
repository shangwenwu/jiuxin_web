var Api = require('pc:api');

var rewrites = {
	
    '/aaa/btn' : 'test/pc/btn.json',
    '/jxjr-web/users/login' : 'test/pc/login.json',
    './about.json' : 'pc:aboutController/about.json',
    '/aaa/help' : 'test/pc/help.json',
    '/jxjr-web/feedback' : 'test/pc/feedback.json',
    '/jxjr-web/loans/getLoanDetail' : 'test/pc/investDetail.json',
    '/jxjr-web/loans/repaymentsPlan': 'test/pc/investrefundPlan.json',
    '/jxjr-web/loans/investList': 'test/pc/investList.json',
    '/aaa/investDetail' : 'test/pc/investDetail.json',
    '/aaa/investrefundPlan': 'test/pc/investrefundPlan.json',
    '/jxjr-web/cms/loan/list': 'test/pc/investData.json',
    '/jxjr-web/loans/getLoanWithPage':'test/pc/investData.json',
    '/jxjr-web/cms/home/pic' : 'test/pc/carousel.json',
    '/jxjr-web/cms/bulletin' : 'test/pc/leftnews.json',
    '/jxjr-web/cms/news' : 'test/pc/rightnews.json',
    '/jxjr-web/cms/getdetail' : 'test/pc/cmspage.json',
    '/jxjr-web/cms/news/list' : 'test/pc/cmslist.json',
    '/jxjr-web/account/getBankCard' : 'test/pc/bankCardInfo.json',

    '/jxjr-web/account/prepareBindCard' : 'test/pc/bindBankCard.json',
    '/jxjr-web/account/getprepareBindCard' : 'test/pc/getBindBankCard.json',
    '/jxjr-web/trade/prepareWithdraw' : 'test/pc/bindBankCard.json',
    '/jxjr-web/trade/getWithdrawResult' : 'test/pc/getBindBankCard.json',

    '/jxjr-web/users/fundRecord' : 'test/pc/fundsRecord.json',
    '/jxjr-web/users/fundType' : 'test/pc/fundsRecordType.json',
    '/jxjr-web/users/fundsRecharge' : 'test/pc/fundsRecharge.json',
    '/jxjr-web/users/fundsWithdraw' : 'test/pc/fundsWithdraw.json',
    '/aaa/investData':'test/pc/investData.json',
    '/repayment/pending': 'test/pc/underRepay.json',
    '/jxjr-web/users/imageCaptcha': 'test/pc/img_code.json',
    '/jxjr-web/users/check/imageCaptcha':'test/pc/img_verify.json',

    '/jxjr-web/users/smsCaptcha':'test/pc/sms_voice_code.json',
    '/jxjr-web/users/check/mobileCaptcha':'test/pc/sms_voice_verify.json',

    '/aaa/register':'test/pc/register.json',
    '/aaa/findpassword':'test/pc/find_password.json',
    '/aaa/verifyuser':'test/pc/verify_user.json',
    '/aaa/checkIdNum':'test/pc/checkIdNum.json',
    '/aaa/investData':'test/pc/investData.json',
    '/jxjr-web/users/getBasicUserInfo': 'test/pc/getUserInfo.json',
    '/jxjr-web/loans/buy': 'test/pc/submitInvest.json',
    '/jxjr-web/logout': 'test/pc/logout.json',
    '/jxjr-web/users/register':'test/pc/register.json',
    '/jxjr-web/users/updatePasswd':'test/pc/find_password.json',
    '/jxjr-web/users/checkMobile':'test/pc/verify_user.json',
    '/jxjr-web/users/checkIdNum':'test/pc/checkIdNum.json',
    '/jxjr-web/loans/getLoanWithPage':'test/pc/investData.json',
    '/jxjr-web/message/allMsgs': 'test/pc/message.json',
    '/jxjr-web/invest/status': 'test/pc/project.json',
    '/jxjr-web/repayment/receiveList': 'test/pc/repayRecord.json',

    

    '/jxjr-web/users/fundInfo':'test/pc/getInvestEarnings.json',
    '/jxjr-web/users/monthlystat':'test/pc/getCurveInfo.json',

    '/jxjr-web/users/resetPasswd':'test/pc/modifyPwd.json', //修改密码

    '/jxjr-web/account/personRegister':'test/pc/bindTrusteeship.json',//开通资金托管
    '/jxjr-web/account/prepareBindAgreement':'test/pc/prepareBindAgreement.json', //准备开通无密协议

    '/jxjr-web/users/isBindAgreement':'test/pc/isBindAgreement.json',//是否开通了无密协议
    '/jxjr-web/users/removeAgreement':'test/pc/removeAgreement.json', //解除无密协议

    '/jxjr-web/trade/prepareRecharge': 'test/pc/prepareRecharge.json',	// 准备充值
    '/jxjr-web/trade/getRechargeResult': 'test/pc/getRechargeResult.json',	// 获取充值结果

    // 红包列表
    '/jxjr-web/getCouponList': 'test/pc/getCouponList.json',


    '/jxjr-web/coupon/listCoupon': 'test/pc/coupon.json'
    
};
var Rewrite = function(){
    for(var i in Api){
      Api[i] = rewrites[Api[i]];

    }
    return Api;
};

module.exports = Rewrite;