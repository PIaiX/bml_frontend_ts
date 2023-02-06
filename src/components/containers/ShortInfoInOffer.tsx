import React, {FC} from 'react'
import {MdInfoOutline} from 'react-icons/md'
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
}

const ShortInfoInOfferContainer: FC<Props> = (props) => {
    if (props?.category === 0) {
        return (
            <section className="anchor_block" id="anchor_little_info">
                <h4 className="fw_7">Краткая информация</h4>
                <ul>
                    <li>Инвестиции: {FunctionForPrice(props?.investments)} ₽</li>
                    <li>Предполагаемая прибыль: {FunctionForPrice(props?.profitPerMonth) || 0} ₽</li>
                    <li>
                        Окупаемость: {props?.payback !== null ? props?.paybackForUser?.toLowerCase() : 'не установлено'}
                    </li>
                    <li>
                        Стадия проекта:
                        {props?.projectStage !== null ? props?.projectStageForUser?.toLowerCase() : 'не установлено'}
                    </li>
                    <li>Сфера: {props?.areaName}</li>
                </ul>
            </section>
        )
    } else if (props?.category === 1) {
        return (
            <section className="anchor_block" id="anchor_little_info">
                <h4 className="fw_7">Краткая информация</h4>
                <ul>
                    <li>Инвестиции: {FunctionForPrice(props?.investments)} ₽</li>
                    <li>
                        Окупаемость: {props?.payback !== null ? props?.paybackForUser?.toLowerCase() : 'не установлено'}
                    </li>
                    <li>Сфера: {props?.areaName}</li>
                </ul>
            </section>
        )
    } else if (props?.category === 2) {
        return (
            <section className="anchor_block" id="anchor_little_info">
                <h4 className="fw_7">Краткая информация</h4>
                <ul>
                    <li>Инвестиции: {FunctionForPrice(props?.investments)} ₽</li>
                    <li>Предполагаемая прибыль: {FunctionForPrice(props?.profit)} ₽</li>
                    <li>
                        Окупаемость: {props?.payback !== null ? props?.paybackForUser?.toLowerCase() : 'не установлено'}
                    </li>
                    <li>
                        Стадия проекта:{' '}
                        {props?.projectStage !== null ? props?.projectStageForUser?.toLowerCase() : 'не установлено'}
                    </li>
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
                    <li>
                        Окупаемость: {props?.payback !== null ? props?.paybackForUser?.toLowerCase() : 'не установлено'}
                    </li>
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
                    <li>Роялти: {FunctionForPrice(props?.pricePerMonth)} ₽</li>
                    <li>
                        Срок окупаемости:{' '}
                        {props?.payback !== null ? props?.paybackForUser?.toLowerCase() : 'не установлено'}
                    </li>
                    <li>Предполагаемая прибыль: {FunctionForPrice(props?.profitPerMonth)} ₽</li>
                    <li>Год основания компании: {convertLocaleDate(props?.dateOfCreation)?.slice(-4)}</li>
                    <li>Количество собственных точек: {FunctionForPrice(props?.branchCount)} шт.</li>
                    <li>Количество проданных франшиз: {FunctionForPrice(props?.soldBranchCount)} шт.</li>
                </ul>
            </section>
        )
    } else {
        return <></>
    }
}

export default ShortInfoInOfferContainer
