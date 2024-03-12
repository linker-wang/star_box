<template>
	<view class="caricature-info">
		<!-- 漫画信息头 -->
		<caricature-header :title="cartoonInfo.title" :author="cartoonInfo.author" :types="cartoonInfo.types"
			:imageUrl="cartoonInfo.imageUrl"></caricature-header>
		<!-- 漫画信息标签 -->
		<custom-tag :tabs="['详情', '章节']" :isFixed="false" @switchTabs="changeTabIndex"></custom-tag>
		<!-- 漫画详情 -->
		<caricature-info-content :detail="cartoonInfo.detail" :currentIndex="tabIndex" :status="cartoonInfo.status"
			:pages="cartoonInfo.pages" @clickPage="toRead"></caricature-info-content>
		<!-- 推荐 -->
		<view class="recommend">
			<view class="title">相关推荐</view>
			<uni-grid :column="3" :square="false" :show-border="false" :highlight="false">
				<template v-for="item in cartoonInfo.recommendList" :key="item">
					<uni-grid-item>
						<cartoon-cover-item :info="item"></cartoon-cover-item>
					</uni-grid-item>
				</template>
			</uni-grid>
		</view>
	</view>
</template>

<script setup>
	import { onLoad, onUnload } from '@dcloudio/uni-app'
	import { useCaricature } from '@/stores/caricature.js'
	import { toRefs, ref } from 'vue'

	import CaricatureHeader from "./components/caricature-header.vue"
	import caricatureInfoContent from "./components/caricature-info-content.vue"

	const { getCariactureInfo, cartoonInfo } = toRefs(useCaricature())

	const tabIndex = ref(0)
	const changeTabIndex = (index) => {
		tabIndex.value = index
	}

	/* 跳转到阅读漫画 */
	const toRead = (url) => {
		uni.navigateTo({
			url: `/pages/read-caricature/read-caricature?url=${url}`
		})
	}

	onLoad((options) => {
		getCariactureInfo.value(options.path)
	})

	onUnload(() => {
		cartoonInfo.value = {
			title: "--",
			author: "--",
			imageUrl: "",
			types: [],
			status: "--",
			detail: "--",
			pages: [],
			recommendList: [],
		}
	})
</script>

<style lang="scss">
	.caricature-info {
		height: 100%;
		overflow: scroll;
		background-color: #F8F8F9;

		.recommend {
			background-color: white;
			margin-top: 10px;
			padding: 0 10px;

			.title {
				font-weight: 600;
				padding: 20px 0 10px;
			}
		}
	}
</style>