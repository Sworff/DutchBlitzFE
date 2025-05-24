<template>
  <header>
    <h1><RouterLink to="/">Dutch Blitz</RouterLink></h1>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  display: flex;
  justify-content: center;
}
</style>
