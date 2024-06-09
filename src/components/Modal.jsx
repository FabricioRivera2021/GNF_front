import React from 'react';

export const Modal = ({ show, handleClose, children }) => {
    const showHideClassName = show ? "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" : "hidden";

    return (
        <div className={showHideClassName}>
            <div className="bg-white rounded-lg p-5 max-w-lg mx-auto shadow-lg">
                {children}
                <button 
                    onClick={handleClose} 
                    className="mt-7 px-4 py-0.5 bg-red-500 text-white rounded hover:bg-red-700"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
};