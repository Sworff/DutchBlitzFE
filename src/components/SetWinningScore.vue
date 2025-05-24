<script setup lang="ts">
import { useStore } from '@/stores/store'

const store = useStore()
</script>

<template>
  <section class="flex flex-col justify-center mb-10">
    <label for="scoreLimit" class="text-lg mb-2">Winning Score</label>
    <InputNumber
      v-model="store.gameState.winningScore"
      inputId="scoreLimit"
      showButtons
      buttonLayout="horizontal"
    >
      <template #incrementicon>
        <span class="pi pi-plus text-emerald-400"></span>
      </template>
      <template #decrementicon>
        <span class="pi pi-minus text-red-400"></span>
      </template>
    </InputNumber>
  </section>
</template>
