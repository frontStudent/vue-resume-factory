<template>
    <div class="container">
        <div class="T0">基本注意事项</div>
        <div class="T2">1. 使用时不要刷新网页！该网站不会实时保存数据</div>
        <div class="T0">可能遇到的困扰：</div>
        <div class="T2">1. 我保存的简历最下方不完整，该如何解决？</div>
        <div class="T3">目前我们在保存pdf时仅会截取在浏览器窗口内部的预览区域，超出视口的预览区域会被忽视</div>
        <div class="T3">推荐您使用ctrl+鼠标滚轮去调整浏览器百分比显示，以确保简历预览区域完全处于当前览器窗口内部</div>
        <div class="T2">2. 我上传的头像照片位置和大小不满意怎么办？</div>
        <div class="T3">上传后的头像照片支持形状拉伸与位置拖拽功能</div>
        <div class="T0">未完待续</div>
    </div>
</template>
  
<script setup>

</script>
  
<style scoped>
.container {
    padding: 30px 100px;
    display: flex;
    flex-direction: column;
}
.T0 {
    font-size: 28px;
    font-weight: 800;
    margin: 15px 0px;
    padding: 5px;
    border-bottom: 1px solid #c0bfbf3c;
}
.T1 {
    font-size: 24px;
    font-weight: 750;
    margin-bottom: 10px;
}

.T2 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
}

.T3 {
    font-size: 16px;
    margin-bottom: 5px;
}
</style>
  