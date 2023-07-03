import React, {FC} from 'react';
import {useAppSelector} from "../hooks/store";

type propsType={
    children:React.ReactNode
}
const ProfileBanned:FC<propsType> = ({children}) => {
    const user  = useAppSelector((state) => state?.user.user)
    if(user?.blockedUntil)
        return (
            <div className="not-found">
                <h1 className="not-found__title">Ваш аккаунт заблокирован до {user?.blockedUntilForUser}</h1>
                <h4>Причина: {user?.blockDescription}</h4>
            </div>
        );

    return (
        <div>
            {children}
        </div>
    );
};

export default ProfileBanned;