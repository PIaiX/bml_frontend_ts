import React, {FC} from 'react';
import FunctionForPrice from "../helpers/FunctionForPrice";

type propsType={
    createdAtForUser: string,
    id: number,
    amount: number,
    method: string
}

const PayItem:FC<propsType> = ({createdAtForUser, id, amount, method}) => {
    return (
        <div className={'col my-3'}>
            <div className={'row row-cols-xl-4'}>
                <div className={'col col-2 col-xl-2'}>{id}</div>
                <div className={'col col-3 col-xl-3'}>{createdAtForUser}</div>
                <div className={'col col-4 col-xl-4'}>{method}</div>
                <div className={'col col-3 col-xl-3'}>{FunctionForPrice(-1*amount)} руб</div>

            </div>
        </div>
    );
};

export default PayItem;