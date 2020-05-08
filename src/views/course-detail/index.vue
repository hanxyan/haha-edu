<template>
	<div class="page">
		<van-nav-bar 
		class="nav-bar"
		fixed
		@click-left="routerGoMixin(-1)">
			<template v-slot:title>
				<span class="nav-title">课程详情</span>
			</template>
			<van-icon 
			class="nav-icon"
			:color="themePriamryColor" 
			name="share" 
			slot="right" 
			/>
			<van-icon 
			class="nav-icon" 
			themePriamryColor
			name="arrow-left" 
			slot="left" />
		</van-nav-bar>
		<section class="course-basic-part">
			<div class="flex-start-center cb-header">
				<span class="span-icon-one qiu">语</span>
				<h1 class="cb-title">【秋季腾飞班】高一语文辅导</h1>
			</div>
			<div class="cb-content">
				<div class="row">9月7日-12月28日每周六15:30-17:45</div>
				<div class="row">
					<span>难度:</span>
					<span class="rate-wrap">
						<van-rate 
						:value="4" 
						size="1em"
						color="#36d7b7"
						/>
					</span>
				</div>
				<div class="row">
					地点:
					<span class="location">
						丰台东高地万源路
					</span>
				</div>
				<!-- <div>
					课程有效期:
					<span>
						2019-05-23至2022-11-30
					</span>
				</div> -->
			</div>
		</section>
		<section class="course-extral-part">
			<van-cell
			class="ce-cell"
			center
			is-link>
				<div class="ce-cell-content">
					服务<span class="cell-value">在线课堂 学情反馈 随时看回放 课程提醒</span>
				</div>
			</van-cell>
			<van-cell
			class="ce-cell"
			center
			is-link>
				<div class="ce-cell-content">
					声明<span class="cell-value">退费须知 上课设备 购课提醒</span>
				</div>
			</van-cell>
		</section>
		<section class="teacher-display-part">
			<h2 class="section-header">授课老师</h2>
			<div class="td-content">
				<van-cell
				v-for="(item,index) in 2"
				:key="index"
				class="td-cell"
				center
				is-link>
					<div class="flex-start-center td-cell-content">
						<div class="profile-pic-wrap">
							<van-image 
							class="profile-pic"
							round
							src="https://oot.xesimg.com/web/2017/11/22/15113382042886.png"
							/>
						</div>
						<div class="profile-info">
							<div class="name-wrap">授课老师:<span class="name">黄河</span></div>
							<div class="time-wrap">9月7日-12月28日每周六15:30-17:45</div>
						</div>
					</div>
				</van-cell>
			</div>
		</section>
		<section class="curriculum-part">
			<van-cell
			class="curr-section-header"
			size="large"
			:border="false"
			is-link 
			to="index">
				<template v-slot:title>
					<h3 class="section-title">课程大纲(<span>15课时</span>)</h3>
				</template>
				<span class="curr-section-value">查看所有</span>
			</van-cell>
			<div class="curr-content">
				<div 
				v-for="n in 3"
				:key="n"
				class="flex-start-center curr-item">
					<div class="item-index">{{n}}</div>
					<div class="c-flex-1 item-info-wrap">
						<div class="curr-title">【高联习题】精选精讲{{n}}</div>
						<div class="curr-time">09月1{{n}}日 19:00-21:00</div>
						<div class="curr-teacher-wrap">授课老师:<span class="curr-teacher">黄小河</span></div>
					</div>
					<div class="curr-item-status">未开始</div>
				</div>
			</div>
		</section>
		<section class="course-intro-part">
			<h2 class="section-header">课程简介</h2>
			<div class="ci-content-wrap">
				<iframe width="100%" id="iframeId" height="100%" frameborder="0" scrolling="no" src="https://zt.xueersi.com/xueke/zj/2019qj/yy_c1_qs/?id=46&amp;v=84"></iframe>
			</div>
		</section>
		<section class="foot-bar">
			<van-row type="flex" justify="space-between" style="height:100%;">
				<van-col span="16" class="flex-col-stre-start prize-wrap">
					<span class="prize">300</span>
					<span class="origin-prize-wrap">原价:<span class="origin-prize">1200</span></span>
				</van-col>
				<van-col span="8">
					<van-button square class="purchase-btn" block color="#ee1a1a" type="primary" size="large">购买</van-button>
				</van-col>
			</van-row>
		</section>
	</div>
</template>

<script>
	import { NavBar, Icon, Rate, Cell, CellGroup, Image, Sticky, Row, Col, Button } from 'vant';
	// import courseCard from '@/components/course-card.vue';
	import commonMixin from '@/libs/mixins/common.js'

	const THEME_PRIMARY='#3498db';
	const COMPONENT_NAME = 'course-detail';

	export default {
		name: COMPONENT_NAME,
		components: {
			[NavBar.name]: NavBar,
			[Icon.name]: Icon,
			[Rate.name]: Rate,
			[Cell.name]: Cell,
			[CellGroup.name]: CellGroup,
			[Image.name]: Image,
			[Sticky.name]: Sticky,
			[Row.name]: Row,
			[Col.name]: Col,
			[Button.name]: Button
		},
		mixins:[commonMixin],
		props:{},
		data(){
			return {
				themePriamryColor:THEME_PRIMARY//主题色
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
	$distance-10:10px;
	$distance-20:20px;
	$distance-30:30px;
	$distance-40:40px;
	$nav-bar-height:135px;
	$foot-bar-height:160px;

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

	.qiu{
		border:3px solid $color-light-orange;
		color:$color-light-orange;
		background-color:transparent;
	}

	.page{
		font-size:$font-size-base;

		.course-extral-part,
		.course-extral-part,
		.teacher-display-part,
		.curriculum-part,
		.course-intro-part{
			&::before{
				content:"";
				display:block;
				height:$distance-20;
				background-color:$color-border-three;
			}
		}

	}

	.nav-bar{		
		$font-size-medium:46px;

		height:$nav-bar-height;
		line-height:$nav-bar-height;

		.nav-title{
			font-size:$font-size-medium;
			font-weight:bold;
		}

		.nav-icon{
			font-size:$font-size-medium;
		}
	}

	.course-basic-part{
		padding:$distance-40;
		margin-top:$nav-bar-height;

		.cb-header{
			.span-icon-one{
				font-size:.75em;
			}

			.cb-title{
				margin:0;
				font-size:1.3em;
			}
		}

		.cb-content{
			text-align:left;

			.row{
				margin-top:$distance-40;
				@include flex-base;

				.rate-wrap{
					display:inline-block;
					font-size:.9em;
					height:1em;
					margin-left:$distance-20;
				}

				.location{
					margin-left:$distance-20;
				}
			}
		}
	}

	.course-extral-part{
		.ce-cell{
			padding:$distance-40;
			&-content{
				font-size:$font-size-base;
				line-height:1;
				color:$color-light-text;
				padding:$distance-10 0;

				.cell-value{
					margin-left:$distance-20;
					color:$color-regular-text;
				}
			}
		}
	}

	.section-header{
		margin:$distance-40;
		font-size:1em;
	}

	.teacher-display-part{
		text-align:left;

		.td-content{
			padding:0 $distance-40 $distance-40;

			.td-cell{
				padding:$distance-40;
				background-color:$color-border-four;

				&:not(:last-child){
					margin-bottom:$distance-20;
				}

				.td-cell-content{
					.profile-pic-wrap{
						width:110px;
						height:110px;
						border-radius:50%;
						margin-right:$distance-20;
					}

					.profile-info{
						font-size:$font-size-base;
						line-height:1.3;

						.name-wrap{
							margin-bottom:$distance-10;
							color:$color-heavy-text;
						}

						.time-wrap{
							color:$color-light-text;
						}
					}
				}
			}
		}
	}

	.curriculum-part{
		text-align:left;

		.curr-section-header{
			padding:$distance-40;

			.section-title{
				font-size:$font-size-base;
				font-weight:bold;
				margin:0;
			}

			.curr-section-value{
				font-size:36px;
			}
		}

		.curr-content{
			padding:0 $distance-40 $distance-40;

			.curr-item{
				padding:$distance-20 0;
				&:not(:last-child){
					margin-bottom:$distance-20;
					border-bottom:1px solid $color-border-three;
				}
				.item-index{
					margin-right:$distance-40;
					padding:$distance-30;
				}
				.item-info-wrap{
					line-height:1.5em;
					font-size:.9em;
					.curr-title{
						
					}

					.curr-time,
					.curr-teacher-wrap{
						color:$color-light-text;
					}
				}

				.curr-item-status{
					color:$color-light-text;
					font-size:.9em;
				}
			}
		}
	}

	.course-intro-part{
		text-align:left;
		margin-bottom:$foot-bar-height;

		.ci-content-wrap{
			padding:0 $distance-40 $distance-40;

			iframe{
				border:none;
				height: 4680px;
			}
		}
	}

	.foot-bar{
		position:fixed;
		bottom:0;
		left:0;
		width:100%;
		box-sizing: border-box;
		height:$foot-bar-height;
		background:$color-basic-white;
		border-top:2px solid $color-border-three;

		.prize-wrap{
			text-align:left;
			padding:$distance-20 $distance-40;

			.prize{
				font-size:1.8em;
				color:$color-dark-red;
				font-weight:bold;

				&::before{
					content:"￥";
					font-size:.6em;
				}
			}
			
			.origin-prize-wrap{
				font-size:.9em;
				.origin-prize{
					text-decoration:line-through;
					&::before{
						content:"￥";
					}
				}
			}
			
		}

		.purchase-btn{
			height:100%;
			font-size:1.3em;
		}
	}
</style>