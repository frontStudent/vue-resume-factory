<template>
    <!-- 蓝色字体 - 灰色长条背景 -->
    <div class="title">
      <div class="pre"></div>
      <div class="pre"></div>
        <div class="text">{{ props.text }}</div>
    </div>
</template>
<script setup>
const props = defineProps({ text: String })
</script>

<style scoped>
.pre{
  background-color: #255ca0b8;
  width: 5px;
  height: 35px;
  margin-left: 6px;
}
.title {
  background-color: #eff1f3ad;
  margin-bottom: 10px;
  border-radius: 3px;
  display: flex;
}
.text {
  font-size: 18px;
  font-weight: bold;
  color: #255ca0;
  margin: 3px 10px
}
</style>