const handleStaticUrl = (url) => {
    return new URL(url, import.meta.url).href
}
const moduleTitleImgs = [
    {value: '0', src: new URL('../assets/moduleTitle/default.png', import.meta.url).href},
    {value: '1', src: new URL('../assets/moduleTitle/plain.png', import.meta.url).href},
    {value: '2', src: new URL('../assets/moduleTitle/tie.png', import.meta.url).href},
    {value: '3', src: new URL('../assets/moduleTitle/rec.png', import.meta.url).href},
]
// const moduleTitleImgs = [
//     {value: '0', src: '../assets/moduleTitle/default.png'},
//     {value: '1', src: '../assets/moduleTitle/plain.png'},
//     {value: '2', src: '../assets/moduleTitle/tie.png'},
//     {value: '3', src: '../assets/moduleTitle/rec.png'},
// ].map((img)=>({...img, src: handleStaticUrl(img.src)}))

// const moduleTitleImgs = getTwoDimArray(2, moduleTitleUrls)
export {
    moduleTitleImgs
}