import React from 'react'

export const showInfoMsg = ( msg ) => {
  return (
    (msg.status == "ok")
      ? <div className='bg-green-500 text-center px-2 py-1.5 font-roboto mt-10 text-white'>{msg.message}</div>
      : <div className='bg-red-500 text-center px-2 py-1.5 font-roboto mt-10 text-white'>{msg.message}</div> 
  )
}
