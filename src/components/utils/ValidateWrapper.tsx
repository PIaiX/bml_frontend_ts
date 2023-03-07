import React from 'react'

interface Props {
    children: React.ReactNode
    //Type properly
    error: any
    forCity?:boolean
}

const ValidateWrapper: React.FC<Props> = ({children, error, forCity=false}) => (
    <div className={`validate-wrapper ${error ? 'validate-wrapper_error' : ''}`}>
        {children}
        {error && (
            <div className="validate-error" style={{zIndex: `${forCity?'12':'10'}`}}>
                {error?.message}
            </div>
        )}
    </div>
)

export default ValidateWrapper
