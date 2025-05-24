<script setup lang="ts">
import { useStore } from '@/stores/store'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useStore()
const gameMode = route.path.includes('multi') ? 'Multi' : 'Solo'
</script>

<template>
  <section class="flex justify-center">
    <h2>{{ gameMode }} Game</h2>
  </section>

  <LeaderBoard :leaderboard="store.leaderBoard" />

  <CurrentRound />

  <CompletedRounds :rounds="store.gameState.rounds" />

  <WinnerModal :winners="store.winners" :gameOver="store.gameState.isGameOver" />
</template>
