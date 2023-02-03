import {IUser} from "../types/user";

const checkProfileForMenu = (user:IUser | null):boolean => {
    let result=true;
    if(user?.city)
        result=false;

    return result;
};

export default checkProfileForMenu;