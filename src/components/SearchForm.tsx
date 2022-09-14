import React, {useState} from 'react';
import Collapse from 'react-bootstrap/Collapse';
import {onInputHandler, onSelectHandler} from '../helpers/formHandlers';
import {MdCached} from 'react-icons/md';

interface Props {
    foundCount: number,
    searchCount?: number,
    filters: {
        orderBy: string,
        byPublicationDate: number
    },
    setFilters: React.Dispatch<React.SetStateAction<{
        orderBy: string;
        byPublicationDate: number;
    }>>,
    onApplyFilters: () => void,
    modules: string[]
}

const SearchForm: React.FC<Props> = ({foundCount, filters, setFilters, onApplyFilters, modules = []}) => {
    const [isShowCollapse, setIsShowCollapse] = useState(true)

    const onResetFilters = () => {
        setFilters(prevFilters => ({
            orderBy: prevFilters['orderBy'],
            byPublicationDate: prevFilters['byPublicationDate']
        }))
        onApplyFilters()
    }

    return (
        <div
            className="filter mb-4"
        >
            <div className="filter_line_1">
                <button
                    className="order-2 order-sm-1 filter__btn"
                    type="button"
                    onClick={() => setIsShowCollapse(prevIsShowCollapse => !prevIsShowCollapse)}
                    aria-controls="collapse-content"
                >
                    {isShowCollapse ? 'скрыть поиск' : 'показать поиск'}
                </button>
                <div className="order-1 order-sm-2 text-uppercase">Поиск по параметрам</div>
                <div className="order-3">(Найдено: {foundCount})</div>
            </div>
            <Collapse
                className="collapse-filter"
                in={isShowCollapse}
                dimension="height"
            >
                <div id="collapse-content">
                    <div className="row">
                        <div className="col-sm-6 col-md-4 mb-3 mb-lg-4 collapse-content__module collapse-content__module_business">
                            <select
                                // value={filters['businessArea'] ?? 0}
                                name='businessArea'
                                onChange={(e) => onSelectHandler(e, setFilters, true)}
                            >
                                <option value={0} disabled hidden>Сфера бизнеса</option>
                                <option value={1}>Сфера 1</option>
                                <option value={2}>Сфера 2</option>
                            </select>
                        </div>
                        <div className="col-sm-6 col-md-4 mb-3 mb-lg-4 collapse-content__module collapse-content__module_category">
                            <select
                                // value={filters['category'] ?? 0}
                                name='category'
                                onChange={(e) => onSelectHandler(e, setFilters, true)}
                            >
                                <option value={0} disabled hidden>Категория</option>
                                <option value={1}>Категория 1</option>
                                <option value={2}>Категория 2</option>
                            </select>
                        </div>
                        <div className="col-sm-6 col-md-4 mb-3 mb-lg-4 collapse-content__module collapse-content__module_city">
                            <select
                                // value={filters['city'] ?? 0}
                                name='city'
                                onChange={(e) => onSelectHandler(e, setFilters, true)}
                            >
                                <option value={0} disabled hidden>Город</option>
                                <option value={1}>Город 1</option>
                                <option value={2}>Город 2</option>
                            </select>
                        </div>
                        {modules.includes('projectImplemetationStage') &&
                            <div className="col-sm-6 mb-3 mb-lg-4 collapse-content__module collapse-content__module_project">
                                <select
                                    // value={filters['projectImplementationStage'] ?? 0}
                                    name='projectImplementationStage'
                                    onChange={(e) => onSelectHandler(e, setFilters, true)}
                                >
                                    <option value={0} disabled hidden>Стадия реализации проекта</option>
                                    <option value={1}>Стадия 1</option>
                                    <option value={2}>Стадия 2</option>
                                </select>
                            </div>
                        }
                        {modules.includes('paybackPeriod') &&
                            <div className="col-sm-6 mb-3 mb-lg-4 collapse-content__module collapse-content__module_payback">
                                <select
                                    // value={filters['paybackPeriod'] ?? 0}
                                    name='paybackPeriod'
                                    onChange={(e) => onSelectHandler(e, setFilters, true)}
                                >
                                    <option value={0} disabled hidden>Срок окупаемости, мес.</option>
                                    <option value={1}>Срок 1</option>
                                    <option value={2}>Срок 2</option>
                                </select>
                            </div>
                        }
                    </div>
                    <div className="row">
                        {modules.includes('wordContent') &&
                            <div className="col-sm-6 col-md-4 col-lg-6 mb-3 mb-lg-4 collapse-content__module collapse-content__module_word">
                                <div className="d-none d-md-block mb-1">Содержит слова:</div>
                                <input
                                    type="text"
                                    name='wordContent'
                                    // value={filters['wordContent'] ?? ''}
                                    placeholder="Введите поисковую фразу"
                                    onChange={e => onInputHandler(e, setFilters)}
                                />
                            </div>
                        }
                        {modules.includes('investmentSize') &&
                            <div className="col-sm-6 col-md-4 col-lg-3 mb-3 mb-lg-4 collapse-content__module collapse-content__module_investment">
                                <div className="mb-1">Объем инвестиций, руб.:</div>
                                <div className="d-flex align-items-center">
                                    <span className="me-2">от</span>
                                    <input
                                        type="number"
                                        placeholder="100"
                                        // value={filters['investmentSizeStart'] ?? ''}
                                        onChange={e => onInputHandler(e, setFilters, true)}
                                        name='investmentSizeStart'
                                    />
                                    <span className="mx-2">до</span>
                                    <input
                                        type="number"
                                        placeholder="100000"
                                        // value={filters['investmentSizeEnd'] ?? ''}
                                        onChange={e => onInputHandler(e, setFilters, true)}
                                        name='investmentSizeEnd'
                                    />
                                </div>
                            </div>
                        }
                        {modules.includes('netProfit') &&
                            <div className="col-sm-6 col-md-4 col-lg-3 mb-3 mb-lg-4 collapse-content__module collapse-content__module_net">
                                <div className="mb-1">Чистая прибыль, руб.:</div>
                                <div className="d-flex align-items-center">
                                    <span className="me-2">от</span>
                                    <input
                                        type="number"
                                        placeholder="100"
                                        name='netProfitStart'
                                        // value={filters['netProfitStart'] ?? ''}
                                        onChange={(e) => onInputHandler(e, setFilters, true)}
                                    />
                                    <span className="mx-2">до</span>
                                    <input
                                        type="number"
                                        placeholder="100000"
                                        name='netProfitEnd'
                                        // value={filters['netProfitEnd'] ?? ''}
                                        onChange={(e) => onInputHandler(e, setFilters, true)}
                                    />
                                </div>
                            </div>
                        }
                        {modules.includes('turnoverPerMonth') &&
                            <div className="col-sm-6 col-md-4 col-lg-3 mb-3 mb-lg-4 collapse-content__module collapse-content__module_turnover">
                                <div className="mb-1">Оборот в месяц, руб.:</div>
                                <div className="d-flex align-items-center">
                                    <span className="me-2">от</span>
                                    <input
                                        type="number"
                                        placeholder="100"
                                        name='turnoverPerMonthStart'
                                        // value={filters['turnoverPerMonthStart'] ?? ''}
                                        onChange={(e) => onInputHandler(e, setFilters, true)}
                                    />
                                    <span className="mx-2">до</span>
                                    <input
                                        type="number"
                                        placeholder="100000"
                                        name='turnoverPerMonthEnd'
                                        // value={filters['turnoverPerMonthEnd'] ?? ''}
                                        onChange={(e) => onInputHandler(e, setFilters, true)}
                                    />
                                </div>
                            </div>
                        }
                    </div>
                    <div className="d-flex justify-content-end">
                        <button
                            className="d-flex align-items-center"
                            onClick={onResetFilters}
                        >
                            <MdCached className='f_15'/>
                            <span className="f_09 ms-2">Очистить фильтр</span>
                        </button>
                        <button
                            className="btn_main btn_2 ms-3 ms-sm-4"
                            onClick={onApplyFilters}
                        >Показать</button>
                    </div>
                </div>
            </Collapse>
        </div>
    );
};

export default SearchForm;