<script setup lang="ts">
import type { Player } from '@/types/types'
import { computed } from 'vue'

const props = defineProps<{
  winners: Player[]
  gameOver: boolean
}>()

const visible = computed(() => props.gameOver)
</script>

<template>
  <div class="card flex justify-center">
    <Dialog v-model:visible="visible" modal header="Congratulations!" :style="{ width: '25rem' }">
      <div v-if="props.winners.length > 1">
        <p>The Winners are:</p>
        <p v-for="winner of props.winners" :key="winner.id">{{ winner.name }}</p>
      </div>

      <div v-else>
        <p v-for="winner of props.winners" :key="winner.id">
          The winner is {{ winner.name }} with a score of {{ winner.totalScore }}!
        </p>
      </div>

      <div class="flex justify-end mt-4">
        <!-- clear game state on end game -->
        <RouterLink to="/"><Button label="End Game" style="color: white"></Button></RouterLink>
      </div>
    </Dialog>
  </div>
</template>
