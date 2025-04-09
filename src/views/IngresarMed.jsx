import React, { useEffect, useState } from 'react';
import { Modal, CalendarTreatment } from '../components/index';
import LlamadorPanel from "../components/LlamadorPanel";
import { userStateContext } from '../context/ContextProvider';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import IngresarMedSideBar from '../components/IngresarMedSideBar';
import { 
  fetchAllMedicamentos, 
  getCurrentSelectedNumber,
  handleSetNextState, 
  handlePauseNumber,
  handleCancelNumber,
  handleDerivateToPosition,
  handleDerivateTo,
  fetchAllMedicos
} from '../API/apiServices';

export default function IngresarMed () {
    const { 
        setAllDerivates, 
        setShowModal, 
        numero, 
        setNumero, 
        showMedicoModal, 
        setShowMedicoModal, 
        medications, 
        setMedications,
        addMedication,
        setAddMedication,
        showTreatmentModal,
        setShowTreatmentModal,
        treatmentDays,
        setTreatmentDays,
        startDate,
        setEvents,
        medico,
        setMedico,
        allMedicos,
        setAllMedicos
    } = userStateContext();
    const [selectedFilter, setSelectedFilter] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTermMedico, setSearchTermMedico] = useState('');
    const [days, setDays] = useState(1);
    const [everyday, setEveryday] = useState(true);
    const [selectedDays, setSelectedDays] = useState([]);
    const [interval, setInterval] = useState(24);
    const [totalDoses, setTotalDoses] = useState(0);

    const medicos = [
      {
          nombre: 'Juan',
          apellido: 'Perez',
          numeroRegistro: '123456',
          numeroCajaMedica: '987654',
          especialidad: ['Cardiología', 'Medicina Interna']
      },
      {
          nombre: 'Maria',
          apellido: 'Gomez',
          numeroRegistro: '654321',
          numeroCajaMedica: '123987',
          especialidad: ['Pediatría']
      },
      {
          nombre: 'Carlos',
          apellido: 'Lopez',
          numeroRegistro: '112233',
          numeroCajaMedica: '445566',
          especialidad: ['Dermatología', 'Alergología']
      },
      {
          nombre: 'Ana',
          apellido: 'Martinez',
          numeroRegistro: '223344',
          numeroCajaMedica: '556677',
          especialidad: ['Ginecología', 'Obstetricia']
      },
      {
          nombre: 'Luis',
          apellido: 'Rodriguez',
          numeroRegistro: '334455',
          numeroCajaMedica: '667788',
          especialidad: ['Neurología']
      },
      {
          nombre: 'Laura',
          apellido: 'Fernandez',
          numeroRegistro: '445566',
          numeroCajaMedica: '778899',
          especialidad: ['Psiquiatría']
      },
      {
          nombre: 'Miguel',
          apellido: 'Garcia',
          numeroRegistro: '556677',
          numeroCajaMedica: '889900',
          especialidad: ['Oftalmología']
      },
      {
          nombre: 'Sofia',
          apellido: 'Hernandez',
          numeroRegistro: '667788',
          numeroCajaMedica: '990011',
          especialidad: ['Endocrinología']
      },
      {
          nombre: 'Diego',
          apellido: 'Ramirez',
          numeroRegistro: '778899',
          numeroCajaMedica: '110022',
          especialidad: ['Urología']
      },
      {
          nombre: 'Elena',
          apellido: 'Torres',
          numeroRegistro: '889900',
          numeroCajaMedica: '220033',
          especialidad: ['Reumatología']
      }];

    const diasDeLaSemana = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];

    //FUNCTIONS
    const handleAddMedication = (event, id, droga, nombre_comercial, tipo_medicamento, droga_concentracion, unidades_caja, presentacion_farmaceutica, lab, lote, fecha_vencimiento) => {
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
        console.log(addMedication);
    };

    const handleSetMedico = (nombre, apellido, numeroRegistro, nro_caja, especialidad) => {
        setMedico({
            nombre: nombre,
            apellido: apellido,
            numeroRegistro: 111, //hardcodear por ahora
            nro_caja: nro_caja,
            especialidad: especialidad
        });
    }

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

    const handleCloseMedicoModal = () => setShowMedicoModal(false);

    const toggleDay = (day) => {
      setSelectedDays((prev) =>
        prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
      );
    };

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

    const calculateDoses = (days, dosesPerDay, selectedDays, everyday) => {
      let selectedDayIndexes = selectedDays.map(day => diasDeLaSemana.indexOf(day) + 1); //selected day index 
      // selectedDays.map(day => {
      //   console.log(diasDeLaSemana.indexOf(day) + 1);
      // })
      let startDayIndex = diasDeLaSemana.indexOf(startDate.toLocaleString('es-ES', { weekday: 'long' })) + 1; // +1 to match the 1-7 range
      console.log("startDayIndex", startDayIndex);
      if (!Number.isInteger(days) || days <= 0) {
          console.error("Valor invalido de dias. Debe ser un número entero positivo.");
          return;
      }
      let weeks = Math.floor(days / 7);
      console.log("weeks", weeks);
      let extraDays = days % 7;
      console.log("extraDays", extraDays);
      let totalDoses = 0;
      if (everyday) {
        totalDoses = days * dosesPerDay;
      } else {
        if (selectedDayIndexes.length > days) {
          console.error("No se puede seleccionar más días de los que dura el tratamiento");
          return;
        }
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

    //USE EFFECTS
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
      if (!startDate || treatmentDays <= 0) return;
    
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + treatmentDays - 1);
    
      setEvents([{
        title: `Tratamiento (${treatmentDays} días)`,
        start: startDate,
        end: endDate,
        allDay: true
      }]);
    }, [treatmentDays, startDate]);

    useEffect(() => {
      if (!days || !interval || interval <= 0) return;
    
      const intervalCount = 24 / interval;
    
      calculateDoses(treatmentDays, intervalCount, selectedDays, everyday);
    }, [treatmentDays, interval, selectedDays, everyday]);

    useEffect(() => {
      if (!startDate || treatmentDays <= 0 || selectedDays.length === 0) return;
    
      const newEvents = generateEventsByWeekday(startDate, treatmentDays, selectedDays)
      setEvents(newEvents)
    }, [startDate, treatmentDays, selectedDays])

    const filteredMedications = medications.filter(medication =>
        medication.nombre_comercial.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medication.droga.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medication.grupo_terapeutico.toLowerCase().includes(searchTerm.toLowerCase())
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

    return (
        <div className="flex">
            <IngresarMedSideBar />
            <div className='flex flex-col w-full h-[calc(100vh-4rem)]'>
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
                            <div className='flex items-center gap-2 px-1'>
                              {
                                (medico.nombre) 
                                ?  (
                                      <div className='flex flex-col px-1 text-slate-500 items-start font-semibold'>
                                        {/* <div className='flex gap-3'> */}
                                        <p>{medico.nombre} {medico.apellido}</p>
                                        <p className='text-slate-400 font-semibold'>{medico.especialidad}</p>
                                        <p className='text-slate-400 font-semibold'>CJP: {medico.nro_caja}</p>
                                        {/* </div> */}
                                        <p className='text-slate-400 font-semibold'>Reg: 225487</p>
                                      </div>
                                    )
                                : (
                                    <div className='flex px-1 text-slate-500 items-start font-semibold'>
                                      <p className='text-slate-400 font-semibold'>No se ingreso médico</p>
                                      <ExclamationTriangleIcon className='w-6 text-orange-400' />
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
                    <div className="rounded-lg w-full h-[calc(100vh-32rem)] overflow-auto">
                        <form className="space-y-4">
                            <div className='min-h-20 py-1 px-4'>
                            <table className="shadow-sm min-w-full text-left text-sm font-roboto font-medium text-slate-600 text-surface p-2">
                            <thead className='sticky top-0 bg-blue-400 text-white'>
                                <tr>
                                <th className="px-2 py-1 border-b">Droga</th>
                                <th className="px-2 py-1 border-b">Lote</th>
                                <th className="px-2 py-1 border-b">F. venc.</th>
                                <th className="px-2 py-1 border-b">Nombre comercial</th>
                                <th className="px-2 py-1 border-b">Concentración</th>
                                <th className="px-2 py-1 border-b">Presentación</th>
                                <th className="px-2 py-1 border-b">Unidad</th>
                                <th className="px-2 py-1 border-b">Via administración</th>
                                <th className="px-2 py-1 border-b">Tipo</th>
                                <th className="px-2 py-1 border-b">Estado</th>
                                <th className="px-2 py-1 border-b">Ranurable</th>
                                <th className="px-2 py-1 border-b">Laboratorio</th>
                                <th className="px-2 py-1 border-b">Unidades por caja</th>
                                <th className="px-2 py-1 border-b">Stock</th>
                                <th className="px-2 py-1 border-b"></th>
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
                                        <td className="px-2 py-1 border-b">{medication.droga}</td>
                                        <td className="px-2 py-1 border-b">{medication.lote}</td>
                                        <td className="px-2 py-1 border-b">{medication.fecha_vencimiento}</td>
                                        <td className="px-2 py-1 border-b">{medication.nombre_comercial}</td>
                                        <td className="px-2 py-1 border-b">{medication.droga_concentracion}</td>
                                        <td className="px-2 py-1 border-b">{medication.presentacion_farmaceutica}</td>
                                        <td className="px-2 py-1 border-b">{medication.unidad_medida}</td>
                                        <td className="px-2 py-1 border-b">{medication.via_administracion}</td>
                                        <td className={`px-2 py-1 border-b ${(medication.tipo_medicamento == "Controlado") ? "text-orange-600" : ""}`}>{medication.tipo_medicamento}</td>
                                        <td className="px-2 py-1 border-b">{medication.estado}</td>
                                        <td className="px-2 py-1 border-b">{medication.ranurable}</td>
                                        <td className="px-2 py-1 border-b">{medication.laboratorio}</td>
                                        <td className="px-2 py-1 border-b">30 {medication.presentacion_farmaceutica}s</td>
                                        <td className="px-2 py-1 border-b">{medication.stock}</td>
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
                                                                    medication.tipo_medicamento,
                                                                    medication.droga_concentracion, 
                                                                    medication.unidades_caja, 
                                                                    medication.presentacion_farmaceutica,
                                                                    medication.laboratorio,
                                                                    medication.lote,
                                                                    medication.fecha_vencimiento
                                                    )
                                                }}>
                                                Agregar
                                            </button>
                                        </td>
                                    </tr>
                                    ))}
                                </React.Fragment>
                                ))}
                            </tbody>
                            </table>
                                {/* FIN Modal para buscar medicación -------------------------------------- */}
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
                                <th className="px-2 py-1 border-b">Número de Caja Médica</th>
                                <th className="px-2 py-1 border-b">Especialidad</th>
                                <th className="px-2 py-1 border-b"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMedicos.map((medico, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                    <td className="px-2 py-1 border-b">{medico.nombre}</td>
                                    <td className="px-2 py-1 border-b">{medico.apellido}</td>
                                    {/* <td className="px-2 py-1 border-b">{medico.numeroRegistro}</td> */}
                                    <td className="px-2 py-1 border-b">{medico.nro_caja}</td>
                                    <td className="px-2 py-1 border-b">{medico.especialidad}</td>
                                    <td className="px-2 py-1 border-b">
                                      <button 
                                        className='bg-blue-400 px-2 py-0.5 rounded-sm shadow-sm text-white hover:bg-blue-600'
                                        onClick={() => {
                                            handleSetMedico(medico.nombre, medico.apellido, medico.numeroRegistro, medico.nro_caja, medico.especialidad);
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
                    <Modal show={showTreatmentModal} handleClose={() => {setShowTreatmentModal(false); handleClearAddMedication(); }}>
                        <div>
                          <div className='flex justify-between'>
                            <div className='flex flex-col items-start bg-yellow-100 mb-3 text-slate-600 p-2 rounded-md text-sm'>
                              <p className='text-center text-sm font-semibold underline'>Medicación</p>
                              <p className='font-semibold'>{addMedication.droga} {(addMedication.tipo_medicamento == "Controlado") ? <ExclamationTriangleIcon className='w-6 text-orange-500' /> : ""} </p>
                              <p>Concentración: <span className='font-semibold'>{addMedication.droga_concentracion}</span></p>
                              <p>Nombre Comercial: <span className='font-semibold'>{addMedication.nombre_comercial}</span></p>
                              <p>Comp. por caja: <span className='font-semibold'>{addMedication.unidades_caja}</span></p>
                              <p>Lab: <span className='font-semibold'>{addMedication.laboratorio}</span></p>
                              <p>Lote: <span className='font-semibold'>{addMedication.lote}</span></p>
                              <p>F.venc: <span className='font-semibold'>{addMedication.fecha_vencimiento}</span></p>
                              <p>notas</p>
                            </div>
                            <div className='flex gap-2 items-start'>
                              <div>
                                  <CalendarTreatment />
                              </div>
                              <div className='flex flex-col gap-2 justify-between h-full'>
                                <div>
                                  <div className='flex gap-2 items-center'>
                                        <label>Días de tratamiento:</label>
                                        {/* <input className='border-none rounded-md mx-1 text-slate-600 bg-slate-200' type="number" min="1" defaultValue={1} value={days} onChange={(e) => setDays(Number(e.target.value))} /> */}
                                        <input
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
                                      <label>
                                        <input className='border-none bg-slate-200 hover:bg-blue-200' type="checkbox" checked={everyday} onChange={(e) => setEveryday(e.target.checked)} />
                                        <span className='ml-2'>Todos los días</span>
                                      </label>
                                  </div>
                                      {!everyday && (
                                      <div className="grid grid-cols-3 gap-2">
                                          {diasDeLaSemana.map((day) => (
                                          <label key={day} className="flex items-center">
                                              <input className='border-none bg-slate-200 hover:bg-blue-200' type="checkbox" checked={selectedDays.includes(day)} onChange={() => toggleDay(day)} />
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
                                      new Date(startDate.getTime() + (treatmentDays - 1) * 86400000).toLocaleDateString('es-ES')
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
                                    <button className='bg-blue-400 shadow-sm px-3 py-0.5 rounded-sm text-white hover:bg-blue-500'>Ingresar tto.</button>
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
            </div>
        </div>
    );
};