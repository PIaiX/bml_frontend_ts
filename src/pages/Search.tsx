import React, {useEffect, useState} from 'react';
import {getOffersFromHeader} from "../services/offers";
import {useAppSelector} from "../hooks/store";
import {IOffersItem} from "../types/offers";
import AdvPreview from "../components/AdvPreview";

const Search = () => {
    const inputSearch:string = useAppSelector((state) => state?.search.input)
    const [offers, setOffers] = useState<Array<IOffersItem>>([])

    useEffect(()=>{
        getOffersFromHeader(inputSearch).then(res=> {   //  сделать интервал
                res && setOffers(res.data)
        })
        }, [inputSearch])
    console.log(offers)

    return (
        <main>
            <section className={"block_3 container"}>
                <h2 className="mt-4">Результаты поиска</h2>
                <div className="row g-2 g-sm-3 g-xl-4">
                    {offers && offers.length>0 && offers.map(item=>
                        <div className="col-6 col-md-4 col-lg-3" key={item.id}>
                            <AdvPreview
                                id={item.id}
                                image={item.image}
                                title={item.title}
                                investments={item.investments}
                                favorite={item?.isFavorite}
                            />
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default Search;