import axios from '@/libs/api.request'

export const ajaxPromiseRequest = (url, method, data,config={}) => {
	return new Promise((resolve, reject) =>{
		axios.request({
			url: url,
			method: method,
			data: data,
			headers: (config && config.headers)?config.headers:{},
			responseType: (config && config.responseType)?config.responseType:''
		}).then(response => {
			resolve(response.data)
		}).catch(err => {
			// console.log('err:'); console.log(err)
			reject(err)
		})
	})
}

export const accountLogin =(account, password)=>{
	const params={
		account:account,
		password:password
	}
	// const params={
	// 	client_id:account.length>0?"2385603":"2385603",
	// 	callbackurl:password!==''?"http://zhxgdev.gxsrkj.com/wisdomDev/zhxgwechat/#/roletype":''
	// }
	// let formData= new FormData();
	// for(let k in params){
	// 	formData.append(k,params[k])
	// }
	// return ajaxPromiseRequest('/ucenter/other/h5_login','post',formData)
	return ajaxPromiseRequest(`/loginByAccount?account=${account}&password="${password}"`,'post',params);
}

export const captchaLogin =(account, captcha)=>{
	const params={
		account:account,
		captcha:captcha
	}
	return ajaxPromiseRequest(`/loginByAccount?account=${account}&captcha="${captcha}"`,'post',params);
}

export const systemMsgList =(userId,pageNo, pageSize)=>{
	
	return ajaxPromiseRequest(`/systemMsg?user_id=${userId}&pageNo=${pageNo}&pageSize=${pageSize}`,'get');
}