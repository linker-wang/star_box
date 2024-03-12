<template>
	<view class="cartoon-cover-item">
		<!-- 封面图 -->
		<image v-show="isShow" class="cartoon-image" @load="showImage" :src="info.imageUrl" mode="widthFix"></image>
		<image v-show="!isShow" class="cartoon-image" src="@/static/images/cover_loading.png" mode="widthFix">
		</image>
		<!-- 名字 -->
		<view class="cartoon-name">{{info.name}}</view>
	</view>
</template>

<script setup>
	import { defineProps } from 'vue'
	import { ref } from 'vue'

	const isShow = ref(false)

	const props = defineProps({
		info: {
			type: Object,
			default: () => ({})
		}
	})

	const showImage = () => {
		isShow.value = true
	}
</script>

<style lang="scss">
	image {
		will-change: transform;
	}

	.cartoon-cover-item {
		padding: 10px 5px;

		.cartoon-image {
			width: 100%;
			height: auto;
		}

		.cartoon-name {
			display: -webkit-box !important;
			overflow: hidden;
			text-overflow: ellipsis;
			word-break: break-all;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;

			text-align: center;
			font-size: 12px;
			font-weight: 600;
			color: #4f4f4f;
		}
	}
</style>