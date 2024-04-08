<template>
  <Layout />
</template>

<script setup>
import Layout from '@/AppLayout.vue';
import useThemeStore from '@/stores/themeStore';
import { watchEffect } from 'vue';

const themeStore = useThemeStore();

watchEffect(() => {
  document.body.dataset.theme = themeStore.theme;
});
</script>

<style lang="scss"></style>
