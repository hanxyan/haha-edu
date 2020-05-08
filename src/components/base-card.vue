<template>
	<div :class="cardClasses">
		<slot name="header">
			<div class="ss-card-header" v-if="header">
				{{ header }}
			</div>
		</slot>
		<div :class="contentClasses" :style="bodyStyle">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	const COMPONENT_NAME = 'base-card'

	export default {
		name:COMPONENT_NAME,
		props: {
			header: {},
			bodyStyle: {},
			bodyClass:{},
			cardClass:{}
		},
		data(){
			return {

			}
		},
		computed: {
			contentClasses(){
				return [`ss-card-content`,this.bodyClass]
			},
			cardClasses(){
				return [`ss-card`,this.cardClass]
			}
		}
	}
</script>

<style lang="scss">
	.ss-card{
		.ss-card-content{
			padding: 20px;
		}
	}
</style>