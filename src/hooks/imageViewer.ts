import {useEffect, useState} from "react";

export const useImageViewer = (file: File) => {

    const [info, setInfo] = useState<any>({})

    useEffect(() => {
        let fileReader
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result }: any = e?.target;
                if (result) {
                    setInfo((prevState: any) => {
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
            setInfo((prevState: any) => {
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