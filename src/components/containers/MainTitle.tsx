import React, {FC, useState} from 'react'
import {IMainTitle} from '../../types/mainTitle'
import {checkPhotoPath} from '../../helpers/photoLoader'

const img = require('./Group 5.png')
const MainTitle: FC<IMainTitle> = ({title, description, videoPath}) => {
    const [display, setDisplay] = useState('inline-block')

    const clickOnImg = () => {
        setDisplay('none')
    }
    var td: any = document.getElementById('mytd')

    return (
        <section className="bg_l_blue">
            <div className="container" id="block_3">
                <div className="row align-items-center">
                    <div className="col-12 col-md-4 mb-4 mb-md-0">
                        <div style={{display: display}} id={'imgForVideo'}>
                            <img src={img} onClick={clickOnImg} />
                        </div>
                        <div style={{display: display == 'inline-block' ? 'none' : 'inline-block'}}>
                            <video controls playsInline>
                                <source src={videoPath && checkPhotoPath(videoPath)} />
                            </video>
                        </div>
                    </div>
                    <div className="col-12 col-md-8 col-xl-7 col-xxl-6">
                        <div
                            className="f_12 pt"
                            dangerouslySetInnerHTML={{
                                __html: description ? description : '',
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MainTitle
