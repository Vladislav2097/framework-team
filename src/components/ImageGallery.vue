<template>
  <div class="gallery-wrapper">
    <div v-if="loading">...Загрузка</div>
    <div v-else-if="error">Ошибка: {{ error }}</div>
    <div v-else class="image-gallery">
      <ImageCard
        v-for="image in images"
        :key="image.id"
        :image="image"
        :authors="authors"
        :locations="locations"
        class="image-card"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useGalleryStore from '@/stores/galleryStore';
import { storeToRefs } from 'pinia';
import ImageCard from '@/components/ImageCard.vue';
import { onMounted } from 'vue';

const galleryStore = useGalleryStore();
const { images, loading, error, authors, locations } = storeToRefs(galleryStore);

onMounted(async () => {
  await galleryStore.loadImages();
});
</script>

<style scoped lang="scss">
@import '@/assets/mixins';
@import '@/assets/variables';

.gallery-wrapper {
  margin-bottom: 2.2em;
  width: 100%;

  @include respond-to('tablet-768') {
    margin-bottom: 2.5em;
  }

  @include respond-to('tablet-1024') {
    margin-bottom: 2.8em;
  }
}

.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  justify-content: center;

  @include respond-to('tablet-768') {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to('tablet-1024') {
    grid-template-columns: repeat(3, 1fr);
  }
}

.image-card {
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
