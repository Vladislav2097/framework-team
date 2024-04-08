<template>
  <div>
    <button type="button" class="clear-button" @click="toggleTheme">
      <img :src="themeStore.themeIcon" alt="Toggle Theme" />
    </button>
  </div>
</template>

<script setup>
import useThemeStore from '@/stores/themeStore';

const themeStore = useThemeStore();

function toggleTheme() {
  themeStore.toggleTheme();
}
</script>

<style lang="scss" scoped>
.clear-button {
  background: none;
  border: none;
  cursor: pointer;
}

img {
  width: 22px;
}
</style>
