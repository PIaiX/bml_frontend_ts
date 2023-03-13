const FunctionForPrice = (price: string | number | undefined): string => {
    if (!price) return ''
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export default FunctionForPrice
