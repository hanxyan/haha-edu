<template>
	<div class="page">
		<van-nav-bar 
		class="nav-bar"
		fixed
		@click-left="routerGoMixin(-1)">
			<template v-slot:left>
				<van-icon 
				class="nav-icon" 
				themePriamryColor
				name="arrow-left" 
				/>
			</template>
			<template v-slot:title>
				<div class="nav-title">
					<form action="/">
						<van-search 
						v-model="searchKV"
						background="none"
						class="nav-title-search"
						placeholder="搜索课程"
						shape='round'>
							<template v-slot:left-icon>
								<svg class="uficon" aria-hidden="true">
									<use xlink:href="#uficon-search"></use>
								</svg>
							</template>
						</van-search>
					</form>
				</div>
			</template>
			<template v-slot:right>
				<div class="nav-right-item">
					<span class="item-text">初一年级</span>
					<svg class="uficon nav-sort-icon" aria-hidden="true">
						<use xlink:href="#uficon-down-arrow"></use>
					</svg>
				</div>
			</template>
		</van-nav-bar>
		<section class="sort-container">			
			<!-- <van-grid
			:border="true"
			clickable
			class="sort-grid">
				<van-grid-item
				:class="{'choosed-category':sortCategory == 'subject'}"
				class="sort-item-wrap sort-item-subject"
				@click="chooseType('subject')">
					<div class="sort-item">
						<span class="sort-text">学科</span>
						<svg class="uficon sort-icon" aria-hidden="true">
							<use xlink:href="#uficon-down-arrow"></use>
						</svg>
					</div>
				</van-grid-item>
				<van-grid-item
				:class="{'choosed-category':sortCategory == 'season'}"
				class="sort-item-wrap">
					<div class="sort-item">
						<span class="sort-text">季节</span>
						<svg class="uficon sort-icon" aria-hidden="true">
							<use xlink:href="#uficon-down-arrow"></use>
						</svg>
					</div>
				</van-grid-item>
				<van-grid-item
				:class="{'choosed-category':sortCategory == 'campus'}"
				class="sort-item-wrap">
					<div class="sort-item">
						<span class="sort-text">校区</span>
						<svg class="uficon sort-icon" aria-hidden="true">
							<use xlink:href="#uficon-down-arrow"></use>
						</svg>
					</div>
				</van-grid-item>
				<van-grid-item
				:class="{'choosed-category':sortCategory == 'sift'}"
				class="sort-item-wrap">
					<div class="sort-item">
						<span class="sort-text">筛选</span>
						<svg class="uficon sort-icon" aria-hidden="true">
							<use xlink:href="#uficon-down-arrow"></use>
						</svg>
					</div>
				</van-grid-item>
			</van-grid> -->
			
			<van-dropdown-menu 
			:active-color="themePriamryColor"
			class="sort-menu">
				<van-dropdown-item 
				v-model="subjSelectedVal"
				:title="subjectDisplayTitle" 
				:options="subjOption" 
				class="normal-drop-item"
				ref="subjectDropdown"
				/>
				<van-dropdown-item 
				v-model="seasonSelectedVal"
				:title="seasonDisplayTitle" 
				:options="seasonOption" 
				class="normal-drop-item"
				ref="seasonDropdown"
				/>
				<van-dropdown-item 
				title="校区"
				class="campus-drop-item">
					<van-tree-select
					:items="campusItems"
					:active-id.sync="campusActiveIds"
					:main-active-index.sync="campusActiveIndex"
					class="campus-tree"
					/>
				</van-dropdown-item>
				<van-dropdown-item 
				title="筛选"
				class="filter-drop-item">
					<div class="filter-popup-content-wrap">
						<div class="filter-popup-content">
							<section class="filter-popup-unit">
								<h4 class="unit-title">班型选择</h4>
								<div class="unit-content">
									<span class="round-span">不限</span>
									<span class="round-span">卓越班</span>
									<span class="round-span">扬帆班</span>
									<span class="round-span">启蒙班</span>
									<span class="round-span">常规班</span>
									<span class="round-span">短训班</span>
								</div>
							</section>
							<section class="filter-popup-unit">
								<h4 class="unit-title">上课时间</h4>
								<div class="unit-content">
									<span class="round-span">不限</span>
									<span class="round-span">周一</span>
									<span class="round-span">周二</span>
									<span class="round-span">周三</span>
									<span class="round-span">周四</span>
									<span class="round-span">周五</span>
									<span class="round-span">周六</span>
									<span class="round-span">周日</span>
								</div>
							</section>
							<section class="filter-popup-unit">
								<van-cell 
								center
								class="unit-cell" 
								title="显示满班班级">
									<van-switch 
									v-model="checked" 
									size="1.5em"
									:active-color="themePriamryColor"
									/>
								</van-cell>
								<van-cell 
								center
								class="unit-cell" 
								title="隐藏校区报名">
									<van-switch 
									v-model="checked" 
									size="1.5em"
									:active-color="themePriamryColor"
									/>
								</van-cell>
							</section>
						</div>
						<div class="filter-popup-footer">
							<van-button 
							round 
							:color="themePriamryColor" 
							class="filter-btn"
							size="large" 
							plain>重置</van-button>
							<van-button 
							round 
							class="filter-btn"
							:color="themePriamryColor" 
							size="large">完成</van-button>
						</div>
					</div>
				</van-dropdown-item>
			</van-dropdown-menu>
		</section>
		<section class="course-list-part">
			<course-card
			title="小学五年级英语培训班"
			course-no="13152654725"
			time="周日 10:00-12:00"
			location="中关村7号楼2楼"
			duration="2019.09.07-2019.09.28"
			teacher-name="张小泉"
			profile-src="https://cn.vuejs.org/images/logo.png"
			:rate-value="4"
			prize="￥666"
			class="course-card">
				<template v-slot:title-icon>
					<span class="span-icon-one qiu mgr-20">秋</span>
				</template>
				<template v-slot:status>
					<van-button plain type="primary" size="small">增开</van-button>
				</template>
			</course-card>
			<course-card
			title="小学五年级英语培训班"
			course-no="13152654725"
			time="周日 10:00-12:00"
			location="中关村7号楼2楼"
			duration="2019.09.07-2019.09.28"
			status-text="剩余3人"
			teacher-name="曾小贤"
			:rate-value="4"
			prize="￥888">

			</course-card>
		</section>
	</div>
</template>

<script>
	import { NavBar, Icon, Search, Grid, GridItem, Button, DropdownMenu, DropdownItem, Popup, TreeSelect, Switch, Cell } from 'vant';
	import commonMixin from '@/libs/mixins/common.js'
	import courseCard from '@/components/course-card.vue';

	const THEME_PRIMARY='#3498db';
	const COMPONENT_NAME = 'course-list';

	export default {
		name: COMPONENT_NAME,
		components: {
			[NavBar.name]: NavBar,
			[Icon.name]: Icon,
			[Search.name]: Search,
			[Grid.name]: Grid,
			[GridItem.name]: GridItem,
			[Button.name]: Button,
			[DropdownMenu.name]: DropdownMenu,
			[DropdownItem.name]: DropdownItem,
			[Popup.name]: Popup,
			[TreeSelect.name]: TreeSelect,
			[Switch.name]: Switch,
			[Cell.name]: Cell,
			courseCard
		},
		mixins:[commonMixin],
		props:{},
		data(){
			return {
				themePriamryColor:THEME_PRIMARY,//主题色
				searchKV:'',
				sortCategory:'',//当前选中的排序分类
				showSubjectMenu:false,
				subjSelectedVal: 0,
				seasonSelectedVal: 'a',
				subjOption: [
				{ text: '不限', value: 0 },
				{ text: '数学', value: 1 },
				{ text: '语文', value: 2 },
				{ text: '英语', value: 3 },
				{ text: '物理', value: 4 },
				{ text: '化学', value: 5 }
				],
				seasonOption: [
				{ text: '不限', value: 'a' },
				{ text: '春季班', value: 'b' },
				{ text: '暑假班', value: 'c' },
				{ text: '秋季班', value: 'd' },
				{ text: '寒假班', value: 'e' },
				{ text: '春季上', value: 'f' }
				],
				campusActiveIds:12,
				campusActiveIndex:1,
				campusItems:[{
					text:'不限',
					children:[{
						text:'不限',
						id:1
					}]
				},{
					text:'青秀区',
					children:[{
						text:'青秀一校区',
						id:11
					},{
						text:'青秀二校区',
						id:12
					},{
						text:'青秀三校区',
						id:13
					}]
				},{
					text:'朝阳区',
					children:[{
						text:'朝阳一校区',
						id:21
					},{
						text:'朝阳二校区',
						id:22
					},{
						text:'朝阳三校区',
						id:23
					}]
				},{
					text:'江南区',
					children:[{
						text:'江南一校区',
						id:31
					},{
						text:'江南二校区',
						id:32
					},{
						text:'江南三校区',
						id:33
					}]
				}],
				checked:true
			}
		},
		computed: {
			subjectDisplayTitle(){
				if(this.subjSelectedVal===0){
					return '学科'
				}else{
					const match = this.subjOption.filter(option => option.value === this.subjSelectedVal);
					return match.length ? match[0].text : '';
				}
			},
			seasonDisplayTitle(){
				if(this.seasonSelectedVal==='a'){
					return '季节'
				}else{
					const match = this.seasonOption.filter(option => option.value === this.seasonSelectedVal);
					return match.length ? match[0].text : '';
				}
			}
		},
		watch: {},
		created () {},
		mounted () {},
		methods: {
			chooseType(type){
				if (this.sortCategory !== type) {
					this.sortCategory = type;
				}else{
					this.sortCategory = "";
				}
				switch(type){
					case 'subject':this.showSubjectMenu=true;break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	$distance-10:10px;
	$distance-20:20px;
	$distance-30:30px;
	$distance-40:40px;
	$nav-bar-height:135px;

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

	.round-span{
		display:inline-flex;
		justify-content:center;
		align-items:center;
		border:1px solid $color-light-text;
		color:$color-light-text;
		padding:8px 25px;
		border-radius:40px/50%;
		font-size:$font-size-base;
	}

	.page{
		h1, h2, h3, h4, h5, h6{
			margin:0;
			paddig:0;
		}
		.nav-bar{
			$font-size-medium:46px;

			height:$nav-bar-height;
			line-height:$nav-bar-height;

			::v-deep .van-nav-bar__title{
				margin-left:100px;
			}

			.nav-title{
				font-size:$font-size-medium;
				height:$nav-bar-height;
				display:flex;
				align-items:center;

				&-search{
					::v-deep .van-search__content--round{
						border-radius:40px;
						.van-cell{
							font-size:$font-size-base;
							line-height:1.8;
							color:$color-light-text;
							padding: 10px 16px 10px 5px;
						}
					}
				}
			}

			.nav-right-item{
				display:flex;
				align-items:center;

				.item-text{
					font-size:$font-size-base;
					color:$color-regular-text;
					margin-right:$distance-20;
				}
				.nav-sort-icon{
					font-size:26px;
					fill: $color-border-one;
				}
			}

			.nav-icon{
				font-size:$font-size-medium;
			}
		}

		.sort-container{
			margin-top:$nav-bar-height;
			position:relative;

			.sort-menu{
				height:120px;

				& ::v-deep .van-dropdown-menu__item:not(:first-child){
					.van-dropdown-menu__title{
						&::before{
							content: "|";
							position: absolute;
							top: 0;
							left: -40%;
							color:$color-border-two;
						}
					}
				}

				::v-deep .van-dropdown-menu__title{
					font-size:$font-size-base;
					line-height:1.3;

					&::after{
						right:-15px;
						border:9px solid;
						border-color: transparent transparent currentColor currentColor;
						//color:$color-border-two;
						margin-top:-12px;
					}
				}

				.normal-drop-item{
					::v-deep .van-cell{
						font-size:$font-size-base;
						line-height:1.3;
						padding: $distance-30 $distance-40;
					}
				}

				.campus-drop-item{
					.campus-tree{
						font-size:36px;
						::v-deep .van-sidebar-item{
							font-size:36px;
							line-height:1.3;
						}

						::v-deep .van-sidebar-item--select{
							border-color: $color-dark-blue;
						}

						::v-deep .van-tree-select__content{
							.van-tree-select__item--active{
								color: $color-dark-blue;
							}
						}
					}
				}

				.filter-drop-item{
					.filter-popup-content-wrap{
						padding:$distance-40;

						.filter-popup-content{
							margin-bottom:120px;
							.filter-popup-unit{
								font-size:$font-size-base;
								margin-bottom:$distance-40;
								.unit-title{
									margin-bottom:$distance-40;
									text-align:left;
								}

								.unit-content{
									display:flex;
									flex-wrap:wrap;
									.round-span{
										font-size:.8em;
										border-radius: 10em;
										margin-bottom:$distance-20;
										&:not(:last-child){
											margin-right:$distance-30;
										}
									}
								}

								.unit-cell{
									font-size:1em;
									line-height:1.5em;
									color:$color-regular-text;
									text-align:left;
									padding:$distance-20;
									//font-weight:bold;
								}
							}
						}

						.filter-popup-footer{
							padding:$distance-40;
							display:flex;
							justify-content:space-between;

							.filter-btn{
								height:110px;
								font-size:$font-size-base;
								line-height:2.5em;

								&:not(:last-child){
									margin-right:$distance-20;
								}
							}
						}
					}
					
				}
			}

			.sort-grid{
				.sort-item-wrap{
					&:not(:last-child){
						.sort-item{
							border-right:2px solid $color-border-two;
						}
					}

					.sort-item{
						display:flex;
						justify-content:center;
						align-items:center;
						width:100%;
						
						.sort-text{
							font-size:$font-size-base;
							color:$color-regular-text;
							margin-right:$distance-20;
						}

						.sort-icon{
							transition: all 0.3s;
							fill: $color-border-one;
							width:26px;
						}
					}
				}

				.choosed-category{
					.sort-item{
						.sort-text{
							color: $color-dark-blue;
						}

						.sort-icon{
							transform: rotate(180deg);
							fill: $color-dark-blue;
						}
					}
				}
			}

			.menu-container{
				position:fixed;
				top:150px;
				bottom:0;
				left:0;
				right:0;
				z-index:10;
				overflow:hidden;
			}
		}



		.course-list-part{
			padding:$distance-30;
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
</style>