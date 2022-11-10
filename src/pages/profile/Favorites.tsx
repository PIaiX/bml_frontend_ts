import React from 'react'
import {Link} from 'react-router-dom'
import {MdOutlineArrowBack} from 'react-icons/md'
import AdvPreview from '../../components/AdvPreview'

const Favorites = () => {
    return (
        <>
            <Link to="/account" className="color-1 f_11 fw_5 d-flex align-items-center d-lg-none mb-3 mb-sm-4">
                <MdOutlineArrowBack /> <span className="ms-2">Назад</span>
            </Link>
            <div className="row row-cols-2 row-cols-md-3 g-2 g-sm-3 g-xl-4">
                <div>
                    <AdvPreview
                        url={'adv-page'}
                        image={'/images/offers/3.jpg'}
                        title={'English 1st - франшиза школы иностранных языков'}
                        summ={'400000'}
                        favorite={true}
                    />
                </div>
                <div>
                    <AdvPreview
                        url={'adv-page'}
                        image={'/images/offers/3.jpg'}
                        title={'English 1st - франшиза школы иностранных языков'}
                        summ={'400000'}
                        favorite={true}
                    />
                </div>
                <div>
                    <AdvPreview
                        url={'adv-page'}
                        image={'/images/offers/3.jpg'}
                        title={'English 1st - франшиза школы иностранных языков'}
                        summ={'400000'}
                        favorite={true}
                    />
                </div>
                <div>
                    <AdvPreview
                        url={'adv-page'}
                        image={'/images/offers/3.jpg'}
                        title={'English 1st - франшиза школы иностранных языков'}
                        summ={'400000'}
                        favorite={true}
                    />
                </div>
                <div>
                    <AdvPreview
                        url={'adv-page'}
                        image={'/images/offers/3.jpg'}
                        title={'English 1st - франшиза школы иностранных языков'}
                        summ={'400000'}
                        favorite={true}
                    />
                </div>
                <div>
                    <AdvPreview
                        url={'adv-page'}
                        image={'/images/offers/3.jpg'}
                        title={'English 1st - франшиза школы иностранных языков'}
                        summ={'400000'}
                        favorite={true}
                    />
                </div>
            </div>
        </>
    )
}

export default Favorites
