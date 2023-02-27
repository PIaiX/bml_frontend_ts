import React, {useState} from 'react';
import PrivacyPolicy from "./PrivacyPolicy";
import OfferInf from "./OfferInf";
import Prices from "./Prices";

const MainInf = () => {
    const [category, setCategory]=useState<number>(0)
    return (
        <>
            <div  style={{paddingTop:"50px", width:"100%", textAlign:"center"}}>
                <div className={"d-inline-block"}>
                    <div
                        style={{backgroundColor:"#2E5193", width:"100%", borderRadius:"5px", padding:"5px", color:"white", cursor:"pointer"}}
                        onClick={()=>setCategory(0)}>Политика конфиденциальности</div><br/>
                    <div
                        style={{backgroundColor:"#2E5193", width:"100%", borderRadius:"5px", padding:"5px", color:"white", cursor:"pointer"}}
                        onClick={()=>setCategory(1)}>Оферта</div><br/>
                    <div
                        style={{backgroundColor:"#2E5193", width:"100%", borderRadius:"5px", padding:"5px", color:"white", cursor:"pointer"}}
                        onClick={()=>setCategory(2)}>Таблица цен</div>
                </div>
            </div>
            <main className={"d-flex justify-content-center"}>
                <div className={"px-5 py-4 privacy"} style={{maxWidth: "1000px"}}>
                    {category===0 && <PrivacyPolicy />}
                    {category===1 && <OfferInf />}
                    {category===2 && <Prices />}
                </div>
            </main>
        </>
    );
};

export default MainInf;