import React from 'react';
import {useParams} from "react-router-dom";
import {useConversation} from "./functions";
import {IAdvertising} from "../../types/advertising";
import AdvertisingForm from "./AdvertisingForm";

const AdvertisingEdit = () => {
    const {id} = useParams()
    const [conversation] = useConversation<IAdvertising>(id)
    if (conversation) {
        const {id: idConversation, image, description, link, placedForMonths, adsTypeId, userId, subsectionId} = conversation
        return(
            <AdvertisingForm
                conversation={{id: idConversation, image, description, link, placedForMonths, adsTypeId, userId, subsectionId}}
            />
        )
    }

    return <></>
};

export default AdvertisingEdit;