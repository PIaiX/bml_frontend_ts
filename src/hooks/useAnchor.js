import React, {useRef} from 'react';

const UseAnchor = () => {
    const myRef = useRef(null)
    const executeScroll = () => myRef?.current?.scrollIntoView()

    return [myRef, executeScroll]
}
export default UseAnchor;