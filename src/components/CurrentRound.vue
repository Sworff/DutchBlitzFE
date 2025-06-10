<script setup lang="ts">
import { useStore } from '@/stores/store'
import { ref } from 'vue'

const props = defineProps<{
  gameMode: string
}>()

const store = useStore()
const editingRows = ref([])

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onRowEditSave = (event: any) => {
  const { data } = event
  store.setRoundScore(props.gameMode, data)
}
</script>

<template>
  <section>
    <Card class="mb-5">
      <template #title>Current Rounds</template>
      <template #content>
        <DataTable
          v-model:editingRows="editingRows"
          :value="store.gameState.players"
          editMode="row"
          size="small"
          @row-edit-save="onRowEditSave"
        >
          <Column field="name" header="Player"></Column>
          <Column field="score.dutch" header="Dutch" style="width: 60px">
            <template #body="{ data }">
              {{ data.score.dutch }}
            </template>

            <template #editor="{ data }">
              <InputNumber v-model="data.score.dutch" size="small" fluid />
            </template>
          </Column>
          <Column field="score.blitz" header="Blitz" style="width: 60px">
            <template #body="{ data }">
              {{ data.score.blitz }}
            </template>

            <template #editor="{ data }">
              <InputNumber v-model="data.score.blitz" size="small" fluid />
            </template>
          </Column>
          <Column field="score.roundScore" header="Score" style="width: 60px">
            <template #body="{ data }">
              {{ data.score.dutch - data.score.blitz }}
            </template>
          </Column>
          <Column :rowEditor="true" header="Edit" style="width: 100px"></Column>
        </DataTable>

        <Button
          icon="pi pi-plus"
          aria-label="finish-round"
          variant="outlined"
          label="Finish Round"
          class="w-full mt-4"
          @click="store.startNextRound(props.gameMode)"
        ></Button>
      </template>
    </Card>
  </section>
</template>
