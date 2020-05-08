<template>
	<div>
		<section class="layout-header">
			
		</section>
		<section class="layout-show">
			<section class="nav-tab-part">
				<div class="nav-tab-wrap">
					<van-grid
					:border="false"
					class="nav-tab">
						<van-grid-item
						v-for="(item,index) in navInfo"
						:key="index">
							<div class="nav-tab-item flex-col-stre-start">
								<div :class="['icon-wrap','icon-wrap-'+(index+1)]">
									<svg class="uficon" aria-hidden="true">
										<use :xlink:href="item.icon"></use>
									</svg>
								</div>
								<span class="item-text">{{item.text}}</span>
							</div>
						</van-grid-item>
					</van-grid>
				</div>
			</section>
		</section>
		<section class="layout-content">
			<section class="course-display-part">
				<van-cell
				class="section-header"
				size="large"
				:border="false"
				is-link 
				to="me">
					<template v-slot:title>
						<h3 class="section-title">我的课程</h3>
					</template>
				</van-cell>
				<div ref="courseDisWrapper" class="horizon-scroll-wrapper cd-scroll-wrapper">
					<div class="horizon-scroll-content cd-scroll-content">
						<base-media-card
						v-for="(item,index) in parentCourse"
						:key="index"
						class="horizon-scroll-item cd-scroll-item"
						media-class="cd-media"
						content-class="cd-info-wrap"
						media-style="'background-clip':'content-box'"
						>
							<template v-slot:media>
								<div class="cd-media-img" :style="{background:'url('+item.cover+') center center / cover no-repeat',height:'100%'}">
									
								</div>
							</template>
							{{item.title}}
						</base-media-card>
					</div>
				</div>
			</section>
			<section class="course-calendar-part">
				<van-cell
				class="section-header"
				size="large"
				:border="false">
					<template v-slot:title>
						<span :class="['section-title',{active:showYMPicker}]" @click="showYMPicker=true">{{yearMonthTitle}}</span>
					</template>
					<template v-slot:right-icon>
						<span class="icon-round" @click="backToTodayEvt">
							今
						</span>
					</template>
				</van-cell>
				<van-popup
				v-model="showYMPicker"
				position="bottom">
					<van-datetime-picker 
					:value="selectedDate"
					ref="yearMonthPicker"
					type="year-month"
					:formatter="formatter"
					@confirm="ympConfirmEvt"
					@cancel="ympCancelEvt"
					/>
				</van-popup>
				<div ref="calendarWrapper" class="horizon-scroll-wrapper calendar-scroll-wrapper">
					<div 
					class="horizon-scroll-content calendar-scroll-content"
					:style="{transform:'translateX(-'+activeDate*11.111+'vw) translateY(0px) translateZ(0px)'}">
						<div 
						v-for="(item,index) in curMonDaysInfo"
						:key="index"
						:class="['horizon-scroll-item','calendar-item-wrap',{'selected':selectedDate.format('YYYY-MM-DD')===item.date}]"
						@click="dateClickEvt(item.date)">
							<div class="calendar-item">
								<span class="weekday">{{item.weekday}}</span>
								<span class="dayno">{{item.no}}</span>
								<span class="course-tag">{{item.classNum}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="cal-course-panel">
					<van-cell 
					:title="`以下是您9月2日（周一）的课程`" 
					title-class="cal-course-tip"
					size="large" 
					/>
					<div class="course-card-container">
						<course-card
						title="小学五年级英语培训班"
						time="周日 10:00-12:00"
						location="西校园2号楼3楼"
						teacher-name="黄明泉"
						profile-src="https://cn.vuejs.org/images/logo.png"
						:location-foot="true"
						classroom="教室分配中"
						class="course-card">
							<template v-slot:title-icon>
								<span class="span-icon-one qiu mgr-20">秋</span>
							</template>
							<div class="flex-btw-center">
								<span class="time">周一15:50-17:50</span>
								<span class="periods">第3课/共10课</span>
							</div>
						</course-card>
						<course-card
						title="小学五年级数学辅导班"
						time="周日 8:00-10:00"
						location="西校园2号楼3楼"
						teacher-name="黄明明"
						profile-src="https://cn.vuejs.org/images/logo.png"
						:location-foot="true"
						classroom="教室分配中"
						class="course-card">
							<template v-slot:title-icon>
								<span class="span-icon-one qiu mgr-20">秋</span>
							</template>
							<div class="flex-btw-center">
								<span class="time">周一15:50-17:50</span>
								<span class="periods">第3课/共10课</span>
							</div>
						</course-card>
					</div>
				</div>
			</section>
		</section>
		<section class="layout-footer"></section>
	</div>
</template>

<script>
	import { Grid, GridItem, Cell, Popup, DatetimePicker } from 'vant';
	import moment from 'moment';
	moment.locale('zh-cn');
	// import BScroll from 'better-scroll';
	import bsMixin from '@/libs/mixins/better-scroll.js';
	import baseMediaCard from '@/components/base-media-card.vue';
	import courseCard from '@/components/course-card.vue';
	import COURSE_FILL_IMG from '@/assets/images/course.png'

	const COMPONENT_NAME = 'my-course'

	export default {
		name: COMPONENT_NAME,
		components: {
			[Grid.name]: Grid,
			[GridItem.name]: GridItem,
			[Cell.name]: Cell,
			[Popup.name]: Popup,
			[DatetimePicker.name]: DatetimePicker,
			baseMediaCard,
			courseCard
		},
		mixins:[bsMixin],
		props:{},
		data(){
			return {
				activeDate:new Date().getDate(),
				currentDate:moment(),//当天
				selectedDate:moment(),
				showYMPicker:false,//是否显示年月日期选择弹框
				navInfo:[{
					icon:'#uficon-notebook',
					text:'课程表',
					to:'login'
				},{
					icon:'#uficon-teach',
					text:'在线课堂',
					to:'me'
				},{
					icon:'#uficon-yishu',
					text:'本地课程',
					to:'message'
				},{
					icon:'#uficon-yishu',
					text:'常见问题',
					to:'message'
				}],
				parentCourse:[{
					cover:COURSE_FILL_IMG,
					title:'新学期必备锦囊请接收',
					to:''
				},{
					cover:COURSE_FILL_IMG,
					title:'初一数学',
					to:''
				},{
					cover:COURSE_FILL_IMG,
					title:'初一语文',
					to:''
				},{
					cover:COURSE_FILL_IMG,
					title:'初一英语',
					to:''
				}]//
			}
		},
		computed: {
			// 当前月份或选中月份的信息
			curMonDaysInfo(){
				let dateVal=this.selectedDate.format('YYYY-MM-DD');
				return this.monthDayInfo(dateVal);
			},
			// 当月天数
			monthDaysNum(){
				return this.selectedDate.daysInMonth(); // 获取当月天数
			},
			// 显示的年月
			yearMonthTitle(){
				return this.selectedDate.format("YYYY年MM月");
			}
		},
		watch: {},
		created () {},
		mounted () {
			this.calendarScroll=this.initScrollMixin('calendarWrapper');
			this.cosDisScoll=this.initScrollMixin('courseDisWrapper');
		},
		beforeDestroy() {
			this.destroyScrollMixin('calendarScroll');
			this.destroyScrollMixin('cosDisScoll');
		},
		methods: {
			backToTodayEvt(){
				this.selectedDate=this.currentDate;
			},
			dateClickEvt(cal_item){
				this.selectedDate=moment(cal_item);
			},
			ympCancelEvt(){
				// 关闭日期选择
				this.showYMPicker=false;
			},
			// 年月选择确定按钮点击事件
			ympConfirmEvt(value){
				// let that=this;
				// 设置日期为选中年月的1号
				this.selectedDate=moment(value);
				// 关闭日期选择
				this.showYMPicker=false;
			},
			monthDayInfo(date){
				const currentDate=moment(date);
				// const currentWeekday = moment(date).date(1).weekday(); // 获取当月1日为星期几
				const currentMonthDays = moment(date).daysInMonth(); // 获取当月天数
				let daysInfoArray=[];
				for(let i=1;i<=currentMonthDays;i++){
					let weekdaysInfo=['周一','周二','周三','周四','周五','周六','周日']
					let day={
						date:currentDate.date(i).format('YYYY-MM-DD'),
						weekday:weekdaysInfo[currentDate.date(i).weekday()],
						no:i,
						classNum:'2节课'
					}
					daysInfoArray.push(day);
				}
				return daysInfoArray;
			},
			getWeekDay(dateNo){
				let d=new Date(2019,8,dateNo);
				let day=d.getDay();
				let out_val;
				switch(day){
					case 0 :out_val=`日`;break;
					case 1 :out_val=`一`;break;
					case 2 :out_val=`二`;break;
					case 3 :out_val=`三`;break;
					case 4 :out_val=`四`;break;
					case 5 :out_val=`五`;break;
					case 6 :out_val=`六`;break;
					default:out_val='';
				}
				return out_val;
			},
			formatter(type, value){
				if (type === 'year') {
					return `${value}年`;
				}else if (type === 'month') {
					return `${value}月`
				}

				return value;
			}
		}
	}
</script>

<style lang="scss" scoped>
	$normal-distance:30px;
	$distance-20:20px;

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
		height:240px;
		background-image:linear-gradient( 45deg, $color-light-blue,$color-dark-blue, rgba(25,118,210,0) ), url(../../assets/images/bg-gradient.svg);
		background-size:cover;		
	}

	.layout-show{
		position:relative;
		font-size:40px;

		.nav-tab-part{
			position:absolute;
			top:-150px;
			width:100%;
			padding:0 $normal-distance;
			box-sizing:border-box;
			z-index:5;

			.nav-tab-wrap{
				box-shadow: 4px 3px 7px 2px rgba(0, 0, 0, 0.04);
				border-radius: 20px;
				border:2px solid $color-border-two;
				padding:$normal-distance;
				background-color:$color-basic-white;

				.nav-tab{
					.nav-tab-item{
						.icon-wrap{
							font-size:2em;
							margin-bottom:$distance-20;
							color:$color-dark-blue;
						}

						.item-text{
							font-size:.9em;
						}
					}
				}
			}
		}
	}

	.layout-content{	
		margin-top:200px;	
		.section-header{
			text-align:left;
			padding:30px 35px;

			.section-title{
				font-size:40px;
				font-weight:bold;
				margin:0;
			}
		}

		.course-display-part{
			//&::before{
				//content:"";
				//display:block;
				//height:20px;
				//background-color:$color-border-three;
			//}

			font-size:36px;

			.cd-scroll-wrapper{
				
				.cd-scroll-content{

					.cd-scroll-item{
						width:870px;
						overflow:hidden;

						&:not(:last-child){
							margin-right:30px;
						}

						::v-deep .bmc-card-body{
							padding:0;
						}

						::v-deep .cd-media{
							height:490px;
							padding:30px;
							border:5px solid $color-border-three;
							background-clip:content-box;
						}

						::v-deep .cd-info-wrap{
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

		.course-calendar-part{
			font-size:40px;
			.section-header{
				.section-title{
					&::after{
						content:'>';
						margin-left:15px;
						display:inline-block;
					}
				}

				.active{
					&::after{
						//transform:rotate(90deg);
						content:"_(¦3」∠)_";
					}
				}

				.icon-round{
					display:inline-flex;
					justify-content:center;
					align-items:center;
					font-size:35px;
					width:55px;
					height:55px;
					border-radius:50%;
					border:1px solid $color-dark-blue;
					color:$color-dark-blue;
				}
			}

			.calendar-scroll-wrapper{
				.calendar-scroll-content{
					.calendar-item-wrap{
						width:100px;
						min-height:100px;
						padding:20px;
						border:1px solid $color-dark-blue;
						border-radius:10px;

						&:not(:last-child){
							margin-right:20px;
						}

						.calendar-item{
							display:flex;
							flex-direction:column;
							justify-content:center;
							height:100%;
							//border:1px solid $color-dark-blue;
							//border-radius:10px;
							.weekday,.dayno{
								font-weight:bold;
							}
							.weekday{
								font-size:.75em;
								margin-bottom:10px;
							}

							.dayno{
								font-size:1em;
							}

							.course-tag{
								font-size:.5em;
								color:$color-light-text;
							}
						}
					}

					.selected{background-color:rgba(52,152,219,.3)}
				}
			}

			.cal-course-panel{
				font-size:40px;
				.cal-course-tip{
					text-align:left;
					font-size:30px;
					color:$color-light-text;
				}

				.course-card-container{
					padding:$normal-distance;
					.course-card{
						margin-bottom:40px;

						.qiu{
							border:3px solid $color-light-orange;
							color:$color-light-orange;
							background-color:transparent;
						}

						.time{
							font-size:1.5em;
							font-weight:bolder;
						}

						.periods{
							font-size:.75em;
							color:$color-light-text;
						}
					}
				}
			}
			
		}
	}
</style>