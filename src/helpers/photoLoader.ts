const checkPhotoPath = (path = '') =>
    path?.length
        ? path.includes('http')
            ? path
            : `https://api.business-mylife.ru/uploads/${path}`
        : '/img/users/no-photo.png'

export {checkPhotoPath}
