<script setup lang="ts">
import { useStore } from '@/stores/store'
import type { Player } from '@/types/types'

const store = useStore()

const onCellEditComplete = (event: { data: Player; newValue: string }) => {
  const { data, newValue } = event
  store.editPlayer(data, newValue)
}
</script>

<template>
  <section class="mb-10">
    <DataTable
      :value="store.gameState.players"
      editMode="cell"
      class="mb-3"
      @cell-edit-complete="onCellEditComplete"
    >
      <Column field="name" header="Player" style="width: 289px">
        <template #body="{ data }">
          <Button
            icon="pi pi-pencil"
            severity="secondary"
            aria-label="edit-player"
            variant="outlined"
            class="mr-1"
          ></Button>
          {{ data.name }}
        </template>

        <template #editor="{ data }">
          <InputText v-model="data.name" autofocus fluid />
        </template>
      </Column>
      <Column header="Delete" class="flex justify-center">
        <template #body="{ data }">
          <Button
            icon="pi pi-trash"
            severity="danger"
            aria-label="delete-player"
            variant="text"
            :disabled="store.gameState.players.length < 3"
            @click="store.removePlayer(data.id)"
          ></Button>
        </template>
      </Column>
    </DataTable>

    <Button
      v-if="store.gameState.players.length < 8"
      icon="pi pi-plus"
      aria-label="add-player"
      variant="outlined"
      label="Add Player"
      class="w-full"
      @click="store.addPlayer()"
    ></Button>
  </section>
</template>
