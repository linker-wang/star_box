<template>
	<view class="video" :style="{'padding-top': navBarHeight + tabsHeight + 'px'}">
		<!-- 自定义navbar -->
		<custom-nav-bar @finishDom="getNavBarHeight" @clickSearch="jumpToSearch"></custom-nav-bar>
		<!-- 频道分类标签 -->
		<custom-tag :tabs="liveTabs" @switchTabs="changeTabs" :top="navBarHeight" @finishDom="getTabsHeight"></custom-tag>
		<!-- 频道列表 -->
		<view class="channel-list">
			<uni-grid :column="2" :square="false" :show-border="false" :highlight="false">
				<template v-for="item, index in liveList[currentTabIndex].list" :key="item">
					<uni-grid-item @click="jumpToPlay(index)">
						<channel-item :info="item"></channel-item>
					</uni-grid-item>
				</template>
			</uni-grid>
		</view>
	</view>
</template>

<script setup>
	import { useLive } from '@/stores/live.js'
	import { toRefs, ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'

	import ChannelItem from './components/channel-item.vue'

	const { liveTabs, liveList, getLiveList } = toRefs(useLive())


	/* 跳转到搜索页 */
	const jumpToSearch = (keyword) => {
		uni.navigateTo({
			url: `/pages/search-page/search-page?keyword=${keyword}`
		})
	}

	/* 被选标签项 */
	const currentTabIndex = ref(0)

	/* 改变标签分类 */
	const changeTabs = (index) => {
		currentTabIndex.value = index
	}

	/* navBar高度 */
	const navBarHeight = ref(0)
	/* 获取navBar高度 */
	const getNavBarHeight = (height) => {
		navBarHeight.value = height
	}

	/* tabs高度 */
	const tabsHeight = ref(0)
	/* 设置页面topPadding */
	const getTabsHeight = (height) => {
		tabsHeight.value = height
	}

	/* 跳转到播放页 */
	const jumpToPlay = (index) => {
		uni.navigateTo({
			url: `/pages/live/live?currentTabIndex=${currentTabIndex.value}&index=${index}`,
		})
	}

	/* 加载直播源 */
	onLoad(() => {
		getLiveList.value()
	})
</script>

<style lang="scss">
	.video {
		box-sizing: border-box;
		height: 100vh;

		.channel-list {
			box-sizing: border-box;
			width: 100%;
			height: 100%;
			background-color: #e8e8e8;
			overflow: scroll;
		}
	}
</style>