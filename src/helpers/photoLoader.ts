const checkPhotoPath = (path = '') =>
    path?.length
        ? path.includes('http')
            ? path
            : `https://api.business-mylife.ru/uploads/${path}`
        : '/images/photo-replacer.jpg'

export {checkPhotoPath}
