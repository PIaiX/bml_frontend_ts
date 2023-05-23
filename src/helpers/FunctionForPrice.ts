const FunctionForPrice = (price: string | number | undefined): string => {
    if (!price)
        return ''
    if(Number(price)<=0)
        return '0'
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export default FunctionForPrice
