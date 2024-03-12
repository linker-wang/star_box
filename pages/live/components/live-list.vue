<template>
	<view class="live-list">
		<view class="title">{{title}}</view>
		<uni-grid :column="1" :square="false" :highlight="false" :showBorder="false">
			<template v-for="item, index in list" :key="item">
				<template v-for="tvInfo, tvIndex in item.list" :key="tvInfo">
					<uni-grid-item @click="clickEvent([index, tvIndex])">
						<slot :info="tvInfo" :isActive="currentIndexArr[0] == index && currentIndexArr[1] == tvIndex">测试</slot>
					</uni-grid-item>
				</template>
			</template>
		</uni-grid>
	</view>
</template>

<script setup>
	import { defineProps, defineEmits } from 'vue'

	const props = defineProps({
		title: {
			type: String,
			default: "default"
		},
		list: {
			type: Array,
			default: () => ([])
		},
		currentIndexArr: {
			type: Array,
			default: () => [0, 0]
		}
	})

	/* 事件 */
	const emits = defineEmits(["clickItem"])

	/* 点击事件 */
	const clickEvent = (arr) => {
		emits("clickItem", arr)
	}
</script>

<style lang="scss">
	.live-list {

		.title {
			box-sizing: border-box;
			padding: 10px;
			font-size: 18px;
			color: #a5a5a5;
		}
	}
</style>