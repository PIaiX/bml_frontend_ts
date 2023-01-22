import React, {useEffect, useState} from 'react'
import Collapse from 'react-bootstrap/Collapse'
import {MdCached} from 'react-icons/md'
import {IOffersAreaItem, IOffersSubSectionsItem, IPayloadsFilter} from '../../types/offers'
import {useForm} from 'react-hook-form'
import ValidateWrapper from '../utils/ValidateWrapper'
// import CitiesForm from "./CitiesForm";
import FunctionForPrice from "../../services/FunctionForPrice";
import {FromStringToNumber} from "../../services/FromStringToNumber";

type Props = {
    foundCount?: number
    searchCount?: number
    onApplyFilters: (data: IPayloadsFilter) => void
    onReset: (data: IPayloadsFilter) => void
    modules: string[]
    areas?: Array<IOffersAreaItem | undefined>
    cities?: Array<string>
    subSections?: Array<IOffersSubSectionsItem | undefined>
    selectCurrentArea?: (areaId: number) => void
}

const SearchForm: React.FC<Props> = ({
                                         foundCount,
                                         onApplyFilters,
                                         modules = [],
                                         areas,
                                         cities,
                                         subSections,
                                         selectCurrentArea,
                                         onReset,
                                     }) => {
    const [isShowCollapse, setIsShowCollapse] = useState(true)
    const {
        register,
        formState: {errors},
        handleSubmit,
        getValues,
        reset,
        watch,
        setValue,
    } = useForm<IPayloadsFilter>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            areaId: '',
            subsectionId: '',
            city: '',
            orderBy: '',
            query: '',
            investmentsFrom: null,
            investmentsTo: null,
            projectStage: '',
            paybackTime: '',
            priceFrom: null,
            priceTo: null,
            profitFrom: null,
            profitTo: null,
            profitPerMonthFrom: null,
            profitPerMonthTo: null,
        },
    })

    const GoodLook = (o: any) => {
        let val = FromStringToNumber(o.target.value);
        setValue(o.target.name, FunctionForPrice(val))
    }

    const BeforeOnApplyFilters = (data: any) => {
        let ValuesFroPrice:Array<Array<any>> = [
            ['priceFrom'], ['priceTo'], ['profitFrom'],  ['profitTo'], ['profitPerMonthFrom'], ['profitPerMonthTo'], ['investmentsFrom'], ['investmentsTo']
        ]
        ValuesFroPrice.forEach(i=>i.push(FromStringToNumber(watch(i[0]))))
        onApplyFilters({
            ...data,
            [ValuesFroPrice[0][0]]: ValuesFroPrice[0][1],
            [ValuesFroPrice[1][0]]: ValuesFroPrice[1][1],
            [ValuesFroPrice[2][0]]: ValuesFroPrice[2][1],
            [ValuesFroPrice[3][0]]: ValuesFroPrice[3][1],
            [ValuesFroPrice[4][0]]: ValuesFroPrice[4][1],
            [ValuesFroPrice[5][0]]: ValuesFroPrice[5][1],
            [ValuesFroPrice[6][0]]:ValuesFroPrice[6][1],
            [ValuesFroPrice[7][0]]:ValuesFroPrice[7][1]
        })
    }

    return (
        <div className="filter mb-4">
            <div className="filter_line_1">
                <button
                    className="order-2 order-sm-1 filter__btn"
                    type="button"
                    onClick={() => setIsShowCollapse((prevIsShowCollapse) => !prevIsShowCollapse)}
                    aria-controls="collapse-content"
                >
                    {isShowCollapse ? 'скрыть поиск' : 'показать поиск'}
                </button>
                <div className="order-1 order-sm-2 text-uppercase">Поиск по параметрам</div>
                <div className="order-3">(Найдено: {foundCount})</div>
            </div>
            <Collapse className="collapse-filter" in={isShowCollapse} dimension="height">
                <div id="collapse-content">
                    <div className="row">
                        <div
                            className="col-sm-6 col-md-4 mb-3 mb-lg-4 collapse-content__module collapse-content__module_business">
                            <ValidateWrapper error={errors?.areaId}>
                                <select
                                    {...register('areaId', {
                                        required: 'Выберите значение!',
                                        onChange: (e) => {
                                            if (selectCurrentArea) {
                                                selectCurrentArea(+e.target.value)
                                            }
                                            setValue('subsectionId', '')
                                            setValue('orderBy', 'desc')
                                        },
                                    })}
                                >
                                    <option value={''} disabled>
                                        Сфера
                                    </option>
                                    {areas ? (
                                        areas.map((i) => (
                                            <option key={i?.id} value={i?.id}>
                                                {i?.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>Пусто</option>
                                    )}
                                </select>
                            </ValidateWrapper>
                        </div>
                        <div
                            className="col-sm-6 col-md-4 mb-3 mb-lg-4 collapse-content__module collapse-content__module_category">
                            <ValidateWrapper error={errors?.subsectionId}>
                                <select
                                    {...register('subsectionId', {
                                        required: 'Выберите значение!',
                                    })}
                                >
                                    <option value={''} disabled>
                                        Категория
                                    </option>
                                    {subSections ? (
                                        subSections.map((i) => (
                                            <option key={i?.id} value={i?.id}>
                                                {i?.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>Пусто</option>
                                    )}
                                </select>
                            </ValidateWrapper>
                        </div>
                        <div
                            className="col-sm-6 col-md-4 mb-3 mb-lg-4 collapse-content__module collapse-content__module_city">
                            {/*<CitiesForm/>*/}
                            <input type={"text"} placeholder={"Город"} />

                        </div>
                        {modules.includes('projectStage') && (
                            <div
                                className="col-sm-6 mb-3 mb-lg-4 collapse-content__module collapse-content__module_project">
                                <select {...register('projectStage')}>
                                    <option value={''} disabled>
                                        Стадия реализации проекта
                                    </option>
                                    <option value={0}>Идея</option>
                                    <option value={1}>В стадии создания</option>
                                    <option value={2}>Готовый бизнес</option>
                                </select>
                            </div>
                        )}
                        {modules.includes('paybackTime') && (
                            <div
                                className="col-sm-6 mb-3 mb-lg-4 collapse-content__module collapse-content__module_payback">
                                <select {...register('paybackTime')}>
                                    <option value={''} disabled>
                                        Срок окупаемости
                                    </option>
                                    <option value={0}>до 3 месяцев</option>
                                    <option value={1}>от 3 до 6 месяцев</option>
                                    <option value={2}>от 6 до 1 года</option>
                                    <option value={3}>от 1 года до 3 лет</option>
                                    <option value={4}>от 3 лет</option>
                                </select>
                            </div>
                        )}
                    </div>
                    <div className="row">
                        {modules.includes('query') && (
                            <div className=" mb-3 mb-lg-4 collapse-content__module collapse-content__module_word">
                                <div className={'col-sm-6 mb-3 mb-lg-4 mb-3 mb-lg-4'}>
                                    <div className="d-none d-md-block mb-1">Содержит слова:</div>
                                    <input type="text" {...register('query')} placeholder="Введите поисковую фразу"/>
                                </div>
                            </div>)}
                        {modules.includes('investments') && (
                            <div
                                className="col-sm-6 col-md-4 col-lg-3 mb-3 mb-lg-4 collapse-content__module collapse-content__module_investment">
                                <div className="mb-1">Объем инвестиций, руб.:</div>
                                <div className="d-flex align-items-center">
                                    <span className="me-2">от</span>
                                    <ValidateWrapper error={errors.investmentsFrom}>
                                        <input type={"text"}
                                               placeholder={FunctionForPrice("0")} {...register('investmentsFrom', {
                                            onChange: event => GoodLook(event)
                                        })}/>
                                    </ValidateWrapper>
                                    <span className="mx-2">до</span>
                                    <ValidateWrapper error={errors.investmentsTo}>
                                        <input type={"text"}
                                               placeholder={FunctionForPrice("100000000")} {...register('investmentsTo', {
                                            onChange: event => GoodLook(event)
                                        })}/>
                                    </ValidateWrapper>
                                </div>
                            </div>
                        )}
                        {modules.includes('price') && (
                            <div
                                className="col-sm-6 col-md-4 col-lg-3 mb-3 mb-lg-4 collapse-content__module collapse-content__module_net">
                                <div className="mb-1">Стоимость бизнеса:</div>
                                <div className="d-flex align-items-center">
                                    <span className="me-2">от</span>
                                    <ValidateWrapper error={errors.priceFrom}>
                                        <input type={"text"}
                                               placeholder={FunctionForPrice("0")}
                                               {...register('priceFrom', {
                                                   onChange: event => GoodLook(event)
                                               })}
                                        /> </ValidateWrapper>
                                    <span className="mx-2">до</span>
                                    <ValidateWrapper error={errors.priceTo}>
                                        <input type={"text"}
                                               placeholder={FunctionForPrice("10000000")}
                                               {...register('priceTo', {
                                                   onChange: event => GoodLook(event)
                                               })}
                                        />
                                    </ValidateWrapper>
                                </div>
                            </div>
                        )}
                        {modules.includes('profit') && (
                            <div
                                className="col-sm-6 col-md-4 col-lg-3 mb-3 mb-lg-4 collapse-content__module collapse-content__module_net">
                                <div className="mb-1">Чистая прибыль, руб.:</div>
                                <div className="d-flex align-items-center">
                                    <span className="me-2">от</span>
                                    <ValidateWrapper error={errors.profitFrom}>
                                        <input type={"text"}
                                               placeholder={FunctionForPrice("0")}
                                               {...register('profitFrom', {
                                                   onChange: event => GoodLook(event)
                                               })}/>
                                    </ValidateWrapper>
                                    <span className="mx-2">до</span>
                                    <ValidateWrapper error={errors.profitTo}>
                                        <input type={"text"}
                                               placeholder={FunctionForPrice("10000000")}
                                               {...register('profitTo', {
                                                   onChange: event => GoodLook(event)
                                               })}/>
                                    </ValidateWrapper>
                                </div>
                            </div>
                        )}
                        {modules.includes('profitPerMonth') && (
                            <div
                                className="col-sm-6 col-md-4 col-lg-3 mb-3 mb-lg-4 collapse-content__module collapse-content__module_turnover">
                                <div className="mb-1">Оборот в месяц, руб.:</div>
                                <div className="d-flex align-items-center">
                                    <span className="me-2">от</span>
                                    <ValidateWrapper error={errors.profitPerMonthFrom}>
                                        <input type={"text"}
                                               placeholder={FunctionForPrice("0")}
                                               {...register('profitPerMonthFrom', {
                                                   onChange: event => GoodLook(event)
                                               })}/>
                                    </ValidateWrapper>
                                    <span className="mx-2">до</span>
                                    <ValidateWrapper error={errors.profitPerMonthTo}>
                                        <input type={"text"}
                                               placeholder={FunctionForPrice("1000000000")}
                                               {...register('profitPerMonthTo', {
                                                   onChange: event => GoodLook(event)
                                               })}/>

                                    </ValidateWrapper>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="d-flex justify-content-end">
                        <button
                            type="reset"
                            className="d-flex align-items-center"
                            onClick={() => {
                                reset()
                                setValue('orderBy', 'desc')
                                onReset(getValues())
                            }}
                        >
                            <MdCached className="f_15"/>
                            <span className="f_09 ms-2">Очистить фильтр</span>
                        </button>
                        <button className="btn_main btn_2 ms-3 ms-sm-4" onClick={handleSubmit(BeforeOnApplyFilters)}>
                            Показать
                        </button>
                    </div>
                </div>
            </Collapse>
        </div>
    )
}

export default SearchForm