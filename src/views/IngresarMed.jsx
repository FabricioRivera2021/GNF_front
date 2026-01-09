import React, { useEffect, useRef, useState } from 'react';
import { Modal, CalendarTreatment } from '../components/index';
import LlamadorPanel from "../components/LlamadorPanel";
import { userStateContext } from '../context/ContextProvider';
import { ExclamationCircleIcon, ExclamationTriangleIcon, PlusIcon } from '@heroicons/react/24/outline';
import IngresarMedSideBar from '../components/IngresarMedSideBar';
import { fetchAllMedicamentos, getCurrentSelectedNumber,handleSetNextState, handlePauseNumber,handleCancelNumber,handleDerivateToPosition,handleDerivateTo,fetchAllMedicos, createTreatment} from '../API/apiServices';
import Message from '../components/Message';
import { use } from 'react';

//COMPONENTE PRINCIPAL
export default function IngresarMed () {
    const { setAllDerivates, setShowModal, numero, setNumero, showMedicoModal, setShowMedicoModal, medications, setMedications, addMedication, setAddMedication, showTreatmentModal,
            setShowTreatmentModal, treatmentDays, setTreatmentDays, startDate, setEvents, medico, setMedico, allMedicos, setAllMedicos, currentUser, customer, preConfirmacion, setPreConfirmacion} = userStateContext();
    const [selectedFilter, setSelectedFilter] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTermMedico, setSearchTermMedico] = useState('');
    const [days, setDays] = useState(1);
    const [everyday, setEveryday] = useState(true);
    const [selectedDays, setSelectedDays] = useState([]);
    const [interval, setInterval] = useState(24);
    const [totalDoses, setTotalDoses] = useState(0);
    const [message, setMessage] = useState({message: null, colorMsg: "blue"});

    //pre confirmacion---------------------------------------------------------
    const handleCreatePreConfirmacion = () => {

      // //agregar la medicacion al localstorage temporalmente
      // setPreConfirmacion(JSON.parse(localStorage.getItem('preConfirmacion')) || []);

      //guardo los datos en el array
      setPreConfirmacion(prev => {
        const nuevoArray = [
          ...prev,
          {
            startDate: startDate,
            // endDate -> calculada desde el backend
            // tto_dias_mes -> esta en la bd pero ni idea que hace 
            medicoID: medico.id,
            medicoNombre: medico.nombre,
            medicoApellido: medico.apellido,
            medicoEspecialidad: medico.especialidad,
            medicationID: addMedication.id,
            medicationNombre: addMedication.droga,
            medicationMarca: addMedication.nombre_comercial,
            medicationConcentracion: addMedication.droga_concentracion,
            medicationPresentacion: addMedication.presentacion_farmaceutica,
            //customer_id -> context
            userID: currentUser.id,
            userName: currentUser.name,
            //activo -> si la cuenta esta vigente
            treatmentDays: treatmentDays, 
            //total dias pendientes, no seria necesario
            //retiros por mes -> no es nesesario
            //retiros pendientes -> no es necesario
            tipo_tto: "comun", //hardcodeado
            interval: interval, //-> frecuencia de toma
            //cantidad diaria -> no se si es necesario
            numero: numero
          }
        ]

        return nuevoArray;
      });
      
      setShowTreatmentModal(false);
      handleClearAddMedication();
      handleClearTreatmentDays();
      
      setMessage({
          message: "Se agregó la medicación a la preconfirmación de entrega",
          colorMsg: "green"
          });
    }
    //end of preconfirmacion--------------------------------------------------

    const diasDeLaSemana = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];

    //FUNCTIONS
    const handleAddMedication = (
          event, 
          id, 
          droga, 
          nombre_comercial, 
          tipo_medicamento, 
          droga_concentracion, 
          unidades_caja, 
          presentacion_farmaceutica, 
          lab, 
          lote,
          fecha_vencimiento
        ) => {
        event.preventDefault();
        setShowTreatmentModal(true);
        setAddMedication({
            id: id,
            droga: droga,
            nombre_comercial: nombre_comercial,
            tipo_medicamento: tipo_medicamento,
            droga_concentracion: droga_concentracion,
            unidades_caja: unidades_caja,
            presentacion_farmaceutica: presentacion_farmaceutica,
            lote: lote,
            laboratorio: lab,
            fecha_vencimiento: fecha_vencimiento
        });
    };

    //setea el medico que indico la medicacion
    //esto esta mal, solo necesito el id del medico
    const handleSetMedico = (id, nombre, apellido, numeroRegistro, nro_caja, especialidades) => {
        setMedico({
            id: id,
            nombre: nombre,
            apellido: apellido,
            numeroRegistro: 111, //hardcodear por ahora
            nro_caja: nro_caja,
            especialidad: especialidades
        });
      }
    console.log("medico seteado:", medico);

    //limpia la variable de medicacion agregada, cuando se cierra el modal de medicacion
    const handleClearAddMedication = () => {
        setAddMedication({
            id: null,
            droga: null,
            nombre_comercial: null,
            tipo_medicamento: null,
            droga_concentracion: null,
            unidades_caja: null,
            presentacion_farmaceutica: null
        });
    };

    const handleClearTreatmentDays = () => {
        setTreatmentDays('');
        setEveryday(true);
        setSelectedDays([]);
        setInterval(24);
        setTotalDoses(0);
    };

    const handleCloseMedicoModal = () => setShowMedicoModal(false);

    const toggleDay = (day) => {
      setSelectedDays((prev) =>
        prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
      );
    };

    const filteredMedications = medications.filter(medication =>
        medication.nombre_comercial.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medication.droga.toLowerCase().includes(searchTerm.toLowerCase())
        // medication.grupo_terapeutico.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const groupedMedications = filteredMedications.reduce((acc, medication) => {
        if (!acc[medication.drugName]) {
            acc[medication.drugName] = [];
        }
        acc[medication.drugName].push(medication);
        return acc;
    }, {});

    const filteredMedicos = allMedicos.filter(medico =>
        medico.nombre.toLowerCase().includes(searchTermMedico.toLowerCase()) ||
        medico.apellido.toLowerCase().includes(searchTermMedico.toLowerCase()) ||
        // ! need to fix this
        // medico.numeroRegistro.includes(searchTermMedico) ||
        String(medico.nro_caja).includes(searchTermMedico) 
        // medico.especialidad.some(especialidad => especialidad.toLowerCase().includes(searchTermMedico.toLowerCase()))
    );

    const generateEventsByWeekday = (startDate, totalDays, targetWeekdays) => {
      const events = []
      const dayInMs = 24 * 60 * 60 * 1000
    
      for (let i = 0; i < totalDays; i++) {
        const currentDate = new Date(startDate.getTime() + i * dayInMs)
        const dayOfWeek = currentDate.getDay() // 0 = Domingo, 1 = Lunes, ...
    
        if (targetWeekdays.includes(dayOfWeek)) {
          events.push({
            title: '💊 Medicación',
            start: currentDate,
            end: currentDate,
            allDay: true,
          })
        }
      }
    
      return events
    }

    const getSelectedDays = (startDate, treatmentDays) => {
      console.log("startDate", startDate);
      console.log("treatmentDays", treatmentDays);
    }

    const calculateDoses = (days, dosesPerDay, selectedDays, everyday) => {
      let selectedDayIndexes = selectedDays.map(day => diasDeLaSemana.indexOf(day) + 1); //selected day index 
      let startDayIndex = diasDeLaSemana.indexOf(startDate.toLocaleString('es-ES', { weekday: 'long' })) + 1; // +1 to match the 1-7 range
      console.log("startDayIndex", startDayIndex);
      if (!Number.isInteger(days) || days <= 0) {
          console.error("Valor invalido de dias. Debe ser un número entero positivo.");
          return;
      }
      const newEvents = [];
      let weeks = Math.floor(days / 7);
      console.log("weeks", weeks);
      let extraDays = days % 7;
      console.log("extraDays", extraDays);
      let totalDoses = 0;
      if (everyday) {
        totalDoses = days * dosesPerDay;
        const endDate = new Date(startDate); // Clonar startDate
        endDate.setDate(endDate.getDate() + treatmentDays); // Calcular la fecha de fin sumando los días de tratamiento
        setEvents(
          [{
            title: `Tratamiento ${treatmentDays} dias`,
            start: new Date(startDate),
            end: new Date(endDate),
            allDay: true,
          }],
        )
      } else {
        // if (selectedDayIndexes.length > days) {
        //   console.error("No se puede seleccionar más días de los que dura el tratamiento");
        //   return;
        // }
        const startDateForShowTreatmentModal = new Date(startDate); // Clonar startDate
        //treatment days
        const endDate = new Date(startDate); // Clonar startDate
        endDate.setDate(endDate.getDate() + treatmentDays - 1); // Calcular la fecha de fin sumando los días de tratamiento
  
        console.log("startDate", startDate);
        console.log("endDate", endDate);
        
        //set an empty events array to avoid showing the last treatment days
        setEvents([]);
  
        while (startDateForShowTreatmentModal <= endDate) {
          const dayOfWeek = startDateForShowTreatmentModal.toLocaleDateString('es-ES', { weekday: 'long' });; // 0 = Domingo, 1 = Lunes, ...
          const isValidDay = selectedDays.includes(dayOfWeek);
          console.log(
            `[${startDateForShowTreatmentModal.getDay()}] Día de la semana: ${dayOfWeek} ${
              isValidDay ? "✔️ válido" : "❌ no válido"
            }`
          );
          // console.log("adasdasd" ,startDateForShowTreatmentModal.getDay());
          // console.log("adsadssssss", dayOfWeek);
          // console.log("valid day", isValidDay);
          // console.log("selected days", selectedDays);
          if (isValidDay) {
            console.log("newEvents", newEvents)
            newEvents.push(
              {
                title: `Toma ${newEvents.length + 1}`,
                start: new Date(startDateForShowTreatmentModal),
                end: new Date(startDateForShowTreatmentModal),
                allDay: true,
              },
            );
            // addedDays++;
          // console.log(startDateForShowTreatmentModal.toLocaleDateString('es-ES'));
          }
        startDateForShowTreatmentModal.setDate(startDateForShowTreatmentModal.getDate() + 1); // Avanza un día
        }

        setEvents(newEvents);

        console.table(
          newEvents.map(event => ({
            Día: event.start,
            Título: event.title
          }))
        );

        console.log(selectedDayIndexes);
        selectedDayIndexes.forEach(dayIndex => {
          console.log(`Día ${dayIndex}---------`);
          
          let occurrences = weeks;
          // Verificamos si el día seleccionado cae en los días extras después de las semanas completas
          let adjustedIndex = (dayIndex - startDayIndex + 7) % 7; // Ajuste si el tratamiento no empieza en domingo
          console.log("adjustedIndex", (dayIndex - startDayIndex + 7) % 7);
          if (adjustedIndex < extraDays) {
            occurrences++;
          }
          console.log(`Día ${diasDeLaSemana[dayIndex - 1]} aparece ${occurrences} veces`);
          totalDoses += occurrences * dosesPerDay;
        });
      }
      console.log("Total de dosis:", totalDoses);

      setTotalDoses(totalDoses);
    };

    const handleCreateTreatment = (startDate, treatmentDays, interval, totalDoses, medicationId) => {

      const endDate = new Date(startDate); // Clonar startDate
      endDate.setDate(endDate.getDate() + treatmentDays - 1);

      return () => {
        startDate
        treatmentDays
        endDate
        interval
        totalDoses
        medicationId
        medico.id
        currentUser.id
        numero
        // console.log("customer", customer); -> por ahora lo conseguimos desde el backend a travez del id del numero (sabiendo que usuario esta asignado a ese numero)
      };
    }

    //REFERENCIAS
    const treatmentDaysInputRef = useRef(null);

    //USE EFFECTS
    //mensajes
    useEffect(() => {
      if (message) {
        const timeout = setTimeout(() => {
          setMessage(null);
        }, 3000);

        // ✅ Clean up timeout if the message changes before 3 seconds
        return () => clearTimeout(timeout);
      }
    }, [message]);

    //get current selected number by the User
    useEffect(() => {
        getCurrentSelectedNumber(setNumero)
    }, []);

    //traer todos los medicamentos
    useEffect(() => {
        fetchAllMedicamentos(setMedications);
    }, []);

    //trae los medicos de la bd
    useEffect(() => {
      fetchAllMedicos(setAllMedicos);
    }, []);

    useEffect(() => {
      if (!days || !interval || interval <= 0) return;
    
      const intervalCount = 24 / interval;
    
      calculateDoses(treatmentDays, intervalCount, selectedDays, everyday);
    }, [treatmentDays, interval, selectedDays, everyday, startDate]);

    //focus on the input days of treatment when the modal is open
    useEffect(() => {
      if (showTreatmentModal && treatmentDaysInputRef.current) {
        treatmentDaysInputRef.current.focus();
      }
    }, [showTreatmentModal]);

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + treatmentDays - 1);
    
    return (
        <div className="flex justify-between items-start">
            <IngresarMedSideBar />
            <div className='flex flex-col w-[calc(100vw-4rem)] h-[calc(100vh-4rem)]'>
                {/* Ingresar medicacion formulario */}
                <div className="flex flex-col items-start w-full p-3 space-y-3">
                    <h2 className="text-2xl font-bold mb-2">Ingresar Medicación</h2>
                    <div className='flex items-end justify-start gap-2'>
                        <div className='ml-4 py-2'>
                              <input
                                className="shadow appearance-none border py-1.5 px-2 rounded-md text-gray-100 font-semibold leading-tight 
                                focus:outline-none focus:shadow-outline bg-blue-400 cursor-pointer hover:bg-blue-500"
                                id="medicationName"
                                type="button"
                                value="Buscar médico"
                                onClick={() => {
                                setSearchTermMedico('');
                                setShowMedicoModal(true);
                                }}
                              />
                            <div className='flex items-center gap-2'>
                              {
                                (medico.nombre) 
                                ?  (
                                      <div className='flex pl-1 pr-3 text-slate-500 items-start font-semibold gap-4 bg-yellow-100 rounded-md shadow-sm mt-2'>
                                        <div className='flex flex-col'>
                                          <p className='text-slate-700 font-semibold'>{medico.nombre} {medico.apellido}</p>
                                          <p className='text-slate-400 font-semibold'>{medico.especialidad}</p>
                                          <p className='text-slate-400 font-semibold'>CJP: {medico.nro_caja}</p>
                                          <p className='text-slate-400 font-semibold'>Reg: 225487</p>
                                        </div>
                                      </div>
                                    )
                                : (
                                    <div className='flex px-1 gap-2 text-slate-500 items-start font-semibold bg-red-200 rounded-md shadow-sm mt-2'>
                                      <p className='text-slate-800 font-semibold'>No se ingreso médico</p>
                                      <ExclamationTriangleIcon className='w-6 text-orange-700' />
                                    </div>
                                  )
                              }
                            </div>
                        </div>
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar medicamento..."
                        className="p-2 ml-4 w-1/2 border rounded text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="rounded-lg w-[calc(100vw-16rem)] h-[calc(100vh-27rem)] overflow-auto">
                        <form className="space-y-4">
                            <div className='min-h-20 py-1 px-4'>
                            {(groupedMedications && Object.keys(groupedMedications).length > 0) && (
                            <table className="shadow-sm min-w-full text-left text-sm font-roboto font-medium text-slate-600 text-surface p-2">
                            <thead className='sticky top-0 bg-blue-400 text-white'>
                                <tr>
                                <th className="px-2 py-1 border-b"></th>
                                <th className="px-2 py-1 border-b">Droga</th>
                                <th className="px-2 py-1 border-b whitespace-nowrap">N. comercial</th>
                                <th className="px-2 py-1 border-b">Concentración</th>
                                <th className="px-2 py-1 border-b">Presentación</th>
                                <th className="px-2 py-1 border-b">Unidad</th>
                                <th className="px-2 py-1 border-b whitespace-nowrap">Via admin.</th>
                                <th className="px-2 py-1 border-b">Tipo</th>
                                <th className='px-2 py-1 border-b'>Grupo Terapeutico</th>
                                {/* <th className="px-2 py-1 border-b">Estado</th> */}
                                <th className="px-2 py-1 border-b">Ranurable</th>
                                <th className="px-2 py-1 border-b">Lab</th>
                                <th className="px-2 py-1 border-b">Unidades</th>
                                <th className="px-2 py-1 border-b">Lote</th>
                                <th className="px-2 py-1 border-b">F. venc.</th>
                                <th className="px-2 py-1 border-b">Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(groupedMedications).map((drugName, index) => (
                                <React.Fragment key={index}>
                                    {groupedMedications[drugName].map((medication, subIndex) => (
                                    <tr key={subIndex} className={(medication.tipo_medicamento == "Controlado") ? 'bg-orange-100' : 'bg-white'}>
                                        {/* {subIndex === 0 && (
                                          <td className="px-2 py-1 border-b" rowSpan={groupedMedications[drugName].length}>
                                              {medication.droga}
                                          </td>
                                        )} */}
                                        <td className="px-2 py-1 border-b">
                                            <button 
                                                className={` px-2 py-0.5 rounded-sm shadow-sm text-white ${addMedication.droga ? 'cursor-not-allowed bg-gray-500' : 'bg-blue-400 hover:bg-blue-600'}`}
                                                disabled={addMedication.droga != null}
                                                onClick={(event) => {
                                                    handleAddMedication(
                                                                    event,
                                                                    medication.id, 
                                                                    medication.droga,
                                                                    medication.nombre_comercial,
                                                                    medication.categoria.nombre_categoria,
                                                                    medication.droga_concentracion, 
                                                                    medication.unidades_caja, 
                                                                    medication.presentacion_farmaceutica.presentacion,
                                                                    medication.laboratorio.razon_social,
                                                                    medication.lote,
                                                                    medication.fecha_vencimiento
                                                    )
                                                }}>
                                                <PlusIcon className='w-4'/>
                                            </button>
                                        </td>
                                        <td className="px-2 py-1 border-b font-semibold text-slate-900">{medication.droga}</td>
                                        <td className="px-2 py-1 border-b">{medication.nombre_comercial}</td>
                                        <td className="px-2 py-1 border-b">{medication.droga_concentracion}</td>
                                        <td className="px-2 py-1 border-b">{medication.presentacion_farmaceutica.presentacion}</td>
                                        <td className="px-2 py-1 border-b">{medication.unidad_medida.unidad_medida}</td>
                                        <td className="px-2 py-1 border-b">{medication.via_administracion.map(via => via.nombre).join(", ")}</td>
                                        <td className={`px-2 py-1 border-b ${(medication.categoria.nombre_categoria == "Controlado") ? "text-orange-600" : ""}`}>{medication.categoria.nombre_categoria}</td>
                                        <td className="px-2 py-1 border-b"><p>{medication.grupos_terapeuticos[0]?.nombre}</p></td>
                                        {/* <td className="px-2 py-1 border-b">{medication.estado}</td> */}
                                        <td className="px-2 py-1 border-b">{medication.ranurable}</td>
                                        <td className="px-2 py-1 border-b">{medication.laboratorio.razon_social}</td>
                                        <td className="px-2 py-1 border-b">30</td>
                                        <td className="px-2 py-1 border-b">{medication.lote}</td>
                                        <td className="px-2 py-1 border-b">{new Date(medication.fecha_vencimiento).toLocaleDateString('es-ES')}</td>
                                        <td className="px-2 py-1 border-b">{medication.stock}</td>
                                    </tr>
                                    ))}
                                </React.Fragment>
                                ))}
                            </tbody>
                            </table>
                            ) || (
                                <div className='flex flex-col items-center justify-center mt-10'>
                                  <ExclamationCircleIcon className='w-12 text-yellow-400 mb-2' />
                                  <p className='text-slate-500 font-semibold'>Cargando medicamentos</p>
                                </div>
                            )}
                            </div>
                        </form>
                    </div>
                    <Modal show={showMedicoModal} handleClose={handleCloseMedicoModal}>
                            <h2 className="text-xl font-bold mb-4">Buscar médico</h2>
                            <input
                                type="text"
                                placeholder="Buscar..."
                                className="mb-4 p-2 border rounded w-full text-sm"
                                value={searchTermMedico}
                                onChange={(e) => setSearchTermMedico(e.target.value)}
                            />
                            <table className="min-w-full text-left text-sm font-roboto font-medium text-slate-600">
                            <thead>
                                <tr>
                                <th className="px-2 py-1 border-b">Nombre</th>
                                <th className="px-2 py-1 border-b">Apellido</th>
                                {/* <th className="px-2 py-1 border-b">Número de Registro</th> */}
                                <th className="px-2 py-1 border-b">Especialidad</th>
                                <th className="px-2 py-1 border-b">N. Caja</th>
                                <th className="px-2 py-1 border-b"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMedicos.map((medico, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                    <td className="px-2 py-1 border-b">{medico.nombre}</td>
                                    <td className="px-2 py-1 border-b">{medico.apellido}</td>
                                    {/* <td className="px-2 py-1 border-b">{medico.numeroRegistro}</td> */}
                                    <td className="px-2 py-1 border-b">{medico.especialidades
                                      .map(
                                        especialidad => <div>{especialidad.nombre}</div>
                                      )}
                                    </td>
                                    <td className="px-2 py-1 border-b">{medico.nro_caja}</td>
                                    <td className="px-2 py-1 border-b">
                                      <button 
                                        className='bg-blue-400 px-2 py-0.5 rounded-sm shadow-sm text-white hover:bg-blue-600'
                                        onClick={() => {
                                            handleSetMedico(medico.id, medico.nombre, medico.apellido, medico.numeroRegistro, medico.nro_caja, medico.especialidades.map(especialidad => especialidad.nombre).join(", "));
                                            setShowMedicoModal(false);
                                            // setMedico
                                          }
                                        }>
                                          Agregar
                                      </button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                            </table>
                    </Modal>
                </div>
                <div className="flex items-center mx-7 mt-4 gap-4">
                    {/* ----------------------------------------------------------------------------------------------------------------------------------------- */}
                    <Modal show={showTreatmentModal} handleClose={() => {setShowTreatmentModal(false); handleClearAddMedication(); handleClearTreatmentDays(); }}>
                        <div>
                          <div className='flex justify-between'>
                            <div className='flex flex-col items-start mb-3 text-slate-600 p-2 rounded-md text-sm gap-4'>
                              <div className='bg-yellow-100 shadow-sm p-2 rounded-md'>                            
                                <p className='text-center text-sm font-semibold underline'>Medicación</p>
                                <p className='font-semibold'>{addMedication.droga} {(addMedication.tipo_medicamento == "Controlado") ? <ExclamationTriangleIcon className='w-6 text-orange-500' /> : ""} </p>
                                <p>Concentración: <span className='font-semibold'>{addMedication.droga_concentracion}</span></p>
                                <p>Nombre Comercial: <span className='font-semibold'>{addMedication.nombre_comercial}</span></p>
                                <p>Presentación: <span className='font-semibold'>{addMedication.unidades_caja} {addMedication.presentacion_farmaceutica}s</span></p>
                                <p>Lab: <span className='font-semibold'>{addMedication.laboratorio}</span></p>
                                <p>Lote: <span className='font-semibold'>{addMedication.lote}</span></p>
                                <p>F.venc: <span className='font-semibold'>{new Date(addMedication.fecha_vencimiento).toLocaleDateString('es-ES')}</span></p>
                                {/* <p>notas: ...</p> */}
                              </div>
                            </div>
                            <div className='flex gap-2 items-start'>
                              <div className='flex flex-col items-center'>
                                  <CalendarTreatment mode='edit'/>
                              </div>
                              <div className='flex flex-col gap-2 justify-between h-full'>
                                <div>
                                  <div className='flex gap-2 items-center'>
                                        <label>Días de tratamiento:</label>
                                        {/* <input className='border-none rounded-md mx-1 text-slate-600 bg-slate-200' type="number" min="1" defaultValue={1} value={days} onChange={(e) => setDays(Number(e.target.value))} /> */}
                                        <input
                                          ref={treatmentDaysInputRef}
                                          className='border-none rounded-md mx-1 text-slate-600 bg-slate-200'
                                          min={1}
                                          defaultValue={1}
                                          type="number"
                                          placeholder="Duración (días)"
                                          value={treatmentDays}
                                          //need that when this changes, the calendar shows the treatment days
                                          onChange={(e) => setTreatmentDays(Number(e.target.value))}
                                        />
                                  </div>
                                  <div>
                                    <label className="flex items-center cursor-pointer">
                                      <input
                                        className="border-none bg-slate-200 hover:bg-blue-200 rounded"
                                        type="checkbox"
                                        checked={everyday}
                                        onChange={(e) => setEveryday(e.target.checked)}
                                      />
                                      <span className="ml-2">Todos los días</span>
                                    </label>
                                  </div>

                                  {!everyday && (
                                    <div className="grid grid-cols-3 gap-2 mt-2">
                                      {diasDeLaSemana.map((day) => (
                                        <label key={day} className="flex items-center cursor-pointer">
                                          <input
                                            className="border-none bg-slate-200 hover:bg-blue-200 rounded"
                                            type="checkbox"
                                            checked={selectedDays.includes(day)}
                                            onChange={() => toggleDay(day)}
                                          />
                                          <span className="ml-2">{day}</span>
                                        </label>
                                      ))}
                                    </div>
                                  )}
                                  <div>
                                      <label>Cada cuántas horas:</label>
                                      <select className='ml-2 border-none bg-slate-200' value={interval} onChange={(e) => setInterval(Number(e.target.value))}>
                                          {[24, 12, 8, 6, 3].map((h) => (
                                          <option className='border-none' key={h} value={h}>{`${h} horas`}</option>
                                          ))}
                                      </select>
                                  </div>
                                  {/* <div className='flex gap-4 pt-5'>
                                      <button className='bg-blue-400 shadow-sm px-3 py-0.5 rounded-sm text-white hover:bg-blue-500' onClick={() => calculateDoses(days, (24 / interval), selectedDays, everyday)}>Calcular Dosis</button>
                                      {totalDoses > 0 && <p className="text-lg font-semibold">{totalDoses} Comprimidos</p>}
                                  </div> */}
                                </div>
                                <div>
                                {treatmentDays > 0 && (
                                  <div className='text-slate-600 bg-yellow-100 p-2 rounded-md shadow-sm text-sm font-semibold'>
                                    <h4 className='underline'>Información del tratamiento</h4>
                                    <p>Inicio: {startDate.toLocaleDateString('es-ES')}</p>
                                    <p>Fin: {
                                      endDate.toLocaleDateString('es-ES')
                                    }</p>
                                    <p>Días de tratamiento: {treatmentDays}</p>
                                    {interval > 0 && (
                                      <p>Intervalo entre tomas: cada {interval} horas</p>
                                    )}
                                    {interval > 0 && (
                                      <p>Cantidad de comprimidos: {totalDoses} Comp.</p>
                                    )}
                                  </div>
                                )}
                                </div>
                                <div>
                                    <button
                                      //if setmedico no existe deshabilitar el boton
                                      disabled={!medico.id || !addMedication.id}
                                      className={`${!medico.id || !addMedication.id ? 'bg-gray-400 cursor-not-allowed' : ''} bg-blue-400 shadow-sm px-3 py-0.5 rounded-sm text-white hover:bg-blue-500`}
                                      // ingresa el tratamiento en la base de datos
                                      // onClick={() => createTreatment(
                                      //   startDate,
                                      //   // endDate -> calculada desde el backend
                                      //   // tto_dias_mes -> esta en la bd pero ni idea que hace 
                                      //   medico.id,
                                      //   addMedication.id,
                                      //   //customer_id -> context
                                      //   currentUser.id,
                                      //   //activo -> si la cuenta esta vigente
                                      //   treatmentDays, 
                                      //   //total dias pendientes, no seria necesario
                                      //   //retiros por mes -> no es nesesario
                                      //   //retiros pendientes -> no es necesario
                                      //   //tipo tto -> eleccion usuario
                                      //   interval, //-> frecuencia de toma
                                      //   //cantidad diaria -> no se si es necesario
                                      //   numero
                                      // )}
                                      onClick={() => {
                                        handleCreatePreConfirmacion()
                                      }}
                                      >
                                      Ingresar tto.
                                    </button>
                                    {!medico.id && (
                                      <div className='text-red-500 font-semibold'>- No hay médico seleccionado</div>
                                    )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                    </Modal>
                </div>
                <div className="items-start w-full p-3 space-y-6">
                    <div className="rounded-lg w-full overflow-auto">
                        <form className="space-y-4">
                            <div className='min-h-20 p-4 flex gap-4 items-end'>
                              {/* no se que iba aca */}
                            </div> 
                        </form>
                    </div>
                </div>
                <div className='bottom-0 fixed w-full'>
                  <LlamadorPanel
                    numero={numero}
                    handleSetNextState={(number) => handleSetNextState(number, setNumero)}
                    handleDerivateTo={(number) => handleDerivateTo(number, setShowModal, setAllDerivates)}
                    handleDerivateToPosition={(number, position) => handleDerivateToPosition(number, position, setIsDerivating, setNumero, setShowModal)}
                    handlePauseNumber={(number) => handlePauseNumber(number, setNumero)}
                    handleCancelNumber={(number) => handleCancelNumber(number, setNumero)}
                    />
                </div>
                {message ? <Message className="translate-x-0" message={message?.message} colorMsg={message?.colorMsg} /> : <Message className="translate-x-100" message={message?.message} colorMsg={message?.colorMsg} />}
            </div>
        </div>
    );
};