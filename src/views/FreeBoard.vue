<template>
  <div style="display: flex">
    <DragArea>
      <DragElem>默认</DragElem>
      <DragElem elemType="editor">文本框</DragElem>
      <DragElem elemType="move">仅可移动</DragElem>
    </DragArea>
    <DropArea :showFormatLine="true" :formatLineStyle="{ color: 'green', width: '3px' }">
    </DropArea>
  </div>
</template>
