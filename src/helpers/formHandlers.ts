export const onInputHandler = (e: any, setFunction: any, isDigit = false) => {
    const text = e.target.value
    const name = e.target.name

    setFunction((prevValues: any) => ({...prevValues, [name]: isDigit ? +text : text}))
}

export const onCheckboxHandler = (e: any, setFunction: any) => {
    const name = e.target.name

    setFunction((prevValues: any) => ({...prevValues, [name]: !prevValues[name]}))
}

export const onRadioHandler = (e: any, setFunction: any, isDigit = false) => {
    const value = e.target.value
    const name = e.target.name

    setFunction((prevValues: any) => ({...prevValues, [name]: isDigit ? +value : value}))
}

export const onSelectHandler = (e: any, setFunction: any, isDigit = false) => {
    const select = e.target.value
    const name = e.target.name

    setFunction((prevValues: any) => ({...prevValues, [name]: isDigit ? +select : select}))
}

export const onImageHandler = (e: any, setFunction: any, nameProp?: any) => {
    const imageMimeType = /image\/(png|jpg|jpeg)/i
    const file = e.target.files[0]
    if (file) {
        if (!file.type.match(imageMimeType)) {
            setFunction(null)
        } else {
            nameProp ? setFunction((prevValues: any) => ({...prevValues, [nameProp]: file})) : setFunction(file)
        }
    }
}

export const onImagesHandler = (e: any, nameProp: any, setFunction: any) => {
    const imageTypeRegex = /image\/(png|jpg|jpeg)/gm
    const {files} = e.target
    const validImageFiles: any = []
    for (let i = 0; i < files?.length; i++) {
        const file = files[i]
        if (file.type.match(imageTypeRegex)) {
            validImageFiles.push(file)
        }
    }
    if (validImageFiles?.length) {
        setFunction((prevValues: any) => ({...prevValues, [nameProp]: validImageFiles}))
    }
}
