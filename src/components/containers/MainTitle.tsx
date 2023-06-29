import React, {FC, useRef, useState} from 'react'
import { IMainTitle } from '../../types/mainTitle'
import { checkPhotoPath } from '../../helpers/photoLoader'
const MainTitle: FC<IMainTitle> = ({ title, description, videoPath, imagePath }) => {
    const [display, setDisplay] = useState('inline-block')
    const ref= useRef<HTMLVideoElement>(null)

    const clickOnImg = () => {
        setDisplay('none')
        ref?.current?.play()
    }

    return (
        <section className="bg_l_blue">
            <div className="container" id="block_3">
                <div className="row align-items-center">
                    <div className="col-12 col-md-4 mb-4 mb-md-0">
                        <div
                            style={{ display: display }}
                            id={'imgForVideo'}
                            onClick={clickOnImg}
                        >
                            <div className={'position-absolute w-100 h-100 d-flex justify-content-center align-items-center'}>
                                <img src='images/icons/buttonVideo.png' style={{width:'80px', height:'80px'}} />
                            </div>
                            <img src={checkPhotoPath(imagePath)} />
                        </div>
                        <div style={{ display: display == 'inline-block' ? 'none' : 'inline-block' }}>
                            <video ref={ref} controls playsInline src={videoPath && checkPhotoPath(videoPath)}>
                            </video>
                        </div>
                    </div>
                    <div className="col-12 col-md-8 col-xl-7 col-xxl-6">
                        <div className="f_20 pt">
                            {title ?? ''}
                        </div>
                        <br/>
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
