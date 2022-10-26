import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {onImageHandler, onInputHandler, onSelectHandler} from "../../helpers/formHandlers";
import {Link, NavLink} from 'react-router-dom';
import {MdOutlineArrowBack} from "react-icons/md";
import {useImageViewer} from "../../hooks/imageViewer";
import {useImagesViewer} from "../../hooks/imagesViewer";
import CustomModal from "../../components/utils/CustomModal";

const NewAd = () => {

    const [category, setCategory] = useState('0');
    const [data, setData] = useState<any>({
        category: 0,
        files: []
    })
    const [loadPhotoModal, setLoadPhotoModal] = useState(false)
    const photoInfo = useImageViewer(data?.file)
    const [dragActive, setDragActive] = useState(false)
    const inputRef = useRef(null)
    const [files, setFiles] = useState<any>([])
    const imageViewer = useImagesViewer(files)

    const handleDrag = (e:any) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    useEffect(() => {
        if (imageViewer.length !== 0) {
            setData((prevState:any) => ({...prevState, files: imageViewer}))
            setFiles([])
        }
    }, [imageViewer])

    const handleDrop = (e:any) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0] && e.dataTransfer?.files?.length < 10) {
            console.log(e.dataTransfer?.files?.length)
            setFiles([...e.dataTransfer.files])
        } else {
            alert('Меньше 10 фото пж')
        }
    }

    const deletePhoto = (name:any) => {
        setData((prevData:any) => ({...prevData, files: prevData?.files.filter((i:any) => (i?.info?.name !== name))}))
    }

    const validPhoto = (photo:any) => {
        if (photo?.height === undefined && photo?.width === undefined) {
            return <span>Фото не загружено</span>
        } else if (photo?.width === 600 && photo?.height === 400) {
            return <span>Фото загружено</span>
        } else if (photo?.width !== 600 && photo?.height !== 400) {
            return <span>Размеры не подходят</span>
        } else return false
    }

    return (
        <>
            <Link to="/account/my-ads"
                  className='color-1 f_11 fw_5 d-flex align-items-center d-lg-none mb-3 mb-sm-4'><MdOutlineArrowBack/>
                <span className='ms-2'>Назад</span></Link>
            <h4>Новое объявление</h4>
            <form onDragEnter={handleDrag} onSubmit={e => e.preventDefault()}>
                <fieldset className="row align-items-center mb-4 mb-sm-5">
                    <div className="col-sm-6 col-lg-4">
                        <div className="fw_7 text-uppercase mb-2 mb-sm-0">Категория</div>
                    </div>
                    <div className="col-sm-6 col-lg-8">
                        <select
                            name="category"
                            value={data?.category || 'default'}
                            onChange={(e) => {
                                onSelectHandler(e, setData, true)
                                setCategory(e.target.value)
                            }}
                        >
                            <option value={'default'} disabled>Выберете категорию</option>
                            <option value={0}>Поиск инвесторов</option>
                            <option value={1}>Предложения инвесторов</option>
                            <option value={2}>Поиск бизнес партнёров</option>
                            <option value={3}>Продажа готового бизнеса</option>
                            <option value={4}>Франшизы</option>
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <legend className="fw_7 f_10 text-uppercase mb-3 mb-sm-4">Параметры</legend>

                    <div className="row align-items-center mb-3 mb-sm-4">
                        <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                            <div>{(category === '4') ? 'Название франшизы' : 'Название объявления'}<span
                                className='red'>*</span></div>
                        </div>
                        <div className="col-sm-6 col-lg-8">
                            <input
                                type="text"
                                required={true}
                                placeholder="Например, продажа офисных помещений"
                                name='adName'
                                onChange={e => onInputHandler(e, setData)}
                            />
                        </div>
                    </div>

                    <div className="row mb-3 mb-sm-4">
                        <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0 pt-sm-2">
                            <div>
                                {
                                    (category === '0' || category === '1' || category === '2')
                                        ? 'Описание объявления'
                                        : (category === '3') ? 'Описание бизнеса'
                                            : 'Описание компании'
                                }
                                <span className='red'>*</span>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-8">
                            <textarea
                                rows={4}
                                required={true}
                                placeholder={
                                    (category === '0' || category === '1' || category === '2')
                                        ? 'Описание объявления'
                                        : (category === '3')
                                            ? 'Описание бизнеса'
                                            : 'Описание компании'
                                }
                                name='description'
                                onChange={e => onInputHandler(e, setData)}
                            />
                        </div>
                    </div>
                    {
                        (category === '4') &&
                        <>
                            <div className="row mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0 pt-sm-2">
                                    <div>Описание франшизы<span className='red'>*</span></div>
                                </div>
                                <div className="col-sm-6 col-lg-8">
                                    <textarea
                                        rows={4}
                                        required={true}
                                        placeholder="Описание франшизы"
                                        name='descriptionFranchise'
                                    />
                                </div>
                            </div>
                            <div className="row mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0 pt-sm-2">
                                    <div>Преимущества франшизы</div>
                                </div>
                                <div className="col-sm-6 col-lg-8">
                                    <textarea
                                        rows={4}
                                        placeholder="Преимущества франшизы"
                                        name='advantageFranchise'
                                        onChange={e => onInputHandler(e, setData)}
                                    />
                                </div>
                            </div>
                        </>
                    }
                    <div className="row mb-3 mb-sm-4">
                        <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0 pt-sm-2">
                            <div>
                                {
                                    (category === '0' || category === '2' || category === '4')
                                        ? <>Условия сотрудничества<span className='red'>*</span></>
                                        : (category === '1')
                                            ? 'Предполагаемые условия сотрудничества'
                                            : <>Условия продажи<span className='red'>*</span></>
                                }
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-8">
                            <textarea
                                rows={4}
                                required={(category !== '1')}
                                placeholder={
                                    (category === '0' || category === '2' || category === '4')
                                        ? 'Условия сотрудничества'
                                        : (category === '1')
                                            ? 'Предполагаемые условия сотрудничества'
                                            : 'Условия продажи'
                                }
                                name='termsTransaction'
                                onChange={e => onInputHandler(e, setData)}
                            />
                        </div>
                    </div>
                    {
                        (category === '0' || category === '2' || category === '3' || category === '4') &&
                        <div className="row mb-3 mb-sm-4">
                            <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0 pt-sm-2">
                                <div>Бизнес-план{(category === '4') && <span className='red'>*</span>}</div>
                            </div>
                            <div className="col-sm-6 col-lg-8">
                                <textarea
                                    rows={4}
                                    required={(category === '4')}
                                    placeholder="Бизнес-план"
                                    name='business plan'
                                    onChange={e => onInputHandler(e, setData)}
                                />
                            </div>
                        </div>
                    }
                    {
                        (category === '0' || category === '1' || category === '2') &&
                        <div className="row mb-3 mb-sm-4">
                            <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0 pt-sm-2">
                                <div>О себе</div>
                            </div>
                            <div className="col-sm-6 col-lg-8">
                                <textarea
                                    rows={4}
                                    placeholder="О себе"
                                    name='aboutMe'
                                    onChange={e => onInputHandler(e, setData)}
                                />
                            </div>
                        </div>
                    }
                    <div className="row mb-3 mb-sm-4">
                        <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                            <div>Обложка объявления</div>
                            <div className="l-gray f_09 mt-1">Размер 600х400</div>
                        </div>
                        <div className="col-sm-6 col-lg-8">
                            <div className="file-upload">
                                <button className="btn_main btn_2 fw_4">Загрузить</button>
                                <input
                                    type="file"
                                    onChange={e => {
                                        onImageHandler(e, 'file', setData)
                                    }}
                                />
                            </div>
                            {validPhoto(photoInfo)}
                        </div>
                    </div>
                    <div className="row mb-3 mb-sm-4">
                        <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                            <div>Фотогалерея</div>
                            <div className="l-gray f_09 mt-1">Не более 10</div>
                        </div>
                        <div className="col-sm-6 col-lg-8">
                            <div className="file-upload">
                                <button
                                    type='button'
                                    className="btn_main btn_2 fw_4"
                                    onClick={() => setLoadPhotoModal(true)}
                                >
                                    Открыть
                                </button>
                                <CustomModal
                                    className='modal__photosAdd'
                                    isShow={loadPhotoModal}
                                    setIsShow={setLoadPhotoModal}
                                    closeButton={true}
                                    size='lg'
                                    titleHead={'Фотографии'}
                                >
                                    <div className='mainModalPhotos'>
                                        <div
                                            className={`itemsModalPhotos ${(data?.files?.length !== 0) ? 'view-items' : ''}`}
                                            onDragEnter={handleDrag}
                                            onSubmit={(e) => e.preventDefault()}
                                        >
                                            {(data?.files?.length === 0)
                                                ?
                                                <div className='dragAndDropInItems'>
                                                    <input
                                                        ref={inputRef}
                                                        type="file"
                                                        id="input-file-upload"
                                                        multiple
                                                        onChange={(e:any) => {
                                                            (e.target?.files?.length < 10)
                                                                ? setFiles((prevState:any) => ([...prevState, ...e.target.files]))
                                                                : alert('Меньше 10 пж')
                                                        }
                                                        }
                                                    />
                                                    <label id="label-file-upload" htmlFor="input-file-upload"
                                                           className={dragActive ? "drag-active" : ""}>
                                                        <div>
                                                            <p>Перетащите сюда файлы для загрузки</p>
                                                        </div>
                                                    </label>
                                                </div>
                                                :
                                                data?.files?.map((photos:any, index:any) => (
                                                    <div className='photos-window' key={index}>
                                                        <div className='photos-items'>
                                                            <img src={photos?.info?.data_url} className='for-photos-dragAndDrop'/>
                                                                <span>{photos?.info?.name}</span>
                                                        </div>
                                                        <button
                                                            onClick={() => deletePhoto(photos?.info?.name)}>Удалить
                                                        </button>
                                                    </div>
                                                ))
                                            }
                                            {dragActive &&
                                                <div
                                                    id="drag-file-element"
                                                    onDragEnter={handleDrag}
                                                    onDragLeave={handleDrag}
                                                    onDragOver={handleDrag}
                                                    onDrop={handleDrop}
                                                />
                                            }
                                        </div>
                                        <div className='buttonsModalPhotos'>
                                            <div className='miniGroup'>
                                                <div className="file-upload">
                                                    <label>
                                                    <button className="btn_main btn_2 fw_4">Загрузить</button>
                                                    <input
                                                        type="file"
                                                        multiple
                                                        onChange={(e:any) => {
                                                            (e.target?.files?.length < 10)
                                                                ? setFiles((prevState:any) => ([...prevState, ...e.target.files]))
                                                                : alert('Меньше 10 пж')
                                                        }
                                                        }
                                                    />
                                                    </label>
                                                </div>
                                                <span>Не более 10 фотографий</span>
                                            </div>
                                            <button className='btn_main btn_1' onClick={() => setLoadPhotoModal(false)}>Сохранить</button>
                                        </div>
                                    </div>
                                </CustomModal>
                            </div>
                        </div>
                    </div>
                    {
                        (category === '4') &&
                        <div className="row mb-3 mb-sm-4">
                            <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                <div>Загрузить видео</div>
                            </div>
                            <div className="col-sm-6 col-lg-8">
                                <input
                                    type="text"
                                    placeholder="Вставить ссылку"
                                    name='videoLink'
                                    onChange={e => onInputHandler(e, setData)}
                                />
                            </div>
                        </div>
                    }
                    <div className="row align-items-center mb-3 mb-sm-4">
                        <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                            <div>Город<span className='red'>*</span></div>
                        </div>
                        <div className="col-sm-6 col-lg-8">
                            <select
                                name='city'
                                value={data?.city || 'default'}
                                onChange={e => onSelectHandler(e, setData)}
                            >
                                <option value={'default'} disabled>Город</option>
                                <option value={1}>Казань</option>
                                <option value={2}>Москва</option>
                                <option value={3}>СПБ</option>
                            </select>
                        </div>
                    </div>
                    <div className="row align-items-center mb-3 mb-sm-4">
                        <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                            <div>Сфера<span className='red'>*</span></div>
                        </div>
                        <div className="col-sm-6 col-lg-8">

                            <select
                                name='fieldOfActivity'
                                value={data?.fieldOfActivity || 'default'}
                                onChange={e => onSelectHandler(e, setData)}
                            >
                                <option value={'default'} disabled >Сфера</option>
                                <optgroup label='Авто'>
                                    <option>Автомойка</option>
                                    <option>Автосервис</option>
                                    <option>Другое</option>
                                </optgroup>
                                <optgroup label='Недвижемость'>
                                    <option>Недвижемость</option>
                                </optgroup>
                                <optgroup label='IT, Интернет-магазины'>
                                    <option>IT</option>
                                    <option>Интернет-магазины</option>
                                    <option>Мобильные приложения</option>
                                    <option>Другое</option>
                                </optgroup>
                                <optgroup label='Соц. сети и мессенджеры'>
                                    <option>Instagram</option>
                                    <option>VK</option>
                                    <option>Youtube</option>
                                    <option>Facebook</option>
                                    <option>Telegram</option>
                                    <option>Другое</option>
                                </optgroup>
                                <optgroup label='Обучение'>
                                    <option>Взрослое образование</option>
                                    <option>Детское образование</option>
                                    <option>Другое</option>
                                </optgroup>
                                <optgroup label='Здоровье и красота'>
                                    <option>Салон красоты</option>
                                    <option>Медцентр</option>
                                    <option>Стоматология</option>
                                    <option>Фитнес клубы</option>
                                    <option>Другое</option>
                                </optgroup>
                                <optgroup label='Общественное питание'>
                                    <option>Кафе</option>
                                    <option>Кофейня</option>
                                    <option>Ресторан</option>
                                    <option>Бар</option>
                                    <option>Ночные клубы</option>
                                    <option>Фаст-фуд</option>
                                    <option>Столовая</option>
                                    <option>Кальянная</option>
                                    <option>Доставка</option>
                                    <option>Другое</option>
                                </optgroup>
                                <optgroup label='Производство'>
                                    <option>Производство</option>
                                </optgroup>
                                <optgroup label='Развлечения'>
                                    <option>Квесты</option>
                                    <option>Клубы</option>
                                    <option>Другое</option>
                                </optgroup>
                                <optgroup label='Строительство'>
                                    <option>Строительство</option>
                                </optgroup>
                                <optgroup label='Гостиницы'>
                                    <option>Гостиницы</option>
                                    <option>Хостелы</option>
                                    <option>Туристический комплекс</option>
                                    <option>Базы</option>
                                    <option>Другое</option>
                                </optgroup>
                                <optgroup label='Торговля'>
                                    <option>Магазины одежды</option>
                                    <option>Магазины продуктов питания</option>
                                    <option>Непродовольственные магазины</option>
                                    <option>Аптеки</option>
                                    <option>Другое</option>
                                </optgroup>
                                <optgroup label='Другое'>
                                    <option>Другое</option>
                                </optgroup>
                            </select>
                        </div>
                    </div>
                    <div className="row align-items-center mb-3 mb-sm-4">
                        <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                            <div>Подраздел<span className='red'>*</span></div>
                        </div>
                        <div className="col-sm-6 col-lg-8">
                            <select
                                name='subsection'
                                value={data?.subsection || 'default'}
                                onChange={e => onSelectHandler(e, setData)}
                            >
                                <option value={'default'} disabled>Подраздел</option>
                                <option value={1}>Что-то: 1</option>
                                <option value={2}>Что-то: 2</option>
                                <option value={3}>Что-то: 3</option>
                            </select>
                        </div>
                    </div>
                    {
                        (category === '3') &&
                        <>
                            <div className="row align-items-center mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                    <div>Количество точек<span className='red'>*</span></div>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <input
                                        type="number"
                                        required={true}
                                        placeholder="0"
                                        className="f_09"
                                        name='pointCount'
                                        onChange={e => onInputHandler(e, setData, true)}
                                    />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                    <div>Стоимость бизнеса<span className='red'>*</span></div>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <input
                                        type="number"
                                        required={true}
                                        placeholder="0"
                                        className="f_09"
                                        name='businessValue'
                                        onChange={e => onInputHandler(e, setData, true)}
                                    />
                                </div>
                            </div>
                        </>
                    }
                    {
                        (category === '0' || category === '1' || category === '2' || category === '4') &&
                        <div className="row align-items-center mb-3 mb-sm-4">
                            <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                <div>
                                    {
                                        (category === '0' || category === '2')
                                            ? 'Требуемые инвестиции'
                                            : (category === '1')
                                                ? 'Возможные инвестиции'
                                                : 'Стартовые инвестиции от'
                                    }
                                    <span className='red'>*</span>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-4">
                                <input
                                    type="number"
                                    required={true}
                                    placeholder="0"
                                    className="f_09 input-price"
                                    name='investments'
                                    onChange={e => onInputHandler(e, setData, true)}
                                />
                            </div>
                        </div>
                    }
                    {
                        (category === '4') &&
                        <>
                            <div className="row align-items-center mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                    <div>Паушальный взнос<span className='red'>*</span></div>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <input
                                        type="number"
                                        required={true}
                                        placeholder="0"
                                        className="f_09"
                                        name='Lump sum'
                                        onChange={e => onInputHandler(e, setData, true)}
                                    />
                                </div>
                            </div>
                            <div className="row align-items-center mb-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                    <div>Роялти<span className='red'>*</span></div>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <input
                                        type="number"
                                        required={true}
                                        placeholder="0"
                                        className="f_09"
                                        name='royalty'
                                        onChange={e => onInputHandler(e, setData, true)}
                                    />
                                </div>
                            </div>
                        </>
                    }
                    {
                        (category === '0' || category === '2' || category === '4') &&
                        <div className="row align-items-center mb-3 mb-sm-4">
                            <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                <div>Предполагаемая прибыль / мес</div>
                            </div>
                            <div className="col-sm-6 col-lg-4">
                                <input
                                    type="number"
                                    placeholder="0"
                                    className="f_09 input-price"
                                    name='estimatedProfit'
                                    onChange={e => onInputHandler(e, setData, true)}
                                />
                            </div>
                        </div>
                    }
                    <div className="row align-items-center mb-3 mb-sm-4">
                        <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                            <div>Окупаемость</div>
                        </div>
                        <div className="col-sm-6 col-lg-8">
                            <select
                                name='payback'
                                value={data?.payback || 'default'}
                                onChange={e => onSelectHandler(e, setData)}
                            >
                                <option value={'default'} disabled>Окупаемость</option>
                                <option value={1}>1 год</option>
                                <option value={2}>2 года</option>
                                <option value={3}>3 года</option>
                            </select>
                        </div>
                    </div>
                    {
                        (category === '0' || category === '2') &&
                        <div className="row align-items-center mb-3 mb-sm-4">
                            <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                <div>Стадия проекта<span className='red'>*</span></div>
                            </div>
                            <div className="col-sm-6 col-lg-8">
                                <select
                                    name='projectStage'
                                    value={data?.projectStage || 'default'}
                                    onChange={e => onSelectHandler(e, setData)}
                                >
                                    <option value={'default'} disabled>Стадия проекта</option>
                                    <option value={1}>Готов</option>
                                    <option value={2}>Строится</option>
                                    <option value={3}>Только начали</option>
                                </select>
                            </div>
                        </div>
                    }
                    {
                        (category === '3') &&
                        <>
                            <div className="row align-items-center mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                    <div>Оборот в месяц</div>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <input
                                        type="number"
                                        placeholder="0"
                                        className="f_09"
                                        name='turnoverPerMonth'
                                        onChange={e => onInputHandler(e, setData, true)}
                                    />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                    <div>Чистая прибыль<span className='red'>*</span></div>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <input
                                        type="number"
                                        required={true}
                                        placeholder="0"
                                        className="f_09"
                                        name='netProfit'
                                        onChange={e => onInputHandler(e, setData, true)}
                                    />
                                </div>
                            </div>
                        </>
                    }
                    {
                        (category === '4') &&
                        <>
                            <div className="row align-items-center mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                    <div>Год основания компании</div>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <input
                                        type="number"
                                        placeholder="0"
                                        className="f_09"
                                        name='createYearComp'
                                        onChange={e => onInputHandler(e, setData, true)}
                                    />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                    <div>Количество собственных точек</div>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <input
                                        type="number"
                                        placeholder="0"
                                        className="f_09"
                                        name='numberOfOwnPoints'
                                        onChange={e => onInputHandler(e, setData, true)}
                                    />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                    <div>Количество проданных франшиз</div>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <input
                                        type="number"
                                        placeholder="0"
                                        className="f_09"
                                        name='numberOfFranchisesSold'
                                        onChange={e => onInputHandler(e, setData, true)}
                                    />
                                </div>
                            </div>
                        </>
                    }
                </fieldset>

                {
                    (category === '4') &&
                    <fieldset className='mt-3 mt-sm-4 mt-md-5'>
                        <legend className="fw_7 f_10 text-uppercase mb-2 mb-sm-4">Размещение объявления на 30 дней
                        </legend>
                        <div className='f_xs_08 row gx-2 gx-sm-3 gx-xl-4'>
                            <div className='col-5 col-md-4'>
                                <div className="acc-box w-100 h-100">
                                    <label className="mb-2 mb-xl-3">
                                        <input
                                            name="ad-type"
                                            type="radio"
                                            value='6000'
                                            onChange={e => setData((prevState:any) => ({...prevState, [e.target.name]: e.target.value}))}
                                        />
                                        <span className='ms-1 ms-sm-2 ms-xl-3'>Разместить</span>
                                    </label>
                                    <div className="fw_6 sky">3 мес. — 6 000 рублей</div>
                                </div>
                            </div>
                            <div className='col-7 col-md-4'>
                                <div className="acc-box w-100 h-100">
                                    <label className="mb-2 mb-xl-3">
                                        <input
                                            name="ad-type"
                                            type="radio"
                                            value='11 000'
                                            onChange={e => setData((prevState:any) => ({...prevState, [e.target.name]: e.target.value}))}
                                        />
                                        <span className='ms-1 ms-sm-2 ms-xl-3'>Большое объявление (пример)</span>
                                    </label>
                                    <div className="fw_6 sky">6 мес. — 11 000 рублей</div>
                                </div>
                            </div>
                            <div className='col-12 col-md-4 mt-2 mt-sm-3 mt-md-0'>
                                <NavLink
                                    to='/account/my-ads/premium'
                                    state={{data: data}}
                                    className='btn_main btn_5 f_13 w-100 h-100'
                                >
                                    Premium-размещение
                                </NavLink>
                            </div>
                        </div>
                    </fieldset>
                }
                <button className="btn_main btn_1 fw_4 mt-4" type="submit">
                    {
                        (category === '4')
                            ? 'Создать и перейти к оплате'
                            : 'Отправить на модерацию'
                    }
                </button>
            </form>
        </>
    );
}

export default NewAd