import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {MdOutlineArrowBack} from "react-icons/md";
import {useImageViewer} from "../../hooks/imageViewer";
import {onImageHandler} from "../../helpers/formHandlers";
import {useSelector} from 'react-redux';
import EditProfileForm from '../../components/EditProfileForm';
import EditPasswordForm from '../../components/EditPasswordForm';

export default function ProfileSettings() {
    const authorizedUser = useSelector(state => state.authorizedUser)
    const [personalData, setPersonalData] = useState({})
    const [passwordData, setPasswordData] = useState({})
    const [avatar, setAvatar] = useState(null)
    const photo = useImageViewer(avatar)

    const checkValidatePhoto = (photo, avatar) => {
        if (photo) {
            (photo.width >= 300 && photo.height >= 300)
                ? setPersonalData(prevPersonalData => ({...prevPersonalData, avatar}))
                : setPersonalData(prevPersonalData => ({...prevPersonalData, 'avatar': null}))
        }
    }

    const onSubmit = (setFunction) => {
        return (data) => {
            setFunction(prevData => ({...prevData, ...data}))
        }
    }

    useEffect(() => checkValidatePhoto(photo, avatar), [photo, avatar])

    return (
        <div>
            <Link to="/account"
                  className='color-1 f_11 fw_5 d-flex align-items-center d-lg-none mb-3 mb-sm-4'><MdOutlineArrowBack/>
                <span className='ms-2'>Назад</span></Link>

            <div className='bg_light p-3 text-center mb-4'>Размещение объявлений и полный доступ будет предоставлен
                после заполнения всех обязательных полей
            </div>
            <h6 className='f_11 mb-3'>Фото:</h6>
            <div className='acc-box'>
                <div className="row align-items-center">
                    <div className="col-md-4 mb-4 mb-md-0">
                        <img src={personalData?.avatar ? photo.data_url : "/images/photo-replacer.jpg"}
                             alt="Анна Петрова" className="user-photo"/>
                    </div>
                    <div className="col-md-8">
                        <div className="file-upload mb-3">
                            <button className="btn_main btn_2 fw_4">Загрузить</button>
                            <input
                                type="file"
                                onChange={(e) => onImageHandler(e, setAvatar)}
                            />
                        </div>
                        <div className="f_08 gray">(К загрузке разрешены файлы формата PNG, JPG, JPEG и весом не более 1
                            МБ.<br/>Рекомендуем загружать фото не менее 300px в ширину и высоту.)
                        </div>
                        <div className="photo-upload__desc">
                            {(avatar && personalData?.avatar) && <span>Фото загружено</span>}
                            {(avatar && !personalData?.avatar) &&
                                <span>Ошибка при загрузке. Попробуйте загрузить другое фото</span>}
                        </div>
                    </div>
                </div>
            </div>

            <h6 className="f_11 mb-2 mt-4 mb-sm-3 mt-sm-5">Личные данные профиля</h6>
            <EditProfileForm
                authorizedUser={authorizedUser}
                onSubmit={onSubmit(setPersonalData)}
            />

            <h6 className="f_11 mb-2 mt-4 mb-sm-3 mt-sm-5">Сменить пароль</h6>
            <EditPasswordForm
                onSubmit={onSubmit(setPasswordData)}
            />
        </div>
    );
}