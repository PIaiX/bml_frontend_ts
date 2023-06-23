import React from 'react';
import {useConversation} from "./functions";
import AdvertisingForm from "./AdvertisingForm";

const AdvertisingEdit = () => {
    const [conversation] = useConversation()

    if(!conversation)
        return <></>

    return <AdvertisingForm conversation={conversation}/>
};

export default AdvertisingEdit;