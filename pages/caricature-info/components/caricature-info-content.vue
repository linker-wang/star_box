<template>
	<view class="caricature-info-content">
		<!-- 详情 -->
		<view class="detail" v-if="currentIndex == 0">{{detail}}</view>
		<!-- 章节信息 -->
		<view class="page-info" v-if="currentIndex == 1">
			<!-- 状态栏 -->
			<view class="status-bar">
				<!-- 漫画状态 -->
				<view class="status">{{status}}</view>
				<!-- 章节排序 -->
				<view class="order" @click="changeSequence">
					<view class="order-text">{{isReverseOrder ? '倒序' : '正序'}}</view>
					<image :class="['order-icon', { 'reserve': !isReverseOrder }]" src="../../../static/images/sort_icon.png"
						mode="widthFix"></image>
				</view>
			</view>
			<!-- 页码列表 -->
			<view class="page-list">
				<uni-grid :column="3" :square="false" :show-border="false" :highlight="false">
					<template v-for="item, index in getPageList" :key="item">
						<uni-grid-item @click="clickEvent(item.url)">
							<view class="page-button">{{item.pageNum}}</view>
						</uni-grid-item>
					</template>
				</uni-grid>
				<view class="page-button" v-show="!isExpand" @click="expandList">展开剩余章节</view>
				<view class="pack-up" v-show="isExpand" @click="keepList">收起</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { defineProps, defineEmits, ref, computed } from 'vue'

	/* 是否展开列表 */
	const isExpand = ref(false)

	/* 排序方式 */
	const isReverseOrder = ref(true)

	const props = defineProps({
		pages: {
			type: Array,
			default: () => ([])
		},
		detail: {
			type: String,
			default: ""
		},
		currentIndex: {
			type: Number,
			default: 0
		},
		status: {
			type: String,
			default: "--"
		}
	})

	const emits = defineEmits(["clickPage"])

	const getPageList = computed(() => {
		const pages = isReverseOrder.value ? props.pages : props.pages.slice().reverse()

		return isExpand.value ? pages : pages.slice(0, 15)
	})

	/* 展开列表 */
	const expandList = () => {
		isExpand.value = true
	}
	/* 收起列表 */
	const keepList = () => {
		isExpand.value = false
	}

	/* 改变排列顺序 */
	const changeSequence = () => {
		isReverseOrder.value = !(isReverseOrder.value)
	}

	/* 章节点击事件 */
	const clickEvent = (url) => {
		emits("clickPage", url)
	}
</script>

<style lang="scss">
	.caricature-info-content {

		.detail {
			padding: 20px;
			box-sizing: border-box;
			color: #909090;
			background-color: white;
			font-size: 14px;
			line-height: 1.2em;
		}

		.page-info {
			padding: 10px;
			color: #909090;
			background-color: white;

			.status-bar {
				box-sizing: border-box;
				padding: 0 10px;
				font-size: 12px;
				display: flex;
				flex-flow: row nowrap;
				justify-content: space-between;

				.order {
					display: flex;
					flex-flow: row nowrap;
					align-items: center;

					.order-icon {
						width: 15px;

					}

					.reserve {
						transform: scaleY(-1);
					}
				}
			}

			.page-list {
				padding: 10px 0;

				.page-button {
					padding: 10px;
					margin: 5px;
					box-sizing: border-box;
					border-radius: 5px;
					text-align: center;
					font-size: 12px;
					background-color: #F6F6F6;
					color: #121212;

					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}

				.pack-up {
					padding: 20px;
					box-sizing: border-box;
					color: #2b87ff;
					font-size: 14px;
					text-decoration: underline;
					text-align: right;
				}
			}
		}
	}
</style>