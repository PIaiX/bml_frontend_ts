import React, {FC} from 'react'
import RegistrationForm from '../../components/forms/registrationForm'

const Registration: FC = () => {
    return (
        <main>
            <div className="container py-4 py-sm-5">
                <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-8">
                        <RegistrationForm />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Registration
