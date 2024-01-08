<template>
    <div class="title">
        {{ props.text }}
    </div>
    <div class="bottom"></div>
</template>
<script setup>
const props = defineProps({ text: String, themeColor: String, bgColor: String })
</script>

<style scoped>
.title {
  padding: 0px 10px;
  font-size: 18px;
  font-weight: bold;
  color: v-bind(themeColor);
  width: 130px;
  height: 0;
  border-bottom: 30px solid v-bind(bgColor); /* 调整这个值来控制直角梯形的高度 */
  border-right: 30px solid transparent; /* 调整这个值来控制直角梯形的左边宽度 */
}
 
.bottom{
    height: 2px;
    margin-top: -1px;
    margin-bottom: 10px;
    background-color: v-bind(bgColor);
}
</style>