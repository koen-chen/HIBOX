<template>
  <div class="header">
    <Logo src="/logo-w.png" />

    <div class="flex items-center justify-between">
      <Translate dark />

      <Account dark />
    </div>
  </div>
</template>

<script setup>


</script>

<style lang="scss" scoped>
.header {
  color: $containerBgColor;
  height: 64px;
  background-color: $primaryColor;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2),
  0 4px 5px 0 rgba(0, 0, 0, .14),
  0 1px 10px 0 rgba(0, 0, 0, .12);

  @apply flex justify-between items-center px-8;
}

.logo {
  display: inline-block;
  height: 80%;
}

</style>