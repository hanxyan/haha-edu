<template>
	<div>
		<base-card body-class="bmsgc-card-body" class="bmsgc-card">
			<template v-slot:header>
				<van-row type="flex" justify="space-between" class="bmsgc-header">
					<van-col span="12" class="title-wrap">
						<h2 class="title">{{title}}</h2>
					</van-col>
					<van-col span="12" class="subtitle-wrap">2019-06-17 24:00:00</van-col>
				</van-row>
			</template>
			<!-- <div :class="contentClasses">
				<slot></slot>
			</div> -->
			<slot></slot>
		</base-card>
	</div>
</template>

<script>
	import { Row, Col } from 'vant';
	import baseCard from '@/components/base-card.vue';

	const COMPONENT_NAME = 'base-message-card'

	export default {
		name: COMPONENT_NAME,
		components: {
			[Row.name]: Row,
			[Col.name]: Col,
			baseCard
		},
		props: {
			// contentClass:{}
			title:{
				type:String,
				default:''
			}
		},
		data() {
			return {

			}
		},
		computed: {
			// contentClasses(){
			// 	return [`bmsgc-content`,this.contentClass]
			// }
		},
		watch:{},
		methods:{}
	}
</script>

<style lang="scss">
	.bmsgc-card{
		$normal-distance-30:30px;
		font-size:40px;
		padding:$normal-distance-30 0 50px 0;

		.bmsgc-header{
			padding:$normal-distance-30;
			align-iems:center;

			.title-wrap{
				text-align:left;

				.title{
					margin:0;
					font-size:1.1em;
					font-weight:bold;
				}
			}

			.subtitle-wrap{
				text-align:right;
				color:$color-light-text;
				font-size:.9em;
				margin-right:$normal-distance-30;
			}
		}

		.bmsgc-card-body{
			//display:flex;
			//flex-direction:column;
			padding:0 $normal-distance-30;
			max-height: 5em;
			overflow: hidden;
			text-overflow: ellipsis;
			text-align:left;
			font-size:1em;
			-webkit-line-clamp: 3;
			line-height: 1.6em;
			display:-webkit-box;
			-webkit-box-orient: vertical;
		}
	}

	
	.bmsgc-media{
		overflow:hidden;
	}

	.bmsgc-content{
		
	}
</style>