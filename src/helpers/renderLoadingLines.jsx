import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

export default function renderLoadingLines(cantidad) {
  return (
    <>
        {Array.from({ length: cantidad }).map((_, i) => (
            <td key={i}>
                <div className='mt-2 ml-3'>
                    <RotatingLines 
                    width="30" 
                    radius="15"
                    strokeColor='dodgerblue'
                    strokeWidth='2'
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    />
                </div>
            </td>
        ))}
    </>
    )
}
