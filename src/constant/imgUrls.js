const handleStaticUrl = (url) => {
    return new URL(url, import.meta.url).href
}

const moduleTitleImgs = [
    {value: '0', src: '../assets/moduleTitle/default.png'},
    {value: '1', src: '../assets/moduleTitle/plain.png'},
    {value: '2', src: '../assets/moduleTitle/tie.png'},
    {value: '1', src: '../assets/moduleTitle/plain.png'},
].map((img)=>({...img, src: handleStaticUrl(img.src)}))

// const moduleTitleImgs = getTwoDimArray(2, moduleTitleUrls)
export {
    moduleTitleImgs
}