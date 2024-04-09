<template>
  <div class="nav-buttons">
    <navigation-button class="btn-first-page" @click="setFirstPage" :disabled="currentPage === 1"
      >&lt;&lt;</navigation-button
    >
    <navigation-button @click="setPreviousPage" :disabled="currentPage <= 1"
      >&lt;</navigation-button
    >
    <navigation-button
      v-for="page in totalPages"
      :key="page"
      @click="setPage(page)"
      class="btn"
      :class="{ active: currentPage === page }"
      :disabled="currentPage === page"
    >
      {{ page }}
    </navigation-button>
    <navigation-button @click="setNextPage" :disabled="currentPage >= totalPages"
      >&gt;</navigation-button
    >
    <navigation-button
      class="btn-last-page"
      @click="setLastPage"
      :disabled="currentPage === totalPages"
      >&gt;&gt;</navigation-button
    >
  </div>
</template>

<script setup lang="ts">
import NavigationButton from '@/components/common/PaginationButton.vue';
import useGalleryStore from '@/stores/galleryStore'
import { storeToRefs } from 'pinia';

const galleryStore = useGalleryStore();
const { currentPage, totalPages } = storeToRefs(galleryStore);

const setPage = (page: number) => {
  galleryStore.setPage(page);
};

const setPreviousPage = () => {
  galleryStore.setPage(currentPage.value - 1);
};

const setNextPage = () => {
  galleryStore.setPage(currentPage.value + 1);
};

const setFirstPage = () => {
  galleryStore.setPage(1);
};

const setLastPage = () => {
  galleryStore.setPage(totalPages.value);
};
</script>

<style lang="scss" scoped>
@import '@/assets/variables';
@import '@/assets/mixins';

.nav-buttons {
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-bottom: 34px;

  @include respond-to('tablet-768') {
    margin-bottom: 54px;
  }

  @include respond-to('tablet-1024') {
    margin-bottom: 62px;
  }

  @include respond-to('desktop') {
    margin-bottom: 97px;
  }
}

.btn.active {
  background-color: $color-black;
  color: $color-white;
}

[data-theme='dark'] .nav-buttons {
  .btn.active {
    background-color: $color-white;
    color: $color-black;
  }
}

.btn-first-page {
  border-radius: 5px 0 0 5px;
}

.btn-last-page {
  border-radius: 0 5px 5px 0;
}
</style>
