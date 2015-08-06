var Api = require('pc:api');

var rewrites = {
	
    '/aaa/btn' : 'test/pc/btn.json',
    '/zeus/users/login' : 'test/pc/login.json',
    './about.json' : 'pc:aboutController/about.json',
    '/aaa/help' : 'test/pc/help.json',
    '/zeus/feedback' : 'test/pc/feedback.json',
    '/zeus/loans/getLoanDetail' : 'test/pc/investDetail.json',
    '/zeus/loans/repaymentsPlan': 'test/pc/investrefundPlan.json',
    '/zeus/loans/investList': 'test/pc/investList.json',
    '/aaa/investDetail' : 'test/pc/investDetail.json',
    '/aaa/investrefundPlan': 'test/pc/investrefundPlan.json',
    '/zeus/cms/loan/list': 'test/pc/investData.json',
    '/zeus/loans/getLoanWithPage':'test/pc/investData.json',
    '/zeus/cms/home/pic' : 'test/pc/carousel.json',
    '/zeus/cms/bulletin' : 'test/pc/leftnews.json',
    '/zeus/cms/news' : 'test/pc/rightnews.json',
    '/zeus/cms/getdetail' : 'test/pc/cmspage.json',
    '/zeus/cms/news/list' : 'test/pc/cmslist.json',
    '/zeus/account/getBankCard' : 'test/pc/bankCardInfo.json',

    '/zeus/account/prepareBindCard' : 'test/pc/bindBankCard.json',
    '/zeus/account/getprepareBindCard' : 'test/pc/getBindBankCard.json',
    '/zeus/trade/prepareWithdraw' : 'test/pc/bindBankCard.json',
    '/zeus/trade/getWithdrawResult' : 'test/pc/getBindBankCard.json',

    '/zeus/users/fundRecord' : 'test/pc/fundsRecord.json',
    '/zeus/users/fundType' : 'test/pc/fundsRecordType.json',
    '/zeus/users/fundsRecharge' : 'test/pc/fundsRecharge.json',
    '/zeus/users/fundsWithdraw' : 'test/pc/fundsWithdraw.json',
    '/aaa/investData':'test/pc/investData.json',
    '/repayment/pending': 'test/pc/underRepay.json',
    '/zeus/users/imageCaptcha': 'test/pc/img_code.json',
    '/zeus/users/check/imageCaptcha':'test/pc/img_verify.json',

    '/zeus/users/smsCaptcha':'test/pc/sms_voice_code.json',
    '/zeus/users/check/mobileCaptcha':'test/pc/sms_voice_verify.json',

    '/aaa/register':'test/pc/register.json',
    '/aaa/findpassword':'test/pc/find_password.json',
    '/aaa/verifyuser':'test/pc/verify_user.json',
    '/aaa/checkIdNum':'test/pc/checkIdNum.json',
    '/aaa/investData':'test/pc/investData.json',
    '/zeus/users/getBasicUserInfo': 'test/pc/getUserInfo.json',
    '/zeus/loans/buy': 'test/pc/submitInvest.json',
    '/zeus/logout': 'test/pc/logout.json',
    '/zeus/users/register':'test/pc/register.json',
    '/zeus/users/updatePasswd':'test/pc/find_password.json',
    '/zeus/users/checkMobile':'test/pc/verify_user.json',
    '/zeus/users/checkIdNum':'test/pc/checkIdNum.json',
    '/zeus/loans/getLoanWithPage':'test/pc/investData.json',
    '/zeus/message/allMsgs': 'test/pc/message.json',
    '/zeus/invest/status': 'test/pc/project.json',
    '/zeus/repayment/receiveList': 'test/pc/repayRecord.json',

    

    '/zeus/users/fundInfo':'test/pc/getInvestEarnings.json',
    '/zeus/users/monthlystat':'test/pc/getCurveInfo.json',

    '/zeus/users/resetPasswd':'test/pc/modifyPwd.json', //修改密码

    '/zeus/account/personRegister':'test/pc/bindTrusteeship.json',//开通资金托管
    '/zeus/account/prepareBindAgreement':'test/pc/prepareBindAgreement.json', //准备开通无密协议

    '/zeus/users/isBindAgreement':'test/pc/isBindAgreement.json',//是否开通了无密协议
    '/zeus/users/removeAgreement':'test/pc/removeAgreement.json', //解除无密协议

    '/zeus/trade/prepareRecharge': 'test/pc/prepareRecharge.json',	// 准备充值
    '/zeus/trade/getRechargeResult': 'test/pc/getRechargeResult.json',	// 获取充值结果

    // 红包列表
    '/zeus/getCouponList': 'test/pc/getCouponList.json',


    '/zeus/coupon/listCoupon': 'test/pc/coupon.json'
    
};
var Rewrite = function(){
    for(var i in Api){
      Api[i] = rewrites[Api[i]];

    }
    return Api;
};

module.exports = Rewrite;