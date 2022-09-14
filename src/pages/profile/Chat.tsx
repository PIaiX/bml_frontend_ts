import React from 'react';
import ChatPreview from './ChatPreview';
import { Link } from 'react-router-dom';
import { MdOutlineArrowBack } from "react-icons/md";

export default function Chat() {
    return (
        <>
            <Link to="/account" className='color-1 f_11 fw_5 d-flex align-items-center d-lg-none mb-3 mb-sm-4'><MdOutlineArrowBack /> <span className='ms-2'>Назад</span></Link>
            <div className="acc-box p-0">
                <ChatPreview imgURL={"/images/photo.png"} userName={'Саша'} title={'English 1st - франшиза школы иностранных языков'} adURL={'/adv-page'} message={'Последнее сообщение'}/>
                <ChatPreview imgURL={"/images/photo.png"} userName={'Саша'} title={'English 1st - франшиза школы иностранных языков'} adURL={'/adv-page'} message={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}/>
                <ChatPreview imgURL={"/images/photo.png"} userName={'Саша'} title={'English 1st - франшиза школы иностранных языков'} adURL={'/adv-page'} message={'Последнее сообщение'}/>
                <ChatPreview imgURL={"/images/photo.png"} userName={'Саша'} title={'English 1st - франшиза школы иностранных языков'} adURL={'/adv-page'} message={'Последнее сообщение'}/>
                <ChatPreview imgURL={"/images/photo.png"} userName={'Саша'} title={'English 1st - франшиза школы иностранных языков'} adURL={'/adv-page'} message={'Последнее сообщение'}/>
                <ChatPreview imgURL={"/images/photo.png"} userName={'Саша'} title={'English 1st - франшиза школы иностранных языков'} adURL={'/adv-page'} message={'Последнее сообщение'}/>
                <ChatPreview imgURL={"/images/photo.png"} userName={'Саша'} title={'English 1st - франшиза школы иностранных языков'} adURL={'/adv-page'} message={'Последнее сообщение'}/>
                <ChatPreview imgURL={"/images/photo.png"} userName={'Саша'} title={'English 1st - франшиза школы иностранных языков'} adURL={'/adv-page'} message={'Последнее сообщение'}/>
                <ChatPreview imgURL={"/images/photo.png"} userName={'Саша'} title={'English 1st - франшиза школы иностранных языков'} adURL={'/adv-page'} message={'Последнее сообщение'}/>

                <div className='p-4'>
                    <div className='acc-box p-0'>
                        <nav aria-label="page-pagination" className='w-100'>
                            <ul className="pagination justify-content-center">
                                <li className="page-item"><a className="page-link" href="/">❮</a></li>
                                <li className="page-item"><a className="page-link active" href="/">1</a></li>
                                <li className="page-item"><a className="page-link" href="/">2</a></li>
                                <li className="page-item"><a className="page-link" href="/">3</a></li>
                                <li className="page-item"><a className="page-link" href="/">...</a></li>
                                <li className="page-item"><a className="page-link" href="/">46</a></li>
                                <li className="page-item"><a className="page-link" href="/">❯</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}