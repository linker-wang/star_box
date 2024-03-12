<template>
	<view class="channel-item">
		<!-- 频道图片 -->
		<image class="channel-image" src="@/static/images/video_cover_default.png" mode="widthFix"></image>
		<!-- 频道名 -->
		<view class="channel-name">{{info.name}}</view>
	</view>
</template>

<script setup>
	import { defineProps } from 'vue'

	const props = defineProps({
		info: {
			type: Object,
			default: () => ({})
		}
	})
</script>

<style lang="scss">
	.channel-item {
		padding: 10px 5px;

		.channel-image {
			width: 100%;
			border-radius: 4px;

			.channel-name {
				font-size: 14px;
			}
		}
	}
</style>