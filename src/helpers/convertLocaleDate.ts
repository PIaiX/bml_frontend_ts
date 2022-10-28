export const convertLocaleDate = (date: string) => {
    return new Date(date).toLocaleDateString()
}
