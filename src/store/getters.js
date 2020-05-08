/*
*getters用来获取状态值
*就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
*Getter 会暴露为 store.getters 对象
*Getter 也可以接受其他 getter 作为第二个参数
*/

// import state from './state.js'

export default {
	userId(state){
		if(!state.login||!state.userInfo||!state.userInfo.userId){
			return;
		}
		return state.userInfo.userId;
	},
    toPayList (state) {
		if(!state.login){
			return [];
		}
		return state.userInfo.shoppingList.filter(item=>item.status===0);
	},
	paidList (state) {
		if(!state.login){
			return [];
		}
		return state.userInfo.shoppingList.filter(item=>item.status===1);
	},
	refundList (state) {
		if(!state.login){
			return [];
		}
		return state.userInfo.shoppingList.filter(item=>item.status===2);
	}
}