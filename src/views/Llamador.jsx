/**
 * Vista del menu de gestion de numeros
 */
import { useEffect, useState } from "react";
import { userStateContext } from '../context/ContextProvider';
import { 
    fetchAllEstados, 
    handleSetNextState, 
    handlePauseNumber,
    handleCancelNumber,
    handleDerivateToPosition,
    handleDerivateTo, 
    fetchAllNumbers,
    getCurrentSelectedNumber,
    fetchPausedNumbers,
    fetchCancelNumbers,
    handleLlamarNumero
} from '../API/apiServices'
import axios from 'axios';
import axiosClient from '../axiosCustom';
import { FilterSideBar, LlamadorTabla } from '../components/index';
import LlamadorPanel from "../components/LlamadorPanel";
 
// websocket-------------------------------------------------------------------
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
window.Pusher = Pusher;
window.Echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 8080,
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
});
//----------------------------------------------------------------------------

export default function Llamador() {

    const [numeros, setNumeros] = useState([]);//numeros
    const [selectedFilter, setSelectedFilter] = useState(1); //filtro actual
    const [isDerivating, setIsDerivating] = useState(false);
    const [error, setError] = useState(null);
    const [comparePosition, setComparePosition] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());
    const {currentUser, position, numero, setNumero, isChangingPosition, setNumerosTV, setAllDerivates, setShowModal, setFilterCancel, setFilterPaused, filterPaused, filterCancel} = userStateContext();

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000);
    
        return () => clearInterval(interval);
    }, []);

    // Filtrar los numeros y mostrarlos en pantalla
    useEffect(() => {
        if (filterPaused) {
            fetchPausedNumbers(setNumeros)
        } else if (filterCancel) {
            fetchCancelNumbers(setNumeros)
        } else {
            fetchAllNumbers(selectedFilter, setNumeros, setError)
        }
    }, [selectedFilter, numero, isDerivating, filterPaused, filterCancel]);

    //get current selected number by the User
    useEffect(() => {
        getCurrentSelectedNumber(setNumero)
    }, []);

    // comparar el estado del numero con la posicion del User
    useEffect(() => {
        console.log("Use effect 4");
        const compare_position = position.split(" ");
        setComparePosition(compare_position[0])
    }, [position]);
     
     useEffect(() => {
         const channel = window.Echo.channel('chat');
     
         channel.listen('Example', (event) => {
             console.log('Evento recibido:', event);
         });
     
         return () => channel.stopListening('chat');
     }, []);

    const handleClickFilter = (id) => {
        console.log("handleClickFilter");
        setFilterPaused(false);
        setFilterCancel(false);
        setSelectedFilter(id);
    }

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    return (
        <>
            <div className="flex justify-between items-start">{/* Main */}
                <FilterSideBar
                    selectedFilter={selectedFilter}
                    handleClickFilter={(id) => handleClickFilter(id, setFilterCancel, setFilterPaused, setSelectedFilter)}
                    filterPausedNumber={() => setFilterPaused(true)}
                    filterCancelNumber={() => setFilterCancel(true)}
                />
                {/* ------------------------------------------------------------------------------------- */}
                <div className="w-full flex flex-col justify-between h-[calc(100vh-4rem)]" >
                    <LlamadorTabla
                        numeros={numeros}
                        comparePosition={comparePosition}
                        handleLlamarNumero={
                            (id, paused, canceled) => handleLlamarNumero(id, paused, canceled, setNumero, setNumerosTV)
                        }
                        position={position}
                        isChangingPosition={isChangingPosition}
                        numero={numero}
                        error={error}
                    />
                    {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                    <LlamadorPanel
                        numero={numero}
                        handleSetNextState={(number) => handleSetNextState(number, setNumero)}
                        handleDerivateTo={(number) => handleDerivateTo(number, setShowModal, setAllDerivates)}
                        handleDerivateToPosition={(number, position) => handleDerivateToPosition(number, position, setIsDerivating, setNumero, setShowModal)}
                        handlePauseNumber={(number) => handlePauseNumber(number, setNumero)}
                        handleCancelNumber={(number) => handleCancelNumber(number, setNumero)}
                    />
                </div>
                {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            </div>
        </>
    )
}