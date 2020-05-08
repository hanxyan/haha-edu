<template>
	<van-tabbar 
	v-model="active" 
	v-show="show" 
	:active-color="themePriamryColor"
	class="foot-bar"
	route>
		<van-tabbar-item 
		v-for="(item,index) in tabs"
		:name="item.routeName"
		:to="item.routeName"
		class="tab-item"
		:key="index">
			<template v-slot:icon>
				<span class="icon-wrap">
					<svg class="uficon" aria-hidden="true">
						<use :xlink:href="item.icon"></use>
					</svg>
				</span>
			</template>
			<span class="tab-item-text">{{item.text}}</span>
		</van-tabbar-item>
	</van-tabbar>
</template>

<script>
	import { Tabbar, TabbarItem } from 'vant';

	const THEME_PRIMARY='#3498db'
	const REGULAR_TEXT_COLOR='#333'
	const COMPONENT_NAME = 'footer-nav'

	export default {
		name: COMPONENT_NAME,
		components: {
			[Tabbar.name]: Tabbar,
			[TabbarItem.name]: TabbarItem
		},
		mixins:[],
		props:{
			show: {
				type: Boolean,
				default: true
			}
		},
		data(){
			return {
				active:'index',
				themePriamryColor:THEME_PRIMARY,//主题色
				regularTextColor:REGULAR_TEXT_COLOR,//常规字体颜色
				tabs:[{
					icon:'#uficon-shouye1',
					text:'首页',
					routeName:'/index'
				},{
					icon:'#uficon-xuexizhongxin',
					text:'学习',
					routeName:'/myCourse'
				},{
					icon:'#uficon-duanxinjilu',
					text:'消息',
					routeName:'/message'
				},{
					icon:'#uficon-wode',
					text:'我的',
					routeName:'/me'
				}]
			}
		},
		computed: {

		},
		watch: {},
		created () {},
		mounted () {},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.foot-bar{
		height:140px;
		font-size:40px;
		
		.tab-item{
			font-size:1em;

			.icon-wrap{
				.uficon{
					width:60px;
					height:60px;
					font-size:60px;
					line-height:1;
				}
			}

			&-text{
				font-size:.75em;
			}
		}
		
	}
</style>