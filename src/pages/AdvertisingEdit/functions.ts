import {useEffect, useState} from "react";
import {changeOneAdvertising, getOneAdvertising} from "../../services/advertising";
import {useImagesViewer} from "../../hooks/imagesViewer";
import {IAdvertising} from "../../types/advertising";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {showAlert} from "../../store/reducers/alertSlice";

export function useOnSubmit(imageFile?:File){
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSubmit = (data:IAdvertising)=>{
        const {image, ...req} = data
        const formData= new FormData()
        for (const key in req) {
            // @ts-ignore
            formData.append(key, req[key])
        }
        if(imageFile)
            formData.append('image', imageFile)

        return changeOneAdvertising(data.id, formData)
            .then(res => {
                if (res) {
                    navigate('/account/banners')
                    dispatch(
                        showAlert({
                            message: 'Реклама успешно отредактирована! Ждите одобрения модерации...',
                            typeAlert: 'good',
                        }))
                } else
                    dispatch(showAlert({message: 'Произошла ошибка!', typeAlert: 'bad'}))
            })
            .catch((error) => {
                dispatch(showAlert({message: 'Произошла ошибка!', typeAlert: 'bad'}))
            })
    }

    return [onSubmit]
}

export function useConversation(){
    const {id} = useParams()
    const [conversation, setConversation] = useState<IAdvertising>()
    useEffect(()=>{
        if(id){
            getOneAdvertising(id).then(res => setConversation(res))
        }
    }, [id])
    if(conversation){
        const {id: idConversation, image, description, link, placedForMonths, adsTypeId, userId, subsectionId} = conversation
        const conv:IAdvertising={id: idConversation, image, link, placedForMonths, adsTypeId, userId, subsectionId}
        if(description)
            return [{...conv, description}]
        else
            return [conv]
    }
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