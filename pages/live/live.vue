<template>
	<view class="live" :style="{ 'padding-top': topPadding + 'px' }">
		<!-- 播放区域 -->
		<live-play :info="currentLiveInfo" @finishDom="setPadding"></live-play>
		<!-- 播放列表 -->
		<live-list title="频道列表" :list="liveList" :currentIndexArr="currentIndexArr" @clickItem="switchLive">
			<template v-slot:default="slotProps">
				<live-item :info="slotProps.info" :isActive="slotProps.isActive"></live-item>
			</template>
		</live-list>
	</view>
</template>

<script setup>
	import { onLoad, onReady } from "@dcloudio/uni-app"
	import { useLive } from "@/stores/live.js"
	import { toRefs, ref } from 'vue'

	import LivePlay from './components/live-play.vue'
	import LiveList from './components/live-list.vue'

	const { liveList, currentLiveInfo, currentIndexArr, getLiveList } = toRefs(useLive())

	/* 切换直播源 */
	const switchLive = (arr) => {
		currentIndexArr.value = arr
		currentLiveInfo.value = liveList.value[arr[0]].list[arr[1]]
	}

	/* padding */
	const topPadding = ref(0)

	/* 设置列表的上padding */
	const setPadding = (height) => {
		topPadding.value = height
	}

	/* 监听页面跳转传入的参数 */
	onLoad((options) => {
		const arr = [Number(options.currentTabIndex), Number(options.index)]
		switchLive(arr)
	})
</script>

<style lang="scss">
	.live {}
</style>