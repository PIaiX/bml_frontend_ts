import React from 'react'

interface Props {
    children: React.ReactNode
    //Type properly
    error: any
    forCity?:boolean
    textarea?:boolean
}

const ValidateWrapper: React.FC<Props> = ({children, error, forCity, textarea}) => (
    <div className={`validate-wrapper ${error ? 'validate-wrapper_error' : ''}`}>
        {children}
        {error && (
            <div className={`validate-error ${textarea?'validate-error-textarea':''}`} style={{zIndex: `${forCity?'120':'10'}`}}>
                {error?.message}
            </div>
        )}
    </div>
)

export default ValidateWrapper
