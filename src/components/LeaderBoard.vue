<script setup lang="ts">
import type { Player } from '@/types/types'

defineProps<{
  leaderboard: Player[]
}>()
</script>

<template>
  <section>
    <Card class="mb-5">
      <template #title><span class="text-yellow-300">Leaderboard</span></template>
      <template #content>
        <ol>
          <li v-for="leader of leaderboard" :key="leader.id">
            {{ leader.name }}&nbsp;:&nbsp;<span>Score</span>&nbsp;<span>{{
              leader.totalScore
            }}</span>
          </li>
        </ol>
      </template>
    </Card>
  </section>
</template>
