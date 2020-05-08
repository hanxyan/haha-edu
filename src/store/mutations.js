/*
 *mutations用来提供改变状态的方法
*/

// import getters from './getters.js'
import { 
	RECORD_USERINFO, 
	GET_USERINFO} from './mutation-types'
import {setStore} from '@/libs/utils'

export default {
	// 记录登录用户的信息
	[RECORD_USERINFO](state, info) {
		state.userInfo = info;
		state.login = true;
		setStore('user_id', info.user_id);
	},
	// 获取用户信息存入vuex
	[GET_USERINFO](state, info) {
		if(state.userInfo && (state.userInfo.user_id !== info.user_id)){
			return;
		}
		if(!state.login){
			return;
		}
		state.userInfo = {...info};
	}
}