import { defineStore } from 'pinia'
import liveJSON from '@/static/tv.json'

export const useLive = defineStore("live", {
  state: () => ({
    liveList: [],
    currentLiveInfo: {
      name: "--",
      url: "",
      type: "--",
    },
    currentIndexArr: [0, 0],
    liveTabs: [],
  }),
  getters: {

  },
  actions: {
    /* 获取本地直播源 */
    getLiveList() {
      this.liveList = liveJSON
      this.currentLiveInfo = this.liveList[0]?.list[0]
      this.currentIndexArr = [0, 0]
      this.liveTabs = this.liveList.map((item) => item.genre)
    }
  }
})