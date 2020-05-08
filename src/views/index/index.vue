<template>
	<div>
		<section class="layout-header" :style="headerStyle">
			<section class="top-search">
				<van-row type="flex" justify="space-between">
					<!-- <van-col span="6" class="location-wrap">
						<span>
							<van-icon name="location-o" size="1em" />
							南宁
						</span>
					</van-col> -->
					<van-col span="24">
						<form action="/">
							<van-search 
							v-model="searchKV"
							background="none"
							placeholder="搜索课程"
							shape='round'>
								<template v-slot:left-icon>
									<svg class="uficon" aria-hidden="true">
										<use xlink:href="#uficon-search"></use>
									</svg>
								</template>
							</van-search>
						</form>
					</van-col>
				</van-row>
			</section>
			<section class="swipe-wrap">
				<van-swipe 
				indicator-color="white"
				:autoplay="3000"
				class="swipe-body"
				ref="swipe"
				@change="swipeChangeEvt">
					<van-swipe-item 
					v-for="(img, index) in swipeImages" 
					:key="index"
					:style="{background:'url('+img.src+') no-repeat',backgroundPosition:'center top',backgroundSize: 'cover'}"
					class="swipe-item"
					@click="swipeItemClickEvt">
						<img 
						v-show="false"
						:src="img.src" />
					</van-swipe-item>
				</van-swipe>
			</section>
		</section>
		<section class="layout-content">
			<section class="catalog-menu">
				<van-grid
				:column-num="3"
				:border="false">
					<van-grid-item 
					v-for="(item,index) in navInfo"
					:key="index"
					:to="item.to">
						<template v-slot:icon>
							<div :class="['icon-wrap','icon-wrap-'+(index+1)]">
								<svg class="uficon" aria-hidden="true">
									<use :xlink:href="item.icon"></use>
								</svg>
							</div>
						</template>
						<template v-slot:text>
							<span class="item-text">{{item.text}}</span>
						</template>
					</van-grid-item>
				</van-grid>
			</section>
			<section class="public-course-part">
				<van-cell
				class="section-header"
				size="large"
				:border="false"
				is-link 
				to="courseList">
					<template v-slot:title>
						<h3 class="section-title">公开课</h3>
					</template>
				</van-cell>
				<div ref="publicWrapper" class="horizon-scroll-wrapper pc-scroll-wrapper">
					<div class="horizon-scroll-content pc-scroll-content">
						<base-media-card
						v-for="(item,index) in publicCourse"
						:key="index"
						class="pc-scroll-item"
						media-class="pubilc-media"
						content-class="pubilc-info-wrap"
						:img="item.cover"
						@click="courseClickEvt(item)">
							{{item.title}}
						</base-media-card>
					</div>
				</div>
			</section>
			<section class="parent-course-part">
				<van-cell
				class="section-header"
				size="large"
				:border="false"
				is-link 
				to="courseList">
					<template v-slot:title>
						<h3 class="section-title">家长课堂</h3>
					</template>
				</van-cell>
				<div ref="parentWrapper" class="horizon-scroll-wrapper parent-scroll-wrapper">
					<div class="horizon-scroll-content parent-scroll-content">
						<base-media-card
						v-for="(item,index) in parentCourse"
						:key="index"
						class="horizon-scroll-item parent-scroll-item"
						media-class="parent-media"
						content-class="parent-info-wrap"
						:img="item.cover"
						@click="courseClickEvt(item)">
							{{item.title}}
						</base-media-card>
					</div>
				</div>
			</section>
			<section class="course-list">
				<van-cell
				class="section-header"
				size="large"
				:border="false">
					<template v-slot:title>
						<h3 class="section-title">精品课程</h3>
					</template>
				</van-cell>
				<van-tabs 
				v-model="activeCourseTabs"
				:color="themePriamryColor"
				:title-active-color="themePriamryColor"
				:title-inactive-color="regularTextColor"
				class="course-tabs"
				swipeable>
					<van-tab 
					name="hot">
						<template slot="title">
							<span class="tab-title">热门课程</span>
						</template>
						<div class="padding-30">
							<course-card
							title="小学五年级英语培训班"
							course-no="12345678906"
							time="周日 10:00-12:00"
							location="西校园2号楼3楼"
							duration="2019.09.07-2019.09.28"
							teacher-name="黄明明"
							profile-src="https://cn.vuejs.org/images/logo.png"
							:rate-value="rateTestVal"
							prize="￥666"
							class="course-card"
							@rate-change="rateTestEvt"
							@click="swipeItemClickEvt">
								<template v-slot:title-icon>
									<span class="span-icon-one qiu mgr-20">秋</span>
								</template>
								<template v-slot:status>
									<van-button plain type="primary" size="small">增开</van-button>
								</template>
							</course-card>
							<course-card
							title="小学五年级英语培训班"
							course-no="12345678906"
							time="周日 10:00-12:00"
							location="西校园2号楼3楼"
							duration="2019.09.07-2019.09.28"
							status-text="剩余3人"
							teacher-name="曾小贤"
							:rate-value="4"
							prize="￥888"
							@click="swipeItemClickEvt">

							</course-card>
						</div>
						
					</van-tab>
					<van-tab 
					name="new">
						<template slot="title">
							<span class="tab-title">新课推荐</span>
						</template>
						<div class="padding-30">
							<course-card
							v-for="n in 6"
							:key="n"
							class="course-card"
							title="小学五年级英语培训班"
							course-no="12345678906"
							time="周日 10:00-12:00"
							location="西校园2号楼3楼"
							duration="2019.09.07-2019.09.28"
							status-text="剩余3人"
							teacher-name="曾小贤"
							:rate-value="4"
							prize="￥888"
							@click="swipeItemClickEvt">

							</course-card>
						</div>
					</van-tab>
				</van-tabs>
			</section>
		</section>
		<section class="layout-footer"></section>
	</div>
</template>

<script>
	import { Row, Col, Icon, Search, Swipe, SwipeItem, Grid, GridItem, Image, Tab, Tabs, Button, Cell } from 'vant';
	import courseCard from '@/components/course-card.vue';
	import baseMediaCard from '@/components/base-media-card.vue';
	import BScroll from 'better-scroll';
	import commonMixin from '@/libs/mixins/common.js';
	import { THEME_PRIMARY, THEME_LIGHT_BLUE, REGULAR_TEXT_COLOR } from '@/libs/constant.js';
	// import NAV_ONE from '@/assets/images/index_menu_01.png';
	// import NAV_TWO from '@/assets/images/index_menu_02.png';
	// import NAV_THREE from '@/assets/images/index_menu_03.png'

	const COMPONENT_NAME = 'index'

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
			[Cell.name]: Cell,
			courseCard,
			baseMediaCard
		},
		mixins:[commonMixin],
		props:{},
		data(){
			return {
				themePriamryColor:THEME_PRIMARY,//主题色
				themeLightColor:THEME_LIGHT_BLUE,//浅主题色
				regularTextColor:REGULAR_TEXT_COLOR,//常规字体颜色
				searchKV:'',//顶部搜索框关键字
				headerBg:'',//顶部模块背景图
				swipeImages:[
				{src:"https://cdn.pixabay.com/photo/2016/08/09/08/46/education-1580143__480.jpg"},
				{src:"https://image.shutterstock.com/image-photo/ad-advertisement-marketing-commercial-concept-260nw-309964772.jpg"},
				{src:"https://image.shutterstock.com/image-photo/top-view-shot-group-creative-260nw-665740429.jpg"},
				{src:"https://cdn.pixabay.com/photo/2018/09/17/11/30/media-3683580__480.jpg"},
				{src:"https://cdn.pixabay.com/photo/2017/02/20/14/18/business-2082639__480.jpg"}
				],//轮播图
				navInfo:[{
					icon:'#uficon-notebook',
					text:'课程辅导',
					to:'login'
				},{
					icon:'#uficon-teach',
					text:'儿童辅导',
					to:'courseList'
				},{
					icon:'#uficon-yishu',
					text:'兴趣爱好',
					to:'courseList'
				}],
				publicCourse:[{
					cover:'https://image.shutterstock.com/image-photo/top-view-shot-group-creative-260nw-665740429.jpg',
					title:'《计算机网络原理 第七版》',
					to:''
				},{
					cover:'https://cdn.pixabay.com/photo/2015/02/18/10/48/social-media-640543__480.png',
					title:'初一科学',
					to:''
				},{
					cover:'https://cdn.pixabay.com/photo/2015/02/18/10/48/social-media-640543__480.png',
					title:'英语直播班',
					to:''
				},{
					cover:'https://cdn.pixabay.com/photo/2015/02/18/10/48/social-media-640543__480.png',
					title:'爱上语文',
					to:''
				},{
					cover:'https://image.shutterstock.com/image-photo/view-male-face-through-hole-260nw-1034889298.jpg',
					title:'编程小课程',
					to:''
				}],//公开课
				parentCourse:[{
					cover:'https://cdn.pixabay.com/photo/2015/02/18/10/48/social-media-640543__480.png',
					title:'新学期必备锦囊请接收',
					to:''
				},{
					cover:'https://cdn.pixabay.com/photo/2015/02/18/10/48/social-media-640543__480.png',
					title:'家长必了解的小升初常识',
					to:''
				},{
					cover:'https://cdn.pixabay.com/photo/2015/02/18/10/48/social-media-640543__480.png',
					title:'教孩子如何应对自然灾害',
					to:''
				},{
					cover:'https://cdn.pixabay.com/photo/2015/02/18/10/48/social-media-640543__480.png',
					title:'家长看护好孩子永远是第一重要功课',
					to:''
				},{
					cover:'https://cdn.pixabay.com/photo/2015/02/18/10/48/social-media-640543__480.png',
					title:'孩子沉迷电脑怎么办？',
					to:''
				}],//家长课堂
				activeCourseTabs:'hot',//课程模块中选中的tab
				rateTestVal:3
			}
		},
		computed: {
			// 页面顶部模块样式
			headerStyle(){
				if(this.headerBg!==''){
					return {
						background:`url(${this.headerBg}) no-repeat`
						// transition: 'background .5s ease-in'
					}
				}else{
					return {}
				}
			}
		},
		watch: {

		},
		created () {},
		mounted () {
			this.headerBg=this.swipeImages[0].src;
			this.$nextTick(()=>{
				this.publicScroll = this.initScroll('publicWrapper')
				this.parentScroll=this.initScroll('parentWrapper')
			})
		},
		beforeDestroy() {
			this.destroy('publicScroll')
			this.destroy('parentScroll')
		},
		methods: {
			swipeItemClickEvt(){
				this.routerJumpEvtMixin({name:'courseDetail',query:{id:'课程详情'}})
			},
			courseClickEvt({title}){
				this.routerJumpEvtMixin({name:'courseDetail',query:{id:title}})
			},
			rateTestEvt(val){
				this.rateTestVal=val;
			},
			swipeChangeEvt(index){
				// if(index===0){
					// this.$refs.swipe.swipeTo(0,{immediate:true});
				// }
				this.headerBg=this.swipeImages[index].src;
			},
			initPublicScroll(){
				this.publicScroll = this.initScroll('publicWrapper')

			},
			destroy(scrollerName){
				this[scrollerName]&&this[scrollerName].destroy()
				this[scrollerName]=null
			},
			initScroll(wrap_dom,outer_options={},dir='horizontal'){
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
			}
		}
	}
</script>

<style lang="scss">
	
</style>
<style lang="scss" scoped>
	.span-icon-one{
		display:inline-flex;
		height:50px;
		min-width:50px;
		border-radius:6px;
		justify-content:center;
		align-items:center;
		font-size:.620em;
		padding:2px;
	}

	.horizon-scroll-wrapper{
		position:relative;
		overflow:hidden;

		.horizon-scroll-content {
			white-space:nowrap;
			display: inline-block;
			padding: 0 35px 35px;
			
			.horizon-scroll-item{
				display:inline-block;
			}
		}
	}

	.layout-header{
		padding:30px;
		background-color:orange;

		.top-search{
			.location-wrap{
				display:flex;
				justify-content:center;
				align-items:center;

				span {
					display:inline-flex;
					align-items:center;

					i {
						margin-right:10px;
					}
				}
			}
		}

		.swipe-wrap{
			.swipe-body{
				height:375px;
				border-radius:15px;
				z-index:20;

				.swipe-item{
					background-color:blue;
					&:nth-child(odd){
						background-color:pink;
					}
				}
			}
		}
	}

	.layout-content{
		position:relative;
		top:-180px;

		&::before{
			content:"";
			display:block;
			height:200px;
			background-color:$color-basic-white;
			border-top-left-radius:180px 30px;
			border-top-right-radius:180px 30px;
		}

		.catalog-menu {
			font-size:40px;
			.icon-wrap {
				width:2em;
				height:2em;
				border-radius:50%;
				color:$color-basic-white;
				background-image:linear-gradient( 45deg, #B2FEFA, #0ED2F7, rgba(25,118,210,0) ), url(../../assets/images/bg-gradient.svg);
				background-size:cover;
				display:flex;
				justify-content:center;
				align-items:center;
				font-size:2em;
				margin-bottom:30px;
			}

			.icon-wrap-2{
				background-image:linear-gradient( 45deg, #24C6DC, #4776E6, rgba(25,118,210,0) ), url(../../assets/images/bg-gradient.svg);
			}

			.icon-wrap-3{
				background-image:linear-gradient( 45deg, #00c6ff, #0072ff, rgba(25,118,210,0) ), url(../../assets/images/bg-gradient.svg);
			}

			.item-text{
				font-size:.75em;
				font-weight:bold;
				color:$color-regular-text;
			}
		}

		.section-header{
			text-align:left;
			padding:30px 35px;

			.section-title{
				font-size:40px;
				font-weight:bold;
				margin:0;
			}
		}

		.public-course-part{
			&::before{
				content:"";
				display:block;
				height:20px;
				background-color:$color-border-three;
			}

			font-size:36px;

			.pc-scroll-wrapper{
				position:relative;
				overflow:hidden;
				
				.pc-scroll-content{
					white-space:nowrap;
					display: inline-block;
					padding: 0 35px 35px;

					.pc-scroll-item{
						display:inline-block;
						width:580px;
						//height:300px;
						overflow:hidden;

						&:not(:last-child){
							margin-right:20px;
						}

						::v-deep .bmc-card-body{
							padding:0;
						}

						::v-deep .pubilc-media{
							height:354px;
						}

						::v-deep .pubilc-info-wrap{
							padding:30px 15px;
							overflow-x: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
							font-size:1em;
							font-weight:bold;
							//color:$color-heavy-text;
						}
					}
				}
			}

		}

		.parent-course-part{
			&::before{
				content:"";
				display:block;
				height:20px;
				background-color:$color-border-three;
			}

			font-size:36px;

			.parent-scroll-wrapper{
				
				.parent-scroll-content{

					.parent-scroll-item{
						width:430px;
						overflow:hidden;

						&:not(:last-child){
							margin-right:20px;
						}

						::v-deep .bmc-card-body{
							padding:0;
						}

						::v-deep .parent-media{
							height:220px;
							border-top-right-radius:15px;
							border-top-left-radius:15px;
						}

						::v-deep .parent-info-wrap{
							padding:30px 15px;
							overflow-x: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
							font-size:1em;
							font-weight:bold;
							//color:$color-heavy-text;
						}
					}
				}
			}

		}

		.course-list{
			&::before{
				content:"";
				display:block;
				height:20px;
				background-color:$color-border-three;
			}

			.course-tabs{
				.tab-title{
					font-weight:bold;
				}

				.course-card{
					margin-bottom:40px;

					.qiu{
						border:3px solid $color-light-orange;
						color:$color-light-orange;
						background-color:transparent;
					}
				}
			}		
			
		}
	}
</style>

