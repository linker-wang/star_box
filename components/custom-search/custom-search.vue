<template>
	<view class="custom-search">
		<!-- 输入框区域 -->
		<view class="input-area">
			<!-- 输入框 -->
			<view class="input-view">
				<!-- 左图标 -->
				<view class="left-icon">
					<image class="icon" src="@/static/images/search.png" mode="widthFix"></image>
				</view>
				<!-- 输入框内容 -->
				<input class="input-content" type="text" :value="modelValue" @focus="isFocus = true" @blur="isFocus = false"
					@input="changeValue" :placeholder="placeholder" />
				<!-- 有边框 -->
				<view class="right-icon">
					<image class="icon" src="@/static/images/cancel.png" mode="widthFix" @click="clearEvent"></image>
				</view>
			</view>
			<!-- 右按钮 -->
			<view class="right-button" @click="clickEvent">{{rightButtonTitle}}</view>
		</view>

		<!-- 显示输入内容区域 -->
		<view class="show-area" v-show="isFocus">{{getSearchContent}}</view>
	</view>
</template>

<script setup>
	import { defineProps, defineEmits, ref, computed } from 'vue'

	const isFocus = ref(false)

	/* 参数 */
	const props = defineProps({
		rightButtonTitle: {
			type: String,
			default: "取消"
		},
		placeholder: {
			type: String,
			default: "请输入内容"
		},
		modelValue: {
			type: String,
			default: ""
		}
	})

	const getSearchContent = computed(() => {
		return `搜索＂${props.modelValue}＂`
	})

	/* 事件 */
	const emits = defineEmits(["rightClick", "update:modelValue"])

	/* 输入内容 */
	const changeValue = (event) => {
		emits("update:modelValue", event.detail.value)
	}

	/* 清除内容 */
	const clearEvent = () => {
		emits("update:modelValue", "")
	}

	/* 右按钮点击事件 */
	const clickEvent = () => {
		emits("rightClick")
	}
</script>

<style lang="scss">
	.custom-search {

		.input-area {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			padding: 10px;

			.input-view {
				flex-grow: 1;
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				border-radius: 50px;
				padding: 8px 15px;
				margin-right: 5px;

				background-color: #e0f0ff;

				.left-icon {
					width: 40rpx;
					margin-right: 10rpx;
					display: flex;
					flex-flow: row nowrap;
					align-items: center;

					.icon {
						width: 100%;
					}
				}

				.input-content {
					flex-grow: 1;
					font-size: 16px;
					color: #646c73;
				}

				.right-icon {
					width: 40rpx;
					margin-left: 10rpx;
					display: flex;
					flex-flow: row nowrap;
					align-items: center;

					.icon {
						width: 100%;
					}
				}
			}

			.right-button {
				width: 100rpx;
				padding: 10rpx;
				color: #00aaff;
				border-radius: 5px;
				text-align: center;
			}

			.right-button:active {
				background-color: #eafcff;
			}
		}

		.show-area {
			padding: 10rpx 20rpx;
			color: #00aaff;
		}
	}
</style>