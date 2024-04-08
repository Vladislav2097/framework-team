<template>
  <div class="search-field">
    <div
      class="dropdown"
      :class="{ open: isOpen }"
      @click="toggleDropdown"
      @keyup.enter="toggleDropdown"
      tabindex="0"
    >
      <button class="dropdown-btn" type="button">
        <span>Created</span>
        <img src="@/assets/icons/Vector.svg" alt="Vector" />
      </button>

      <div class="dropdown-content" v-show="isOpen">
        <label :for="labelForFrom" class="search-label">{{ labelFrom }}</label>
        <input
          :id="labelForFrom"
          type="text"
          :placeholder="placeholderFrom"
          :value="modelValue.from"
          @input="updateValue({ ...modelValue, from: ($event.target as HTMLInputElement).value })"
          @click.stop
        />
        <span class="divider">—</span>
        <label :for="labelForBefore" class="search-label">{{ labelBefore }}</label>
        <input
          :id="labelForBefore"
          type="text"
          :placeholder="placeholderBefore"
          :value="modelValue.before"
          @input="updateValue({ ...modelValue, before: ($event.target as HTMLInputElement).value })"
          @click.stop
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DateFilter } from '@/types/interfaces';
import { ref, onMounted, onUnmounted } from 'vue';

defineProps<{
  labelFrom: string;
  labelForFrom: string;
  placeholderFrom: string;
  labelBefore: string;
  labelForBefore: string;
  placeholderBefore: string;
  modelValue: DateFilter;
}>();

const emit = defineEmits(['update:modelValue']);

const updateValue = (newValue: { from: string | null; before: string | null }) => {
  emit('update:modelValue', newValue);
};

const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = (event: MouseEvent) => {
  if (!(event.target as Element).closest('.dropdown')) {
    isOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('click', closeDropdown);
});

onUnmounted(() => {
  window.removeEventListener('click', closeDropdown);
});
</script>

<style scoped lang="scss">
@import '@/assets/variables';
@import '@/assets/mixins';

.search-field {
  position: relative;
  display: flex;
  align-items: center;
}

.dropdown {
  position: relative;
  display: block;
  width: 100%;
  box-sizing: border-box;
}

.dropdown-btn {
  width: 100%;
  background-color: $color-white;
  padding: 1.1em 1.1em 1em 1.1em;
  border: 1px solid $color-black-transparent;
  border-radius: 5px;
  text-align: left;
  cursor: pointer;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  position: relative;
  font-size: 1rem;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @include respond-to('tablet-768') {
    font-size: 0.93rem;
  }
}

[data-theme='dark'] .search-field {
  .dropdown-btn {
    border: 1px solid $color-white;
    background-color: $color-black;
    color: $color-white;
  }

  .dropdown.open .dropdown-btn {
    border-color: $color-white;
  }

  .dropdown.open .dropdown-content {
    border-color: $color-white;
  }

  .dropdown-content {
    background-color: $color-black;
    border-color: $color-white;
  }

  .divider {
    color: $color-white;
  }

  img {
    filter: none;
  }
}

.dropdown.open .dropdown-btn {
  border: 1px solid $color-black;
  border-bottom: none;
  border-radius: 5px 5px 0 0;
}

.dropdown-content {
  display: none;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  z-index: 1;
  border: 1px solid $color-black-transparent;
  border-radius: 0 0 5px 5px;
  border-top: none;
  background-color: $color-white;
  padding-top: 1em;
  padding-bottom: 1em;
}

.dropdown.open .dropdown-content {
  display: flex;
  border: 1px solid $color-black;
  border-top: none;
}

.dropdown-content input {
  background-color: $color-light-gray;
  width: calc(50% - 30px);
  margin: 0.5em 0;
  padding: 10px;
  border: none;
  border-radius: 5px;
}

.divider {
  margin: 0 0.5em;
  color: $color-black-transparent;
  font-size: 1rem;
  width: auto;
}

.search-label {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

img {
  filter: invert(100%);
}

@media (min-width: 768px) {
  .dropdown-content {
    flex-direction: row;
    align-items: center;
  }

  .divider {
    margin: 0 0.5em;
    width: auto;
  }

  .dropdown.open .dropdown-btn {
    border-bottom: none;
    border-radius: 5px 5px 0 0;
  }

  .dropdown-content input {
    width: calc(50% - 20px);
  }
}
</style>
