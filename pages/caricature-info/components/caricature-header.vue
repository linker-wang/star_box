<template>
	<view class="caricature-header">
		<!-- 封面 -->
		<image class="cover-image" v-show="isShow" :src="imageUrl" @load="showImage" mode="widthFix"></image>
		<image class="cover-image" v-show="!isShow" src="@/static/images/cover_loading.png" mode="widthFix"></image>
		<!-- 主要信息 -->
		<view class="some-info">
			<view class="title">{{getTitle}}</view>
			<view class="author">{{getAuthor}}</view>
			<view class="types">{{getTypes}}</view>
		</view>
	</view>
</template>

<script setup>
	import { defineProps, ref, computed } from 'vue'

	const isShow = ref(false)

	const props = defineProps({
		title: {
			type: String,
			default: "--"
		},
		author: {
			type: String,
			default: "--"
		},
		types: {
			type: Array,
			default: () => []
		},
		imageUrl: {
			type: String,
			default: ""
		}
	})

	/* 获取漫画名 */
	const getTitle = computed(() => {
		return `${props.title}`
	})
	/* 作者 */
	const getAuthor = computed(() => {
		return `作者:${props.author}`
	})
	/* 标签 */
	const getTypes = computed(() => {
		return `标签:${props.types}`
	})

	const showImage = () => {
		isShow.value = true
	}
</script>

<style lang="scss">
	.caricature-header {
		width: 100%;
		display: flex;
		flex-flow: row nowrap;
		padding: 20px 10px;
		box-sizing: border-box;
		background-color: #e5f3ff;

		.cover-image {
			width: 40%;
			height: auto;
			box-sizing: border-box;
		}

		.some-info {
			width: 60%;
			box-sizing: border-box;
			padding: 10px 20px;
			box-sizing: border-box;

			.title {
				width: 100%;
				display: -webkit-box !important;
				overflow: hidden;
				text-overflow: ellipsis;
				word-break: break-all;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;

				font-size: 20px;
				font-weight: 600;
				margin-bottom: 20px;
			}

			.author {
				margin-bottom: 5px;
			}

			.types {
				margin-bottom: 5px;
			}
		}
	}
</style>