<template>
	<div @click="handleCardClick">
		<base-card card-class="card">
			<div class="cc-header">
				<slot name="title-icon">
					<van-icon class="title-icon" :name="titleIcon?titleIcon:'notes-o'" />
				</slot>
				<slot name="title">
					<h3>{{title}}</h3>
				</slot>
			</div>
			<div class="cc-content">
				<slot>
					<div v-if="courseNo" class="row">
						<van-icon class="item-icon" name="label" />
						<span>{{courseNo}}</span>
					</div>
					<div v-if="time" class="row">
						<van-icon class="item-icon" name="bell" />
						<span>{{time}}</span>
					</div>
					<div v-if="location" class="row">
						<van-icon class="item-icon" name="location" />
						<span>{{location}}</span>
					</div>
					<div class="flex-btw-center row">
						<span class="duration">{{duration}}</span>
						<slot name="status">
							<span :class="statusClasses">
								{{statusText}}
							</span>
						</slot>
					</div>
				</slot>
			</div>
			<div v-if="showTeacher||prize" class="cc-footer flex-btw-center">
				<div v-if="showTeacher" class="flex-start-center teacher-info">
					<div class="profile-pic">
						<slot name="profile-pic">
							<van-image 
							class="profile-pic"
							round
							:src="profileSrc?profileSrc:teacherProfilePic"
							/>
						</slot>
					</div>
					<div class="pofile-info">
						<div class="pofile-info-name">{{teacherName}}</div>
						<div class="rate-wrap flex-btw-center" v-if="rateValue">
							<van-rate 
							:value="innerRate" 
							size="1.2em"
							color="#36d7b7"
							@change="rateChangeEvt"
							/>
							<span class="rate-val">{{Number(innerRate).toFixed(1)}}</span>
						</div>
					</div>
					<span class="decorate-line" v-show="locationFoot||classroom">|</span>
					<div class="flex-col-stre-start foot-address" v-if="locationFoot||classroom">
						<div v-if="locationFoot" class="flex-start-center">
							<van-icon class="item-icon" name="location" />
							<span>{{location}}</span>
						</div>
						<div v-if="classroom" class="flex-start-center">
							<van-icon class="item-icon" name="more" />
							<span>{{classroom}}</span>
						</div>
					</div>
				</div>
				<div class="prize" v-if="prize">
					{{prize}}
				</div>
			</div>
		</base-card>
	</div>
</template>

<script>
	import baseCard from '@/components/base-card.vue';
	import { Icon, Cell, Button, Image, Rate } from 'vant';
	import TEACHER_PROFILE_PIC from '@/assets/images/teacher.png';

	const COMPONENT_NAME = 'course-card'
	const EVENT_RATE_CHANGE='rate-change'
	const EVENT_CLICK = 'click'

	export default {
		name: COMPONENT_NAME,
		components: {
			baseCard,
			[Icon.name]: Icon,
			[Cell.name]: Cell,
			[Button.name]: Button,
			[Image.name]: Image,
			[Rate.name]: Rate
		},
		props:{
			titleIcon:String,
			title:String,
			courseNo:String,
			time:String,
			location:String,
			locationFoot:{
				type:Boolean,
				default:false
			},
			duration:{
				type:String,
				default:''
			},
			statusText:{
				type:String,
				default:''
			},
			statusClass:{},
			profileSrc:{
				type:String,
				default:''
			},
			rateValue:{
				type:Number,
				default:0
			},
			showTeacher:{
				type:Boolean,
				default:true
			},
			teacherName:{
				type:String,
				default:''
			},
			classroom:{
				type:String,
				default:''
			},
			prize:{
				type:String,
				default:''
			}
		},
		data(){
			return {
				teacherProfilePic:TEACHER_PROFILE_PIC,
				innerRate:this.rateValue
			}
		},
		computed: {
			statusClasses(){
				return [`status`,this.statusClass]
			}
		},
		watch:{
			rateValue(val){
				if (val !== this.innerRate) {
					this.innerRate=val;
				}
			}
		},
		methods:{
			rateChangeEvt(cur){
				this.$emit(EVENT_RATE_CHANGE,cur);
			},
			handleCardClick(){
				this.$emit(EVENT_CLICK);
			}
		}
	}
</script>

<style lang="scss">
	.card{
		padding:10px;
		box-shadow: 4px 3px 7px 2px rgba(0, 0, 0, 0.04);
		border-radius: 20px;
		border:2px solid $color-border-two;
	}

	.cc-header{
		display:flex;
		align-items: center;
		font-size:50px;

		.title-icon{
			font-size:50px;
			margin-right:20px;
		}

		h3{
			font-size:44px;
			margin:29px 0;
			//line-height: 44px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}

	.cc-content{
		text-align:left;
		padding-bottom:15px;

		.row{
			padding:17px 0;
			font-size:40px;

			.item-icon{
				color:$color-light-text;
				font-size:42px;
				margin-right:29px;
			}

			.duration{
				color:$color-light-text;
			}

			.status{
				font-size:34px;
			}

		}
	}

	.cc-footer{
		border-top:2px solid $color-border-two;
		padding: 25px 0;
		font-size:36px;

		.teacher-info {
			.profile-pic{
				width:82px;
				height:82px;
				margin-right:20px;
			}

			.pofile-info{
				text-align:left;
				font-size:1em;
			}

			&-name {
				margin-bottom:10px;
			}

			.rate-wrap{
				.rate-val{
					margin-left:20px;
					color:$color-light-text;
				}
			}
		}

		.decorate-line{
			margin-left:20px;
			color:$color-border-two;
		}

		.foot-address{
			text-align:left;
			margin-left:20px;

			.item-icon{
				color:$color-light-text;
				font-size:42px;
				margin-right:20px;
			}
		}

		.prize{
			color:#f13232;
			font-weight:bolder;
			font-size:1.1em;
		}
		
	}
</style>