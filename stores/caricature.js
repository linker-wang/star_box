import { defineStore } from 'pinia'
import cartoonType from '@/static/cartoon-type.json'
import { request } from '@/service/requestData.js'
import { loadList, loadInfo } from '@/utils/index.js'

/* 获取漫画type列表 */
const getCartoonTabs = () => {
  return cartoonType.map((item) => {
    return item.title
  })
}

/* 初始化列表 */
const getCartoonList = () => {
  return cartoonType.map((item) => {
    return {
      page: 0,
      tag: item.param,
      list: []
    }
  })
}

export const useCaricature = defineStore("caricature", {
  state: () => ({
    cartoonTabs: getCartoonTabs(),
    cartoonList: getCartoonList(),
    cartoonInfo: {
      title: "--",
      author: "--",
      imageUrl: "",
      types: [],
      detail: "--",
      status: "--",
      pages: [],
      recommendList: [],
    }
  }),
  getters: {

  },
  actions: {
    /* 请求漫画列表数据 */
    async getCaricatureList(index) {
      const page = this.cartoonList[index].page + 1
      const tag = this.cartoonList[index].tag ? `-${this.cartoonList[index].tag}` : ""
      const res = await request.get(`/manga-list${tag}-p${page}/`)
      const list = loadList(res)
      this.cartoonList[index].list.push(...list)
      this.cartoonList[index].page = page

      return list
    },

    /* 请求漫画内容 */
    async getCariactureInfo(path) {
      const res = await request.get(path)
      console.log(path)
      this.cartoonInfo = loadInfo(res)
    }
  }
})