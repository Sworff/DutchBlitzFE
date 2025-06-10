<script setup lang="ts">
import { useStore } from '@/stores/store'
import { useRoute } from 'vue-router'
import router from '@/router'

const store = useStore()
const route = useRoute()
const gameMode = route.path.includes('multi') ? 'Multi' : 'Solo'

function startGame() {
  if (gameMode === 'Multi') {
    router.push({
      name: 'MultiGame',
      params: { roomId: route.params.roomId },
    })
    return
  }

  router.push({ name: 'SoloGame' })
}

function back() {
  router.back()
}
</script>

<template>
  <section class="flex flex-col justify-center mb-4">
    <h2>{{ gameMode }} Game Settings</h2>

    <div v-if="gameMode === 'Multi'">
      <strong>Room Number</strong>
      <Button
        :label="route.params.roomId as string"
        class="w-full mt-2"
        icon="pi pi-copy"
        iconPos="right"
        severity="info"
        variant="outlined"
      ></Button>
    </div>
  </section>

  <SetWinningScore />

  <CreatePlayers :gameMode />

  <section class="flex justify-between">
    <Button
      size="large"
      severity="info"
      label="Start Game"
      style="color: white"
      @click="startGame()"
      :disabled="store.gameState.players.length < 2"
    ></Button>

    <Button
      size="large"
      variant="outlined"
      severity="secondary"
      label="Back"
      @click="back"
    ></Button>
  </section>
</template>
