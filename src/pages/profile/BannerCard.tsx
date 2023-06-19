import React, {FC} from 'react';
import {Link, NavLink} from "react-router-dom";
import {checkPhotoPath} from "../../helpers/photoLoader";
import {AiOutlineQuestionCircle} from "react-icons/ai";
import FunctionForPrice from "../../helpers/FunctionForPrice";

type Props = {
    className?: string
    imgURL: string
    title: string
    scope: string
    investments: string
    section: number
    type: number
    id: number
    validity: string,
    isPricePerMonthAbsolute:boolean | null
    isVerified?:boolean,
    isArchived?:boolean,
    isBlocked?:boolean
    timeBeforeArchive:string
    offerIdSeterForUnArchive?: (id: number) => void
    offerIdSeterForArchive?: (id: number) => void
    bannersType?:boolean
    blockDescription?:string | null
    setIsShowModalReport?:any
}

const BannerCard: FC<Props> = (props: any) => {
    return (
        <div className={'mx-sm-4 my-md-5 my-sm-3 py-1 ad-preview ' + props.className}>
            <div className="d-flex flex-column flex-sm-row align-items-stretch flex-1">
                <div className="img acc-box">
                    <NavLink to={`/adv-page/${props?.id}`}>
                        <img src={checkPhotoPath(props?.imgURL)} alt={props.title}/>
                    </NavLink>
                </div>
                <div className="text mx-md-4 mx-sm-4">
                    <div>
                        <NavLink to={`/adv-page/${props?.id}`}>
                            <div>
                                {props?.title?.slice(0,15)}
                                {props?.title?.length>15 && '...'}
                            </div>
                        </NavLink>
                        <div>
                            <div style={{color: "red", paddingRight:'5px'}} className={'d-inline-flex'}>
                                {props.isBlocked? 'Заблокировано ' : props.isArchived?'В архиве ' :  props.isVerified?props.timeBeforeArchive: 'На модерации'}
                            </div>
                            {props?.blockDescription &&
                                <div className={'d-inline-block'} onClick={() => props?.setIsShowModalReport && props?.setIsShowModalReport(props?.blockDescription)}>
                                    <AiOutlineQuestionCircle color={'black'} title={props?.blockDescription} />
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
                        to={`${props.bannersType?'/account/advertising-section':'new-ad/'+props?.id}`}
                        className="btn_main btn_4 w-100 px-2 px-sm-3"
                    >
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
                            Удалить
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BannerCard;