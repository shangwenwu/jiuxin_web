Router.addRules({
    'safe' : function () {
        J.Controllers['safe'] ? J.Controllers['safe'].render() : J.Controllers['safe'] = new SafeController();
    }
});

var SafeController = function(){
	var t = this;
	var img = __inline('images/safe_header.png');
	t.el = $('<div id="safeModule" class="safe_module">'+
				'<div class="headBg"><img src="'+ img + '" alt="" /></div>'+
				'<div class="safe_row">'+
					'<div class="fixedW">'+
						'<h3>集团背景</h3>'+
						'<div class="inline percentage50">'+
							'<p class="lineH25 pr60">九信金融是国内知名投资机构九鼎投资出资20亿元倾力打造的P2P平台。九鼎投资是第一家登陆国内资本市场的私募股权投资机构，为“中国PE第一股”，净资产超110亿元。九鼎投资以其雄厚的资金实力、优质的金融资产和业内顶尖的风控体系为九信金融提供坚实后盾。</p>'+
							'<p class="lineH25 pr60">九鼎投资旗下拥有从事PE业务的昆吾九鼎、从事公募基金业务的九泰基金、从事证券业务的九州证券及从事个人风险投资业务的晨星计划等诸多专业机构。同时，九鼎投资正在筹建一家商业银行，未来将实现金融领域的全牌照布局。</p>'+
						'</div>'+
						'<div class="percentage50 logos inline">'+
							'<a class="logo1" href="http://www.jdcapital.com/" target="_black"></a>'+
							'<a class="logo2" href="http://www.jtamc.com/" target="_black"></a>'+
							'<a class="logo3" href="http://www.tyzq.com.cn/" target="_black"></a>'+
							'<a class="logo4" href="http://www.chenxingplan.com/" target="_black"></a>'+
						'</div>'+
					'</div>'+
					'<div class="fixedW" style="padding-bottom:50px">'+
						'<a href="#about/location=bg" class="btn_blue  btn">查看更多</a>'+
					'</div>'+
				'</div>'+
				'<div class="safe_row bgGray">'+
					'<div class="fixedW">'+
						'<h3>优质项目来源</h3>'+
						'<div class="percentage33 inline  padtb">'+
							'<div class="mAuto icon1"></div>'+
							'<p class="f16 tac">独家优质借款人</p>'+
							'<p class="p30 lineH25">九鼎投资作为国内顶尖且第一家上市的私募股权投资机构，拥有独家、高资质的借款人。平台运营初期主要为九鼎投资所管理基金的出资人、所投企业之股东以及九鼎股东的借款需求提供相应服务。此类借款人具有极高的个人或企业信誉。</p>'+
						'</div>'+
						'<div class="percentage33 inline padtb">'+
							'<div class="mAuto icon2"></div>'+
							'<p class="f16 tac">九鼎控股金融机构</p>'+
							'<p class="p30 lineH25">九信金融与九鼎投资旗下昆吾九鼎、九泰基金、九州证券等领先金融机构展开联动合作，充分发挥综合金融集团的资源整合效应，不断拓展优质资产渠道，为投资者提供丰富的投资品种和灵活的投资方式。</p>'+
						'</div>'+
						'<div class="percentage33 inline padtb">'+
							'<div class="mAuto icon3"></div>'+
							'<p class="f16 tac">已投企业庞大资源网络</p>'+
							'<p class="p30 lineH25">九信金融部分项目将来源于九鼎累计投资的近300家企业形成的庞大资源网络，其中已上市及处于上市审核过程中的企业超过60家，同时亦有30家企业登陆新三板。</p>'+
						'</div>'+
					'</div>'+
				'</div>'+

				'<div class="safe_row">'+
					'<div class="fixedW pb40">'+
						'<h3>顶级私募立体风控系统</h3>'+
						'<div class="percentage25 inline bgGray">'+
							'<div class="mAuto icon9"></div>'+
							'<p class="f16 tac">顶尖投研团队</p>'+
							'<p class="p30 lineH25 hide">九信金融每一个业务环节都与九鼎投资进行联动，共享九鼎覆盖全行业的顶尖投研团队。投研团队进行高度专业化分工，专注大消费、TMT、医疗医药、农业、高端制造、新材料、矿业、节能环保等领域。同时，公司不断引进在相关行业领域有过多年工作经验的专家，以此进一步提高专业性。</p>'+
						'</div>'+
						'<div class="percentage25 inline bgGray">'+
							'<div class="mAuto icon10"></div>'+
							'<p class="f16 tac">专职，独立的风控团队</p>'+
							'<p class="p30 lineH25 hide">风控团队成员均来自四大会计师事务所及国内顶尖事务所，具备多年审计、会计及财务尽职调查经验。在项目开发、尽职调查、评审等过程中，相关风控团队全程参与，并对过程中所有相关风险进行及时有效的揭示、评估和诊断。</p>'+
						'</div>'+
						'<div class="percentage25 inline bgGray">'+
							'<div class="mAuto icon11"></div>'+
							'<p class="f16 tac">最严苛的项目审评机制</p>'+
							'<p class="p30 lineH25 hide">九鼎建立了行业内最严苛的项目审批流程，确保所投项目优中选优，为投资人创造最大的价值。在对项目尽职调查过程中，至少会经过三轮复核机制。同时，还会邀请与项目方没有利益关系的专家，共同进行实地考察、关键事项和环节验证。</p>'+
						'</div>'+
						'<div class="percentage25 inline bgGray">'+
							'<div class="mAuto icon12"></div>'+
							'<p class="f16 tac">全方位专业法律服务团队</p>'+
							'<p class="p30 lineH25 hide">九信金融拥有来自金杜、中伦等国内顶尖律师事务所的法务专家团队，全程参与九信金融所有产品的设计、融资前的资产审核评估、融资后的资产处置等，提供全方位法律支持服务。</p>'+
						'</div>'+
					'</div>'+
				'</div>'+


				'<div class="safe_row bgGray">'+
					'<div class="fixedW">'+
						'<h3>双重保障</h3>'+
						'<div class="percentage50 inline  padtb">'+
							'<div class="mAuto icon4"></div>'+
							'<p class="f16 tac">优质金融资产担保</p>'+
							'<p class="p60 lineH25">所有融资项目皆会提供足值的金融资产作为担保物，担保物包括最具增值潜力的私募基金份额和成长性企业股权，以及来自公募基金、证券公司、保险公司等优质债权类和权益类资产。</p>'+
						'</div>'+
						'<div class="percentage50 inline padtb">'+
							'<div class="mAuto icon5"></div>'+
							'<p class="f16 tac">上市公司保障本息</p>'+
							'<p class="p60 lineH25">“PE第一股“九鼎投资（430719）为九信金融的产品提供综合的风险管理措施，凭借其雄厚的资金实力为所有投资者提供最坚实的本息安全保障。</p>'+
						'</div>'+
					'</div>'+
				'</div>'+

				'<div class="safe_row">'+
					'<div class="fixedW">'+
						'<h3>独立资金托管与技术安全</h3>'+
						'<div class="percentage33 inline  padtb">'+
							'<div class="mAuto icon6"></div>'+
							'<p class="f16 tac">第三方资金托管</p>'+
							'<p class="p30 lineH25">九信金融使用第三方支付联动优势提供的专业资金托管系统，平台资金与用户资金分离，彻底杜绝平台自建资金池及随意挪用资金风险。项目融资完成后，资金将从投资人账户直接划拨给借款人。用户资金仅能转出到通过本人认证和绑定的银行卡。</p>'+
						'</div>'+
						'<div class="percentage33 inline padtb">'+
							'<div class="mAuto icon7"></div>'+
							'<p class="f16 tac">银行级网站安全构架</p>'+
							'<p class="p30 lineH25">平台采用银行级安全架构：页面、后台、数据库三层数据验证，公安部实名认证，EV SSL, 短信、邮件验证保证安全；多层物理隔离部署环境，代码与数据隔离，防止用户及平台关键信息泄露。</p>'+
						'</div>'+
						'<div class="percentage33 inline padtb">'+
							'<div class="mAuto icon8"></div>'+
							'<p class="f16 tac">隐私安全</p>'+
							'<p class="p30 lineH25">平台将对用户信息严格保，设有严格的安全系统，防止未经授权的任何人包括公司员工获取用户信息。因服务必要而委托的第三方，在获取用户个人信息时，被要求严格遵守保密责任。</p>'+
						'</div>'+
					'</div>'+
				'</div>'+

			'</div>');
	

    t.init();
    
};
SafeController.prototype = {
	init: function(){
		var t = this;
		$('#mainBody').html(t.el);
		t.events();
		J.Common.matchRoute(location.hash);
	},
	render: function(){
		var t = this;
		t.init();
	},
	events : function(){
	    var t = this;
	    t.el.find('.percentage25').hover(function(){
	    	$(this).find('.lineH25').show();
	    },function(){
	    	$(this).find('.lineH25').hide();
	    });
	}

};




SafeController.prototype.constructor = SafeController;

module.exports = SafeController;