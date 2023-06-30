import React, {FC} from 'react'
import {Link, useMatches} from 'react-router-dom'
import {Helmet} from "react-helmet";
import FunctionForPrice from "../../helpers/FunctionForPrice";
import {IOfferItem} from "../../types/offers";
const Breadcrumbs: FC<{offer?:IOfferItem | null}> = ({offer}) => {
    const categoriesNames = [ 'Поиск инвесторов', 'Предложения инвесторов', 'Поиск бизнес партнёров', 'Продажа бизнеса', 'Франшизы']

    let matches = useMatches()
    let crumbs = matches
        .filter((match: any) => Boolean(match?.handle?.crumb))
        .map((match: any) => match?.handle?.crumb(match.data))

    if(offer?.id)
        return (
            <>
                <Helmet>
                    <title>{`${offer?.title} Инвестиции от ${FunctionForPrice(offer?.investments)} ₽`}</title>
                    <meta name="description" content={`Посмотри объявление "${offer?.title}" из раздела "${categoriesNames[offer?.category]}" на сайте объявлений о продаже бизнеса и поиска партнёров.`} />
                </Helmet>
                <nav className="breadcrumbs">
                    <ul className="list-unstyled">
                        <li><Link to={'/'}>Главная</Link></li>
                        <li><Link to={`/category/${offer?.category}`}>{categoriesNames[offer?.category]}</Link></li>
                    </ul>
                </nav>
            </>
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
