import React, {FC} from 'react'
import {IMainTitle} from '../../types/mainTitle'
import {checkPhotoPath} from '../../helpers/photoLoader'

const MainTitle: FC<IMainTitle> = ({title, description, videoPath}) => {
    return (
        <section className="bg_l_blue">
            <div className="container" id="block_3">
                <h1>{title}</h1>
                <div className="row align-items-center">
                    <div className="col-12 col-md-4 mb-4 mb-md-0">
                        <video controls src={videoPath && checkPhotoPath(videoPath)} />
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
