<template>
  <div class="search-field">
    <label :for="labelFor" class="search-label">{{ label }}</label>
    <div
      class="select-wrapper"
      @click="toggleDropdown"
      @keydown.space.prevent="toggleDropdown"
      @keydown.enter.prevent="toggleDropdown"
      tabindex="0"
    >
      <div class="selected-option" :class="{ open: isOpen }">
        <p>{{ selectedLabel }}</p>
        <div class="select-arrow">
          <button
            type="button"
            v-if="modelValue"
            class="clear-button"
            @click.prevent="clearSelection"
          >
            <img src="@/assets/icons/Union.svg" alt="Union" />
          </button>
          <img src="@/assets/icons/Vector.svg" alt="Vector" />
        </div>
      </div>
      <ul v-show="isOpen" class="options-list" :class="{ 'border-black': isOpen }">
        <li
          v-for="option in options"
          :key="option.value"
          @click.stop="selectOption(option)"
          @keydown.enter="selectOption(option)"
          tabindex="0"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

interface Option {
  value: number | string;
  label: string;
}

const props = defineProps<{
  label: string;
  labelFor: string;
  placeholder: string;
  options: Option[];
  modelValue: string | number | null;
}>();

const isOpen = ref(false);
const emit = defineEmits(['update:modelValue']);

const selectedLabel = computed(() => {
  const selected = props.options.find((option) => option.value === props.modelValue);
  return selected ? selected.label : props.placeholder;
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option: Option) => {
  emit('update:modelValue', option.value);
  isOpen.value = false;
};

const clearSelection = () => {
  emit('update:modelValue', null);
};

const closeDropdown = (event: MouseEvent) => {
  if (!(event.target as Element).closest('.select-wrapper')) {
    isOpen.value = false;
  }
};

watch(isOpen, (newVal) => {
  if (newVal) {
    window.addEventListener('click', closeDropdown);
  } else {
    window.removeEventListener('click', closeDropdown);
  }
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

.select-wrapper {
  display: flex;
  align-items: center;
  position: relative;
  background-color: $color-white;
  cursor: pointer;
  box-sizing: border-box;
  width: 100%;
  border: 1px solid $color-black-transparent;
  border-radius: 5px;
}

[data-theme='dark'] .select-wrapper {
  border-color: $color-white;
  background-color: $color-black;

  .selected-option {
    color: $color-white;
  }

  img {
    filter: none;
  }

  .clear-button img {
    filter: invert(100%);
  }

  .options-list.border-black {
    border-color: $color-white;
    border-top: none;
    background-color: $color-black;

    li {
      color: $color-white;
    }
  }
}

.clear-button img {
  filter: none;
}

img {
  filter: invert(100%);
}

.selected-option {
  width: 100%;
  padding: 1.1em 1.1em 1em 1.1em;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: $color-black;
  font-weight: 400;
  white-space: nowrap;
  text-overflow: ellipsis;
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;

  p {
    white-space: nowrap;
    text-overflow: ellipsis;
    box-sizing: border-box;
    height: 100%;
    overflow: hidden;
    max-width: 80%;
  }

  @include respond-to('tablet-768') {
    font-size: 0.93rem;
  }
}

.select-arrow {
  display: flex;
  align-items: center;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  gap: 4px;
}

.options-list {
  max-height: 200px;
  overflow-y: auto;
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  z-index: 100;
  background-color: $color-white;
  border: 1px solid $color-black-transparent;
  border-top: none;
  border-radius: 0 0 5px 5px;
  font-size: 1.15rem;
  font-weight: 500;
  top: 100%;
  white-space: normal;
}

.options-list::-webkit-scrollbar {
  width: 12px;
}

.options-list::-webkit-scrollbar-thumb {
  background-color: $color-slider;
  border-radius: 10px;
  border: 3px solid transparent;
  background-clip: content-box;
}

.options-list::-webkit-scrollbar-track {
  border-radius: 10px;
}

.options-list li {
  display: block;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  color: $color-black;
  list-style: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.options-list li:hover {
  background-color: $color-black;
  color: $color-white;
  cursor: pointer;
}

.selected-option.open {
  border-radius: 5px 5px 0 0;
  border: 1px solid $color-black;
  border-bottom-color: $color-black-transparent;
}

.options-list.border-black {
  border: 1px solid $color-black;
  border-top: none;
}

.clear-button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  width: 25px;
  height: 25px;
  padding: 0;
  border: none;
}

.clear-button img,
.select-arrow > img {
  width: auto;
  height: auto;
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
</style>
