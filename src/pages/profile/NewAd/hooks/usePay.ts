import {getBalance} from "../../../../services/users";
import {setBalance} from "../../../../store/reducers/userSlice";
import {showAlert} from "../../../../store/reducers/alertSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useCallback} from "react";

const UsePay = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const afterPay=useCallback((res:unknown, message?:string)=>{
        getBalance().then(res2 => {
            dispatch(setBalance(res2))
            if(res) {
                dispatch(showAlert({
                    message: message? message: 'Объявление успешно создано! Ждите одобрения модерации...',
                    typeAlert: 'good'
                }))
                setTimeout(() => {
                    navigate('/account/my-ads')
                }, 1000)
            }
            else{
                dispatch(showAlert({message: 'Произошла ошибка!', typeAlert: 'bad'}))
            }
        })
    }, [])

    return afterPay
};

export default UsePay;