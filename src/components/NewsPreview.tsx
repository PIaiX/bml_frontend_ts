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
            <NavLink to={`${props.url}`}>
                <img src={checkPhotoPath(props.imgUrl)} alt={props.title}/>
                <div className="px-2">
                    <p className="title">{props.title}</p>
                    <div className={'p-3 '}>
                        Подробнее
                    </div>
                </div>
            </NavLink>
        </article>
    )
}

export default NewsPreview
