<template>
	<div @click="handleCardClick">
		<base-card body-class="bmc-card-body">
			<div :class="mediaClasses" :style="mediaStyle">
				<slot name="media"></slot>
			</div>
			<div :class="contentClasses">
				<slot></slot>
			</div>
		</base-card>
	</div>
</template>

<script>
	import baseCard from '@/components/base-card.vue';

	const COMPONENT_NAME = 'base-media-card'
	const EVENT_CLICK = 'click'

	export default {
		name: COMPONENT_NAME,
		components: {
			baseCard
		},
		props: {
			img: String,
			mediaClass:{},
			contentClass:{}
		},
		data() {
			return {

			}
		},
		computed: {
			mediaClasses(){
				return [`bmc-media`,this.mediaClass]
			},
			mediaStyle(){
				let style={};

				if (this.img) {
					style.background = `url("${this.img}") center center / cover no-repeat`
				}

				return style;
			},
			contentClasses(){
				return [`bmc-content`,this.contentClass]
			}
		},
		watch:{},
		methods:{
			handleCardClick(){
				this.$emit(EVENT_CLICK);
			}
		}
	}
</script>

<style lang="scss">
	.bmc-card-body{
		display:flex;
		flex-direction:column;
	}
	.bmc-media{
		overflow:hidden;
	}

	.bmc-content{
		
	}
</style>