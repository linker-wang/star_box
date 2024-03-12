import { defineStore } from 'pinia'
import { loadImage } from '@/utils/index.js'
import { request } from "@/service/requestData.js"

export const useReadCaricature = defineStore("readCaricature", {
  state: () => ({
    imageList: []
  }),
  getters: {},
  actions: {
    /* 请求漫画图片 */
    async getCartoonImage(url) {
      const res = await request.get(url)
      console.log(res)
      // loadImage(res)
    }
  }
})