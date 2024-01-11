<template>
    <!-- 若图片只设置宽度，可以保持等比例展示图片 -->
    <el-image v-if="imgUrl !== ''" :src="imgUrl" v-resize class="avatar-uploader"/>
    <!-- <el-image v-if="imgUrl !== ''" :src="imgUrl" style="width: 100%;" :preview-src-list="[imgUrl]" /> -->
    <el-icon v-else class="avatar-uploader-icon" @click="dialogVisible = true">
      <Plus />
    </el-icon>
  <el-dialog v-model="dialogVisible" draggable title="裁剪头像" align-center>
    <div style="width: 600px; height: 400px;">
      <vueCropper style="width: 100%; height: 100%;" ref="cropper" :img="option.img" :outputSize="option.outputSize"
        :outputType="option.outputType" :info="option.info" :canScale="option.canScale" :autoCrop="option.autoCrop"
        :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight" :fixedBox="option.fixedBox"
        :fixed="option.fixed" :fixedNumber="option.fixedNumber" :canMove="option.canMove" :canMoveBox="option.canMoveBox"
        :original="option.original" :centerBox="option.centerBox" :infoTrue="option.infoTrue" :full="option.full"
        :enlarge="option.enlarge" :mode="option.mode">
      </vueCropper>
    </div>
    <el-space style="width: 100%; height: 60px; margin-top: 10px;">
      <!-- 注意这里的action=""和 :auto-upload="false"，我把自动上传关了，免得点击上传图片的时候发送一次请求 -->
      <el-upload v-model:file-list="fileList" action="" :auto-upload="false" :show-file-list="false"
        :on-change="handleChange">
        <el-button type="primary">点击上传图片</el-button>
      </el-upload>
      <el-button type="primary" plain @click="rotateLeft">向左旋转图片</el-button>
      <el-button type="primary" plain @click="rotateRight">向右旋转图片</el-button>
    </el-space>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
  
<script setup>
import 'vue-cropper/dist/index.css'
import { VueCropper } from "vue-cropper";
import { ref, reactive, watchEffect } from 'vue';
import { Plus } from '@element-plus/icons-vue'

import { vResize } from '../directives/VResize'
const props = defineProps({ showUploader: Boolean })

const dialogVisible = ref(false)

watchEffect(() => {
  dialogVisible.value = props.showUploader
})

const imgUrl = ref('')

const fileList = ref([])
let option = reactive({
  img: '', // 裁剪图片的地址 url 地址, base64, blob
  outputSize: 1, // 裁剪生成图片的质量
  outputType: 'jpeg', // 裁剪生成图片的格式 jpeg, png, webp
  info: true, // 裁剪框的大小信息
  canScale: false, // 图片是否允许滚轮缩放
  autoCrop: true, // 是否默认生成截图框
  autoCropWidth: 300, // 默认生成截图框宽度
  autoCropHeight: 450, // 默认生成截图框高度
  fixedBox: false, // 固定截图框大小 不允许改变
  fixed: true, // 是否开启截图框宽高固定比例，这个如果设置为true，截图框会是固定比例缩放的，如果设置为false，则截图框的狂宽高比例就不固定了
  fixedNumber: [1, 1.5], // 截图框的宽高比例 [ 宽度 , 高度 ]
  canMove: true, // 上传图片是否可以移动
  canMoveBox: true, // 截图框能否拖动
  original: false, // 上传图片按照原始比例渲染
  centerBox: true, // 截图框是否被限制在图片里面
  infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
  full: true, // 是否输出原图比例的截图
  enlarge: '1', // 图片根据截图框输出比例倍数
  mode: 'contain' // 图片默认渲染方式 contain , cover, 100px, 100% auto
})
const cropper = ref()
// 向左旋转图片
const rotateLeft = () => {
  // 这个默认是旋转90度的，官网有说明
  // 后面会完善不要让这个一下子旋转90度的代码
  cropper.value.rotateLeft()
}

// 向右旋转
const rotateRight = () => {
  // 这个默认也是旋转90度的，官网有说明
  // 后面会完善不要让这个一下子旋转90度的代码
  cropper.value.rotateRight()
}


const handleConfirm = () => {
  // 这个是获取base64的图片
  cropper.value.getCropData((data) => {
    // do something
    // 如这里，可以获取上传base64位的图片给服务器
    // 也可以将base64位的图片转化为file文件，然后通过form表单的形式提交给后端，让后端返回一个图片的访问地址等
    // 这里就简单把截取到的图片展示一下吧，这里就暂时不上传给后端了
    imgUrl.value = data
  })
  dialogVisible.value = false
}

const handleChange = (
  uploadFile
) => {
  // URL.createObjectURL(uploadFile.raw!)，将图片变成blob的数据，类似于blob:http://127.0.0.1:5173/dbaf505d-df43-4448-809d-8daadf3e883c
  option.img = URL.createObjectURL(uploadFile.raw)
}

</script>
  
<style scoped>
.avatar-uploader {
  width: 80px;
  height: 120px;
  border-radius: 6px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 90%;
  top: 55%
}

.el-icon.avatar-uploader-icon {
  width: 80px;
  height: 120px;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  font-size: 28px;
  cursor: pointer;
  color: #8c939d;
  position: absolute;
  text-align: center;
  right: 5%;
  top: 5%
}
</style>
  
  
  