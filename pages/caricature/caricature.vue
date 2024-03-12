<template>
	<view class="caricature" :style="{ 'padding-top': tagHeight + 'px'}">
		<!-- 漫画标签组 -->
		<custom-tag :tabs="cartoonTabs" @switchTabs="changeTabs" @finishDom="getTabsHeight"></custom-tag>
		<!-- 漫画内容展示 -->
		<scroll-view class="caricature-content" :scroll-y="true" @scrolltolower="getCaricatureList(currentTagIndex)">
			<uni-grid :column="3" :square="false" :highlight="false" :showBorder="false">
				<template v-for="item in cartoonList[currentTagIndex].list" :key="item">
					<uni-grid-item @click="selectIt(item.url)">
						<cartoon-cover-item :info="item"></cartoon-cover-item>
					</uni-grid-item>
				</template>
			</uni-grid>
		</scroll-view>
	</view>
</template>

<script setup>
	import { useCaricature } from '@/stores/caricature.js'
	import { toRefs, ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'

	const { cartoonTabs, cartoonList, getCaricatureList } = toRefs(useCaricature())

	/* 被选择的标签 */
	const currentTagIndex = ref(0)
	/* 切换标签 */
	const changeTabs = (index) => {
		if (cartoonList.value[index].list.length === 0) {
			getCaricatureList.value(index)
		}
		currentTagIndex.value = index
	}

	/* tag高度 */
	const tagHeight = ref(0)
	/* 设置Tag的高度 */
	const getTabsHeight = (height) => {
		tagHeight.value = height
	}

	/* 选择漫画 */
	const selectIt = (path) => {
		uni.navigateTo({
			url: `/pages/caricature-info/caricature-info?path=${path}`
		})
	}

	/* 加载初始数据 */
	onLoad(async () => {
		const list = await getCaricatureList.value(0)
		list.forEach((item) => {
			uni.getImageInfo({
				src: item.imageUrl,
			})
		})
	})
</script>

<style lang="scss">
	.caricature {
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;

		.caricature-content {
			height: 100%;
			width: 100%;
		}
	}
</style>