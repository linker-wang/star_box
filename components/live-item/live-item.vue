<template>
	<view class="live-item">
		<!-- 图片 -->
		<image class="live-image" src="@/static/images/video_cover_default.png" mode="widthFix"></image>
		<!-- 信息 -->
		<view class="live-info" :style="{color: isActive ? '#00aaff' : ''}">
			<view class="type">{{info.type}}</view>
			<view class="name">{{info.name}}</view>
		</view>
	</view>
</template>

<script setup>
	import { defineProps } from "vue"

	const props = defineProps({
		info: {
			type: Object,
			default: () => ({})
		},
		isActive: {
			type: Boolean,
			default: false
		}
	})
</script>

<style lang="scss">
	.live-item {
		display: flex;
		flex-flow: row nowrap;
		padding: 5px;

		.live-image {
			width: 30%;
			margin-right: 20px;
			border-radius: 5px;
		}

		.live-info {
			font-size: 16px;
			display: flex;
			flex-flow: column nowrap;
			justify-content: space-around;

			.type {
				font-weight: 700;
			}
		}
	}
</style>