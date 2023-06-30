import React, {FC} from 'react'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import {checkPhotoPath} from '../../helpers/photoLoader'
import FunctionForPrice from '../../helpers/FunctionForPrice'
import {AiOutlineQuestionCircle} from 'react-icons/ai'

type Props = {
    className?: string
    image: string
    title: string
    scope: string
    investments: string
    section: number
    id: number
    validity: string,
    isPricePerMonthAbsolute: boolean | null
    isVerified?: boolean,
    isArchived?: boolean,
    isBanned?: boolean
    timeBeforeArchive: string
    offerIdSeterForUnArchive?: (id: number) => void
    offerIdSeterForArchive?: (id: number) => void
    blockDescription?: string | null
    setIsShowModalReport?: any
}

const OfferCard: FC<Props> = (props: any) => {
    const {
        section,
        title,
        image,
        id,
        className,
        isBanned,
        isArchived,
        isVerified,
        timeBeforeArchive,
        blockDescription
    } = props

    const navigate = useNavigate()

    return (
        <div className={'mx-sm-4 my-md-5 my-sm-3 py-1 ad-preview ' + className}>
            <div className="d-flex flex-column flex-sm-row align-items-stretch flex-1">
                <div className="img acc-box">
                    <NavLink to={`/adv-page/${id}`}>
                        <img src={checkPhotoPath(image)} alt={title}/>
                    </NavLink>
                </div>
                <div className="text mx-md-4 mx-sm-4">
                    <div>
                        <NavLink to={`/adv-page/${id}`}>
                            <div>
                                {title?.slice(0, 15)}
                                {title?.length > 15 && '...'}
                            </div>
                        </NavLink>
                        <div>
                            <div style={{color: "red", paddingRight: '5px'}} className={'d-inline-flex'}>
                                {isBanned ?
                                    'Заблокировано '
                                    : isArchived ?
                                        'В архиве '
                                        : isVerified ?
                                            timeBeforeArchive
                                            : 'На модерации'}
                            </div>
                            {isBanned && blockDescription &&
                                <div className={'d-inline-block'}
                                     onClick={() => props?.setIsShowModalReport && props?.setIsShowModalReport(props?.blockDescription)}>
                                    <AiOutlineQuestionCircle color={'black'} title={props?.blockDescription}/>
                                </div>
                            }

                        </div>
                        <div className="l-gray f_08 mt-2">{props.scope}</div>
                    </div>
                    {props.investments && (
                        <div className="fw_5 f_09 mt-2">{FunctionForPrice(props.investments)}&nbsp;{' руб'}</div>
                    )}
                    <div className="mt-2">
                        <span className="color-1 fw_5">{props?.archiveExpire}</span>
                    </div>
                    {props.isVerified &&
                        <div>{props.validity}</div>
                    }
                </div>
            </div>
            <div className="btns row gx-2 mt-3 mt-md-0 mt-sm-4">
                <div className="col-6">
                    <NavLink
                        to={`new-ad/${id}`}
                        className="btn_main btn_4 w-100 px-2 px-sm-3"
                    >
                        Редактировать
                    </NavLink>
                </div>
                <div className="col-6">
                    {(isBanned || isArchived) ? (
                            <button
                                className="btn_main btn_3 w-100 px-1 px-sm-2 px-xl-3"
                                onClick={() => {
                                    if(isArchived && timeBeforeArchive?.search('Архивирован') && section===4)
                                        navigate(`new-ad/${id}`, {state:{isBuyAgain:true}})
                                    else
                                        props?.offerIdSeterForUnArchive(id)
                                }}
                            >
                                Опубликовать
                            </button>
                        )
                        :
                        (
                            <button
                                className="btn_main btn_3 w-100 px-1 px-sm-2 px-xl-3"
                                onClick={() => {
                                    props?.offerIdSeterForArchive(id)
                                }}
                            >
                                Снять с публикации
                            </button>

                        )

                    }
                </div>
                {section === 4 && (
                    <div className="col-12 mt-2">
                        <Link to="/account/my-ads/premium" className="btn_main btn_5 w-100 px-2 px-sm-3"
                              state={{data: {id: id}}}>
                            Premium-размещение
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default OfferCard
