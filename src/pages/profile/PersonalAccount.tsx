import React, {useState, useEffect} from 'react';
import PersonalAccountRouter from '../../routes/PersonalAccountRouter';

export default function PersonalAccount() {
    const [mob, setMob] = useState(false);
    
    useEffect(() => {
        function updateView() {
            if(window.matchMedia("(max-width: 991px)").matches){
                setMob(true);
            } else {
                setMob(false);
            }
        }
        window.addEventListener('resize', updateView);
        updateView();
        return () => window.removeEventListener('resize', updateView);
    }, []);

    return (
        <main>
            <div className="container py-4 py-sm-5">
                <PersonalAccountRouter isMobile={mob}/>
            </div>
        </main>
    );
}