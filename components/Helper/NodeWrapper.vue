<template>
   <div class="node-wrapper">
      <div class="icon-box move cursor-pointer">
          <Icon name="mdi:drag-horizontal" />
      </div>
      <div class="content">
        <slot />
      </div>
    </div>
</template>

<style lang="scss" scoped>
.node-wrapper {
  width: 100%;
  margin-top: 1rem;

  @apply w-full flex items-center;

  .icon-box {
    width: 2rem;
    cursor: move;
    @apply flex items-center flex-none;
  }

  .content {
    width: 100%;
    padding: 0.8rem 0;
    border-bottom: 1px solid #dbe3e4;

    @apply flex-grow;
  }
}
</style>