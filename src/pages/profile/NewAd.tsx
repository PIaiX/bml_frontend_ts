import React, {useEffect, useRef, useState} from 'react'
import {onImageHandler} from '../../helpers/formHandlers'
import {Link, NavLink, useNavigate, useParams} from 'react-router-dom'
import {MdOutlineArrowBack} from 'react-icons/md'
import {useImageViewer} from '../../hooks/imageViewer'
import {useImagesViewer} from '../../hooks/imagesViewer'
import CustomModal from '../../components/utils/CustomModal'
import {getCity} from '../../services/city'
import {
    createOffer,
    deleteImageOffer,
    getAllAreas,
    getAllSubsections,
    getOneOffer,
    updateOffer,
} from '../../services/offers'
import {IOfferForm, IOfferItem, IOffersAreaItem, IOffersSubSectionsItem} from '../../types/offers'
import {useAppDispatch, useAppSelector} from '../../hooks/store'
import {IUser} from '../../types/user'
import ValidateWrapper from '../../components/utils/ValidateWrapper'
import {useForm} from 'react-hook-form'
import {convertLocaleDate} from '../../helpers/convertLocaleDate'
import {showAlert} from '../../store/reducers/alertSlice'
import {IUseStateItem} from '../../types'
import {checkPhotoPath} from '../../helpers/photoLoader'

const NewAd = () => {
    const [category, setCategory] = useState<number | undefined>(0)
    const [formInfo, setFormInfo] = useState<any>({
        category: 0,
    })
    const user: IUser | null = useAppSelector((state) => state?.user?.user)
    const [loadPhotoModal, setLoadPhotoModal] = useState<boolean>(false)
    const photoInfo = useImageViewer(formInfo?.image)
    const [dragActive, setDragActive] = useState<boolean>(false)
    const inputRef = useRef(null)
    const [files, setFiles] = useState<any>([])
    const imageViewer = useImagesViewer(files)
    const [cities, setCities] = useState<Array<string> | undefined>([])
    const [areas, setAreas] = useState<Array<IOffersAreaItem | undefined>>([])
    const [subSections, setSubSections] = useState<Array<IOffersSubSectionsItem | undefined>>([])
    const [currentArea, setCurrentArea] = useState<number | undefined>(undefined)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {id} = useParams()
    const [textPhoto, setTextPhoto] = useState({
        text: '',
        size: '',
        isInValidSize: true,
        isInValidSizeMB: true,
    })
    const [currentOffer, setCurrentOffer] = useState<IUseStateItem<IOfferItem>>({
        isLoaded: false,
        item: null,
    })
    const [imagesFromServer, setImagesFromServer] = useState<any>(null)

    const {
        register,
        getValues,
        setValue,
        formState: {errors},
        reset,
        handleSubmit,
    } = useForm<IOfferForm>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            about: '',
            area: '',
            businessPlan: '',
            category: '',
            city: '',
            cooperationTerms: '',
            description: '',
            investments: '',
            paybackTime: '',
            profitPerMonth: '',
            projectStage: '',
            subsectionId: '',
            title: '',
            aboutCompany: '',
            benefits: '',
            branchCount: '',
            dateOfCreation: '',
            price: '',
            pricePerMonth: '',
            soldBranchCount: '',
            video: '',
            profit: '',
        },
    })
    useEffect(() => {
        getCity().then((res) => setCities(res))
    }, [])

    useEffect(() => {
        getAllAreas().then((res) => res && setAreas(res))
    }, [])

    useEffect(() => {
        if (currentArea) {
            getAllSubsections(currentArea).then((res) => res && setSubSections(res))
        }
    }, [currentArea])

    useEffect(() => {
        if (id) {
            getOneOffer(id)
                .then((res) => {
                    if (res) {
                        setCurrentOffer({isLoaded: true, item: res})
                        setValue('title', res?.title)
                        setValue('about', res?.about || '')
                        setValue('area', res?.subsection?.area?.id)
                        setValue('businessPlan', res?.businessPlan)
                        setValue('category', res?.category)
                        setValue('cooperationTerms', res?.cooperationTerms)
                        setValue('description', res?.description)
                        setValue('investments', res?.investments)
                        setValue('paybackTime', res?.paybackTime)
                        setValue('profitPerMonth', res?.profitPerMonth)
                        setValue('projectStage', res?.projectStage == null ? '' : res?.projectStage)
                        setValue('subsectionId', res?.subsectionId)
                        setValue('aboutCompany', res?.aboutCompany || '')
                        setValue('benefits', res?.benefits || '')
                        setValue('branchCount', res?.branchCount || '')
                        setValue('dateOfCreation', res?.dateOfCreation)
                        setValue('price', res?.price || '')
                        setValue('pricePerMonth', res?.pricePerMonth || '')
                        setValue('soldBranchCount', res?.soldBranchCount || '')
                        setValue('video', res?.video || '')
                        setValue('profit', res?.profit || '')
                        setValue('city', res?.city || '')
                        setCurrentArea(res?.subsection?.area?.id)
                    }
                })
                .catch()
        }
    }, [id])

    useEffect(() => {
        if (id) {
            setCategory(currentOffer?.item?.category)
            setFormInfo({
                category: currentOffer?.item?.category,
                city: currentOffer?.item?.city,
            })
            setImagesFromServer(currentOffer?.item?.images)
        }
    }, [currentOffer, id])

    const handleDrag = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    const handleDrop = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0] && e.dataTransfer?.files?.length <= 10) {
            setFiles([...e.dataTransfer.files])
        } else {
            alert('???????????? 10 ????.')
        }
    }

    const deletePhoto = (name: string) => {
        setFiles(files.filter((i: any) => i.name !== name))
    }

    useEffect(() => {
        if (photoInfo && formInfo?.image) {
            const sizeMB = formInfo?.image?.size / 1000000
            if (sizeMB > 5) {
                setTextPhoto((prevState) => ({
                    ...prevState,
                    size: `???????? ???? ????????????????, ?????? ???? ???????????????? ${sizeMB.toFixed(2)} ????`,
                    isInValidSizeMB: true,
                }))
            } else {
                setTextPhoto((prevState) => ({
                    ...prevState,
                    size: `???????? ????????????????, ?????? ???????????????? ${sizeMB.toFixed(2)} ????`,
                    isInValidSizeMB: false,
                }))
            }
        }
    }, [formInfo?.image, photoInfo])

    useEffect(() => {}, [textPhoto?.isInValidSize, textPhoto?.isInValidSizeMB])

    const createNewOffer = (data: IOfferForm) => {
        const formData = new FormData()
        let dateNew
        if (data?.dateOfCreation) {
            dateNew = convertLocaleDate(data?.dateOfCreation)
        }
        const req: any = {
            ...data,
            dateOfCreation: dateNew ? dateNew : '',
            userId: user?.id,
            image: formInfo?.image || '',
            category: formInfo?.category,
        }
        for (const key in req) {
            formData.append(key, req[key])
        }
        imageViewer.forEach((image: any) => {
            formData.append('images[]', image?.initialFile)
        })
        createOffer(formData)
            .then(() => {
                dispatch(
                    showAlert({
                        message: '???????????????????? ?????????????? ??????????????! ?????????? ?????????????????? ??????????????????...',
                        typeAlert: 'good',
                    })
                )
                setTimeout(() => {
                    navigate(-1)
                }, 1000)
            })
            .catch((error) => {
                dispatch(showAlert({message: '?????????????????? ????????????!', typeAlert: 'bad'}))
            })
    }

    const saveChanges = (data: IOfferForm) => {
        const formData = new FormData()
        let dateNew
        if (data?.dateOfCreation) {
            dateNew = convertLocaleDate(data?.dateOfCreation)
        }
        const req: any = {
            ...data,
            dateOfCreation: dateNew ? dateNew : '',
            userId: user?.id,
            image: formInfo?.image || '',
        }
        for (const key in req) {
            formData.append(key, req[key])
        }
        imageViewer.forEach((image: any) => {
            formData.append('images[]', image?.initialFile)
        })
        updateOffer(id && id, formData)
            .then(() => {
                dispatch(
                    showAlert({
                        message: '???????????????????? ?????????????? ??????????????????????????????! ?????????????? ???? ???????????????? ????????????????????...',
                        typeAlert: 'good',
                    })
                )
                setTimeout(() => {
                    navigate(-1)
                }, 1000)
            })
            .catch((error) => {
                dispatch(showAlert({message: '?????????????????? ????????????!', typeAlert: 'bad'}))
            })
    }

    const filterFunc = (data: any) => {
        if (id) {
            saveChanges(data)
        } else {
            createNewOffer(data)
        }
    }

    const returnText = () => {
        if (id) {
            return '?????????????????? ??????????????????'
        } else if (category !== 4) {
            return '?????????????????? ???? ??????????????????'
        } else {
            return '?????????????? ?? ?????????????? ?? ????????????'
        }
    }

    const deletePhotosChanges = (id: number) => {
        deleteImageOffer(id)
            .then(() => {
                setImagesFromServer(imagesFromServer?.filter((i: any) => i?.id !== id))
                dispatch(showAlert({message: '???????? ?????????????? ??????????????', typeAlert: 'good'}))
            })
            .catch(() => {
                dispatch(showAlert({message: '?????????????????? ????????????', typeAlert: 'bad'}))
            })
    }

    return (
        <>
            <Link to="/account/my-ads" className="color-1 f_11 fw_5 d-flex align-items-center d-lg-none mb-3 mb-sm-4">
                <MdOutlineArrowBack />
                <span className="ms-2">??????????</span>
            </Link>
            <h4>{id ? '???????????????????????????? ????????????????????' : '?????????? ????????????????????'}</h4>
            <form onDragEnter={handleDrag} onSubmit={handleSubmit(filterFunc)}>
                <fieldset className="row align-items-center mb-4 mb-sm-5">
                    <div className="col-sm-6 col-lg-4">
                        <div className="fw_7 text-uppercase mb-2 mb-sm-0">??????????????????</div>
                    </div>
                    <div className="col-sm-6 col-lg-8">
                        <select
                            value={formInfo?.category || ''}
                            {...register('category', {
                                onChange: (e) => {
                                    setCategory(+e?.target?.value)
                                    setFormInfo({category: +e.target.value})
                                },
                            })}
                        >
                            <option value={0}>?????????? ????????????????????</option>
                            <option value={1}>?????????????????????? ????????????????????</option>
                            <option value={2}>?????????? ???????????? ??????????????????</option>
                            <option value={3}>?????????????? ???????????????? ??????????????</option>
                            <option value={4}>????????????????</option>
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <legend className="fw_7 f_10 text-uppercase mb-3 mb-sm-4">??????????????????</legend>

                    <div className="row align-items-center mb-3 mb-sm-4">
                        <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                            <div>
                                {category === 4 ? '???????????????? ????????????????' : '???????????????? ????????????????????'}
                                <span className="red">*</span>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-8">
                            <ValidateWrapper error={errors?.title}>
                                <input
                                    type="text"
                                    {...register('title', {
                                        required: '???????????????????????? ????????',
                                        minLength: {value: 2, message: '?????????????????????? ?????????? 2 ??????????????'},
                                    })}
                                    placeholder="????????????????, ?????????????? ?????????????? ??????????????????"
                                />
                            </ValidateWrapper>
                        </div>
                    </div>

                    <div className="row mb-3 mb-sm-4">
                        <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0 pt-sm-2">
                            <div>
                                {category === 0 || category === 1 || category === 2
                                    ? '???????????????? ????????????????????'
                                    : category === 3
                                    ? '???????????????? ??????????????'
                                    : '???????????????? ????????????????'}
                                <span className="red">*</span>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-8">
                            <ValidateWrapper error={errors.description}>
                                <textarea
                                    rows={4}
                                    placeholder={
                                        category === 0 || category === 1 || category === 2
                                            ? '???????????????? ????????????????????'
                                            : category === 3
                                            ? '???????????????? ??????????????'
                                            : '???????????????? ????????????????'
                                    }
                                    {...register('description', {
                                        required: '???????????????????????? ????????',
                                        minLength: {value: 4, message: '?????????????????????? ?????????? 4 ??????????????'},
                                    })}
                                />
                            </ValidateWrapper>
                        </div>
                    </div>
                    {category === 4 && (
                        <>
                            <div className="row mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0 pt-sm-2">
                                    <div>
                                        ???????????????? ????????????????<span className="red">*</span>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-8">
                                    <ValidateWrapper error={errors?.aboutCompany}>
                                        <textarea
                                            rows={4}
                                            placeholder="???????????????? ????????????????"
                                            {...register('aboutCompany', {
                                                required: '???????????????????????? ????????',
                                                minLength: {value: 4, message: '?????????????????????? ?????????? 4 ??????????????'},
                                            })}
                                        />
                                    </ValidateWrapper>
                                </div>
                            </div>
                            <div className="row mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0 pt-sm-2">
                                    <div>???????????????????????? ????????????????</div>
                                </div>
                                <div className="col-sm-6 col-lg-8">
                                    <ValidateWrapper error={errors?.benefits}>
                                        <textarea
                                            rows={4}
                                            placeholder="???????????????????????? ????????????????"
                                            {...register('benefits', {
                                                minLength: {value: 4, message: '?????????????????????? ?????????? 4 ??????????????'},
                                            })}
                                        />
                                    </ValidateWrapper>
                                </div>
                            </div>
                        </>
                    )}
                    <div className="row mb-3 mb-sm-4">
                        <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0 pt-sm-2">
                            <div>
                                {category === 0 || category === 2 || category === 4 ? (
                                    <>
                                        ?????????????? ????????????????????????????<span className="red">*</span>
                                    </>
                                ) : category === 1 ? (
                                    '???????????????????????????? ?????????????? ????????????????????????????'
                                ) : (
                                    <>
                                        ?????????????? ??????????????<span className="red">*</span>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-8">
                            <ValidateWrapper error={errors?.cooperationTerms}>
                                <textarea
                                    rows={4}
                                    placeholder={
                                        category === 0 || category === 2 || category === 4
                                            ? '?????????????? ????????????????????????????'
                                            : category === 1
                                            ? '???????????????????????????? ?????????????? ????????????????????????????'
                                            : '?????????????? ??????????????'
                                    }
                                    {...register('cooperationTerms', {
                                        required: '???????????????????????? ????????',
                                        minLength: {value: 4, message: '?????????????????????? ?????????? 4 ??????????????'},
                                    })}
                                />
                            </ValidateWrapper>
                        </div>
                    </div>
                    {(category === 0 || category === 2 || category === 3 || category === 4) && (
                        <div className="row mb-3 mb-sm-4">
                            <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0 pt-sm-2">
                                <div>????????????-????????{category === 4 && <span className="red">*</span>}</div>
                            </div>
                            <div className="col-sm-6 col-lg-8">
                                <ValidateWrapper error={errors?.businessPlan}>
                                    <textarea
                                        rows={4}
                                        placeholder="????????????-????????"
                                        {...register('businessPlan', {
                                            required: '???????????????????????? ????????',
                                            minLength: {value: 4, message: '?????????????????????? ?????????? 4 ??????????????'},
                                        })}
                                    />
                                </ValidateWrapper>
                            </div>
                        </div>
                    )}
                    {(category === 0 || category === 1 || category === 2) && (
                        <div className="row mb-3 mb-sm-4">
                            <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0 pt-sm-2">
                                <div>?? ????????</div>
                            </div>
                            <div className="col-sm-6 col-lg-8">
                                <ValidateWrapper error={errors.about}>
                                    <textarea
                                        rows={4}
                                        placeholder="?? ????????"
                                        {...register('about', {
                                            minLength: {value: 4, message: '?????????????????????? ?????????? 4 ??????????????'},
                                        })}
                                    />
                                </ValidateWrapper>
                            </div>
                        </div>
                    )}
                    <div className="row mb-3 mb-sm-4">
                        <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                            <div>?????????????? ????????????????????</div>
                            <div className="l-gray f_09 mt-1">
                                ?????????????????????????? ???????????? 600??400, ???????????? ?????????? ???? ?????????? 5 ????.
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-8">
                            <div className="file-upload">
                                <button className="btn_main btn_2 fw_4">??????????????????</button>
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        onImageHandler(e, setFormInfo, 'image')
                                    }}
                                />
                            </div>
                            {textPhoto?.text}
                            {textPhoto?.size}
                        </div>
                    </div>
                    <div className="row mb-3 mb-sm-4">
                        <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                            <div>??????????????????????</div>
                            <div className="l-gray f_09 mt-1">???? ?????????? 10</div>
                        </div>
                        <div className="col-sm-6 col-lg-8">
                            <div className="file-upload">
                                <button
                                    type="button"
                                    className="btn_main btn_2 fw_4"
                                    onClick={() => setLoadPhotoModal(true)}
                                >
                                    ??????????????
                                </button>
                                <CustomModal
                                    className="modal__photosAdd"
                                    isShow={loadPhotoModal}
                                    setIsShow={setLoadPhotoModal}
                                    closeButton={true}
                                    size="lg"
                                    titleHead={'????????????????????'}
                                >
                                    <div className="mainModalPhotos">
                                        <div
                                            className={`itemsModalPhotos ${
                                                imageViewer?.length !== 0 ? 'view-items' : ''
                                            } ${id ? 'view-items' : ''}`}
                                            onDragEnter={handleDrag}
                                            onSubmit={(e) => e.preventDefault()}
                                        >
                                            {id ? (
                                                imagesFromServer?.map((i: any, index: number) => (
                                                    <div className="photos-window" key={index}>
                                                        <div className="photos-items">
                                                            <img
                                                                src={checkPhotoPath(i?.image)}
                                                                className="for-photos-dragAndDrop"
                                                            />
                                                            <span>{i?.image?.split('/')[2]}</span>
                                                        </div>
                                                        <button onClick={() => deletePhotosChanges(i?.id)}>
                                                            ??????????????
                                                        </button>
                                                    </div>
                                                ))
                                            ) : imageViewer?.length === 0 ? (
                                                <div className="dragAndDropInItems">
                                                    <input
                                                        ref={inputRef}
                                                        type="file"
                                                        id="input-file-upload"
                                                        multiple
                                                        onChange={(e: any) => {
                                                            e.target?.files?.length <= 10
                                                                ? setFiles((prevState: any) => [
                                                                      ...prevState,
                                                                      ...e.target.files,
                                                                  ])
                                                                : alert('???? ?????????? 10 ????.')
                                                        }}
                                                    />
                                                    <label
                                                        id="label-file-upload"
                                                        htmlFor="input-file-upload"
                                                        className={dragActive ? 'drag-active' : ''}
                                                    >
                                                        <div>
                                                            <p>???????????????????? ???????? ?????????? ?????? ????????????????</p>
                                                        </div>
                                                    </label>
                                                </div>
                                            ) : (
                                                imageViewer?.map((photos: any, index: any) => (
                                                    <div className="photos-window" key={index}>
                                                        <div className="photos-items">
                                                            <img
                                                                src={photos?.info?.data_url}
                                                                className="for-photos-dragAndDrop"
                                                            />
                                                            <span>{photos?.info?.name}</span>
                                                        </div>
                                                        <button onClick={() => deletePhoto(photos?.info?.name)}>
                                                            ??????????????
                                                        </button>
                                                    </div>
                                                ))
                                            )}
                                            {dragActive && (
                                                <div
                                                    id="drag-file-element"
                                                    onDragEnter={handleDrag}
                                                    onDragLeave={handleDrag}
                                                    onDragOver={handleDrag}
                                                    onDrop={handleDrop}
                                                />
                                            )}
                                        </div>
                                        <div className="buttonsModalPhotos">
                                            <div className="miniGroup">
                                                <div className="file-upload">
                                                    <label>
                                                        <button className="btn_main btn_2 fw_4">??????????????????</button>
                                                        <input
                                                            type="file"
                                                            multiple
                                                            onInput={(e: any) => {
                                                                if (e.target?.files?.length <= 10) {
                                                                    if (imageViewer?.length <= 10) {
                                                                        setFiles([...e.target.files])
                                                                    } else {
                                                                        alert('???????????? 10 ????. ???????????? ??????????')
                                                                    }
                                                                } else {
                                                                    alert('???????????? 10 ????. ???????????? ????????????')
                                                                }
                                                            }}
                                                        />
                                                    </label>
                                                </div>
                                                <span>???? ?????????? 10 ????????????????????</span>
                                            </div>
                                            <button className="btn_main btn_1" onClick={() => setLoadPhotoModal(false)}>
                                                ??????????????????
                                            </button>
                                        </div>
                                    </div>
                                </CustomModal>
                            </div>
                        </div>
                    </div>
                    {category === 4 && (
                        <div className="row mb-3 mb-sm-4">
                            <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                <div>?????????????????? ??????????</div>
                            </div>
                            <div className="col-sm-6 col-lg-8">
                                <ValidateWrapper error={errors?.video}>
                                    <input type="text" placeholder="???????????????? ????????????" {...register('video')} />
                                </ValidateWrapper>
                            </div>
                        </div>
                    )}
                    <div className="row align-items-center mb-3 mb-sm-4">
                        <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                            <div>
                                ??????????<span className="red">*</span>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-8">
                            <ValidateWrapper error={errors?.city}>
                                <select defaultValue={''} {...register('city', {required: '???????????????????????? ????????'})}>
                                    <option value={''} disabled>
                                        {formInfo?.city ? formInfo?.city : '??????????'}
                                    </option>
                                    {cities?.map((city, index) => (
                                        <option key={index} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            </ValidateWrapper>
                        </div>
                    </div>
                    <div className="row align-items-center mb-3 mb-sm-4">
                        <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                            <div>
                                ??????????<span className="red">*</span>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-8">
                            <ValidateWrapper error={errors?.area}>
                                <select
                                    defaultValue={''}
                                    {...register('area', {
                                        required: '???????????????????????? ????????',
                                        onChange: (e) => {
                                            setCurrentArea(+e.target.value)
                                            setValue('subsectionId', '')
                                        },
                                    })}
                                >
                                    <option value={''} disabled>
                                        ??????????
                                    </option>
                                    {areas?.map((area) => (
                                        <option key={area?.id} value={area?.id}>
                                            {area?.name}
                                        </option>
                                    ))}
                                </select>
                            </ValidateWrapper>
                        </div>
                    </div>
                    <div className="row align-items-center mb-3 mb-sm-4">
                        <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                            <div>
                                ??????????????????<span className="red">*</span>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-8">
                            <ValidateWrapper error={errors?.subsectionId}>
                                <select
                                    defaultValue={''}
                                    {...register('subsectionId', {
                                        required: '???????????????????????? ????????',
                                    })}
                                >
                                    <option value={''} disabled>
                                        ??????????????????
                                    </option>
                                    {subSections?.map((subsection) => (
                                        <option key={subsection?.id} value={subsection?.id}>
                                            {subsection?.name}
                                        </option>
                                    ))}
                                </select>
                            </ValidateWrapper>
                        </div>
                    </div>
                    {category === 3 && (
                        <>
                            <div className="row align-items-center mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                    <div>
                                        ???????????????????? ??????????<span className="red">*</span>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <ValidateWrapper error={errors?.branchCount}>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            className="f_09"
                                            {...register('branchCount', {
                                                required: '???????????????????????? ????????',
                                                min: {value: 0, message: '?????????????? 0'},
                                            })}
                                        />
                                    </ValidateWrapper>
                                </div>
                            </div>
                            <div className="row align-items-center mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                    <div>
                                        ?????????????????? ??????????????<span className="red">*</span>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <ValidateWrapper error={errors?.price}>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            className="f_09"
                                            {...register('price', {
                                                required: '???????????????????????? ????????',
                                                min: {value: 0, message: '?????????????? 0'},
                                            })}
                                        />
                                    </ValidateWrapper>
                                </div>
                            </div>
                        </>
                    )}
                    {(category === 0 || category === 1 || category === 2 || category === 4) && (
                        <div className="row align-items-center mb-3 mb-sm-4">
                            <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                <div>
                                    {category === 0 || category === 2
                                        ? '?????????????????? ????????????????????'
                                        : category === 1
                                        ? '?????????????????? ????????????????????'
                                        : '?????????????????? ???????????????????? ????'}
                                    <span className="red">*</span>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-4">
                                <ValidateWrapper error={errors?.investments}>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        className="f_09 input-price"
                                        {...register('investments', {
                                            required: '???????????????????????? ????????',
                                            min: {value: 0, message: '?????????????? 0'},
                                        })}
                                    />
                                </ValidateWrapper>
                            </div>
                        </div>
                    )}
                    {category === 4 && (
                        <>
                            <div className="row align-items-center mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                    <div>
                                        ???????????????????? ??????????<span className="red">*</span>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <ValidateWrapper error={errors?.price}>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            className="f_09"
                                            {...register('price', {
                                                required: '???????????????????????? ????????',
                                                min: {value: 0, message: '?????????????? 0'},
                                            })}
                                        />
                                    </ValidateWrapper>
                                </div>
                            </div>
                            <div className="row align-items-center mb-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                    <div>
                                        ????????????<span className="red">*</span>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <ValidateWrapper error={errors?.pricePerMonth}>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            className="f_09"
                                            {...register('pricePerMonth', {
                                                required: '???????????????????????? ????????',
                                                min: {value: 0, message: '?????????????? 0'},
                                            })}
                                        />
                                    </ValidateWrapper>
                                </div>
                            </div>
                        </>
                    )}
                    {(category === 0 || category === 2 || category === 4) && (
                        <div className="row align-items-center mb-3 mb-sm-4">
                            <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                <div>???????????????????????????? ?????????????? / ??????</div>
                            </div>
                            <div className="col-sm-6 col-lg-4">
                                <ValidateWrapper error={errors?.profitPerMonth}>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        className="f_09 input-price"
                                        {...register('profitPerMonth', {
                                            min: {value: 0, message: '?????????????? 0'},
                                            minLength: {value: 0, message: '?????????????????????? ?????????? 0 ??????????????'},
                                        })}
                                    />
                                </ValidateWrapper>
                            </div>
                        </div>
                    )}
                    <div className="row align-items-center mb-3 mb-sm-4">
                        <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                            <div>??????????????????????</div>
                        </div>
                        <div className="col-sm-6 col-lg-8">
                            <select defaultValue={''} {...register('paybackTime')}>
                                <option value={''} disabled>
                                    ??????????????????????
                                </option>
                                <option value={0}>???? 3 ??????????????</option>
                                <option value={1}>???? 3 ???? 6 ??????????????</option>
                                <option value={2}>???? 6 ?????????????? ???? 1 ????????</option>
                                <option value={3}>???? 1 ???????? ???? 3 ??????</option>
                                <option value={4}>???? 3 ??????</option>
                            </select>
                        </div>
                    </div>
                    {(category === 0 || category === 2) && (
                        <div className="row align-items-center mb-3 mb-sm-4">
                            <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                <div>
                                    ???????????? ??????????????<span className="red">*</span>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-8">
                                <ValidateWrapper error={errors?.projectStage}>
                                    <select
                                        defaultValue={''}
                                        {...register('projectStage', {
                                            required: '???????????????????????? ????????',
                                        })}
                                    >
                                        <option value={''} disabled>
                                            ???????????? ??????????????
                                        </option>
                                        <option value={0}>????????</option>
                                        <option value={1}>?? ???????????? ????????????????</option>
                                        <option value={2}>?????????????? ????????????</option>
                                    </select>
                                </ValidateWrapper>
                            </div>
                        </div>
                    )}
                    {category === 3 && (
                        <>
                            <div className="row align-items-center mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                    <div>???????????? ?? ??????????</div>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <ValidateWrapper error={errors?.profitPerMonth}>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            className="f_09"
                                            {...register('profitPerMonth', {
                                                min: {value: 0, message: '?????????????? 0'},
                                                minLength: {value: 0, message: '?????????????????????? ?????????? 0 ??????????????'},
                                            })}
                                        />
                                    </ValidateWrapper>
                                </div>
                            </div>
                            <div className="row align-items-center mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                    <div>
                                        ???????????? ??????????????<span className="red">*</span>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <ValidateWrapper error={errors?.profit}>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            className="f_09"
                                            {...register('profit', {
                                                required: '???????????????????????? ????????',
                                                min: {value: 0, message: '?????????????? 0'},
                                                minLength: {value: 4, message: '?????????????????????? ?????????? 4 ??????????????'},
                                            })}
                                        />
                                    </ValidateWrapper>
                                </div>
                            </div>
                        </>
                    )}
                    {category === 4 && (
                        <>
                            <div className="row align-items-center mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                    <div>?????? ?????????????????? ????????????????</div>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <input
                                        type="date"
                                        placeholder="0"
                                        className="f_09"
                                        {...register('dateOfCreation')}
                                    />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                    <div>???????????????????? ?????????????????????? ??????????</div>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <ValidateWrapper error={errors?.branchCount}>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            className="f_09"
                                            {...register('branchCount', {
                                                min: {value: 0, message: '?????????????? 0'},
                                            })}
                                        />
                                    </ValidateWrapper>
                                </div>
                            </div>
                            <div className="row align-items-center mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                                    <div>???????????????????? ?????????????????? ??????????????</div>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <ValidateWrapper error={errors?.soldBranchCount}>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            className="f_09"
                                            {...register('soldBranchCount', {
                                                min: {value: 0, message: '?????????????? 0'},
                                            })}
                                        />
                                    </ValidateWrapper>
                                </div>
                            </div>
                        </>
                    )}
                </fieldset>

                {category === 4 && (
                    <fieldset className="mt-3 mt-sm-4 mt-md-5">
                        <legend className="fw_7 f_10 text-uppercase mb-2 mb-sm-4">
                            ???????????????????? ???????????????????? ???? 30 ????????
                        </legend>
                        <div className="f_xs_08 row gx-2 gx-sm-3 gx-xl-4">
                            <div className="col-5 col-md-4">
                                <div className="acc-box w-100 h-100">
                                    <label className="mb-2 mb-xl-3">
                                        <input
                                            name="ad-type"
                                            type="radio"
                                            value="6000"
                                            onChange={(e) =>
                                                setFormInfo((prevState: any) => ({
                                                    ...prevState,
                                                    [e.target.name]: e.target.value,
                                                }))
                                            }
                                        />
                                        <span className="ms-1 ms-sm-2 ms-xl-3">????????????????????</span>
                                    </label>
                                    <div className="fw_6 sky">3 ??????. ??? 6 000 ????????????</div>
                                </div>
                            </div>
                            <div className="col-7 col-md-4">
                                <div className="acc-box w-100 h-100">
                                    <label className="mb-2 mb-xl-3">
                                        <input
                                            name="ad-type"
                                            type="radio"
                                            value="11 000"
                                            onChange={(e) =>
                                                setFormInfo((prevState: any) => ({
                                                    ...prevState,
                                                    [e.target.name]: e.target.value,
                                                }))
                                            }
                                        />
                                        <span className="ms-1 ms-sm-2 ms-xl-3">?????????????? ???????????????????? (????????????)</span>
                                    </label>
                                    <div className="fw_6 sky">6 ??????. ??? 11 000 ????????????</div>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 mt-2 mt-sm-3 mt-md-0">
                                <NavLink
                                    to="/account/my-ads/premium"
                                    state={{data: formInfo}}
                                    className="btn_main btn_5 f_13 w-100 h-100"
                                >
                                    Premium-????????????????????
                                </NavLink>
                            </div>
                        </div>
                    </fieldset>
                )}
                <button className={`btn_main btn_1 fw_4 mt-4`} type="submit">
                    {returnText()}
                </button>
            </form>
        </>
    )
}

export default NewAd
