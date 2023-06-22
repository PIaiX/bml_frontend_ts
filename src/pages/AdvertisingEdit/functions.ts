import {useEffect, useState} from "react";
import {changeOneAdvertising, getOneAdvertising} from "../../services/advertising";
import {useImagesViewer} from "../../hooks/imagesViewer";
import {IAdvertising} from "../../types/advertising";

export const onSubmit = (data:IAdvertising, imageFile?:File)=>{

    const {image, ...req} = data
    const formData= new FormData()
    for (const key in req) {
        // @ts-ignore
        formData.append(key, req[key])
    }
    if(imageFile)
        formData.append('image', imageFile)

    return changeOneAdvertising(data.id, formData)
}

export function useConversation<T>(id:string | undefined){
    const [conversation, setConversation] = useState<T>()
    useEffect(()=>{
        if(id){
            getOneAdvertising(id).then(res => setConversation(res))
        }
    }, [id])
    return [conversation]
}

export const useImage = ()=>{

    const [adCover, setAdCover] = useState<any>([])
    const adCoverViewer = useImagesViewer(adCover)
    const [formInfo, setFormInfo] = useState<any>()

    useEffect(() => {
        formInfo?.image && setAdCover([formInfo.image])
    }, [formInfo])

    return [formInfo?.image, adCoverViewer, setFormInfo]
}