<template>
    <div class="title" :style="{ fontSize: fontSize + 'px' }">
        {{ props.text }}
    </div>
</template>
<script setup>
const props = defineProps({ text: String, fontSize: Number })
</script>

<style scoped>
.title {
  padding: 3px 0px;
  /* width: 200px;  */
  font-weight: bold;
  border-bottom: 1px solid rgba(221, 217, 217, 0.489);
  margin-bottom: 10px;
}
 
</style>