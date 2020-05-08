<template>
	<div>
		<section class="layout-header">
			<section class="top-bar">
				{{login?userInfo.name:"未登录用户"}}
				<div class="tool-box">
					<van-icon name="user-o" size="1em" class="top-icon" />
					<van-icon name="setting-o" size="1em" class="top-icon" />
				</div>
			</section>
			<section class="profile-card">
				<div class="profile-img-wrap">
					<van-image 
					class="profile-img"
					round
					fit="cover"
					:src="login?userInfo.profileImg:profileStaticPic">

					</van-image>
				</div>
				<div class="profile-info">
					<span class="coin-num">{{login?userInfo.balanceCoin:"0"}}</span>
				</div>
			</section>
			<section class="nav-part">
				<van-grid
				class="nav-box"
				:border="false">
					<van-grid-item 
					v-for="(item,index) in navInfo"
					:key="index">
						<div class="flex-start-center nav-item">
							<div :class="['icon-wrap','icon-wrap-'+(index+1)]">
								<i v-show="item.showDot" class="dot"></i>
								<svg class="uficon" aria-hidden="true">
									<use :xlink:href="item.icon"></use>
								</svg>
							</div>
							<span class="item-text">{{item.text}}</span>
						</div>
					</van-grid-item>
				</van-grid>
			</section>
			<section class="conduct-part">
				<van-cell 
				v-for="(item,index) in cellMenu"
				:key="index"
				center
				is-link
				:title="item.title"
				class="conduct-cell">
					<template v-slot:icon>
						<span class="left-icon-wrap">
							<svg class="uficon" aria-hidden="true">
								<use :xlink:href="item.leftIcon"></use>
							</svg>
						</span>
					</template>
				</van-cell>
			</section>
		</section>
		<section class="layout-content"></section>
		<section class="layout-footer"></section>
	</div>
</template>

<script>
	import { Row, Col, Icon, Search, Swipe, SwipeItem, Grid, GridItem, Image, Tab, Tabs, Button, Cell } from 'vant';
	import USER_PIC from '@/assets/images/user_profile.png';
	import { mapState, mapMutations, mapGetters } from 'vuex'

	const COMPONENT_NAME = 'user-index'

	export default {
		name: COMPONENT_NAME,
		components: {
			[Row.name]: Row,
			[Col.name]: Col,
			[Icon.name]: Icon,
			[Search.name]: Search,
			[Swipe.name]: Swipe,
			[SwipeItem.name]: SwipeItem,
			[Grid.name]: Grid,
			[GridItem.name]: GridItem,
			[Image.name]: Image,
			[Tab.name]: Tab,
			[Tabs.name]: Tabs,
			[Button.name]: Button,
			[Cell.name]: Cell
		},
		mixins:[],
		props:{},
		data(){
			return {
				profileStaticPic:USER_PIC,
				// navInfo:[{
				// 	icon:'#uficon-notebook',
				// 	text:'购课袋',
				// 	showDot:false
				// },{
				// 	icon:'#uficon-ziyuan',
				// 	text:'待付款',
				// 	showDot:true
				// },{
				// 	icon:'#uficon-ziyuan1',
				// 	text:'已付款',
				// 	showDot:false
				// },{
				// 	icon:'#uficon-ziyuan2',
				// 	text:'已退款',
				// 	showDot:false
				// }],
				cellMenu:[{
					leftIcon:'#uficon-yue',
					title:'我的余额',
					to:''
				},{
					leftIcon:'#uficon-youhuiquan',
					title:'优惠券',
					to:''
				},{
					leftIcon:'#uficon-knowledge',
					title:'我的课程',
					to:''
				},{
					leftIcon:'#uficon-admin',
					title:'客服中心',
					to:''
				}]
			}
		},
		computed:{
			...mapState([
				'userInfo',
				'login'
			]),
			...mapGetters([
				'toPayList',
				'paidList',
				'refundList'
			]),
			navInfo(){
				return[{
					icon:'#uficon-notebook',
					text:'购课袋',
					showDot:false
				},{
					icon:'#uficon-ziyuan',
					text:'待付款',
					showDot:this.toPayList.length>0
				},{
					icon:'#uficon-ziyuan1',
					text:'已付款',
					showDot:false
				},{
					icon:'#uficon-ziyuan2',
					text:'已退款',
					showDot:false
				}]
			}
		},
		methods:{
			...mapMutations([
				
			])
		}
	}
</script>

<style lang="scss" scoped>
	.layout-header{
		font-size:42px;

		.top-bar{
			$vertical-dis-1:35px;

			position:relative;
			padding:$vertical-dis-1 30px;
			background-color:$color-dark-blue;
			color:$color-basic-white;

			.tool-box{
				display:inline-flex;
				justify-content:space-between;
				align-items:center;
				width:150px;
				height:100%;
				position:absolute;
				top:0;
				right:40px;
			}
		}

		.profile-card{
			display:flex;
			align-items:center;
			padding:0 30px;

			.profile-img-wrap{
				margin-right:30px;
				position:relative;
				top:-80px;
				left:0;

				.profile-img{
					width:260px;
					height:260px;
					border:20px solid $color-basic-white;
					background-color:$color-basic-white;
				}
			}

			.profile-info{
				flex:1;
				display:flex;

				.coin-num{
					display:inline-block;
					font-size:1.5em;
					font-weight:bold;
					margin-right:30px;
					color:$color-light-orange;

					&::after{
						content:"金币";
						color:$color-light-text;
						font-size:.6em;
						font-weight:normal;
						margin-left:20px;
					}
				}
			}
		}

		.nav-part{
			font-size:40px;

			&::before{
				content:"";
				display:block;
				height:20px;
				background-color:$color-border-three;
			}

			.nav-box{
				//padding:30px 0;

				.nav-item{
					padding:30px 0;
					position:relative;

					.icon-wrap{
						font-size:1.5em;
						margin-right:20px;
						position:relative;

						.dot{
							position:absolute;
							top:0;
							right:0;
							display:inline-block;
							width:20px;
							height:20px;
							border-radius:50%;
							background-color:red;
						}
					}

					.item-text{
						font-size:1em;
						color:$color-regular-text;
					}
				}

				::v-deep .van-grid-item:not(:last-child) .nav-item{
					&::after{
						display:inline-block;
						content:"";
						width:3px;
						height:100%;
						position: relative;
						left:30px;
						background-color:$color-border-three;
					}					
				}
			}
		}

		.conduct-part{
			font-size:40px;
			text-align:left;

			&::before{
				content:"";
				display:block;
				height:20px;
				background-color:$color-border-three;
			}

			.conduct-cell{
				font-size:1.1em;
				padding:40px 50px;
				color:$color-regular-text;

				.left-icon-wrap {
					margin-right:20px;
					font-size:1.2em;
				}
			}
		}
	}
</style>