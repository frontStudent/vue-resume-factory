// 将formFields转换为二维数组，每个子数组包含2个元素
export const getTwoDimArray = (cols, dataSource) => {
    if(!dataSource?.length) return []
    return Array.from({ length: dataSource.length }, (_, i) => dataSource.slice(i * (cols), (i + 1) * (cols)))
}