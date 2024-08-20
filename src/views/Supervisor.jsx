import React, { useState } from 'react'
import axios from 'axios'
import Message from '../components/Message';

export const Supervisor = () => {

    const [message, setMessage] = useState(null);

    const handleClickClearPositions = () => {
        axios
        .post("http://localhost:8000/api/clearAllPositions")
        .then(({data}) => {
            setMessage("Posiciones liberadas");
            setTimeout(() => {
                setMessage(null);
            }, 2000);
            console.log(data);
        })
        .catch((error) => {
            setMessage(error);
            console.log(error);
        })
    }

    return (
        <>
            <div className='flex justify-center mt-5'>
                <button onClick={handleClickClearPositions} className='bg-slate-700 text-white px-3 py-1'>Limpiar posiciones</button>
            </div>

            {message ? <Message className="translate-x-0" message={message} /> : <Message className="translate-x-100" message={message} />}
        </>
    )
}
