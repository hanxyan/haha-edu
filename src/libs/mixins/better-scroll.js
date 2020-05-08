import BScroll from 'better-scroll';

export default {
	methods:{
		initScrollMixin(wrap_dom,outer_options={},dir='horizontal'){
			if(!this.$refs[wrap_dom]){
				return null;
			}

			const defaultOptions={
				observeDOM: true,
				click: true,
				probeType: 1,
				scrollbar: false,
				pullDownRefresh: false,
				pullUpLoad: false
			}

			let options=Object.assign({}, defaultOptions,{
				scrollY: dir === 'vertical',
				scrollX: dir === 'horizontal',
			},outer_options)

			let scroller = new BScroll(this.$refs[wrap_dom], options)

			return scroller;
		},
		destroyScrollMixin(scrollerName){
			this[scrollerName]&&this[scrollerName].destroy()
			this[scrollerName]=null
		}
	}
}