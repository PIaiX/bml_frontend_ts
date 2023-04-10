import React, {FC} from 'react'
import {NavLink} from 'react-router-dom'
import {checkPhotoPath} from '../helpers/photoLoader'

type Props = {
    imgUrl: string
    title: string
    text: string
    url: string
    readingTimeFrom?: number
    readingTimeTo?: number
}

const NewsPreview: FC<Props> = (props) => {
    return (
        <article className="news-preview">
            <img src={checkPhotoPath(props.imgUrl)} alt={props.title} />
            <div className="time">
                <div className="lh_1">
                    {props?.readingTimeFrom} - {props?.readingTimeTo}
                </div>
                <div className="lh_1 gray">мин</div>
            </div>
            <div className="px-2 py-3">
                <p className="title">{props.title}</p>
                <div className="text" dangerouslySetInnerHTML={{ __html:props?.text?props?.text:''}}>
                </div>
                <NavLink to={`${props.url}`} className="more">
                    Подробнее
                </NavLink>
            </div>
        </article>
    )
}

export default NewsPreview
