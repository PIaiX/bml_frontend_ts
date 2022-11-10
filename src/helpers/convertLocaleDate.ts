export const convertLocaleDate = (date?: string) => {
    return date && new Date(date).toLocaleDateString()
}
