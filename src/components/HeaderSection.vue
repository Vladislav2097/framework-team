<template>
  <header class="header-section">
    <div class="logo-themeToggle">
      <AppLogo />
      <ThemeToggle />
    </div>
    <SearchBar />
  </header>
</template>

<script setup>
import AppLogo from '@/components/common/AppLogo.vue';
import SearchBar from '@/components/common/SearchBar.vue';
import ThemeToggle from '@/components/common/ThemeToggle.vue';
</script>

<style lang="scss" scoped>
@import '@/assets/mixins';
@import '@/assets/variables';

.header-section {
  width: 100%;
  padding-top: 1.8rem;
  margin-bottom: 3.2rem;

  @include respond-to('tablet-768') {
    padding-top: 2.5rem;
  }
}

.logo-themeToggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.8rem;

  @include respond-to('tablet-768') {
    margin-bottom: 2.5rem;
  }
}
</style>
