<template>
    <div class="title">
        {{ props.text }}
    </div>
</template>
<script setup>
const props = defineProps({ text: String })
</script>

<style scoped>
.title {
  padding: 3px 0px;
  font-size: 18px;
  width: 200px; 
  font-weight: bold;
  border-bottom: 1px solid rgba(238, 238, 238, 0.489);
  margin-bottom: 10px;
}
 
</style>