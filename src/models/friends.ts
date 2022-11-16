import {IFriendsItem, IFriendsMeta} from '../types/friends'

export type IFriendsBodyRequest = {
    body: {
        data: Array<IFriendsItem>
        meta: IFriendsMeta
    }
}
