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
import { handleClickFilter } from "../Utils/utils";
import Echo from 'laravel-echo';

export default function Llamador() {

    const [numeros, setNumeros] = useState([]);//numeros
    const [filterPaused, setFilterPaused] = useState(false);//cantidad numeros pausados
    const [filterCancel, setFilterCancel] = useState(false);//cantidad numeros cancelados
    const [selectedFilter, setSelectedFilter] = useState(1); //filtro actual
    const [isDerivating, setIsDerivating] = useState(false);
    const [error, setError] = useState(null);
    const [comparePosition, setComparePosition] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());
    const {currentUser, position, numero, setNumero, isChangingPosition, setNumerosTV, setAllDerivates, setShowModal} = userStateContext();

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000);
    
        return () => clearInterval(interval);
    }, []);

    //Filtrar los numeros y mostrarlos en pantalla
    // useEffect(() => {
    //     if (filterPaused) {
    //         fetchPausedNumbers(setNumeros)
    //     } else if (filterCancel) {
    //         fetchCancelNumbers(setNumeros)
    //     } else {
    //         fetchAllNumbers(selectedFilter, setNumeros, setError)
    //     }
    // }, [selectedFilter, numero, isDerivating, filterPaused, filterCancel]);

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

    // WebSocket setup for real-time number updates
    useEffect(() => {
        const channel = window.Echo.channel('numbers');  // Listen to the "numbers" channel

        // Listen for the "NumbersUpdated" event and update the state when it fires
        channel.listen('NumbersUpdated', (event) => {
            console.log(event.numeros);  // Handle the real-time updated numbers
            setNumeros(event.numeros);  // Assuming the event carries the updated numbers
        });

        // Handle any errors with WebSocket connection
        channel.error((error) => {
            console.error('Error in WebSocket connection:', error);
            setError(error);
        });

        // Clean up the WebSocket connection when the component is unmounted
        return () => {
            channel.stopListening('NumbersUpdated');
        };
    }, []);  // This effect only runs once, when the component mounts

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