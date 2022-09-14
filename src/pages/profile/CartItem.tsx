import React, {useState} from 'react';

function CartItem(props) {
    const [variant, setVariant] = useState(props.variant);

    return (
        <div className='cart-item acc-box p-md-4'>
            <img src={props.imgURL} alt={props.title}/>
            <div className='d-md-flex align-items-center flex-1'>
                <select defaultValue={variant} onChange={(e)=>setVariant(e.target.value)}>
                    <option value={0}>Вариант 1</option>
                    <option value={1}>Вариант 2</option>
                    <option value={2}>Вариант 3</option>
                </select>
                <div className='price'>
                    <span>Стоимость:</span>
                    <span className='fw_9 ms-2'>{props.price}&nbsp;₽</span>
                </div>
            </div>
        </div>
    );
}

export default CartItem;