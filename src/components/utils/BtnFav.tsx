import React, {FC, useEffect, useState} from 'react'
import {MdStarOutline, MdStar} from 'react-icons/md'
import {createFavorite, deleteWithFavorite} from '../../services/favorites'
import {useAppDispatch, useAppSelector} from '../../hooks/store'
import {IUser} from '../../types/user'
import {showAlert} from '../../store/reducers/alertSlice'

interface Props {
    className: string
    check?: boolean
    offerId?: number
    callbackClick?: () => void
}

const BtnFav: FC<Props> = (props) => {
    const [checked, setChecked] = useState(false)
    const user: IUser | null = useAppSelector((state) => state?.user?.user)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (props?.check) {
            setChecked(props?.check)
        }
    }, [props?.check])

    const submitCreateFavorite = () => {
        if (user?.id && props?.offerId) {
            if (checked) {
                deleteWithFavorite({userId: user?.id, offerId: props?.offerId})
                    .then(() => {
                        setChecked(!checked)
                        props?.callbackClick && props?.callbackClick()
                        dispatch(showAlert({message: 'Успешно удалено из избранных', typeAlert: 'good'}))
                    })
                    .catch(() => {
                        dispatch(showAlert({message: 'Произошла ошибка', typeAlert: 'bad'}))
                    })
            } else {
                createFavorite({userId: user?.id, offerId: props?.offerId})
                    .then(() => {
                        setChecked(!checked)
                        dispatch(showAlert({message: 'Успешно добавлено в избранные', typeAlert: 'good'}))
                    })
                    .catch(() => {
                        dispatch(showAlert({message: 'Произошла ошибка', typeAlert: 'bad'}))
                    })
            }
        }
    }

    return (
        <button
            onClick={() => {
                submitCreateFavorite()
            }}
            className={'btn-fav ' + props.className}
        >
            {checked ? <MdStar /> : <MdStarOutline />}
        </button>
    )
}

export default BtnFav
