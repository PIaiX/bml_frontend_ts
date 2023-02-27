import React, {FC, memo} from 'react'
import {Link} from 'react-router-dom'
import {IUser} from '../types/user'
import {useAppSelector} from '../hooks/store'
import Moment from 'react-moment'
import 'moment/locale/ru'
import {convertLocaleDate} from '../helpers/convertLocaleDate'
import {checkPhotoPath} from '../helpers/photoLoader'

type Props = {
    userId?: number
    avatarUser?: string
    createdAt?: string
    text?: string
    isViewed?: boolean
    keyArr?: any
    arr?: any
}

const ChatMessage: FC<Props> = ({avatarUser, keyArr, arr}) => {
    const user: IUser | null = useAppSelector((state) => state?.user?.user)

    const newDate = keyArr && convertLocaleDate(keyArr, true)
    const convertedDate = new Date(newDate)

    return (
        <>
            <div className="text-center l-gray my-4">
                <Moment locale="ru" format="DD MMMM" date={convertedDate} />
            </div>
            {arr.map((i: any, index: any) => (
                <div key={index}>
                    <div className={`${+i?.userId === user?.id ? 'message' : 'reply'}`}>
                        <div className="d-flex align-items-center mb-1 mb-sm-3">
                            <Link to={`/account/profile/user/${i?.userId}`} className="user">
                                <img
                                    src={+i?.userId === user?.id ? checkPhotoPath(user?.avatar) : checkPhotoPath(avatarUser)}
                                    alt={String(i?.userId)}
                                />
                            </Link>
                            <span className="f_09 l-gray ms-3">
                                <Moment locale="ru" format="LT" date={i?.createdAt} />
                            </span>
                        </div>
                        <div className="text-break">{i?.text}</div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default memo(ChatMessage)
