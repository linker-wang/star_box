<template>
	<view class="custom-nav-bar" style="touch-action: none;">
		<uni-nav-bar background-color="#00aaff" status-bar>
			<template v-slot:left>
				<view class="nav-bar-left">
					<image class="header-image" src="@/static/header.png" mode="widthFix">
					</image>
				</view>
			</template>
			<template v-slot:default>
				<view class="nav-bar-center">
					<view class="input-view">
						<input class="input-info" :auto-blur="true" placeholder="请输入内容" type="text" v-model="searchValue" />
						<view class="view-image">
							<image class="cancel-icon" src="@/static/images/cancel.png" mode="widthFix"
								v-show="searchValue.length !== 0" @click="clearSearchValue">
							</image>
						</view>
					</view>
				</view>
			</template>
			<template v-slot:right>
				<view class="search-button" @click="clickEvent">搜索</view>
			</template>
		</uni-nav-bar>
	</view>
</template>

<script setup>
	import { defineEmits, onMounted, ref } from 'vue'

	const emits = defineEmits(["finishDom", "clickSearch"])

	const searchValue = ref("")

	/* 清除搜索内容 */
	const clearSearchValue = () => {
		searchValue.value = ""
	}

	/* 点击搜索 */
	const clickEvent = () => {
		emits("clickSearch", searchValue.value)
		clearSearchValue()
	}

	onMounted(() => {
		uni.createSelectorQuery().select('.custom-nav-bar').boundingClientRect(data => {
			emits("finishDom", data.height)
		}).exec()
	})
</script>

<style lang="scss">
	.custom-nav-bar {
		overflow: hidden;
		position: fixed;
		top: 0%;
		left: 0;
		right: 0;
		z-index: 99;

		.nav-bar-left {
			width: 100%;
			height: 100%;
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			align-items: center;

			.header-image {
				width: 30px;
				height: 30px;
				border-radius: 50%;
			}
		}

		.nav-bar-center {
			width: 100%;
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			align-items: center;
		}

		.input-view {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			border-radius: 50px;
			background-color: white;
			padding: 5px 10px;

			.input-info {
				font-size: 12px;
			}

			.view-image {
				width: 30rpx;
				height: 30rpx;
			}

			.cancel-icon {
				width: 100%;
			}
		}

		.search-button {
			width: 100%;
			color: white;
			font-weight: 600;
			font-size: 16px;
			text-align: center;
		}
	}
</style>