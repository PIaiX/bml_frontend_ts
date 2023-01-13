import React, {useState} from 'react'
import Collapse from 'react-bootstrap/Collapse'
import {MdCached} from 'react-icons/md'
import {IOffersAreaItem, IOffersSubSectionsItem, IPayloadsFilter} from '../../types/offers'
import {useForm} from 'react-hook-form'
import ValidateWrapper from '../utils/ValidateWrapper'
import FunctionForPrice from '../../services/FunctionForPrice'

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
                        <div className="col-sm-6 col-md-4 mb-3 mb-lg-4 collapse-content__module collapse-content__module_business">
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
                        <div className="col-sm-6 col-md-4 mb-3 mb-lg-4 collapse-content__module collapse-content__module_category">
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
                        <div className="col-sm-6 col-md-4 mb-3 mb-lg-4 collapse-content__module collapse-content__module_city">
                            <select {...register('city')}>
                                <option value={''} disabled>
                                    Город
                                </option>
                                {cities ? (
                                    cities.map((i, index) => (
                                        <option key={index} value={i}>
                                            {i}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>Пусто</option>
                                )}
                            </select>
                        </div>
                        {modules.includes('projectStage') && (
                            <div className="col-sm-6 mb-3 mb-lg-4 collapse-content__module collapse-content__module_project">
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
                            <div className="col-sm-6 mb-3 mb-lg-4 collapse-content__module collapse-content__module_payback">
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
                                    <input type="text" {...register('query')} placeholder="Введите поисковую фразу" />
                                </div>
                            </div>
                        )}
                        {modules.includes('investments') && (
                            <div className="col-sm-6 col-md-4 col-lg-3 mb-3 mb-lg-4 collapse-content__module collapse-content__module_investment">
                                <div className="mb-1">Объем инвестиций, руб.:</div>
                                <div className="d-flex align-items-center">
                                    <span className="me-2">от</span>
                                    <ValidateWrapper error={errors.investmentsFrom}>
                                        <input
                                            type="number"
                                            placeholder={FunctionForPrice('0')}
                                            {...register('investmentsFrom', {
                                                valueAsNumber: true,
                                            })}
                                        />
                                    </ValidateWrapper>
                                    <span className="mx-2">до</span>
                                    <ValidateWrapper error={errors.investmentsTo}>
                                        <input
                                            type="text"
                                            placeholder="100000000"
                                            {...register('investmentsTo', {
                                                valueAsNumber: true,
                                            })}
                                        />
                                    </ValidateWrapper>
                                </div>
                            </div>
                        )}
                        {modules.includes('price') && (
                            <div className="col-sm-6 col-md-4 col-lg-3 mb-3 mb-lg-4 collapse-content__module collapse-content__module_net">
                                <div className="mb-1">Стоимость бизнеса:</div>
                                <div className="d-flex align-items-center">
                                    <span className="me-2">от</span>
                                    <ValidateWrapper error={errors.priceFrom}>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            {...register('priceFrom', {
                                                valueAsNumber: true,
                                            })}
                                        />
                                    </ValidateWrapper>
                                    <span className="mx-2">до</span>
                                    <ValidateWrapper error={errors.priceTo}>
                                        <input
                                            type="number"
                                            placeholder="10000000"
                                            {...register('priceTo', {
                                                valueAsNumber: true,
                                            })}
                                        />
                                    </ValidateWrapper>
                                </div>
                            </div>
                        )}
                        {modules.includes('profit') && (
                            <div className="col-sm-6 col-md-4 col-lg-3 mb-3 mb-lg-4 collapse-content__module collapse-content__module_net">
                                <div className="mb-1">Чистая прибыль, руб.:</div>
                                <div className="d-flex align-items-center">
                                    <span className="me-2">от</span>
                                    <ValidateWrapper error={errors.profitFrom}>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            {...register('profitFrom', {
                                                valueAsNumber: true,
                                            })}
                                        />
                                    </ValidateWrapper>
                                    <span className="mx-2">до</span>
                                    <ValidateWrapper error={errors.profitTo}>
                                        <input
                                            type="number"
                                            placeholder="10000000"
                                            {...register('profitTo', {
                                                valueAsNumber: true,
                                            })}
                                        />
                                    </ValidateWrapper>
                                </div>
                            </div>
                        )}
                        {modules.includes('profitPerMonth') && (
                            <div className="col-sm-6 col-md-4 col-lg-3 mb-3 mb-lg-4 collapse-content__module collapse-content__module_turnover">
                                <div className="mb-1">Оборот в месяц, руб.:</div>
                                <div className="d-flex align-items-center">
                                    <span className="me-2">от</span>
                                    <ValidateWrapper error={errors.profitPerMonthFrom}>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            {...register('profitPerMonthFrom', {
                                                valueAsNumber: true,
                                            })}
                                        />
                                    </ValidateWrapper>
                                    <span className="mx-2">до</span>
                                    <ValidateWrapper error={errors.profitPerMonthTo}>
                                        <input
                                            type="number"
                                            placeholder="1000000000"
                                            {...register('profitPerMonthTo', {
                                                valueAsNumber: true,
                                            })}
                                        />
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
                            <MdCached className="f_15" />
                            <span className="f_09 ms-2">Очистить фильтр</span>
                        </button>
                        <button className="btn_main btn_2 ms-3 ms-sm-4" onClick={handleSubmit(onApplyFilters)}>
                            Показать
                        </button>
                    </div>
                </div>
            </Collapse>
        </div>
    )
}

export default SearchForm
