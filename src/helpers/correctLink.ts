export const correctLink = (url:string | undefined) => {
    let correctUrl= (url && !url?.includes('http'))?
        'http://' + url
        : url

    return correctUrl
};