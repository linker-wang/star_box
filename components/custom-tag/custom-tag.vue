<template>
	<!-- 使用fixed地位的标签 -->
	<view v-if="isFixed" class="custom-tag" :style="{ 'top': top + 'px' }">
		<scroll-view class="tabs" :scroll-x="true">
			<template v-for="item, index in tabs" :key="item">
				<view :class="['tag-name', {'active': currentIndex === index}]" @click="clickEvent(index)">{{item}}</view>
			</template>
		</scroll-view>
	</view>

	<!-- 正常标签 -->
	<view v-else class="normal-tabs">
		<template v-for="item, index in tabs" :key="item">
			<view :class="['tag-name', {'active': currentIndex === index}]" @click="clickEvent(index)">{{item}}</view>
		</template>
	</view>
</template>

<script setup>
	import { defineProps, defineEmits, ref, onMounted } from "vue"

	const currentIndex = ref(0)

	const props = defineProps({
		tabs: {
			type: Array,
			default: () => []
		},
		top: {
			type: Number,
			default: 0
		},
		isFixed: {
			type: Boolean,
			default: true
		}
	})

	const emits = defineEmits(["switchTabs", "finishDom"])

	const clickEvent = (index) => {
		if (currentIndex.value != index) {
			currentIndex.value = index
			emits("switchTabs", index)
		}
	}

	onMounted(() => {
		const selector = props.isFixed ? '.custom-tag' : '.normal-tabs'
		uni.createSelectorQuery().select(selector).boundingClientRect(data => {
			emits("finishDom", data.height)
		}).exec()
	})
</script>

<style lang="scss">
	.custom-tag {
		background-color: white;
		overflow: hidden;
		width: 100%;
		position: fixed;
		left: 0;
		right: 0;
		z-index: 999;

		.tabs {
			width: 100%;
			white-space: nowrap;

			.tag-name {
				display: inline-block;
				padding: 10px;
				margin: 0 10px;
				color: #787878;
				border-bottom: 2px solid rgba(0, 0, 0, 0);
			}

			.active {
				color: #00aaff;
				font-weight: 600;
				border-color: #00aaff;
			}
		}
	}

	.normal-tabs {
		width: 100%;
		box-sizing: border-box;
		padding: 10px 0;
		background-color: white;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-evenly;
		align-items: center;

		.tag-name {
			padding: 5px;
			color: #999999;
			border-bottom: 4px rgba(0, 0, 0, 0) solid;
		}

		.active {
			color: #00aaff;
			border-bottom: 4px #00aaff solid;
		}
	}
</style>