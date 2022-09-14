import {useEffect, useState} from "react";

export const useImagesViewer = (files= []) => {

    const [images, setImages] = useState([]);

    useEffect(() => {
        files.length && files.forEach(file => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = (e) => {
                const {result} = e.target
                result && setImages(prevState => [...prevState,
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