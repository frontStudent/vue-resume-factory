<template>
  <div class="container">
    <div class="form-area">
      <el-timeline>
        <el-timeline-item v-for="({ timestamp, id, detail }, index) in moduleList" :key="index" placement="top"
          size='large' type='primary' icon='MoreFilled' :timestamp="timestamp">
          <el-form label-width="80px" v-if="id === 0">
            <div v-for="(field, index) in formFields" :key="index" class="field">
              <el-form-item label="字段名" style="width: 220px">
                <el-input v-model="field.label" placeholder="字段名"></el-input>
              </el-form-item>
              <el-form-item label="字段值" style="width: 220px">
                <el-input v-model="field.value" placeholder="字段值"></el-input>
              </el-form-item>
              <el-button @click="removeField(index)" style="margin-left: 20px;"><el-icon>
                  <Delete />
                </el-icon></el-button>
            </div>
            <el-form-item>
              <el-button type="primary" @click="addField">添加自定义字段</el-button>
            </el-form-item>
          </el-form>
          <div v-else>
            <el-form label-width="80px">
              <div v-for="(field, index) in detail" :key="index">
                <div class="time-sec" v-if="field.type === 'time'">
                  <el-form-item label="时间跨度">
                    <el-date-picker v-model="field.dateRange" type="daterange" start-placeholder="起始日期"
                      end-placeholder="结束日期" />
                  </el-form-item>
                  <el-form-item label="信息1">
                    <el-input v-model="field.info1" placeholder="信息1"></el-input>
                  </el-form-item>
                  <el-form-item label="信息2">
                    <el-input v-model="field.info2" placeholder="信息2"></el-input>
                  </el-form-item>
                  <el-button @click="removeSec(id, index)" style="margin-left: 20px;"><el-icon>
                      <Delete />
                    </el-icon></el-button>
                </div>
                <div class="desc" v-if="field.type === 'desc'">
                  <el-form-item label="描述">
                    <el-input v-model="field.desc" placeholder="描述" autosize type="textarea" style="width: 280px;">
                    </el-input>
                  </el-form-item>
                  <el-button @click="removeSec(id, index)" style="margin-left: 20px;"><el-icon>
                      <Delete />
                    </el-icon></el-button>
                </div>
              </div>
              <el-space style="margin: 20px;">
                <el-button type="primary" @click="addSec(id, 0)">添加时间段</el-button>
                <el-button type="primary" @click="addSec(id, 1)">添加描述</el-button>
              </el-space>
            </el-form>
          </div>
          <el-space>
            <el-button @click="addModule(index)">在下方插入模块</el-button>
            <el-button @click="removeModule(index)" :disabled="id === 0">删除当前模块</el-button>
            <el-button @click="editModule(index)">修改当前模块名</el-button>
            <el-button @click="moveModule(index, 0)"><el-icon>
                <Top />
              </el-icon></el-button>
            <el-button @click="moveModule(index, 1)"><el-icon>
                <Bottom />
              </el-icon></el-button>
          </el-space>
        </el-timeline-item>
      </el-timeline>
    </div>

    <div class="display-area" ref="previewElement" id="previewElement"
      :style="{ fontSize: drawerInfo.moduleTextSize + 'px', top: previewTop }">
      <div class="preview">
        <div ref="captureElement" style="position: relative">
          <ImgCropper :showUploader="showUploader" />
          <div class="resume-header" v-if="drawerInfo.showHeaderText">{{ drawerInfo.headerText }}</div>
          <!-- <MagicBox :style="{ fontSize: '15px' }" :value="drawerInfo.headerText"></MagicBox> -->
          <div v-for="(_module, index) in moduleList" :key="index" class="module">
            <component :is="themeMap[drawerInfo.titleStyle]" :text="_module.timestamp" :themeColor="drawerInfo.themeColor"
              :bgColor="drawerInfo.bgColor" :fontSize="drawerInfo.moduleTitleSize"
              v-if="!(_module.id === 0 && drawerInfo.templateType === '0')" />

            <!-- 基础信息模块 -->
            <div class="base-info-area" v-if="_module.id === 0">
              <el-row v-if="drawerInfo.templateType === '1'">
                <div style="width: 400px">
                  <el-row v-for="(row, index) in _formFields" :key="index" :gutter="40">
                    <el-col v-for="({ label, value }) in row" :key="label" :span="10">
                      {{ label }}: {{ value }}
                    </el-col>
                  </el-row>
                </div>
              </el-row>
              <div v-if="drawerInfo.templateType === '0'" style="marginBottom: '30px';">
                <el-row>
                  <div style="width: 400px">
                    <div
                      :style="{fontWeight: 750, marginBottom: '2px', fontSize: drawerInfo.moduleTitleSize + 5 + 'px' }">
                      {{ name }}
                    </div>
                    <el-row v-for="(row, index) in _formFields" :key="index" :gutter="40">
                      <el-col v-for="({ label, value }) in row" :key="label" :span="10">
                        {{ label }}: {{ value }}
                      </el-col>
                    </el-row>
                  </div>
                </el-row>
              </div>
            </div>

            <!-- 其他模块渲染 -->
            <div v-else>
              <div v-for="({ type, dateRange, info1, info2, desc }, index) in _module.detail" :key="index">
                <div v-if="type === 'time'" class="time-sec-view">
                  <div>{{ dayjs(dateRange[0]).format('YYYY-MM-DD') }} ~ {{ dayjs(dateRange[1]).format('YYYY-MM-DD')
                  }}</div>
                  <div>{{ info1 }} </div>
                  <div>{{ info2 }}</div>
                </div>
                <div v-if="type === 'desc'" class="desc-view">
                  {{ desc }}
                </div>
                <!-- <MagicBox v-if="type === 'desc'" :resizable="false"
                  :style="{ fontSize: drawerInfo.moduleTextSize + 'px' }">{{
                    desc }}</MagicBox> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog v-model="dialogInfo.visible" :title="dialogInfo.op === 'add' ? '新增模块' : '修改模块'">
      <el-form-item label="模块名称" label-width="80px" :rules="[{ required: true }]">
        <el-input v-model="dialogInfo.name" autocomplete="off" placeholder="请输入模块名称" />
      </el-form-item>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogInfo.visible = false">取消</el-button>
          <el-button type="primary" @click="submitModule">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-drawer v-model="drawerInfo.visible" title="更多配置" size="450">
      <el-form label-position="top">
        <div class="setting-title">标题样式</div>
        <el-form :inline="true">
          <el-form-item label="文字颜色">
            <el-color-picker v-model="drawerInfo.themeColor" />
          </el-form-item>
          <el-form-item label="背景颜色">
            <el-color-picker v-model="drawerInfo.bgColor" />
          </el-form-item>
        </el-form>
        <el-descriptions :column="2">
          <el-descriptions-item v-for="(img, index) in moduleTitleImgs" :key="index"><el-image :src="img.src"
              class="module-title-image" lazy @click="drawerInfo.titleStyle = img.value" /></el-descriptions-item>
        </el-descriptions>

        <div class="setting-title">字体大小</div>
        <el-form label-position="left" style="width: 400px">
          <el-form-item label="模块标题">
            <el-slider v-model="drawerInfo.moduleTitleSize" :step="0.5" :min="16.5" :max="19.5" show-stops />
          </el-form-item>
          <el-form-item label="模块内容">
            <el-slider v-model="drawerInfo.moduleTextSize" :step="0.5" :min="12" :max="16" show-stops />
          </el-form-item>
        </el-form>
        <div class="setting-title">基础信息排版</div>
        <el-radio-group v-model="drawerInfo.templateType">
          <el-radio label="0" size="large">经典</el-radio>
          <el-radio label="1" size="large">与其他模块平级</el-radio>
        </el-radio-group>
        <div class="setting-title">顶部区域</div>
        <el-form>
          <el-checkbox v-model="drawerInfo.showHeaderText" label="是否需要顶部区域" size="large" />
          <el-form-item label="顶部文字内容">
            <el-input v-model="drawerInfo.headerText" placeholder="请输入顶部文字内容" style="width: 300px"></el-input>
          </el-form-item>
        </el-form>
      </el-form>
    </el-drawer>

    <div class="op-but" :style="{ top: previewTop }">
      <el-tooltip content="更多配置" placement="left">
        <el-icon size="18" @click="drawerInfo.visible = true">
          <Setting />
        </el-icon>
      </el-tooltip>
      <el-tooltip content="保存为PDF" placement="left">
        <el-icon size="18" @click="capture">
          <Download />
        </el-icon>
      </el-tooltip>
      <el-tooltip content="上传头像照片" placement="left">
        <el-icon size="18" @click="handleShowUploader">
          <Picture />
        </el-icon>
      </el-tooltip>
      <!-- <el-tooltip content="创建文本框" placement="left">
        <el-icon size="18" @click="handleCreateMagicBox"><FullScreen /></el-icon>
      </el-tooltip> -->
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watchEffect, onMounted } from 'vue';
import { ElMessage } from 'element-plus'
import { Setting, Download, Delete, Top, Bottom, Picture } from '@element-plus/icons-vue'
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import dayjs from 'dayjs';

import DefaultTitle from '../components/moduleTitle/DefaultTitle.vue';
import PlainTitle from '../components/moduleTitle/PlainTitle.vue';
import BlueGrayTitle from '../components/moduleTitle/BlueGrayTitle.vue';
import RecTitle from '../components/moduleTitle/RecTitle.vue';
import ImgCropper from '../components/ImgCropper.vue';
import _moduleList from '../constant/staticInfo.js';
import { moduleTitleImgs } from '../constant/imgUrls'

import { getTwoDimArray } from '../utils/getTwoDimArray'
import '../style/index.css'

const captureElement = ref(null);
const previewElement = ref(null);

const curModuleIndex = ref(0);

const showUploader = ref(false);

const magicBoxNum = ref(0);

const formFields = reactive([
  { label: '姓名', value: '林远' },
  { label: '年龄', value: '23' },
  { label: '籍贯', value: '山东青岛' },
  { label: '学历', value: '硕士' },
  { label: '工作经验', value: '2年' }
]);

// 新增/修改模块弹窗信息
const dialogInfo = reactive({
  visible: false,
  op: 'add',
  name: '',
})

// 配置drawer信息
const drawerInfo = reactive({
  visible: false,
  titleStyle: '0',
  themeColor: '#FEFFFF',
  bgColor: '#255ca0b8',
  templateType: '0',
  moduleTitleSize: 17,
  moduleTextSize: 13.5,
  headerText: '- PERSONAL RESUME -',
  showHeaderText: false
})

let moduleList = reactive(_moduleList);

const themeMap = {
  0: DefaultTitle,
  1: PlainTitle,
  2: BlueGrayTitle,
  3: RecTitle
}

const previewTop = ref('80px'); // 预览区域距离顶部的距离

// const handleCreateMagicBox = () => {
//   magicBoxNum.value++;
// }

const handleShowUploader = () => {
  showUploader.value = true;
}
// 监听滚动事件
const handleScroll = () => {
  if (window.scrollY >= 55) {
    previewTop.value = '20px';
    return
  }
  previewTop.value = '80px';
};

// 在组件挂载时添加滚动事件监听
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});
const _formFields = computed(() => {
  const formFieldsWithoutName = formFields.filter(item => item.label !== '姓名')

  // 在渲染基础信息表单时，如果是模板类型1，姓名字段会单独加粗放大显示在顶部，无需在表单中显示
  const curFormFields = drawerInfo.templateType === '0' ? formFieldsWithoutName : formFields
  return getTwoDimArray(2, curFormFields)
})

const name = computed(() => {
  return formFields.find(item => item.label === '姓名')?.value || '你的姓名'
})

// 基础信息增删操作
const addField = () => {
  formFields.push({ label: '', value: '' });
};
const removeField = (index) => {
  formFields.splice(index, 1);
};

// 时间段/文字描述增删操作
const addSec = (moduleId, type) => {
  let mod = moduleList.find(m => m.id === moduleId)
  if (type === 0) {
    mod.detail = [...mod.detail, { dateRange: [dayjs(), dayjs()], info1: '华中科技大学', info2: '计算机科学与技术', type: 'time' }]
    return
  }
  mod.detail = [...mod.detail, { desc: '请描述你的经历/技能！', type: 'desc' }];
}
const removeSec = (moduleId, index) => {
  let mod = moduleList.find(m => m.id === moduleId)
  mod.detail.splice(index, 1);
}

// 模块增删操作
const addModule = (index) => {
  dialogInfo.op = 'add';
  dialogInfo.visible = true;
  curModuleIndex.value = index;
}

const submitModule = () => {
  dialogInfo.visible = false;
  if (dialogInfo.op === 'add') {
    moduleList.splice(curModuleIndex.value + 1, 0, { id: new Date().getTime(), timestamp: dialogInfo.name, detail: [] });
  }
  else {
    moduleList[curModuleIndex.value].timestamp = dialogInfo.name;
  }
  dialogInfo.name = '';
}

const removeModule = (index) => {
  moduleList.splice(index, 1);
}

const editModule = (index) => {
  dialogInfo.op = 'edit';
  dialogInfo.visible = true;
  curModuleIndex.value = index;
}

// op 0 表示前移 ，1 表示下移
const moveModule = (index, op) => {
  if (op === 0 && index > 0) {
    let element = moduleList.splice(index, 1)[0];
    moduleList.splice(index - 1, 0, element);
  } else if (op === 1 && index < moduleList.length - 1) {
    let element = moduleList.splice(index, 1)[0];
    moduleList.splice(index + 1, 0, element);
  }
}

const capture = () => {
  if (captureElement.value) {
    html2canvas(captureElement.value, {
      dpi: 300, // 设置截图的分辨率
      scale: 3,
      background: '#fff',
    }).then(canvas => {
      const a4Width = 595.28;
      // const a4Height = 841.89;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = a4Width - 60;
      const imgHeight = imgWidth / canvasWidth * canvasHeight;
      const imgData = canvas.toDataURL('image/png', 1);
      const pdf = new jspdf(
        '', 'pt', 'a4'
      );
      pdf.addImage(imgData, 'PNG', 30, 30, imgWidth, imgHeight, '', 'FAST');
      pdf.save('capture.pdf');
    });
    return
  }
  console.log('captureElement is null')
};


</script>

<style>
.container {
  display: flex;
  width: 100%;
  margin-top: 50px;
}

.form-area {
  width: 45%;
  margin-left: 1%;
  padding: 10px;
  height: 100vh;
  overflow: scroll;

  /* For Webkit browsers (Chrome, Safari) */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}

.display-area {
  margin-left: 20px;
  width: 600px;
}

.field {
  display: flex;
  margin: 3px 0;
}

.resume-header {
  font-weight: 800;
  font-size: 20px;
  text-align: center;
}

.module {
  margin: 10px 0;
}

.time-sec-view {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
}

.time-sec-view>div {
  font-weight: 600;
}

.preview {
  padding: 20px 40px;
  border-radius: 5px;
  margin-bottom: 20px;
  border: 1px solid #eee;
}

.time-sec {
  background-color: #eaf0f5;
  margin-top: 10px;
  padding: 15px;
  width: 500px;
  border-radius: 15px;
  border: 1px dashed #ced7dd;
}

.desc {
  display: flex;
  background-color: #eaf0f5;
  margin-top: 10px;
  padding: 15px;
  width: 500px;
  border-radius: 15px;
  border: 1px dashed #ced7dd;
}

.desc-view {
  margin: 2px 0;
}

.op-but {
  right: 10px;
  position: fixed;
  padding: 25px 10px;
  height: 180px;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(2, 2, 2, 0.389);
  background-color: #b5c6f367;
}
</style>