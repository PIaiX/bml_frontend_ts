export const correctLink = (url:string | undefined) => {
    if (url && (!url.match(/^http?:\/\//i) || !url.match(/^https?:\/\//i)))
        return 'http://' + url;
    else
        return url
};