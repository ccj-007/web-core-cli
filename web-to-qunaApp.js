/**
 * Created by Vinny on 5/13/17.
 */
/**
 * 执行屏幕适配
 * 仅当致尚版本为5.1.0或更高时使用
 * @param {Object} '5.1.0'
 */
var htmlWidth = 1080 //适配页面宽度
var needAdapt = true //需要适配屏幕
// document.addEventListener("DOMContentLoaded", function(){
//     if (needAdapt) {
//         var scale = 1,
//             originalWidth = screen.availWidth,
//             viewport = document.createElement("meta");
//         scale = originalWidth / htmlWidth;
//         scale = Math.round(scale * 100) / 100;
//         viewport.setAttribute("name", "viewport");
//         viewport.setAttribute("content", "initial-scale=" + scale + "; maximum-scale=" + scale + "; minimum-scale=" + scale+";");
//         if(window.ua.isIPhone==true){
//             viewport.setAttribute("content", "width="+htmlWidth+",user-scalable=no");
//         }else{
//             viewport.setAttribute("content", "width="+htmlWidth);
//         }
//         document.getElementsByTagName("head")[0].appendChild(viewport);
//     }
//     document.getElementsByTagName("body")[0].style.display="block";
// });

/**
 * 统一接口域名
 *
 * @param actionName
 * @returns {string}
 */
function getbase (actionName) {
	return 'https://brand.zzss.com/' + actionName
}

/**
 * 工具类
 */
var tools = {
	// Used for trimming whitespace
	trimLeft: /^\s+/,
	trimRight: /\s+$/,
	//check the string like "22.2px" or "22em" or "22" etc.
	digitWithUnit: /^\d+(\.\d+)?(?:(em)|%|px)?$/,
	//emailPattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
	emailPattern: /^[a-zA-Z0-9_+.-]+\@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}$/,
	phoneNumReg: /^1[3-5|7-8][0-9]\d{8}$/,

	/**
	 * 产生一个随机整数
	 *
	 * @param {integer} max	最大值，不包含在随机数范围中
	 * @param {integer} min	最小值，包含在随机数范围中
	 */
	randomNum: function (max, min) {
		if (!this.isNumber(max)) {
			return 0
		}

		if (!this.isNumber(min)) {
			min = 0
		}

		return Math.floor(Math.random() * (max - min) + min)
	},

	/**
	 * 判断传入的参数值是否是boolean类型
	 *
	 * @param {Object} obj
	 * @return 是boolean返回true，否则返回false
	 */
	isBoolean: function (obj) {
		return !this.isNull(obj) && typeof obj == 'boolean'
	},

	/**
	 * 判断传入的参数值是否是字符串类型
	 *
	 * @param {String} str
	 * @return 是字符串返回true，否则返回false
	 */
	isString: function (str) {
		return !this.isNull(str) && typeof str == 'string'
	},

	/**
	 * 判断传入的参数值是否是数字类型
	 *
	 * @param {number} number
	 * @return 是数字返回true，否则返回false
	 */
	isNumber: function (number) {
		return (
			number != null &&
			number != undefined &&
			this.isNotBlankStr(number + '') &&
			!isNaN(number)
		)
	},

	/**
	 * 判断传入的参数值是否是HTML元素
	 *
	 * @param {Object} ele
	 * @return 是HTML元素返回true，否则返回false
	 */
	isHTMLElement: function (ele) {
		return (
			this.isNotNull(ele) &&
			ele.nodeType &&
			(ele.nodeType == 1 || ele.nodeType == 9)
		)
	},

	/**
	 * 判断传入的元素是否是text元素
	 *
	 * @param {Object} ele
	 */
	isTxtElement: function (ele) {
		return this.isNotNull(ele) && ele.nodeType && ele.nodeType == 3
	},

	/**
	 * 判断传入的参数值是否是zzss封装的Object
	 *
	 * @param {Object} obj
	 * @return 是zsObject返回true，否则返回false
	 */
	isZSElement: function (obj) {
		return (
			obj.length &&
			obj.item &&
			this.isFunction(obj.item) &&
			obj.isZSObject
		)
	},

	/**
	 * 判断传入的参数是否是数组
	 *
	 * @param {Object} obj
	 * @return 是数组返回true，否则返回false
	 */
	isArray: function (obj) {
		return obj && typeof obj == 'object' && obj.constructor === Array
	},

	/**
	 * 判断传入的参数是否是function
	 *
	 * @param {Object} obj
	 * @return 是方法返回true，否则返回false
	 */
	isFunction: function (obj) {
		if (this.isString(obj) && this.isNotBlankStr(obj)) {
			obj = window[obj]
		}
		return obj && typeof obj == 'function'
	},

	/**
	 * 判断传入的参数是否为空或者undefined
	 *
	 * @param {Object} obj
	 * @return 如果传入的值为undefined或者null，返回true，否则返回false
	 */
	isNull: function (obj) {
		return (
			obj === undefined ||
			obj === null ||
			obj == '' ||
			obj == 'null' ||
			obj == '(null)' ||
			obj == '<null>'
		)
	},

	/**
	 * 判断传入的参数是否非空或者非undefined
	 *
	 * @param {Object} obj
	 * @return 如果传入的值为undefined或者null，返回true，否则返回false
	 */
	isNotNull: function (obj) {
		return !this.isNull(obj)
	},

	/**
	 * 是否是空白字符串
	 * @param {string} str
	 */
	isBlankStr: function (str) {
		return (
			this.isNull(str) ||
			!this.isString(str) ||
			this.trim(str) == '' ||
			this.trim(str) == '(null)'
		)
	},

	/**
	 * 判断是否是非空白字符串
	 * 若是非空白字符串则返回true
	 * 是空白字符串则返回false
	 * @param {string} str
	 */
	isNotBlankStr: function (str) {
		return this.isString(str) && !this.isBlankStr(str)
	},

	/**
	 * tirm方法，用于删除字符串左右多余的空格
	 *
	 * @param {string} str
	 * @return 返回处理后的字符串，如果传入的内容不是string类型，则返回空字符串
	 */
	trim: function (str) {
		if (this.isString(str)) {
			return str.replace(this.trimLeft, '').replace(this.trimRight, '')
		}

		return ''
	},

	/**
	 * 邮箱验证
	 * @param {Object} emailStr
	 */
	validateEmail: function (emailStr) {
		if (!this.isNull(emailStr)) {
			return tools.emailPattern.test(emailStr)
		}

		return false
	},

	/**
	 * 手机号码验证
	 * @param {String} phoneNum	手机号码
	 */
	validatePhoneNum: function (phoneNum) {
		if (!this.isNull(phoneNum)) {
			return tools.phoneNumReg.test(phoneNum)
		}

		return false
	},

	/**
	 * 通过字符串获取javascript内容
	 * @param {String} funcName
	 * @returns {Object}	字符串所对应的内容
	 */
	getContextFromStr: function (funcName) {
		if (this.isBlankStr(funcName)) {
			return
		}

		var funcNamespaces = funcName.split('.'),
			i,
			context = window

		//循环获取context
		for (i = 0; i < funcNamespaces.length; i++) {
			if (context) {
				context = context[funcNamespaces[i]]
			} else {
				break
			}
		}

		return context
	},

	/**
	 * 调用回调方法
	 * @param {String || Function} callback	回调方法
	 * @param {Object} args		参数
	 */
	callFunction: function (callback, args) {
		if (tools.isString(callback) && tools.isFunction(window[callback])) {
			window[callback](args)
		} else if (tools.isFunction(callback)) {
			callback(args)
		}
	},
}

/**
 * 获取当前URL中所传递的某个参数值
 * @param {String} name
 * @returns	{String}	参数值
 */
function gup (name) {
	// 通过URL取得当前页面的参数
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
	var regexS = '[\\?&]' + name + '=([^&#]*)'
	var regex = new RegExp(regexS)
	var results = regex.exec(window.location.href)
	if (results === null) {
		return ''
	} else {
		return results[1]
	}
}

/**
 * 创建window.demo namespace(window.demo namespace为客户端交互时的功能空间）
 * 当用户使用非Android手机时会被创建
 */
if (!window.demo) {
	window.demo = {}
	/**
	 * 操作系统，如果不含有window.demo对象则暂时默认为iphone客户端
	 */
	window.demo.os = 'iphone'

	/**
	 * 添加body的onload时间，加载IMEI及客户端版本号
	 */
	document.addEventListener('DOMContentLoaded', function () {
		window.demo.callAPI('ZZSS://getIMEI?func=setIMEI')
		window.demo.callAPI('ZZSS://getVersion?func=setVersion')
	})

	/**
	 * imei构造, JS被加载时会主动调用，并设置相关内容
	 * @param {String} imei
	 */
	window.setIMEI = function (imei) {
		window.IMEI = imei
	}

	/**
	 * 获得IMEI
	 * @returns {String} 手机的IMEI号
	 */
	window.demo.getuserid = function () {
		return window.IMEI
	}

	/**
	 * 设置client版本号
	 * @param {String} version
	 */
	window.setVersion = function (version) {
		window.version = version
	}

	/**
	 * 获得client版本号
	 * @returns {String} 当前客户端的版本号
	 */
	window.demo.getVersion = function () {
		return window.version
	}

	/**
	 * 打开新的页面
	 * @param {String} url
	 */
	window.demo.nativebrowser = function (url) {
		jump('ZZSS://openBrowser?url=' + encodeURIComponent(url))
	}

	/**
	 * 返回
	 */
	window.demo.back = function () {
		jump('ZZSS://back')
	}

	/**
	 * 调用API
	 * @param {String} url
	 */
	window.demo.callAPI = function (url) {
		var iframe = document.createElement('iframe')
		iframe.setAttribute('src', url)
		document.documentElement.appendChild(iframe)
		iframe.parentNode.removeChild(iframe)
		iframe = null
	}

	/**
	 * 插入记录
	 * @param {String} key
	 * @param {String} value
	 */
	window.demo.setDic = (function () {
		/**
		 * save data to local storage
		 * @param {String} key
		 * @param {String} value
		 */
		var setDicToLS = function (key, value) {
			localStorage.setItem(key, value)
		},
			/**
			 * save data to application
			 * @param {String} key
			 * @param {String} value
			 */
			setDicToApp = function (key, value) {
				var url =
					'ZZSS://setValue?key=' +
					encodeURI(key) +
					'&value=' +
					encodeURI(value)
				window.demo.callAPI(url)
			}

		return function (key, value) {
			setDicToLS(key, value)
			if (ua.isMobile) {
				setDicToApp(key, value)
			}
		}
	})()

	/**
	 * 获得记录
	 *
	 * 记录将会使用两种方法返回
	 * 如果含有funcName参数，则会调用该方法
	 * 并在调用时将value作为参数传入
	 *
	 * 如果不含有funcName参数，则直接返回
	 * @param {String} key
	 * @param {String} funcName	回调方法的名字
	 * @returns {String} 保存的值
	 */
	window.demo.getDic = (function () {
		/**
		 * get data from local storage
		 * @param {String} key
		 */
		var getFromLS = function (key) {
			return localStorage.getItem(key)
		},
			/**
			 * get data from application
			 * @param {String} key
			 * @param {String} funcName
			 */
			getFromApp = function (key, funcName) {
				var url =
					'ZZSS://getValue?key=' +
					encodeURI(key) +
					'&func=' +
					funcName
				window.demo.callAPI(url)
			}

		return function (key, funcName) {
			if (arguments.length == 2 && ua.isMobile) {
				getFromApp(key, funcName)
				return
			}

			return getFromLS(key)
		}
	})()

	/**
	 * 微信朋友圈分享
	 * 分享成功后，调用回调函数，并将分享状态("true"|"false")传入
	 *
	 * @param {String} title		标题
	 * @param {String} description	内容
	 * @param {String} imageUrl		图片链接
	 * @param {String} urlString	网页链接
	 * @param {String} callback		回调方法名
	 */
	window.demo.shareLinkByWX = function (
		title,
		description,
		imageUrl,
		urlString,
		callback
	) {
		window.demo.callAPI(
			'ZZSS://shareLinkByWX?title=' +
			title +
			'&description=' +
			description +
			'&imageUrl=' +
			encodeURI(imageUrl) +
			'&urlString=' +
			encodeURI(urlString) +
			'&func=' +
			callback
		)
	}

	/**
	 * 加密
	 *
	 * @param {String} origin		加密内容
	 * @param {String} callback		回调方法名
	 */
	window.demo.getHttpSign = function (origin, callback) {
		window.demo.callAPI(
			'ZZSS://getHttpSign?origin=' + origin + '&func=' + callback
		)
	}

	/**
	 * 扫一扫
	 *
	 * @param {String} callback		回调方法名
	 */
	window.demo.getQrCodeResult = function (callback) {
		window.demo.callAPI('ZZSS://getQrCodeResult?&func=' + callback)
	}

	/**
	 * APPWEB新的跳转
	 *
	 * @param {String} type		挑战类型
	 */
	window.demo.jumpAppAction = function (type) {
		window.demo.callAPI('ZZSS://jumpAppAction?action=' + type)
	}
	/**
	 * APPWEB通知点击按钮
	 *
	 * @param {String} type     挑战类型
	 */
	window.demo.savePic = function () {
		window.demo.callAPI('ZZSS://savePic')
	}
	/**
	 * 活动专区&秒杀专区 跳转商品详情页
	 * @param spusid spu schedule id
	 * @param gid gid
	 * @param needClose 是否需要关闭当前web页面
	 */
	window.demo.jumpToDetail = function (spusid, gid, needClose) {
		window.demo.callAPI(
			'ZZSS://jumpToDetail?spusid=' + spusid + '&gid=' + gid
		)
	}

	/**
	 * toast
	 *
	 * @param {String} tips		toast内容
	 */
	window.demo.openToast = function (tips) {
		window.demo.callAPI('ZZSS://openToast?tips=' + encodeURI(tips))
	}

	/**
	 * 获取kpi问卷内容
	 */
	window.demo.getQuestionnaire = function (callback) {
		window.demo.callAPI('ZZSS://getQuestionnaire?func=' + callback)
	}

	/**
	 * 商品详情页问卷提交完成后跳转
	 */
	window.demo.questionnaireCompleted = function () {
		window.demo.callAPI('ZZSS://questionnaireCompleted')
	}

	/**
	 * 获取当前城市ID
	 *
	 * @param {String} callback		回调函数名
	 */
	window.demo.getAppCityId = function (callback) {
		window.demo.callAPI('ZZSS://getAppCityId?func=' + callback)
	}

	/**
	 * 购买会员
	 * @param {String} level 购买等级
	 * @param {String} amount 购买数量
	 * @param {String} type 支付方式 ["wx","alipay"]
	 * @param {String} callback 回调函数
	 */
	window.demo.buyVip = function (level, amount, type, callback) {
		window.demo.callAPI(
			'ZZSS://buyVip?level=' +
			level +
			'&amount=' +
			amount +
			'&type=' +
			type +
			'&func=' +
			callback
		)
	}

	/**
	 * 分享弹出框
	 * 分享成功后，调用回调函数，并将分享状态("true"|"false")传入
	 *
	 * @param {String} title		标题
	 * @param {String} description	内容
	 * @param {String} imageUrl		图片链接
	 * @param {String} urlString	网页链接
	 * @param {String} callback		回调方法名
	 */
	window.demo.shareLink = function (
		title,
		description,
		imageUrl,
		urlString,
		callback
	) {
		window.demo.callAPI(
			'ZZSS://shareLink?title=' +
			title +
			'&description=' +
			description +
			'&imageUrl=' +
			encodeURI(imageUrl) +
			'&urlString=' +
			encodeURI(urlString) +
			'&func=' +
			callback
		)
	}

	/**
	 * 统计上传
	 */
	window.demo.record = function (arg1, arg2, arg3, arg4, arg5) {
		window.demo.callAPI(
			'ZZSS://record?arg1=' +
			arg1 +
			'&arg2=' +
			arg2 +
			'&arg3=' +
			arg3 +
			'&arg4=' +
			arg4 +
			'&arg5=' +
			arg5
		)
	}

	/**
	 * 关闭当前webview
	 */
	window.demo.close = function () {
		window.demo.callAPI('ZZSS://close')
	}

	/**
	 * 打开收获地址列表
	 */
	window.demo.openAddress = function (callback) {
		window.demo.callAPI('ZZSS://openAddress?func=' + callback)
	}

	/**
	 * 支付
	 */
	window.demo.pay = function (payType, jsonStr, callBack) {
		window.demo.callAPI(
			'ZZSS://pay?payType=' +
			payType +
			'&jsonStr=' +
			jsonStr +
			'&func=' +
			callBack
		)
	}

	/**
	 * 开始识别语音
	 */
	window.demo.startSpeak = function (callBack1, callBack2, callBack3) {
		window.demo.callAPI(
			'ZZSS://startSpeak?func1=' +
			callBack1 +
			'&func2=' +
			callBack2 +
			'&func3=' +
			callBack3
		)
	}

	/**
	 * 结束识别语音
	 */
	window.demo.stopSpeak = function () {
		window.demo.callAPI('ZZSS://stopSpeak')
	}

	/**
	 * 添加菜单子项
	 */
	window.demo.addMenuItem = function (type) {
		window.demo.callAPI('ZZSS://addMenuItem?type=' + type)
	}

	/**
	 * 清除菜单所有子项
	 */
	window.demo.clearMenu = function () {
		window.demo.callAPI('ZZSS://clearMenu')
	}

	/**
	 * 跳转到用户中心
	 *
	 * @param {String} uid
	 */
	window.demo.jumpToUserCenter = function (uid) {
		window.demo.callAPI('ZZSS://jumpToUserCenter?uid=' + uid)
	}

	/**
	 * 分享弹出框（微信好友&朋友圈）
	 */
	window.demo.shareLinkByChatAndDiscover = function (
		title,
		description,
		imageUrl,
		urlString,
		callback
	) {
		window.demo.callAPI(
			'ZZSS://shareLinkByChatAndDiscover?title=' +
			title +
			'&description=' +
			description +
			'&imageUrl=' +
			encodeURI(imageUrl) +
			'&urlString=' +
			encodeURI(urlString) +
			'&func=' +
			callback
		)
	}

	/**
	 * 分享弹出框（微信好友&朋友圈）
	 */
	window.demo.shareImageByChatAndDiscover = function (imageUrl, callback) {
		window.demo.callAPI(
			'ZZSS://shareImageByChatAndDiscover?imageUrl=' +
			encodeURI(imageUrl) +
			'&func=' +
			callback
		)
	}

	/**
	 * 添加页面菜单分享子项
	 */
	window.demo.addMenuShareItem = function (callback) {
		window.demo.callAPI('ZZSS://addMenuShareItem?func=' + callback)
	}

	/**
	 * iOS禁止页面回弹效果
	 */
	window.demo.setRebound = function (flag) {
		window.demo.callAPI('ZZSS://setRebound?flag=' + flag)
	}

	/**
	 * 打开新的浏览器页面
	 */
	window.demo.openNewBrowser = function (url) {
		window.demo.callAPI('ZZSS://openNewBrowser?url=' + url)
	}

	/**
	 * 打开问卷
	 */
	window.demo.jumpToQuestionnaire = function (id) {
		window.demo.callAPI('ZZSS://jumpToQuestionnaire?id=' + id)
	}

	/**
	 * 跳转天猫
	 * @param id
	 */
	window.demo.jumpToTmall = function (id) {
		window.demo.callAPI('ZZSS://jumpToTmall?id=' + id)
	}

	/**
	 * 跳转淘宝
	 * @param id
	 */
	window.demo.jumpToTaobao = function (id) {
		window.demo.callAPI('ZZSS://jumpToTaobao?id=' + id)
	}

	/**
	 * 是否需要刷新
	 * @param type
	 */
	window.demo.needRefresh = function (type) {
		window.demo.callAPI('ZZSS://needRefresh?type=' + type)
	}

	/**
	 * 弹出信息框
	 * @param {String} title	弹出框标题
	 * @param {String} content	弹出框文本内容
	 * @param {String} btn1Txt	弹出框按钮1文本
	 * @param {String} btn2Txt	弹出框按钮2文本
	 * @param {String} callBack1Name	按钮1触发函数的函数名
	 * @param {String} callBack2Name	按钮2触发函数的函数名
	 */
	window.demo.openDialog = function (
		title,
		content,
		btn1Txt,
		btn2Txt,
		callBack1Name,
		callBack2Name
	) {
		//如果只含有2个参数，则使用alert，反之使用confirm
		if (btn1Txt && btn2Txt && callBack1Name && callBack1Name != '') {
			window.demo.callAPI(
				'ZZSS://openDialog?title=' +
				encodeURI(title) +
				'&content=' +
				encodeURI(content) +
				'&lefttext=' +
				encodeURI(btn1Txt) +
				'&leftfunc=' +
				callBack1Name +
				'&righttext=' +
				encodeURI(btn2Txt) +
				'&rightfunc=' +
				callBack2Name
			)
		} else {
			window.demo.callAPI(
				'ZZSS://openDialog?title=' +
				encodeURI(title) +
				'&content=' +
				encodeURI(content)
			)
		}
	}

	/**
	 * 设置剪切板
	 * @param {String} value
	 */
	window.demo.setCopy = function (value) {
		window.demo.callAPI('ZZSS://setCopy?value=' + value)
	}

	/**
	 * 提醒用户填写蟹腿商城收货地址
	 * @param {String} flag
	 */
	window.demo.setCrabLegsPrizeAddressTips = function (flag) {
		window.demo.callAPI('ZZSS://setCrabLegsPrizeAddressTips?flag=' + flag)
	}

	/**
	 * 跳转到固定套餐
	 * @param {String} mid
	 */
	window.demo.jumpFinalMix = function (mid) {
		window.demo.callAPI('ZZSS://jumpFinalMix?mid=' + mid)
	}

	/**
	 * 跳转到可选套餐
	 * @param {String} mid
	 */
	window.demo.jumpOptionsMix = function (mid) {
		window.demo.callAPI('ZZSS://jumpOptionsMix?mid=' + mid)
	}

	/**
	 * 跳转到新零售商品详情页
	 * @param {String} aid
	 */
	window.demo.jumpSrpDetail = function (aid) {
		window.demo.callAPI('ZZSS://jumpSrpDetail?aid=' + aid)
	}

	/**
	 * 保存图片
	 * @param {String} url
	 */
	window.demo.saveImage = function (url) {
		window.demo.callAPI('ZZSS://saveImage?url=' + url)
	}

	/**
	 * 手淘登录授权
	 * @param {String} func
	 */
	window.demo.taobaoLogin = function (func) {
		window.demo.callAPI('ZZSS://taobaoLogin?func=' + func)
	}

	/**
	 * 手淘商品详情
	 * @param {String} id
	 */
	window.demo.taobaoDetail = function (id) {
		window.demo.callAPI('ZZSS://taobaoDetail?id=' + id)
	}

	/**
	 * 手淘店铺首页
	 * @param {String} id
	 */
	window.demo.taobaoShop = function (id) {
		window.demo.callAPI('ZZSS://taobaoShop?id=' + id)
	}
}

/**
 * 弹出信息框
 * @param {String} title	弹出框标题
 * @param {String} content	弹出框文本内容
 * @param {String} btn1Txt	弹出框按钮1文本
 * @param {String} btn2Txt	弹出框按钮2文本
 * @param {String} callBack1Name	按钮1触发函数的函数名
 * @param {String} callBack2Name	按钮2触发函数的函数名
 */
function openDialog (
	title,
	content,
	btn1Txt,
	btn2Txt,
	callBack1Name,
	callBack2Name
) {
	if (btn1Txt && callBack1Name && callBack1Name != '') {
		window.demo.openDialog(
			title,
			content,
			btn1Txt,
			btn2Txt,
			callBack1Name,
			callBack2Name
		)
	} else {
		window.demo.openDialog(title, content)
	}
}

/*“微信关注页面跳转”*/
function jumpjudge (url, num4v5, target) {
	if (target == 'browser' && ua.isAndroid) {
		window.demo.weixinAttention(url, num4v5)
	} else {
		jump(url, target)
	}
}

/**
 * 插入记录
 * @param {String} key
 * @param {String} value
 */
function setData (key, value) {
	key += 'ZZSS'
	window.demo.setDic(key, value)
}

/**
 * 获得记录
 *
 * 记录将会使用两种方法返回
 * 如果含有funcName参数，则会调用该方法
 * 并在调用时将value作为参数传入
 *
 * 如果不含有funcName参数，则直接返回
 * @param {String} key
 * @param {String} funcName	回调方法的名字
 * @returns {String} 保存的值
 */
function getData (key, funcName) {
	key += 'ZZSS'
	var func = tools.isNotBlankStr(funcName)
		? tools.getContextFromStr(funcName)
		: null

	//如果funcName不存在，或者不是方法名，则直接返回调用API返回数据
	if (funcName && tools.isFunction(func)) {
		if (window.demo.os == 'iphone' && ua.isMobile) {
			window.demo.getDic(key, funcName)
		} else {
			func(formatAndroidData(window.demo.getDic(key)))
		}
	} else {
		return formatAndroidData(window.demo.getDic(key))
	}
}

/**
 * 将Android中获得的数据进行格式化，转换为string类型
 * @param {Object} obj
 * @returns {String}	格式化后的数据
 */
function formatAndroidData (obj) {
	if (obj) {
		obj = obj + ''
	}

	return obj
}

/**
 * 获得IMEI
 * @returns {String} 手机的IMEI号
 */
function getIMEI () {
	return window.demo.getuserid() + ''
}

; (function () {
	// 创建一个闭包
	/**
	 * UA管理对象
	 *
	 * @methods:
	 * 	--> getTouchStartEvent: 		give the corresponding start event
	 * 	--> getTouchMoveEvent: 			give the corresponding move event
	 * 	--> getTouchEndEvent: 			give the corresponding end event
	 * 	--> isLatestPhone: 				如果是iPhone或者1.5以上版本的GPhone为true
	 *
	 * @attributes:
	 *  --> isWebkit: 					Indicates whether webkit is available
	 *  --> isMobile: 					Indicates whether the platform is a mobile
	 *  --> isIPhone: 					Indicates whether the platform is a IPhone
	 *  --> isIPod:						Indicates whether the platform is a IPod
	 *  --> isIPad: 					Indicates whether the platform is a IPad
	 *  --> isAndroid: 					Indicates whether the platform is a Android
	 *  --> isSafari: 					Indicates whether the browser is Safari
	 *  --> isMozilla: 					Indicates whether the browser is Mozilla
	 *  --> webkitVersion: 				The webkit major version
	 *  --> webkitMinorVersion: 		The webkit minor version
	 *  --> webkitUpdateVersion: 		The webkit update version
	 *  --> browserVersion: 			The browser major version
	 *  --> browserMinorVersion: 		The browser minor version
	 *  --> browserUpdateVersion: 		The browser update version
	 *  --> osVersion: 					The OS major version
	 *  --> osMinorVersion: 			The OS minor version
	 *  --> osUpdateVersion: 			The OS update version
	 *  --> supportGradient: 			Indicates whether the browser supports gradients
	 *
	 * 各版本手机举例 :
	 * |----------------------------------------------------------------------------------------------------|
	 * | Plaform			| webkitV 	| wMV 	| wUV 	| browserV 	| bMV 	| bUV 	| osV 	| osMV 	| osUV 	|
	 * |----------------------------------------------------------------------------------------------------|
	 * |IPhone OS 3			| 528		| 18	| 0		| 4			| 0		| 0		| 3		| 1		| 2	 	|
	 * |IPhone OS 2			| 525		| 18	| 1		| 3			| 1		| 1		| 2		| 2		| 1	 	|
	 * |Android HTC Hero	| 528		| 5		| 0		| 3			| 1		| 2		| 1		| 5		| 0	 	|
	 * |PC					| 531		| 21	| 8		| 4			| 0		| 4		| 0		| 0		| 0	 	|
	 * |----------------------------------------------------------------------------------------------------|
	 *
	 * @compatibility
	 *  --> Iphone OS2, Iphone OS3, Android 1.1, Android 1.5, Android 2.1
	 *
	 */
	window.ua = {
		isWebkit: false,
		isMobile: false,
		isIPhone: false,
		isIPod: false,
		isIPad: false,
		isAndroid: false,
		isSafari: false,
		isMozilla: false,
		webkitVersion: 0,
		webkitMinorVersion: 0,
		webkitUpdateVersion: 0,
		browserVersion: 0,
		browserMinorVersion: 0,
		browserUpdateVersion: 0,
		osVersion: 0,
		osMinorVersion: 0,
		osUpdateVersion: 0,
		supportGradient: false,
		isLatestPhone: false,

		/**
		 * Returns the corresponding start event
		 */
		getTouchStartEvent: function () {
			if (this.isMobile == true) {
				return 'touchstart'
			} else {
				return 'mousedown'
			}
		},

		/**
		 * Returns the corresponding move event
		 */
		getTouchMoveEvent: function () {
			if (this.isMobile == true) {
				return 'touchmove'
			} else {
				return 'mousemove'
			}
		},

		/**
		 * Returns the corresponding end event
		 */
		getTouchEndEvent: function () {
			if (this.isMobile == true) {
				return 'touchend'
			} else {
				return 'mouseup'
			}
		},

		isLastestPhone: function () {
			return (
				this.isIphone ||
				(this.isAndroid && this.osVersion + this.osMinorVersion > '15')
			)
		},

		/**
		 * This method retrieve all necessary informations about the platform.
		 */
		_updatePlatformInfo: function () {
			this.isWebkit = RegExp(' AppleWebKit/').test(navigator.userAgent)

			if (
				tools.isNotNull(navigator) &&
				tools.isNotNull(navigator.platform)
			) {
				var reg = new RegExp(/iphone/i)
				if (reg.test(navigator.platform)) {
					this.isIPhone = true
					this.isLatestPhone = true
				}
				reg = new RegExp(/ipod/i)
				if (reg.test(navigator.platform)) {
					this.isIPod = true
				}
				reg = new RegExp(/ipad/i)
				if (reg.test(navigator.platform)) {
					this.isIPad = true
				}
			}

			if (
				tools.isNotNull(navigator) &&
				tools.isNotNull(navigator.appVersion)
			) {
				var reg = new RegExp(/android/i)
				if (reg.test(navigator.appVersion)) {
					this.isAndroid = true
				}
				var reg = new RegExp(/safari/i)
				if (reg.test(navigator.appVersion)) {
					this.isSafari = true

					var version = this._extractVersion(
						navigator.appVersion,
						'( Version/)([^ ]+)',
						'.'
					)
					this.browserVersion = version.major
					this.browserMinorVersion = version.minor
					this.browserUpdateVersion = version.update
				}
			}
			if (this.isSafari == false) {
				this.isMozilla = RegExp(/mozilla/i).test(navigator.userAgent)
			}

			this.isMobile =
				this.isIPhone ||
				this.isIPod ||
				this.isAndroid ||
				RegExp(' Mobile/').test(navigator.userAgent)

			if (this.isWebkit) {
				var version = this._extractVersion(
					navigator.userAgent,
					'( AppleWebKit/)([^ ]+)',
					'.'
				)
				this.webkitVersion = version.major
				this.webkitMinorVersion = version.minor
				this.webkitUpdateVersion = version.update

				this.supportGradient = this.webkitVersion >= 528 // TODO determine supportGradient attribute more precisely
			}

			if (
				this.isMobile &&
				tools.isNotNull(navigator) &&
				tools.isNotNull(navigator.appVersion)
			) {
				if (this.isAndroid) {
					var versionOs = this._extractVersion(
						navigator.appVersion,
						'( Android )([^ ]+)',
						'.'
					)
					this.osVersion = versionOs.major
					this.osMinorVersion = versionOs.minor
					this.osUpdateVersion = versionOs.update
					this.isLatestPhone =
						versionOs.major + versionOs.minor > '15'
				} else {
					var versionOs = this._extractVersion(
						navigator.appVersion,
						'( OS )([^ ]+)',
						'_'
					)
					this.osVersion = versionOs.major
					this.osMinorVersion = versionOs.minor
					this.osUpdateVersion = versionOs.update
				}
			}
			return this
		},
		/**
		 * Extracts the version number in the given string.
		 *
		 * @parameters:
		 *  --> str: the working source string
		 *	--> reg: the regular expression that identifies the working substring
		 *	--> separator: the separator between the version parts
		 */
		_extractVersion: function (str, reg, separator) {
			var result = {
				major: 0,
				minor: 0,
				update: 0,
			}
			var fields = RegExp(reg).exec(str)
			if (tools.isNotNull(fields) && fields.length > 1) {
				var versionString = fields[2]
				var invalidCharacter = RegExp('[^\\' + separator + '0-9]').exec(
					versionString
				)
				if (tools.isNotNull(invalidCharacter)) {
					versionString = versionString.slice(
						0,
						invalidCharacter.index
					)
				}
				var version = versionString.split(separator)
				if (version.length > 0) {
					result.major = version[0]
				}
				if (version.length > 1) {
					result.minor = version[1]
				}
				if (version.length > 2) {
					result.update = version[2]
				}
			}
			return result
		},
	}._updatePlatformInfo()
})()

var statusTools = {
	/**
	 * 用户信息关键码
	 */
	userInfoKeys: {
		id: 'id', //uid
		userName: 'userName', //用户名
		name: 'name', //姓名
		sex: 'sex', //性别
		userMobile: 'userMobile', //手机号
		nickName: 'nickName', //昵称
		inviteCode: 'inviteCode', //邀请码
		head: 'head', //头像url
	},
	isIOS: function () {
		return ua.isIPhone || ua.isIPod || ua.isIPad
	},
	setId: function (id) {
		if (id == ' ' || tools.isNotNull(id)) {
			setData(this.userInfoKeys.id, id)
		}
	},
	getId: function (callback) {
		if (this.isIOS()) {
			return getData(this.userInfoKeys.id, callback)
		} else {
			return getData(this.userInfoKeys.id)
		}
	},
	setUserName: function (userName) {
		if (userName == ' ' || tools.isNotNull(userName)) {
			setData(this.userInfoKeys.userName, userName)
		}
	},
	getUserName: function (callback) {
		if (this.isIOS()) {
			return getData(this.userInfoKeys.userName, callback)
		} else {
			return getData(this.userInfoKeys.userName)
		}
	},
	setName: function (name) {
		if (name == ' ' || tools.isNotNull(name)) {
			setData(this.userInfoKeys.name, name)
		}
	},
	getName: function () {
		return getData(this.userInfoKeys.name)
	},
	setSex: function (sex) {
		if (this.isIOS()) {
			return getData(this.userInfoKeys.sex, callback)
		} else {
			return getData(this.userInfoKeys.sex)
		}
	},
	getSex: function () {
		return getData(this.userInfoKeys.sex)
	},
	setUserMobile: function (userMobile) {
		if (tools.validatePhoneNum(userMobile) || userMobile == ' ') {
			setData(this.userInfoKeys.userMobile, userMobile)
		}
	},
	getUserMobile: function (callback) {
		if (this.isIOS()) {
			return getData(this.userInfoKeys.userMobile, callback)
		} else {
			return getData(this.userInfoKeys.userMobile)
		}
	},
	setNickName: function (nickName) {
		if (nickName == ' ' || tools.isNotNull(nickName)) {
			setData(this.userInfoKeys.nickName, nickName)
		}
	},
	getNickName: function (callback) {
		if (this.isIOS()) {
			return getData(this.userInfoKeys.nickName, callback)
		} else {
			return getData(this.userInfoKeys.nickName)
		}
	},
	setInviteCode: function (inviteCode) {
		if (inviteCode == ' ' || tools.isNotNull(inviteCode)) {
			setData(this.userInfoKeys.inviteCode, inviteCode)
		}
	},
	getInviteCode: function (callback) {
		if (this.isIOS()) {
			return getData(this.userInfoKeys.inviteCode, callback)
		} else {
			return getData(this.userInfoKeys.inviteCode)
		}
	},
	setHead: function (head) {
		if (head == ' ' || tools.isNotNull(head)) {
			setData(this.userInfoKeys.head, head)
		}
	},
	getHead: function (callback) {
		if (this.isIOS()) {
			return getData(this.userInfoKeys.head, callback)
		} else {
			return getData(this.userInfoKeys.head)
		}
	},
}
window.statusTools = statusTools
/**
 * 对客户端版本号进行比对
 * 如果API获取的版本号大于传入的版本号，返回1
 * 如果API获取的版本号小于传入的版本号，返回-1
 * 如想两者相等，返回0
 * @param {String} versionStr	版本号，格式为"1.1.1"
 * @returns {Number}	版本号对比结果
 */
function compareClientVersion (versionStr) {
	if (window.demo.getVersion && window.demo.getVersion() && versionStr) {
		var clientVersion = window.demo.getVersion() + '',
			clientVerParts = clientVersion.split('.'),
			versionStrParts = versionStr.split('.')

		//循环比较，如果API中的版本号大于
		for (var i = 0; i < clientVerParts.length; i++) {
			var paramVersionPart = parseInt(versionStrParts[i] || 0)
			var clientVersionPart = parseInt(clientVerParts[i])
			if (clientVersionPart > paramVersionPart) return 1
			else if (clientVersionPart < paramVersionPart) return -1
		}

		return 0
	}

	return -1
}

/**
 * app 领码接口
 * @type {{getCoupon: utils.getCoupon}}
 */
var utils = {
	getCoupon: function (articleId, type, gid) {
		var data = {
			articleId: articleId,
		}
		if (gid) {
			data.gid = gid
		}
		data.category = false
		if (ua.isAndroid) {
			window.demo.startWindow(type, JSON.stringify(data), 'false')
		} else {
			window.demo.callAPI(
				'ZZSS://startWindow?name=' +
				type +
				'&para=' +
				JSON.stringify(data) +
				'&isclose=false'
			)
		}
	},
}

/**
 * 页面跳转
 * 如果target的值为browser
 * 则在本地浏览器中打开页面
 *
 * 其余则在本页面打开
 *
 * @param {string} url
 * @param {string} target
 */
function jump (url, target) {
	if (target == 'browser') {
		window.demo.nativebrowser(url)
	} else {
		window.location.href = url
	}
}
function base (url) {
	// return "https://wxmall.zzss.com/" + url;
	return 'https://brand.zzss.com/' + url
}
