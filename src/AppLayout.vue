<template>
  <div class="app-layout">
    <HeaderSection />
    <ImageGallery />
    <ImagesPagination />
  </div>
</template>

<script setup>
import HeaderSection from '@/components/HeaderSection.vue';
import ImageGallery from '@/components/ImageGallery.vue';
import ImagesPagination from '@/components/ImagesPagination.vue';
</script>

<style scoped lang="scss">
@import 'assets/_mixins.scss';
@import 'assets/_variables.scss';

.app-layout {
  display: grid;
  grid-template-columns: 1fr;
  margin: 0 auto;
  width: 92%;

  @include respond-to('tablet-768') {
    width: 91%;
  }

  @include respond-to('tablet-1024') {
    width: 92%;
  }

  @include respond-to('desktop') {
    width: 83%;
  }
}
</style>
