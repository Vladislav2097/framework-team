<template>
  <button type="button" class="btn" @click="handleClick" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  disabled: boolean;
}>();

const emit = defineEmits<{
  (e: 'click'): void;
}>();

function handleClick() {
  emit('click');
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables';

.btn {
  padding: 10px 20px;
  background-color: $color-white;
  color: $color-black;
  border: 1px solid $color-black-transparent;
  width: 41px;
  height: 41px;
  font-weight: 500;
  font-size: 1.3rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: $color-button-hover-light;
  }

  &:disabled {
    background-color: $color-white;
    color: $color-black-transparent;
    cursor: default;
    border-color: $color-black-transparent;
  }
}

[data-theme='dark'] .btn {
  background-color: $color-black;
  color: $color-white;
  border-color: $color-white;

  &:hover {
    background-color: $color-button-hover-dark;
  }

  &:disabled {
    background-color: $color-black;
    color: $color-white-transparent;
    border-color: $color-white-transparent;
  }
}
</style>
