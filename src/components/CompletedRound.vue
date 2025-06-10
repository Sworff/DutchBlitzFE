<script setup lang="ts">
import { useStore } from '@/stores/store'
import type { Round } from '@/types/types'

const props = defineProps<{
  gameMode: string
  rounds: Round[]
}>()

const { deleteRound } = useStore()
</script>

<template>
  <section>
    <Card v-if="rounds.length > 0">
      <template #title>Completed Rounds</template>
      <template #content>
        <Accordion value="0">
          <AccordionPanel v-for="round in rounds" :key="round.round" :value="round.round">
            <AccordionHeader>
              <div class="w-full flex items-center justify-between">
                Round: {{ round.round }}
                <Button
                  icon="pi pi-trash"
                  variant="text"
                  severity="danger"
                  class="mr-2"
                  @click="deleteRound(props.gameMode, round.id)"
                ></Button>
              </div>
            </AccordionHeader>
            <AccordionContent>
              <DataTable :value="round.players">
                <Column field="name" header="Player"></Column>
                <Column field="score.dutch" header="Dutch"></Column>
                <Column field="score.blitz" header="Blitz"></Column>
                <Column field="score.roundScore" header="Score"></Column>
              </DataTable>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </template>
    </Card>
  </section>
</template>
