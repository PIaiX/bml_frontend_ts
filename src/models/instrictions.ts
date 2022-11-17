import {IPartnersItem, IPartnersMeta, ITutorialsItem, ITutorialsMeta} from '../types/instructions'

export type ITutorialsBodyRequest = {
    body: {
        data: Array<ITutorialsItem>
        meta: ITutorialsMeta
    }
}

export type IPartnersBodyRequest = {
    body: {
        data: Array<IPartnersItem>
        meta: IPartnersMeta
    }
}
