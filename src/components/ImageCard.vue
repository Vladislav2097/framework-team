<template>
  <div class="image-card">
    <div class="image-container">
      <img :src="`https://test-front.framework.team/${image.imageUrl}`" :alt="image.name" />
      <div class="overlay">
        <div class="image-info">
          <h3>{{ image.name }}</h3>
          <p>
            Author: <span class="light-text">{{ authorName }}</span>
          </p>
          <p>
            Created: <span class="light-text">{{ image.created }}</span>
          </p>
          <p>
            Location: <span class="light-text">{{ locationName }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Author, Image, Location } from '@/types/interfaces';
import { computed } from 'vue';

const props = defineProps<{
  image: Image;
  authors: Author[];
  locations: Location[];
}>();

const authorName = computed(() => {
  const author = props.authors.find((a) => a.id === props.image.authorId);
  return author ? author.name : 'Неизвестный автор';
});

const locationName = computed(() => {
  const location = props.locations.find((l) => l.id === props.image.locationId);
  return location ? location.location : 'Неизвестная локация';
});
</script>

<style scoped lang="scss">
@import '@/assets/variables';

.image-card {
  border-radius: 20px;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  width: 100%;
  .image-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 20px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      transition: background-color 0.3s;
    }
    .image-info {
      height: auto;
      overflow: visible;
      background-color: $color-white-transparent;
      color: $color-black;
      text-align: center;
      width: 100%;
      transition:
        transform 0.3s,
        opacity 0.3s,
        height 0.3s ease;
      box-sizing: border-box;
      padding: 5px 15px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      h3 {
        margin: 0;
        min-height: 1rem;
        font-size: 1.3rem;
        font-weight: 700;
        order: -1;
        position: relative;
      }
      p {
        opacity: 0;
        transition: opacity 0.3s;
        height: 0;
        font-size: 0.93rem;
        font-weight: 500;
      }
    }
    .light-text {
      font-weight: 300;
    }

    &:hover {
      .image-info {
        height: 50%;
        display: flex;
        flex-direction: column;
        h3 {
          min-height: 1rem;
        }
        p {
          opacity: 1;
          height: auto;
        }
      }
    }
  }
}
</style>
