import React, {FC} from 'react';
import {IAdvertising} from "../../types/advertising";
import {Link} from "react-router-dom";
import {MdOutlineArrowBack} from "react-icons/md";
import {useImage, useOnSubmit} from "./functions";
import {onImageHandler} from "../../helpers/formHandlers";
import {checkPhotoPath} from "../../helpers/photoLoader";
import {useForm} from "react-hook-form";
import ValidateWrapper from "../../components/utils/ValidateWrapper";

const AdvertisingForm: FC<{ conversation: IAdvertising }> = ({conversation}) => {

    const {register, getValues, handleSubmit, formState: {errors}} = useForm({defaultValues: conversation})
    const [image, adCoverViewer, setFormInfo] = useImage()
    const [OnSubmit]=useOnSubmit(image);

    return (
        <>
            <Link to="/account/my-ads" className="color-1 f_11 fw_5 d-flex align-items-center d-lg-none mb-3 mb-sm-4">
                <MdOutlineArrowBack/>
                <span className="ms-2">Назад</span>
            </Link>
            <h4>{'Редактирование рекламы'}</h4>
            <form onSubmit={handleSubmit(OnSubmit)}>
                <fieldset className="row align-items-center mb-4 mb-sm-5">
                    <div className="row mb-3 mb-sm-4">
                        <div className="col-sm-6 col-lg-4">
                            <div className="fw_7 text-uppercase mb-2 mb-sm-0">Тип баннера<span className="red">*</span>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-8">
                            <select value={0}>
                                <option
                                    value={0}>{conversation?.adsTypeId == '1' ? 'Рекламный баннер (1200х400)' : 'Рекламный баннер (250х160)'}</option>
                            </select>
                        </div>
                    </div>

                    <div className="row mb-3 mb-sm-4">
                        <div className="col-sm-6 col-lg-4">
                            <div className="fw_7 text-uppercase mb-2 mb-sm-0">Срок размещения<span
                                className="red">*</span></div>
                        </div>
                        <div className="col-sm-6 col-lg-8">
                            <select value={0}>
                                <option
                                    value={0}>{conversation?.placedForMonths === '3' ? '3 месяца' : '3 месяца'}</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3 mb-sm-4">
                        <div className="col-sm-6 col-lg-4 mb-1 mb-sm-0">
                            <div>Обложка объявления<span className="red">*</span></div>
                            <div className="l-gray f_09 mt-1">
                                Рекомендуемый размер 600х400, размер файла не более 5 мб.
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-8">
                            <div className="file-upload">
                                <button className="btn_main btn_2 fw_4"
                                        style={errors?.image ? {color: 'red', border: '2px solid red'} : {}}>Загрузить
                                </button>
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        onImageHandler(e, setFormInfo, 'image')
                                    }}
                                />
                            </div>
                            {(adCoverViewer?.length > 0 || getValues('image')) &&
                                <div className="photos-window">
                                    <div className="photos-items-preview">
                                        <img
                                            src={
                                                adCoverViewer[0]?.info?.data_url ?
                                                    adCoverViewer[0]?.info?.data_url
                                                    : checkPhotoPath(getValues('image'))
                                            }
                                        />
                                    </div>
                                </div>}
                        </div>
                    </div>

                    <div className="row mb-3 mb-sm-4">
                        <div className="row mb-3 mb-sm-4">
                            <div className="col-sm-6 col-lg-4">
                                <div className="fw_7 text-uppercase mb-2 mb-sm-0">Ссылка при нажатии<span
                                    className="red">*</span></div>
                            </div>
                            <div className="col-sm-6 col-lg-8">
                                <ValidateWrapper error={errors?.link}>
                                    <input
                                        type={'text'}
                                        placeholder={'Введите ссылку'}
                                        {...register('link', {
                                            required: 'Поле обязательно к заполнению',
                                            minLength: {
                                                value: 6,
                                                message: 'Минимум 6 символов',
                                            },
                                        })}
                                    />
                                </ValidateWrapper>
                            </div>
                        </div>
                    </div>

                    {conversation?.description &&
                        <div className="row mb-3 mb-sm-4">
                            <div className="row mb-3 mb-sm-4">
                                <div className="col-sm-6 col-lg-4">
                                    <div className="fw_7 text-uppercase mb-2 mb-sm-0">Название объявления<span
                                        className="red">*</span></div>
                                </div>
                                <div className="col-sm-6 col-lg-8">
                                    <ValidateWrapper error={errors?.description}>
                                        <input
                                            type={'text'}
                                            placeholder={'Введите название'}
                                            {...register('description', {
                                                required: 'Поле обязательно к заполнению',
                                                minLength: {
                                                    value: 5,
                                                    message: 'Минимум 5 символов',
                                                },
                                                maxLength: {
                                                    value: 30,
                                                    message: 'Максимум 30 символов',
                                                },
                                            })}
                                        />
                                    </ValidateWrapper>
                                </div>
                            </div>
                        </div>
                    }
                    <button className={`btn_main btn_1 fw_4 mt-4`} type="submit">
                        Редактировать
                    </button>

                </fieldset>
            </form>
        </>
    );
};

export default AdvertisingForm;