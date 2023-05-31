import {useEffect, useState} from 'react'

export const useImagesViewer = (files: any) => {
    const [images, setImages] = useState<any>([])
    const formatsPhoto = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp']

    useEffect(() => {
        files.length &&
            files.forEach((file: any) => {
                const fileReader = new FileReader()
                fileReader.readAsDataURL(file)
                fileReader.onload = (e) => {
                    const {result}: any = e.target
                    if (result) {
                        if (formatsPhoto.includes(file?.type)) {
                            setImages((prevState: any) => [
                                ...prevState,
                                {
                                    initialFile: file,
                                    info: {name: file.name, data_url: result},
                                },
                            ])
                        }
                    }
                }
            })
        setImages([])
    }, [files])

    return images
}
