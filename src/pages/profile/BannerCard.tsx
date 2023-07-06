import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import {checkPhotoPath} from "../../helpers/photoLoader";
import {AiOutlineQuestionCircle} from "react-icons/ai";
import FunctionForPrice from "../../helpers/FunctionForPrice";
import {useBannerContext} from "./Banners";
import {IBannerCard} from "../../types/Banner";

interface propsInterFace extends IBannerCard{
    section:number
}

const BannerCard: FC<propsInterFace> = (props) => {
    const setBanner = useBannerContext()?.setBanner
    return (
        <div className={'mx-sm-4 my-md-5 my-sm-3 py-1 ad-preview'}>
            <div className="d-flex flex-column flex-sm-row align-items-stretch flex-1">
                <div className="img acc-box">
                    <NavLink to={`/account/advertising-section/${props?.id}`}>
                        <img src={checkPhotoPath(props?.image)} alt={props.title}/>
                    </NavLink>
                </div>
                <div className="text mx-md-4 mx-sm-4">
                    <div>
                        <NavLink to={`/account/advertising-section/${props?.id}`}>
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
                                <div className={'d-inline-block'}>
                                    <AiOutlineQuestionCircle color={'black'} title={props?.blockDescription} />
                                </div>
                            }

                        </div>
                        <div className="l-gray f_08 mt-2">{props.subsection?.area?.name}</div>
                    </div>
                    {props.investments && (
                        <div className="fw_5 f_09 mt-2">{FunctionForPrice(props.investments)}&nbsp;{' руб'}</div>
                    )}
                    <div className="mt-2">
                        <span className="color-1 fw_5">{props?.archiveExpire}</span>
                    </div>
                    {props.isVerified &&
                        <div>{props.archiveExpire}</div>
                    }
                </div>
            </div>
            <div className="btns row gx-2 mt-3 mt-md-0 mt-sm-4">
                <div className="col-6">
                    <NavLink
                        to={'/account/advertising-section/'+props?.id}
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
                            }}
                        >
                            Опубликовать
                        </button>
                    ) : (
                        <button
                            className="btn_main btn_3 w-100 px-1 px-sm-2 px-xl-3"
                            onClick={() => {
                                if(setBanner)
                                    setBanner(props)
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