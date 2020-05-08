/*
 *actions接收对应的指令，去mutations中执行
*/


// import mutations from './mutations.js'

export default {
	changeCountryId ({commit}) {
		commit('changeCountryId');
	}
}