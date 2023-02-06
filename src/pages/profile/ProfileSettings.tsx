import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {MdOutlineArrowBack} from 'react-icons/md'
import {useImageViewer} from '../../hooks/imageViewer'
import {onImageHandler} from '../../helpers/formHandlers'
import EditProfileForm from '../../components/forms/EditProfileForm'
import EditPasswordForm from '../../components/forms/EditPasswordForm'
import {IUser} from '../../types/user'
import {useAppSelector} from '../../hooks/store'
import {checkPhotoPath} from '../../helpers/photoLoader'
import EditProfileFormForIe from '../../components/forms/EditProfileFormForIE'
import EditProfileFormForOoo from '../../components/forms/EditProfileFormForOOO'

const ProfileSettings = () => {
    const {user}:{user: IUser | null} = useAppSelector((state) => state?.user)
    const [avatar, setAvatar] = useState<any>(null)
    let photo = useImageViewer(avatar)

    return (
        <div>
            {user?.isFormCompleted && <Link to="/account" className="color-1 f_11 fw_5 d-flex align-items-center d-lg-none mb-3 mb-sm-4">
                <MdOutlineArrowBack />
                <span className="ms-2">Назад</span>
            </Link>}

            <div className="bg_light p-3 text-center mb-4">
                Размещение объявлений и полный доступ будет предоставлен после заполнения всех обязательных полей
            </div>
            <h6 className="f_11 mb-3">Фото:</h6>
            <div className="acc-box">
                <div className="row align-items-center">
                    <div className="col-md-4 mb-4 mb-md-0">
                        <img
                            src={avatar ? photo?.data_url : checkPhotoPath(user?.avatar)}
                            alt={user?.fullName}
                            className="user-photo"
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="file-upload mb-3">
                            <button className="btn_main btn_2 fw_4">Загрузить</button>
                            <input type="file" onChange={(e) => onImageHandler(e, setAvatar)} />
                        </div>
                        <div className="f_08 gray">
                            (К загрузке разрешены файлы формата PNG, JPG, JPEG и весом не более 1 МБ.
                            <br />
                            Рекомендуем загружать фото не менее 300px в ширину и высоту.)
                        </div>
                        {avatar && photo && <span>Фото загружено</span>}
                    </div>
                </div>
            </div>

            <h6 className="f_11 mb-2 mt-4 mb-sm-3 mt-sm-5">Личные данные профиля</h6>
            {user?.type === 0 && <EditProfileForm avatar={avatar} />}
            {user?.type === 1 && <EditProfileFormForIe avatar={avatar} />}
            {user?.type === 2 && <EditProfileFormForOoo avatar={avatar} />}

            <h6 className="f_11 mb-2 mt-4 mb-sm-3 mt-sm-5">Сменить пароль</h6>
            <EditPasswordForm />
        </div>
    )
}

export default ProfileSettings
