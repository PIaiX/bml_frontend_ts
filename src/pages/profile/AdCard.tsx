import React, {FC} from 'react'
import {Link, NavLink} from 'react-router-dom'
import {checkPhotoPath} from '../../helpers/photoLoader'

type Props = {
    className?: string
    imgURL: string
    title: string
    scope: string
    investments: string
    section: number
    type: number
    id: number
    validity: string
    offerIdSeterForUnArchive?: (id: number) => void
    offerIdSeterForArchive?: (id: number) => void
}

const AdCard: FC<Props> = (props: any) => {
    return (
        <div className={'ad-preview ' + props.className}>
            <div className="d-flex flex-column flex-sm-row align-items-stretch flex-1">
                <div className="img acc-box">
                    <NavLink to={`/adv-page/${props?.id}`}>
                        <img src={checkPhotoPath(props?.imgURL)} alt={props.title} />
                    </NavLink>
                </div>
                <div className="text">
                    <div>
                        <NavLink to={`/adv-page/${props?.id}`}>
                            <div className="blue">{props.title}</div>
                        </NavLink>
                        <div className="l-gray f_08 mt-2">{props.scope}</div>
                    </div>
                    {props.investments && <div className="fw_5 f_09 mt-2">{props.investments}&nbsp;₽</div>}
                    <div className="mt-2">
                        <span className="color-1 fw_5">{props?.archiveExpire}</span>
                    </div>
                </div>
            </div>
            <div className="btns row gx-2 mt-3 mt-md-0">
                <div className="col-6">
                    <NavLink to={`new-ad/${props?.id}`} className="btn_main btn_4 w-100 px-2 px-sm-3">
                        Редактировать
                    </NavLink>
                </div>
                <div className="col-6">
                    {props.section === 1 ? (
                        <button
                            className="btn_main btn_3 w-100 px-1 px-sm-2 px-xl-3"
                            onClick={() => {
                                props?.offerIdSeterForUnArchive(props?.id)
                            }}
                        >
                            Опубликовать
                        </button>
                    ) : (
                        <button
                            className="btn_main btn_3 w-100 px-1 px-sm-2 px-xl-3"
                            onClick={() => {
                                props?.offerIdSeterForArchive(props?.id)
                            }}
                        >
                            Снять с публикации
                        </button>
                    )}
                </div>
                {props.type === 4 && (
                    <div className="col-12 mt-2">
                        <Link to="/account/my-ads/premium" className="btn_main btn_5 w-100 px-2 px-sm-3">
                            Premium-размещение
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdCard
