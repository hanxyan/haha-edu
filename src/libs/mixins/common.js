export default {
	methods:{
		routerJumpEvtMixin(obj={}){
			this.$router.push(obj);
		},
		routerGoMixin(n=-1){
			this.$router.go(n);
		}
	}
}