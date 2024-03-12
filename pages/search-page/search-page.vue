<template>
	<view class="search-page">
		<!-- 搜索框 -->
		<custom-search @rightClick="backPage" v-model="searchValue"></custom-search>
		<!-- 搜索到的内容 -->
		<view class="search-content">
			<uni-grid :column="1" :square="false" :highlight="false" :showBorder="false">
				<template v-for="item in getList" :key="item">
					<uni-grid-item @click="jumpToLive(item.position)">
						<live-item :info="item"></live-item>
					</uni-grid-item>
				</template>
			</uni-grid>
		</view>
	</view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app'
	import { ref, toRefs, computed } from 'vue'
	import { useLive } from '@/stores/live.js'

	const searchValue = ref("")

	const { liveList } = toRefs(useLive())

	/* 获取搜索过滤后的列表 */
	const getList = computed(() => {
		if (searchValue.value.length === 0) {
			return []
		}

		let arr = []
		liveList.value.forEach((genre, index) => {
			genre.list.forEach((channel, channelIndex) => {
				const keyword = searchValue.value
				if (channel.name.includes(keyword) || channel.type.includes(keyword)) {
					arr.push({ ...channel, position: [index, channelIndex] })
				}
			})
		})
		return arr
	})

	/* 返回 */
	const backPage = () => {
		uni.navigateBack({
			delta: 1
		})
	}

	/* 跳转到播放页面 */
	const jumpToLive = (position) => {
		uni.navigateTo({
			url: `/pages/live/live?currentTabIndex=${position[0]}&index=${position[1]}`,
		})
	}

	onLoad((options) => {
		searchValue.value = options.keyword
	})
</script>

<style lang="scss">
	.search-page {
		height: 100%;
		display: flex;
		flex-flow: column nowrap;

		.search-content {
			flex-grow: 1;
			overflow: scroll;
		}
	}
</style>