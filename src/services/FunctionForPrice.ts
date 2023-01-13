const FunctionForPrice = (price: string | number | undefined): string => {
    if (!price) return ''
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    // let newPrice: string
    // let returnPrice: string = ''
    // if (!price) return ''
    // else newPrice = price.toString()
    //
    // returnPrice = newPrice.slice(-3)
    // for (let i = 3; i < newPrice.length; i += 3) {
    //     if (returnPrice !== '')
    //         returnPrice = newPrice.slice(-1 * i - 3, -1 * i) + String.fromCharCode(160) + returnPrice
    // }
    // // return returnPrice;
    // return returnPrice
}

export default FunctionForPrice
