import React from 'react';

const Prices = () => {
    const tableLet=[
        [
            '№',
            'Услуги',
            'Цена 1 месяц',
            'Цена 3 месяца (р.)',
            'Цена 6 месяцев (р.)'
        ],
        [
            '1.',
            'Размещение франшизы на сайте (ОБЯЗАТЕЛЬНОЕ)',
            '-',
            '6 000',
            '11 000',
        ],
        [
            '2.',
            'ДОП - Премиальное размещение франшизы первая строка (4 об.)',
            '',
            '40 000',
            '72 000'
        ],
        [
            '3.',
            'ДОП - Премиальное размещение франшизы 2-3 строка (8 об.)',
            '-',
            '35 000',
            '63 000'
        ],
        [
            '4.',
            'ДОП - Премиальное размещение франшизы 4,5,6 строка (12 об.)',
            '-',
            '30 000',
            '54 000'
        ],
        [
            '5.',
            'ДОП - Премиальное размещение франшизы 7,8,9 строка (12 об.)',
            '-',
            '25 000',
            '45 000'
        ],
        [
            '6.',
            'Баннер на главной странице',
            'По запросу',
            'По запросу',
            'По запросу'
        ],
        [
            '7.',
            'Баннеры на страницах разделов. Смена при обновлении страницы',
            '-',
            '30 000',
            '54 000'
        ],
        [
            '8.',
            'Реклама в объявлениях (квадратики) Смена при обновлении страницы',
            '-',
            '15 000',
            '27 000'
        ],

    ]
    return (
        <>
            <h3>
                Таблица цен на сайте 01.02.2023
            </h3>
            <div className={"paragraph"}>
                <table>
                    {
                        tableLet.map((i, index)=>
                            <tr key={index}>
                                {i.map((j, jndex)=>
                                    <>
                                        <td style={{border:"2px solid black", textAlign:"center"}} key={jndex}>
                                            {index==0?<b>{j}</b>:j}
                                        </td>
                                    </>
                                )}
                            </tr>
                        )
                    }
                </table>
                <p></p>
                Настоящая политика конфиденциальности персональных данных портала БИЗНЕС MY LIFE
                (http://business-mylife.ru) действует в отношении всех разделов и информации, которая расположена на
                доменном имени business-mylife.ru (а также его субдоменах).
                Пользуясь нашими продуктами, вы доверяете нам свою личную информацию.
            </div>
            <div className={"paragraph"}>
                <p></p>
                Загружено: 01 февраля 2023 года.<br/>
                <b className={"d-inline-block"}>БИЗНЕС MY LIFE</b> (business-mylife.ru)<br/>
                Создатель и владелец - Индивидуальный предприниматель Найденов Роман<br/>
            </div>
        </>
    );
};

export default Prices;