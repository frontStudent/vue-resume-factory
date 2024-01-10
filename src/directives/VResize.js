export const vResize = {
  mounted: (el, binding) => {
    let startX, startY, startWidth, startHeight 
    el.style.maxWidth = binding.value?.maxWidth || '200px'
    el.style.maxHeight = binding.value?.maxHeight || '300px'
    
    const onMouseDown = (e) => {
      startX = e.clientX
      startY = e.clientY
      startWidth = el.offsetWidth
      startHeight = el.offsetHeight
      document.addEventListener('mousemove', onStartResize)
      document.addEventListener('mouseup', onMouseUp)
    }

    // 鼠标按下开始拖动
    const onStartResize = (e) => {
      const dx = e.clientX - startX
      const dy = e.clientY - startY
    //   if (
    //     el.style.cursor === 'se-resize'
    //   ) {
    //     el.style.width = startWidth + dx + 'px'
    //     el.style.height = startHeight + dy + 'px'
    //     return
    //   }
    //   if (
    //     el.style.cursor === 'nw-resize'
    //   ) {
    //     el.style.width = startWidth - dx + 'px'
    //     el.style.height = startHeight - dy + 'px'
    //     return
    //   }
    //   if (
    //     el.style.cursor === 'ne-resize'
    //   ) {
    //     el.style.width = startWidth + dx + 'px'
    //     el.style.height = startHeight - dy + 'px'
    //     return
    //   }
    //   if (
    //     el.style.cursor === 'sw-resize'
    //   ) {
    //     el.style.width = startWidth - dx + 'px'
    //     el.style.height = startHeight + dy + 'px'
    //     return
    //   }
      if (el.style.cursor === 'e-resize') {
        el.style.width = startWidth + dx + 'px'
        el.style.height = startHeight + dx*1.5 + 'px'
        // el.style.left = startLeft + dx / 2 + "px";
        return
      }
      if (el.style.cursor === 'w-resize') {
        el.style.width = startWidth - dx + 'px'
        el.style.height = startHeight - dx*1.5 + 'px'
        // el.style.left = startLeft + dx / 2 + "px";
        return
      }
      if (el.style.cursor === 's-resize') {
        el.style.width = startWidth + dy / 1.5 + 'px'
        el.style.height = startHeight + dy + 'px'
        console.log(el.style.width, el.style.height)
        return
      }
      if (el.style.cursor === 'n-resize') {
        el.style.width = startWidth - dy / 1.5 + 'px'
        el.style.height = startHeight - dy + 'px'
        return
      }
    }

    // cursor样式根据边界位置变化
    // e.offsetX / e.offsetY 是鼠标在元素内部的坐标，是相对于元素边界的
    // el.offsetWidth / el.offsetHeight 是元素的大小
    const onTouchBoundary = (e) => {
      let limit = 10
      // 是否在左上角
      if (e.offsetX < limit && e.offsetY < limit) {
        el.style.cursor = 'nw-resize'
        return
      }
      // 是否在右下角
      if (
        e.offsetX > el.offsetWidth - limit &&
        e.offsetY > el.offsetHeight - limit
      ) {
        el.style.cursor = 'se-resize'
        return
      }
      // 是否在左下角
      if (e.offsetX < limit && e.offsetY > el.offsetHeight - limit) {
        el.style.cursor = 'sw-resize'
        return
      }
      // 是否在右上角
      if (e.offsetX > el.offsetWidth - limit && e.offsetY < limit) {
        el.style.cursor = 'ne-resize'
        return
      }
      // 是否在左边界
      if (e.offsetX < limit) {
        el.style.cursor = 'w-resize'
        return
      }
      // 是否在右边界
      if (e.offsetX > el.offsetWidth - limit) {
        el.style.cursor = 'e-resize'
        return
      }
      // 是否在上边界
      if (e.offsetY < limit) {
        el.style.cursor = 'n-resize'
        return
      }
      // 是否在下边界
      if (e.offsetY > el.offsetHeight - limit) {
        el.style.cursor = 's-resize'
        return
      }
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onStartResize)
      document.removeEventListener('mouseup', onMouseUp)
    }

    el.addEventListener('mousemove', onTouchBoundary)
    el.addEventListener('mousedown', onMouseDown)
  }
}
