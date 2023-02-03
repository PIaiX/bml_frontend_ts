import {IUser} from "../types/user";

const checkProfileForMenu = (user:IUser | null):boolean => {
    let result=true;
    if(user?.city || user?.email || user?.phone || (
        user?.type==0 && (
            true
        )
        || user?.type==1 && (
            true
        )
        || user?.type==2 && (
            true
        )
    )
    )
        result=false;

    return result;
};

export default checkProfileForMenu;