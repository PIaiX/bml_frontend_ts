import {useEffect, useState} from "react";

export const useImageViewer = (file: File) => {

    const [info, setInfo] = useState({})

    useEffect(() => {
        let fileReader
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e?.target;
                if (result) {
                    setInfo(prevState => {
                        return {
                            ...prevState,
                            data_url: result
                        }
                    })
                }
            }
            fileReader.readAsDataURL(file);
        }
    }, [file])

    useEffect(() => {
        const img = new Image()
        img.onload = () => {
            setInfo(prevState => {
                return {
                    ...prevState,
                    width: img.width,
                    height:img.height
                }
            })
        }
        img.src = info?.data_url
    }, [info?.data_url])

    return info
}