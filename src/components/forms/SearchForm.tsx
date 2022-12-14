import React, {useState} from 'react'
import Collapse from 'react-bootstrap/Collapse'
import {MdCached} from 'react-icons/md'
import {IOffersAreaItem, IOffersSubSectionsItem, IPayloadsFilter} from '../../types/offers'
import {useForm} from 'react-hook-form'
import ValidateWrapper from '../utils/ValidateWrapper'

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
                    {isShowCollapse ? '???????????? ??????????' : '???????????????? ??????????'}
                </button>
                <div className="order-1 order-sm-2 text-uppercase">?????????? ???? ????????????????????</div>
                <div className="order-3">(??????????????: {foundCount})</div>
            </div>
            <Collapse className="collapse-filter" in={isShowCollapse} dimension="height">
                <div id="collapse-content">
                    <div className="row">
                        <div className="col-sm-6 col-md-4 mb-3 mb-lg-4 collapse-content__module collapse-content__module_business">
                            <ValidateWrapper error={errors?.areaId}>
                                <select
                                    {...register('areaId', {
                                        required: '???????????????? ????????????????!',
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
                                        ??????????
                                    </option>
                                    {areas ? (
                                        areas.map((i) => (
                                            <option key={i?.id} value={i?.id}>
                                                {i?.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>??????????</option>
                                    )}
                                </select>
                            </ValidateWrapper>
                        </div>
                        <div className="col-sm-6 col-md-4 mb-3 mb-lg-4 collapse-content__module collapse-content__module_category">
                            <ValidateWrapper error={errors?.subsectionId}>
                                <select
                                    {...register('subsectionId', {
                                        required: '???????????????? ????????????????!',
                                    })}
                                >
                                    <option value={''} disabled>
                                        ??????????????????
                                    </option>
                                    {subSections ? (
                                        subSections.map((i) => (
                                            <option key={i?.id} value={i?.id}>
                                                {i?.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>??????????</option>
                                    )}
                                </select>
                            </ValidateWrapper>
                        </div>
                        <div className="col-sm-6 col-md-4 mb-3 mb-lg-4 collapse-content__module collapse-content__module_city">
                            <select {...register('city')}>
                                <option value={''} disabled>
                                    ??????????
                                </option>
                                {cities ? (
                                    cities.map((i, index) => (
                                        <option key={index} value={i}>
                                            {i}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>??????????</option>
                                )}
                            </select>
                        </div>
                        {modules.includes('projectStage') && (
                            <div className="col-sm-6 mb-3 mb-lg-4 collapse-content__module collapse-content__module_project">
                                <select {...register('projectStage')}>
                                    <option value={''} disabled>
                                        ???????????? ???????????????????? ??????????????
                                    </option>
                                    <option value={0}>????????</option>
                                    <option value={1}>?? ???????????? ????????????????</option>
                                    <option value={2}>?????????????? ????????????</option>
                                </select>
                            </div>
                        )}
                        {modules.includes('paybackTime') && (
                            <div className="col-sm-6 mb-3 mb-lg-4 collapse-content__module collapse-content__module_payback">
                                <select {...register('paybackTime')}>
                                    <option value={''} disabled>
                                        ???????? ??????????????????????
                                    </option>
                                    <option value={0}>???? 3 ??????????????</option>
                                    <option value={1}>???? 3 ???? 6 ??????????????</option>
                                    <option value={2}>???? 6 ???? 1 ????????</option>
                                    <option value={3}>???? 1 ???????? ???? 3 ??????</option>
                                    <option value={4}>???? 3 ??????</option>
                                </select>
                            </div>
                        )}
                    </div>
                    <div className="row">
                        {modules.includes('query') && (
                            <div className="col-sm-6 col-md-4 col-lg-6 mb-3 mb-lg-4 collapse-content__module collapse-content__module_word">
                                <div className="d-none d-md-block mb-1">???????????????? ??????????:</div>
                                <input type="text" {...register('query')} placeholder="?????????????? ?????????????????? ??????????" />
                            </div>
                        )}
                        {modules.includes('investments') && (
                            <div className="col-sm-6 col-md-4 col-lg-3 mb-3 mb-lg-4 collapse-content__module collapse-content__module_investment">
                                <div className="mb-1">?????????? ????????????????????, ??????.:</div>
                                <div className="d-flex align-items-center">
                                    <span className="me-2">????</span>
                                    <ValidateWrapper error={errors.investmentsFrom}>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            {...register('investmentsFrom', {
                                                valueAsNumber: true,
                                            })}
                                        />
                                    </ValidateWrapper>
                                    <span className="mx-2">????</span>
                                    <ValidateWrapper error={errors.investmentsTo}>
                                        <input
                                            type="number"
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
                                <div className="mb-1">?????????????????? ??????????????:</div>
                                <div className="d-flex align-items-center">
                                    <span className="me-2">????</span>
                                    <ValidateWrapper error={errors.priceFrom}>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            {...register('priceFrom', {
                                                valueAsNumber: true,
                                            })}
                                        />
                                    </ValidateWrapper>
                                    <span className="mx-2">????</span>
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
                                <div className="mb-1">???????????? ??????????????, ??????.:</div>
                                <div className="d-flex align-items-center">
                                    <span className="me-2">????</span>
                                    <ValidateWrapper error={errors.profitFrom}>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            {...register('profitFrom', {
                                                valueAsNumber: true,
                                            })}
                                        />
                                    </ValidateWrapper>
                                    <span className="mx-2">????</span>
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
                                <div className="mb-1">???????????? ?? ??????????, ??????.:</div>
                                <div className="d-flex align-items-center">
                                    <span className="me-2">????</span>
                                    <ValidateWrapper error={errors.profitPerMonthFrom}>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            {...register('profitPerMonthFrom', {
                                                valueAsNumber: true,
                                            })}
                                        />
                                    </ValidateWrapper>
                                    <span className="mx-2">????</span>
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
                            <span className="f_09 ms-2">???????????????? ????????????</span>
                        </button>
                        <button className="btn_main btn_2 ms-3 ms-sm-4" onClick={handleSubmit(onApplyFilters)}>
                            ????????????????
                        </button>
                    </div>
                </div>
            </Collapse>
        </div>
    )
}

export default SearchForm
