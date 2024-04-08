<template>
  <div class="search-bar">
    <SearchInput label="Name" label-for="search-name" placeholder="Name" v-model="filterByName" />
    <SearchSelect
      label="Author"
      label-for="search-author"
      placeholder="Author"
      :options="authorsOptions"
      v-model="selectedAuthorId"
      @update:modelValue="updateAuthorFilter"
    />
    <SearchSelect
      label="Location"
      label-for="search-location"
      placeholder="Location"
      :options="locationsOptions"
      v-model="selectedLocationId"
      @update:modelValue="updateLocationFilter"
    />
    <InputCreated
      placeholder="Created"
      v-model="selectedCreatedDate"
      @update:modelValue="updateDateFilter"
      label-before="CreatedBefore"
      label-from="CreatedFrom"
      label-for-before="CreatedBefore"
      label-for-from="CreatedFrom"
      placeholder-from="from"
      placeholder-before="before"
    />
  </div>
</template>

<script setup lang="ts">
import InputCreated from '@/components/common/InputCreated.vue';
import SearchInput from '@/components/common/SearchInput.vue';
import SearchSelect from '@/components/common/SearchSelect.vue';
import type { DateFilter } from '@/types/interfaces';

import { computed, onMounted, ref, watch } from 'vue';
import useGalleryStore from '@/stores/galleryStore';

const selectedAuthorId = ref<number | null>(null);
const selectedLocationId = ref<number | null>(null);
const filterByName = ref('');
const selectedCreatedDate = ref<DateFilter>({ from: '', before: '' });
const galleryStore = useGalleryStore();

onMounted(async () => {
  if (galleryStore.authors.length === 0) {
    await galleryStore.loadAuthors();
  }

  if (galleryStore.locations.length === 0) {
    await galleryStore.loadLocations();
  }
});

watch(filterByName, (newValue) => {
  galleryStore.setFilterByName(newValue);
});

const authorsOptions = computed(() =>
  galleryStore.authors.map((author) => ({ value: author.id, label: author.name }))
);

const locationsOptions = computed(() =>
  galleryStore.locations.map((location) => ({ value: location.id, label: location.location }))
);

const updateAuthorFilter = (newAuthorFilter: number | null) => {
  selectedAuthorId.value = newAuthorFilter;
  galleryStore.setAuthorFilter(newAuthorFilter);
};

const updateLocationFilter = (newLocationFilter: number | null) => {
  selectedLocationId.value = newLocationFilter;
  galleryStore.setLocationFilter(newLocationFilter);
};

const updateDateFilter = (newDateFilter: DateFilter) => {
  selectedCreatedDate.value = newDateFilter;
  galleryStore.setCreatedFilter(newDateFilter);
};
</script>

<style scoped lang="scss">
@import '@/assets/variables';
@import '@/assets/mixins';

.search-bar {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1rem;
  box-sizing: border-box;

  @include respond-to('tablet-768') {
    grid-template-columns: repeat(4, calc(25% - 10px));
  }
}
</style>
