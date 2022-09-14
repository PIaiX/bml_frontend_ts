export const onInputHandler = (e, setFunction, isDigit = false) => {

    const text = e.target.value
    const name = e.target.name

    setFunction(prevValues => ({...prevValues, [name]: isDigit ? +text : text}))
}

export const onCheckboxHandler = (e, setFunction) => {

    const name = e.target.name

    setFunction(prevValues => ({...prevValues, [name]: !prevValues[name]}));
}

export const onRadioHandler = (e, setFunction, isDigit = false) => {

    const value = e.target.value
    const name = e.target.name

    setFunction(prevValues => ({...prevValues,[name]: isDigit ? +value : value}))

}

export const onSelectHandler = (e, setFunction, isDigit = false) => {

    const select = e.target.value
    const name = e.target.name

    setFunction(prevValues => ({...prevValues, [name]: isDigit ? +select : select}))
}

export const onImageHandler = (e, setFunction, nameProp) => {

    const imageMimeType = /image\/(png|jpg|jpeg)/i;
    const file = e.target.files[0]

    if (file) {
        if(!file.type.match(imageMimeType)){
            return
        } else {
            nameProp
                ? setFunction(prevValues => ({...prevValues, [nameProp]: file}))
                : setFunction(file)
        }
    }
}

export const onImagesHandler = (e, nameProp, setFunction) => {

    const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;
    const { files } = e.target;
    const validImageFiles = [];
    for (let i = 0; i < files?.length; i++) {
        const file = files[i];
        if (file.type.match(imageTypeRegex)) {
            validImageFiles.push(file);
        }
    }
    if (validImageFiles?.length) {
        setFunction(prevValues => ({...prevValues, [nameProp]: validImageFiles}));
    }
}