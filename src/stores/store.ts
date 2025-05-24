import { acceptHMRUpdate, defineStore } from 'pinia'
import { useDutchBlitz } from './useDutchBlitz'

export const useStore = defineStore('dutchBlitzStore', () => {
  const solo = useDutchBlitz()

  return {
    ...solo,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
