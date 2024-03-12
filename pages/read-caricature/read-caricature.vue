<template>
	<view class="read-caricature">
		<web-view :src="url"></web-view>
	</view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app'
	import { ref } from 'vue'
	import { baseUrl } from '@/service/requestData.js'

	const url = ref("")

	onLoad((options) => {
		url.value = baseUrl + options.url
	})
</script>

<style lang="scss"></style>