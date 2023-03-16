import React, {FC} from 'react'
import {convertLocaleDate} from '../../helpers/convertLocaleDate'
import FunctionForPrice from '../../helpers/FunctionForPrice'

type Props = {
    category?: number
    investments?: number
    branchCount?: number
    price?: number
    pricePerMonth?: number
    profit?: number
    profitPerMonth?: number
    soldBranchCount?: number
    payback?: number
    paybackForUser?: string
    projectStage?: number
    projectStageForUser?: string
    city?: string
    dateOfCreation?: string
    areaName?: string
    isPricePerMonthAbsolute?: boolean | null
}

const ShortInfoInOfferContainer: FC<Props> = (props) => {
    if (props?.category === 0) {
        return (
            <section className="anchor_block" id="anchor_little_info">
                <h4 className="fw_7">Краткая информация</h4>
                <ul>
                    {props?.investments &&
                        <li>Инвестиции: {FunctionForPrice(props?.investments)} ₽</li>
                    }
                    {props?.profitPerMonth &&
                        <li>Предполагаемая прибыль: {FunctionForPrice(props?.profitPerMonth) || 0} ₽</li>
                    }
                    {props?.paybackForUser &&
                        <li>
                            Окупаемость: {props?.paybackForUser?.toLowerCase()}
                        </li>
                    }
                    {props?.projectStageForUser &&
                        <li>
                            Стадия проекта: {props?.projectStageForUser?.toLowerCase()}
                        </li>
                    }
                    <li>Сфера: {props?.areaName}</li>
                </ul>
            </section>
        )
    } else if (props?.category === 1) {
        return (
            <section className="anchor_block" id="anchor_little_info">
                <h4 className="fw_7">Краткая информация</h4>
                <ul>
                    {props?.investments &&
                        <li>Инвестиции: {FunctionForPrice(props?.investments)} ₽</li>
                    }
                    {props?.paybackForUser &&
                        <li>
                            Окупаемость: {props?.paybackForUser?.toLowerCase()}
                        </li>
                    }
                    <li>Сфера: {props?.areaName}</li>
                </ul>
            </section>
        )
    } else if (props?.category === 2) {
        return (
            <section className="anchor_block" id="anchor_little_info">
                <h4 className="fw_7">Краткая информация</h4>
                <ul>
                    {props?.investments &&
                        <li>Инвестиции: {FunctionForPrice(props?.investments)} ₽</li>
                    }
                    {props?.profit &&
                        <li>Предполагаемая прибыль: {FunctionForPrice(props?.profit)} ₽</li>
                    }
                    {props?.paybackForUser &&
                        <li>
                            Окупаемость: {props?.paybackForUser?.toLowerCase()}
                        </li>
                    }
                    {props?.projectStageForUser &&
                        <li>
                            Стадия проекта: {props?.projectStageForUser?.toLowerCase()}
                        </li>
                    }
                    <li>Город: {props?.city}</li>
                </ul>
            </section>
        )
    } else if (props?.category === 3) {
        return (
            <section className="anchor_block" id="anchor_little_info">
                <h4 className="fw_7">Краткая информация</h4>
                <ul>
                    <li>Стоимость бизнеса: {FunctionForPrice(props?.price)} ₽</li>
                    {props?.paybackForUser &&
                        <li>
                            Окупаемость: {props?.paybackForUser?.toLowerCase()}
                        </li>
                    }
                    <li>Оборот в месяц: {FunctionForPrice(props?.profitPerMonth)} ₽</li>
                    <li>Чистая прибыль: {FunctionForPrice(props?.profit)} ₽</li>
                    <li>Количество точек: {FunctionForPrice(props?.branchCount)} шт.</li>
                    <li>Город: {props?.city}</li>
                </ul>
            </section>
        )
    } else if (props?.category === 4) {
        return (
            <section className="anchor_block" id="anchor_little_info">
                <h4 className="fw_7">Краткая информация</h4>
                <ul>
                    <li>Стартовые инвестиции от: {FunctionForPrice(props?.investments)} ₽</li>
                    <li>Паушальный взнос: {FunctionForPrice(props?.price)} ₽</li>
                    <li>Роялти: {FunctionForPrice(props?.pricePerMonth)} {props.isPricePerMonthAbsolute && props.category === 4 ? ' ₽':' %'}
                    </li>
                    {props?.paybackForUser &&
                        <li>
                            Срок окупаемости:{' '}
                            {props?.paybackForUser?.toLowerCase()}
                        </li>
                    }
                    {props?.profitPerMonth &&
                        <li>Предполагаемая прибыль: {FunctionForPrice(props?.profitPerMonth)} ₽</li>
                    }
                    {props?.dateOfCreation &&
                        <li>Год основания компании: {convertLocaleDate(props?.dateOfCreation)?.slice(-4)}</li>
                    }
                    {props?.branchCount &&
                        <li>Количество собственных точек: {FunctionForPrice(props?.branchCount)} шт.</li>
                    }
                    {props?.soldBranchCount &&
                        <li>Количество проданных франшиз: {FunctionForPrice(props?.soldBranchCount)} шт.</li>
                    }
                </ul>
            </section>
        )
    } else {
        return <></>
    }
}

export default ShortInfoInOfferContainer
