import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import SetWinningScore from '@/components/SetWinningScore.vue'
import CreatePlayers from '@/components/CreatePlayers.vue'
import LeaderBoard from '@/components/LeaderBoard.vue'
import CurrentRound from '@/components/CurrentRound.vue'
import WinnerModal from '@/components/WinnerModal.vue'
import CompletedRounds from '@/components/CompletedRound.vue'

import {
  InputNumber,
  IftaLabel,
  DataTable,
  Column,
  InputText,
  Button,
  Card,
  Dialog,
  Accordion,
  AccordionPanel,
  AccordionHeader,
  AccordionContent,
} from 'primevue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

app.component('SetWinningScore', SetWinningScore)
app.component('CreatePlayers', CreatePlayers)
app.component('LeaderBoard', LeaderBoard)
app.component('CurrentRound', CurrentRound)
app.component('WinnerModal', WinnerModal)
app.component('CompletedRounds', CompletedRounds)

app.component('InputNumber', InputNumber)
app.component('IftaLabel', IftaLabel)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('InputText', InputText)
app.component('Button', Button)
app.component('Card', Card)
app.component('Dialog', Dialog)
app.component('Accordion', Accordion)
app.component('AccordionPanel', AccordionPanel)
app.component('AccordionHeader', AccordionHeader)
app.component('AccordionContent', AccordionContent)

app.mount('#app')
