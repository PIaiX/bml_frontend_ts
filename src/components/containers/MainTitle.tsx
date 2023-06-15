import React, { FC, useState } from 'react'
import { IMainTitle } from '../../types/mainTitle'
import { checkPhotoPath } from '../../helpers/photoLoader'
const MainTitle: FC<IMainTitle> = ({ title, description, videoPath, imagePath }) => {
    const [display, setDisplay] = useState('inline-block')

    const clickOnImg = () => {
        setDisplay('none')
    }

    return (
        <section className="bg_l_blue">
            <div className="container" id="block_3">
                <div className="row align-items-center">
                    <div className="col-12 col-md-4 mb-4 mb-md-0">
                        <div style={{ display: display }} id={'imgForVideo'} className={'position-relative'}>
                            <div className={'position-absolute w-100 h-100 d-flex justify-content-center align-items-center'}>
                                <img src='images/icons/buttonVideo.png' style={{width:'80px', height:'80px'}} />
                            </div>
                            <img src={checkPhotoPath(imagePath)} onClick={clickOnImg} />
                        </div>
                        <div style={{ display: display == 'inline-block' ? 'none' : 'inline-block' }}>
                            <video controls playsInline src={videoPath && checkPhotoPath(videoPath)}>
                            </video>
                        </div>
                    </div>
                    <div className="col-12 col-md-8 col-xl-7 col-xxl-6">
                        <div className="f_20 pt">
                            {title ?? ''}
                        </div>
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
