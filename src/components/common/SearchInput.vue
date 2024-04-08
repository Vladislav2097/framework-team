<template>
  <div class="search-field">
    <label :for="labelFor" class="search-label">{{ label }}</label>
    <input
      :id="labelFor"
      type="text"
      :placeholder="placeholder"
      class="search-input"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  labelFor: string;
  placeholder: string;
  modelValue: string | number | null;
}>();

defineEmits(['update:modelValue']);
</script>

<style scoped lang="scss">
@import '@/assets/variables';
@import '@/assets/mixins';

.search-field {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  border: 1px solid $color-black-transparent;
  border-radius: 5px;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 1.1em 1.1em 1em 1.1em;
  font-size: 1rem;
  font-weight: 400;

  @include respond-to('tablet-768') {
    font-size: 0.93rem;
  }
}

.search-input :hover {
  border-color: $color-black;
}

[data-theme='dark'] .search-input {
  border-color: $color-white;
  background-color: $color-black;
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
