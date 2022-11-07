import React from 'react'

interface Props {
    children: React.ReactNode
    //Type properly
    error: any
}

const ValidateWrapper: React.FC<Props> = ({children, error}) => (
    <div className={`validate-wrapper ${error ? 'validate-wrapper_error' : ''}`}>
        {children}
        {error && <div className="validate-error">{error?.message}</div>}
    </div>
)

export default ValidateWrapper
