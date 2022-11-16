export const convertLocaleDate = (date?: string, forInput?: boolean) => {
    if (forInput) {
        return date?.split('.').reverse().join('-')
    } else {
        return date && new Date(date).toLocaleDateString()
    }
}
