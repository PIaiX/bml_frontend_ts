import {useEffect, useState} from "react";

export const useImagesViewer = (files: any) => {

    const [images, setImages] = useState<any>([]);

    useEffect(() => {
        files.length && files.forEach((file: any) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = (e) => {
                const {result}: any = e.target
                result && setImages((prevState: any) => [...prevState,
                    {
                        initialFile: file,
                        info: {name: file.name, data_url: result}
                    }
                ])
            }
        })
        setImages([])
    }, [files]);

    return images

}