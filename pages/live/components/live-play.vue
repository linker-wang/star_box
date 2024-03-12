<template>
	<view class="live-play">
		<!-- 播放器 -->
		<video class="live-playing" :src="info?.url" autoplay controls></video>
		<!-- 播放信息 -->
		<view class="live-info">
			<view class="name">{{getName}}</view>
			<view class="type">{{getType}}</view>
		</view>
	</view>
</template>

<script setup>
	import { defineProps, defineEmits, computed, onMounted } from 'vue'

	const props = defineProps({
		info: {
			type: Object,
			default: () => ({})
		}
	})

	const emits = defineEmits(["finishDom"])

	const getName = computed(() => {
		return `频道:${props.info.name}`
	})

	const getType = computed(() => {
		return `分类:${props.info.type}`
	})

	onMounted(() => {
		uni.createSelectorQuery().select('.live-play').boundingClientRect(data => {
			emits("finishDom", data.height)
		}).exec()
	})
</script>

<style lang="scss">
	.live-play {
		width: 100%;
		position: fixed;
		top: 0;
		display: flex;
		flex-flow: column nowrap;
		z-index: 999;

		.live-playing {
			width: 100%;
		}

		.live-info {
			box-sizing: border-box;
			font-weight: 600;
			padding: 20px;
			font-size: 20px;
			color: #6d6d6d;
			background-color: #fff;
			border-bottom: 2px #f0f0f0 solid;

			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
		}
	}
</style>