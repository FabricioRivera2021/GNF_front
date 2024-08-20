import React, { useEffect, useState } from 'react'

export default function Message({message, colorMsg = "blue"}) {

    const [color, setColor] = useState(null);

    useEffect(() => {
        setColor(colorMsg);
    }, [colorMsg])
    
    return (
        <div className={`fixed ${message ? 'translate-x-0 bg-' + color + '-500' : 'translate-x-28' } bottom-4 right-4 py-5 px-10 text-white rounded-sm shadow-md text-lg font-roboto transition-all`}>
            {message}
        </div>
    )
}
