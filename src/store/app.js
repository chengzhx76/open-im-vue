import { defineStore } from "pinia"

export const useAppStore = defineStore("app", {
  state: () => {
    return {
      sidebar: false
    }
  },
  getters: {
    siderbarState() {
      // console.log(this.sidebar)
      return "this.sidebar"
    }
  },
  actions: {

  }
})