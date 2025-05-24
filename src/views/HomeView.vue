<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const multiSelected = ref(false)
const roomId = ref('')

function soloClick() {
  router.push({ name: 'SoloGameSettings' })
}

function multiClick() {
  multiSelected.value = !multiSelected.value
}

function hostRoom() {
  router.push('/multi/' + uuidv4())
}

function joinRoom() {
  router.push('/multi/' + roomId.value)
}
</script>

<template>
  <section v-if="!multiSelected">
    <Card class="mb-10">
      <template #title>Solo</template>
      <template #content>
        <p>Use this mode if you want to track scores for all players in your group.</p>
      </template>
      <template #footer>
        <Button
          size="small"
          variant="outlined"
          severity="info"
          label="Create Solo Game"
          @click="soloClick"
        ></Button>
      </template>
    </Card>

    <Card>
      <template #title>Multi</template>
      <template #content>
        <p>
          Host or Join a room with multiple friends and let everyone keep track of their own score.
        </p>
      </template>
      <template #footer>
        <Button
          size="small"
          variant="outlined"
          label="Play with Friends"
          @click="multiClick"
        ></Button>
      </template>
    </Card>
  </section>

  <section v-if="multiSelected">
    <Card class="mb-10">
      <template #title>Host Room</template>
      <template #content>
        <p>Host a new game and share room codes with friends to let them track their scores.</p>
      </template>
      <template #footer>
        <Button
          size="small"
          variant="outlined"
          severity="info"
          label="Host Room"
          @click="hostRoom"
        ></Button>
      </template>
    </Card>

    <Card class="mb-5">
      <template #title>Join Room</template>
      <template #content>
        <p class="mb-3">
          If someone is already hosting a room and sent you a room code enter it here.
        </p>
        <IftaLabel>
          <InputText id="roomId" v-model="roomId" variant="filled" class="w-full" />
          <label for="roomId">Room Number</label>
        </IftaLabel>
      </template>
      <template #footer>
        <Button size="small" variant="outlined" label="Join Room" @click="joinRoom"></Button>
      </template>
    </Card>

    <div class="btn-row">
      <Button variant="outlined" severity="secondary" label="Back" @click="multiClick"></Button>
    </div>
  </section>
</template>

<style>
.p-card-content {
  margin-bottom: 10px;
}

.p-card-footer,
.btn-row {
  display: flex;
  justify-content: end;
}
</style>
