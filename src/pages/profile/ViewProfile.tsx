import React, {BaseSyntheticEvent, FC, useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {MdOutlineArrowBack, MdOutlineQuestionAnswer} from 'react-icons/md'
import {IUseStateItem, IUseStateItems} from '../../types'
import {IUser} from '../../types/user'
import {getUserInfo} from '../../services/users'
import {IOffersItem, IOffersMeta} from '../../types/offers'
import {getUsersOffersNotArchive} from '../../services/offers'
import {checkPhotoPath} from '../../helpers/photoLoader'
import Loader from '../../components/utils/Loader'
import {createFriend, deleteFriend} from '../../services/friends'
import {useAppDispatch, useAppSelector} from '../../hooks/store'
import {emitCreateWithOfferTopicMessage, emitCreateWithoutTopicMessage} from '../../services/sockets/messages'
import {showAlert} from '../../store/reducers/alertSlice'
import CustomModal from '../../components/utils/CustomModal'

const ViewProfile: FC = () => {
    const {id} = useParams()
    const user: IUser | null = useAppSelector((state) => state?.user?.user)
    const [sliceNumber, setSliceNumber] = useState(6)
    const [userInfo, setUserInfo] = useState<IUseStateItem<IUser>>({
        isLoaded: false,
        item: null,
    })
    const [userOffers, setUserOffers] = useState<IUseStateItems<IOffersItem, IOffersMeta>>({
        isLoaded: false,
        meta: null,
        items: null,
    })
    const [messagePayload, setMessagePayload] = useState({
        text: '',
        conversationId: 0,
    })
    const [isShowMessageModal, setIsShowMessageModal] = useState(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (id && user?.id) {
            getUserInfo(+id, user?.id)
                .then((res) => res && setUserInfo({isLoaded: true, item: res}))
                .catch((error) => setUserInfo({isLoaded: true, item: null}))
        }
    }, [id, user?.id])

    useEffect(() => {
        if (id) {
            getUsersOffersNotArchive(+id, 1, 6, 'desc')
                .then((res) => res && setUserOffers({isLoaded: true, items: res.data, meta: res.meta}))
                .catch((error) => setUserOffers({isLoaded: true, items: null, meta: null}))
        }
    }, [id])

    const onSubmitCreateFriend = () => {
        if (user && id) {
            createFriend({fromId: user?.id, toId: +id})
                .then(() => {
                    if (id && user?.id) {
                        getUserInfo(+id, user?.id)
                            .then((res) => res && setUserInfo({isLoaded: true, item: res}))
                            .catch((error) => setUserInfo({isLoaded: true, item: null}))
                    }
                })
                .catch(() => console.log())
        }
    }

    const onSubmitRemoveFromFriend = () => {
        if (user && id) {
            deleteFriend({fromId: user?.id, toId: +id})
                .then(() => {
                    if (id && user?.id) {
                        getUserInfo(+id, user?.id)
                            .then((res) => res && setUserInfo({isLoaded: true, item: res}))
                            .catch((error) => setUserInfo({isLoaded: true, item: null}))
                    }
                })
                .catch(() => console.log())
        }
    }

    const createWithTopicMessage = (e: BaseSyntheticEvent) => {
        e.preventDefault()
        if (id) {
            emitCreateWithoutTopicMessage(id, messagePayload).then((res) => {
                res?.status === 200 && dispatch(showAlert({message: '?????????????????? ?????????????? ????????????????????', typeAlert: 'good'}))
                setIsShowMessageModal(false)
            })
        }
    }

    return (
        <>
            <Link to="/account" className="color-1 f_11 fw_5 d-flex align-items-center d-lg-none mb-3 mb-sm-4">
                <MdOutlineArrowBack /> <span className="ms-2">??????????</span>
            </Link>
            <div className="acc-box">
                <div className="row">
                    <div className="col-md-4 mb-3 mb-sm-4 mb-md-0">
                        <h4 className="fw_7 text-center">{userInfo?.item?.fullName}</h4>
                        <img
                            src={checkPhotoPath(userInfo?.item?.avatar)}
                            alt={userInfo?.item?.fullName}
                            className="user-photo"
                        />
                        <div className="acc-box mt-3 mt-xl-4">
                            <button
                                type="button"
                                className="d-flex align-items-center blue fw_6"
                                onClick={() => setIsShowMessageModal(true)}
                            >
                                <MdOutlineQuestionAnswer className="f_17" />
                                <span className="ms-1 ms-sm-3 text-start">???????????????? ??????????????????</span>
                            </button>
                            <hr className="my-3" />
                            {userInfo?.item?.friendStatus &&
                                !userInfo?.item?.outgoingStatus &&
                                !userInfo?.item?.incomingStatus && (
                                    <button
                                        type="button"
                                        className="text-start color-1 f_09"
                                        onClick={() => {
                                            onSubmitRemoveFromFriend()
                                        }}
                                    >
                                        ?????????????? ???? ??????????????????
                                    </button>
                                )}
                            {!userInfo?.item?.friendStatus &&
                                !userInfo?.item?.outgoingStatus &&
                                !userInfo?.item?.incomingStatus && (
                                    <button
                                        type="button"
                                        className="text-start color-1 f_09"
                                        onClick={() => {
                                            onSubmitCreateFriend()
                                        }}
                                    >
                                        ???????????????? ?? ????????????-????????????????
                                    </button>
                                )}
                            {!userInfo?.item?.friendStatus &&
                                userInfo?.item?.outgoingStatus &&
                                !userInfo?.item?.incomingStatus && (
                                    <button
                                        type="button"
                                        className="text-start color-1 f_09"
                                        onClick={() => {
                                            onSubmitRemoveFromFriend()
                                        }}
                                    >
                                        ???????????????? ????????????
                                    </button>
                                )}
                            {!userInfo?.item?.friendStatus &&
                                !userInfo?.item?.outgoingStatus &&
                                userInfo?.item?.incomingStatus && (
                                    <button
                                        type="button"
                                        className="text-start color-1 f_09"
                                        onClick={() => {
                                            onSubmitCreateFriend()
                                        }}
                                    >
                                        ?????????????? ????????????
                                    </button>
                                )}
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="acc-box">
                            <div className="table-responsive">
                                <table className="table table-borderless acc-table mb-0">
                                    <tbody>
                                        {userInfo?.item?.type === 0 && (
                                            <>
                                                <tr>
                                                    <td className="l-gray">???????? ????????????????:</td>
                                                    <td className="color-1">
                                                        {userInfo?.item?.birthday
                                                            ? userInfo?.item?.birthdayForUser
                                                            : '???? ??????????????????????'}
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                        {userInfo?.item?.type === 1 && (
                                            <>
                                                <tr>
                                                    <td className="l-gray">????????????????:</td>
                                                    <td className="color-1">
                                                        {userInfo?.item?.companyName
                                                            ? userInfo?.item?.companyName
                                                            : '???? ??????????????????????'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="l-gray">????????????:</td>
                                                    <td className="color-1">
                                                        {userInfo?.item?.mainStateRegistrationNumber
                                                            ? userInfo?.item?.birthdayForUser
                                                            : '???? ??????????????????????'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="l-gray">??????:</td>
                                                    <td className="color-1">
                                                        {userInfo?.item?.taxpayerIdentificationNumber
                                                            ? userInfo?.item?.taxpayerIdentificationNumber
                                                            : '???? ??????????????????????'}
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                        {userInfo?.item?.type === 2 && (
                                            <>
                                                <tr>
                                                    <td className="l-gray">????????????????:</td>
                                                    <td className="color-1">
                                                        {userInfo?.item?.companyName
                                                            ? userInfo?.item?.companyName
                                                            : '???? ??????????????????????'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="l-gray">????????:</td>
                                                    <td className="color-1">
                                                        {userInfo?.item?.mainStateRegistrationNumber
                                                            ? userInfo?.item?.birthdayForUser
                                                            : '???? ??????????????????????'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="l-gray">??????:</td>
                                                    <td className="color-1">
                                                        {userInfo?.item?.taxpayerIdentificationNumber
                                                            ? userInfo?.item?.taxpayerIdentificationNumber
                                                            : '???? ??????????????????????'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="l-gray">?????????????????????? ??????????:</td>
                                                    <td className="color-1">
                                                        {userInfo?.item?.taxpayerIdentificationNumber
                                                            ? userInfo?.item?.taxpayerIdentificationNumber
                                                            : '???? ??????????????????????'}
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                        <tr>
                                            <td className="l-gray">??????????:</td>
                                            <td className="color-1">
                                                {userInfo?.item?.city ? userInfo?.item?.city : '???? ??????????????????????'}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="l-gray">?????????? ????????????????:</td>
                                            <td className="color-1">***********</td>
                                        </tr>
                                        <tr>
                                            <td className="l-gray">?????????? ????. ??????????:</td>
                                            <td className="color-1">***********</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="acc-box mt-3 mt-m-4 mt-xl-5">
                            <div className="f_09 d-flex justify-content-between">
                                <div>
                                    ???????????????????? <span className="l-gray">{userOffers?.meta?.total || 0}</span>
                                </div>
                                {userOffers?.meta && userOffers?.meta?.total > 6 ? (
                                    <button onClick={() => setSliceNumber(100)}>???????????????? ??????</button>
                                ) : (
                                    ''
                                )}
                            </div>
                            <div
                                className={
                                    userOffers?.meta?.total && userOffers?.meta?.total > 0
                                        ? 'row row-cols-3 g-1 g-sm-2 g-xl-4 text-center mt-1'
                                        : 'd-flex flex-row justify-content-center'
                                }
                            >
                                {userOffers?.isLoaded ? (
                                    userOffers?.meta?.total && userOffers?.meta?.total > 0 ? (
                                        userOffers?.items?.slice(0, sliceNumber).map((offer) => (
                                            <div key={offer?.id}>
                                                <div className="acc-box ads">
                                                    <img
                                                        src={checkPhotoPath(offer?.image)}
                                                        alt={offer?.categoryForUser}
                                                        className="ads-img"
                                                    />
                                                    <div className="fw_5 f_09 mt-2">{offer?.categoryForUser}</div>
                                                    <div className="gray f_09 mt-1">
                                                        {offer?.subsection?.area?.name}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div>
                                            <h5>?????? ????????????????????</h5>
                                        </div>
                                    )
                                ) : (
                                    <div className="p-5 w-100 d-flex justify-content-center">
                                        <Loader color="#343434" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CustomModal
                isShow={isShowMessageModal}
                setIsShow={setIsShowMessageModal}
                centered={false}
                closeButton={true}
                className="modal__messages"
            >
                <form>
                    <div className="m-3">
                        <label>?????????? ??????????????????:</label>
                        <textarea
                            placeholder="?????????????? ??????????????????..."
                            value={messagePayload.text || ''}
                            onChange={(e) => setMessagePayload((prevState) => ({...prevState, text: e.target.value}))}
                        />
                        {messagePayload?.text?.length === 0 ? (
                            <span className="gray-text">
                                <sup>*</sup>?????????????? 1 ????????
                            </span>
                        ) : null}
                    </div>
                    <div className="d-flex justify-content-center mt-5">
                        <button
                            className="btn_main btn_1"
                            onClick={(event: BaseSyntheticEvent) =>
                                messagePayload?.text?.length >= 1
                                    ? createWithTopicMessage(event)
                                    : event.preventDefault()
                            }
                        >
                            ??????????????????
                        </button>
                    </div>
                </form>
            </CustomModal>
        </>
    )
}

export default ViewProfile
