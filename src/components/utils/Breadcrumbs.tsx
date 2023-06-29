import React, {FC} from 'react'
import {Link, useMatches} from 'react-router-dom'

const Breadcrumbs: FC<{id?:number}> = ({id}) => {
    const categoriesNames = [ 'Поиск инвесторов', 'Предложения инвесторов', 'Поиск бизнес партнёров', 'Продажа бизнеса', 'Франшизы']

    let matches = useMatches()
    let crumbs = matches
        .filter((match: any) => Boolean(match?.handle?.crumb))
        .map((match: any) => match?.handle?.crumb(match.data))

    if(id)
        return (
            <nav className="breadcrumbs">
                <ul className="list-unstyled">
                    <li><Link to={'/'}>Главная</Link></li>
                    <li><Link to={`/category/${id}`}>{categoriesNames[id]}</Link></li>
                </ul>
            </nav>
        )

    return (
        <nav className="breadcrumbs">
            <ul className="list-unstyled">
                {crumbs.map((crumb, index) => (
                    <li key={index}>{crumb}</li>
                ))}
            </ul>
        </nav>
    )
}

export default Breadcrumbs
