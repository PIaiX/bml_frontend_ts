import React from 'react'
import {Link} from 'react-router-dom'
import {convertLocaleDate} from '../helpers/convertLocaleDate'

interface Props {
    className: string
    date: string
    url: string
    title: string
}

const NewsMini: React.FC<Props> = (props) => {
    const {className, date, title, url} = props
    return (
        <article className={'news-mini ' + className}>
            <time className="fw_7 mb-1">{convertLocaleDate(date)}</time>
            <h6>
                <Link to={`news/${url}`}>{title}</Link>
            </h6>
        </article>
    )
}

export default NewsMini
