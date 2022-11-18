import React from 'react'

interface Props {
    color?: string
}

const Loader: React.FC<Props> = ({color}) => {
    const styles = {
        backgroundColor: color ?? '#FFF',
    }

    return (
        <div className="lds-ellipsis">
            <div style={styles} />
            <div style={styles} />
            <div style={styles} />
            <div style={styles} />
        </div>
    )
}

export default Loader
