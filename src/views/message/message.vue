<template>
	<div>
		<section class="layout-content">
			<van-tabs 
			v-model="activeTab" 
			sticky 
			class="tabs" 
			swipeable
			:color="themePriamryColor"
			:title-active-color="themePriamryColor"
			:title-inactive-color="regularTextColor">
				<van-tab>
					<template v-slot:title>
						<div class="tab-title">
							系统通知
						</div>
					</template>
					<template v-if="login">
						<template v-if="sysList.length>0">
							<base-msg-card
							v-for="(item,index) in sysList"
							:key="index"
							:title="item.title"
							class="msg-card">
								{{item.content}}
							</base-msg-card>
						</template>
						<template v-else>
							<base-msg-card
							
							v-for="n in 5"
							:key="n"
							title="系统公告"
							class="msg-card">
								哈哈教育，为6-18岁孩子提供小初高全学科课程辅导。课程历经十余年教学沉淀，陪伴千万孩子成长，是您值得信任的好伙伴。
							</base-msg-card>
						</template>
						
					</template>
					<template v-else>
						<div class="default-wrap">
							<div class="defalut-header">
								<van-image
								width="10em"
								height="10em"
								fit="cover"
								:src="defaultNoMsg"
								/>
							</div>
							<div class="default-content">
								暂无消息，登录查看
							</div>
							<div class="default-footer">
								<van-button 
								round 
								class="login-btn"
								:color="themePriamryColor"
								to="/login">立即登录</van-button>
							</div>
						</div>
					</template>
				</van-tab>
				<van-tab>
					<template v-slot:title>
						<div class="tab-title">
							课程提醒
						</div>
					</template>
					<template v-if="login">
						<base-msg-card
						v-for="n in 3"
						:key="n"
						title="课程提醒"
						class="msg-card">
							您订购的数学辅导短训班第一节课将于明天（2019年9月11号）早上9点在西校区紫荆花1号教室开课，请准备好需要的书本资料等按时参加哦。
						</base-msg-card>
					</template>
					<template v-else>
						<div class="default-wrap">
							<div class="defalut-header">
								<van-image
								width="10em"
								height="10em"
								fit="cover"
								:src="defaultNoMsg"
								/>
							</div>
							<div class="default-content">
								暂无消息，登录查看
							</div>
							<div class="default-footer">
								<van-button 
								round 
								class="login-btn"
								:color="themePriamryColor"
								to="/login">立即登录</van-button>
							</div>
						</div>
					</template>
				</van-tab>
				<van-tab>
					<template v-slot:title>
						<div class="tab-title">
							在线客服
						</div>
					</template>

				</van-tab>
			</van-tabs>
		</section>
	</div>
</template>

<script>
	import { Tab, Tabs, Image, Button, PullRefresh } from 'vant';
	import baseMsgCard from '@/components/base-message-card.vue';
	import { mapState } from 'vuex'
	import { THEME_PRIMARY, THEME_LIGHT_BLUE, REGULAR_TEXT_COLOR, DEFAULT_NO_MSG } from '@/libs/constant.js';
	import { systemMsgList as fetchSystemMsgList } from '@/api/base'

	const COMPONENT_NAME = 'message-index'

	export default {
		name: COMPONENT_NAME,
		components: {
			[Tab.name]: Tab,
			[Tabs.name]: Tabs,
			[Image.name]: Image,
			[Button.name]: Button,
			[PullRefresh.name]: PullRefresh,
			baseMsgCard
		},
		mixins:[],
		props:{},
		data(){
			return {
				activeTab:0,
				themePriamryColor:THEME_PRIMARY,//主题色
				themeLightColor:THEME_LIGHT_BLUE,//浅主题色
				regularTextColor:REGULAR_TEXT_COLOR,//常规字体颜色
				defaultNoMsg:DEFAULT_NO_MSG,//消息缺省填充图片
				sysList:[]
			}
		},
		computed: {
			...mapState([
				'userInfo',
				'login'
			]),
		},
		watch: {
			userInfo: function (value) {
				if (value && value.user_id && !this.sysList) {
					this.intialSystemMsg();
				}
			}
		},
		created () {},
		mounted () {
			this.intialSystemMsg();
		},
		beforeDestroy() {},
		methods: {
			// 获取初始系统通知信息
			async intialSystemMsg(){
				if(!this.login||!this.userInfo||!this.userInfo.user_id){
					return;
				}

				await fetchSystemMsgList(this.userInfo.user_id,1,this.userInfo.user_id.charAt(this.userInfo.user_id.length-1)).then((res)=>{
					this.sysList=res.data.rows;
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	$normal-distance-30:30px;
	.layout-content{
		font-size:40px;

		.tabs{
			padding:$normal-distance-30;

			::v-deep .van-tabs__wrap{
				$tab-bar-height:120px;
				height:$tab-bar-height;

				.van-tab{
					line-height:$tab-bar-height;
				}
			}

			.tab-title{
				font-size:40px;
			}

			.default-wrap{
				margin-top:200px;
				.defalut-header{
					@include flex-cet-cet;
				}
				.default-content{
					color:$color-light-text;
				}
				.default-footer{
					padding:$normal-distance-30;
					.login-btn{
						padding:0 40px;
						font-size:$font-size-base;
						line-height:2.8em;
						height:2.8em;
					}
				}
			}

			.msg-card{
				box-shadow: 4px 3px 7px 2px rgba(0, 0, 0, 0.04);
				border-radius: 20px;
				border:2px solid $color-border-two;
				margin-bottom:$normal-distance-30;

				&:first-child{
					margin-top:$normal-distance-30;
				}
			}
		}
	}
</style>