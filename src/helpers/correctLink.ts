import {checkPhotoPath} from "./photoLoader";

export const correctLink = (url:string | undefined) => {
    if(url?.includes('UploadTutorials'))
        return checkPhotoPath(url)

    let correctUrl= (url && !url?.includes('http'))?
        'http://' + url
        : url

    return correctUrl
};