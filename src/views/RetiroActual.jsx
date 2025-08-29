import React, { useState } from 'react'
import IngresarMedSideBar from '../components/IngresarMedSideBar'
import { CalendarTreatment, Modal } from '../components';
import { userStateContext } from '../context/ContextProvider';
import { useEffect } from 'react';
import LlamadorPanel from '../components/LlamadorPanel';
import { handleCancelNumber, handleDerivateTo, handleDerivateToPosition, handlePauseNumber, handleSetNextState } from '../API/apiServices';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer
} from '@react-pdf/renderer';

// Estilos
const styles = StyleSheet.create({
  page: {
    padding: 15,
    fontSize: 10,
    fontFamily: "Helvetica"
  },
  header: {
    textAlign: "center",
    marginBottom: 10
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2d3748", // gris oscuro
    marginBottom: 4
  },
  medTitle:{
    color: "#2b6cb0", // azul
    fontSize: 12,
    marginBottom: 4
  },
  subtitle: {
    color: "green",
    fontSize: 12,
    marginBottom: 10
  },
  section: {
    marginBottom: 8
  },
  small: {
    fontSize: 9,
    color: "#6b7280" // gris
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4
  },
  line: {
    borderBottom: "1pt solid #38a169", // verde
    marginVertical: 6
  },
  highlight: {
    backgroundColor: "yellow"
  },
  total: {
    marginTop: 8,
    borderTop: "1pt solid #38a169",
    paddingTop: 5,
    textAlign: "right",
    fontSize: 12,
    fontWeight: "bold"
  }
});


export default function RetiroActual() {
  const {tratamientos, preConfirmacion, setPreConfirmacion, numero } = userStateContext();

  useEffect(() => {
    // Obtener los items que haya en preconfirmacion al montar el componente y actualizar el componente
    if (preConfirmacion && preConfirmacion.length > 0) {
      setTtoShowMedicationOnModal(preConfirmacion[0]);
    }
  }, []);

  const [ttoShowMedicationOnModal, setTtoShowMedicationOnModal] = useState({});
  // const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openModalCC, setOpenModalCC] = useState(false);
  const [modalTicket, setModalTicket] = useState(false);

  const ticket = {
    id: Date.now(),
    fecha: new Date(),
    items: preConfirmacion,
    total: preConfirmacion.reduce((acc, item) => acc + item.precio, 0)
  };

  const handlePrintTicket = () => {
    // Lógica para imprimir el ticket
  };


  const renderRetiros = () => {
    if (!selectedItem || !selectedItem.treatmentDays) return null;

    const retiros = [];
    const totalRetiros = Math.ceil(selectedItem.treatmentDays / 30);

    for (let i = 1; i <= totalRetiros; i++) {
      const startDate = new Date(selectedItem.startDate);
      const retiroStart = new Date(startDate.setDate(startDate.getDate() + (30 * (i - 1))));
      const retiroEnd = new Date(startDate.setDate(retiroStart.getDate() + 30));
      retiros.push(
        // dependiendo de si la fecha actual se encuentre dentro del rango de fechas de un retiro determinado deberia hacerse un higlight de ese retiro
        <p key={i} className={`px-1 py-0.5 ${retiroStart <= new Date() && retiroEnd >= new Date() ? 'bg-blue-500 text-white' : 'bg-blue-100'} rounded-md p-1 shadow-sm mb-2`}>
          <span className='font-semibold'>{`${i}° retiro`}</span> <span>{retiroStart.toLocaleDateString('es-ES')} | {retiroEnd.toLocaleDateString('es-ES')}</span>
        </p>
      );
    }

    return retiros;
  };

  const handleModalOpen = (item) => {
    console.log('item', item);
    
    setSelectedItem(item);
    setOpenModalCC(true);
  }

  //!datos de prueba - BORRAR LUEGO
  const cronicos = [
    {
      nombre: "Atorvastatina",
      dosis: "20mg",
      meses: 6,
      inicio: "01/09/2025",
      fin: "28/02/2026",
      retiros: [
        { fecha: "01/09/2025", hecho: true },
        { fecha: "01/10/2025", hecho: false },
        { fecha: "01/11/2025", hecho: false },
        { fecha: "01/12/2025", hecho: false },
        { fecha: "01/01/2026", hecho: false },
        { fecha: "01/02/2026", hecho: false }
      ]
    }
  ];

  const unicos = [
    { nombre: "Amoxicilina", dosis: "500mg", fecha: "27/08/2025" },
    { nombre: "Ibuprofeno", dosis: "400mg", fecha: "27/08/2025" }
  ];

  return (
    <div className='flex justify-between items-start'>
      <IngresarMedSideBar />
      <div className='flex flex-col w-[calc(100vw-4rem)] h-[calc(100vh-4rem)]'>
        <div className='flex flex-col items-start w-full h-full p-3 space-y-1'>
          <h1 className='text-2xl font-bold mb-2'>Medicación que retira</h1>
          <div className='flex flex-wrap flex-col items-start justify-start rounded-lg w-[calc(100%-2%)] h-[calc(100%-8%)] p-4 gap-4'>
            {/* table list */}
            <div className="rounded-lg w-full h-[calc(100vh-10rem)] overflow-auto">          
                <div className='min-h-20 py-1 px-4'>
                    <table className="shadow-sm min-w-full text-left text-sm font-roboto text-slate-600 text-surface p-2">
                    <thead className='sticky top-0 bg-blue-400 text-white whitespace-nowrap'>
                      <tr>
                        <th className="px-2 py-1 border-b"></th>
                        <th className="px-2 py-1 border-b">Droga</th>
                        <th className="px-2 py-1 border-b">Concentracion</th>
                        <th className="px-2 py-1 border-b">Marca comercial</th>
                        <th className="px-2 py-1 border-b">Médico</th>
                        <th className="px-2 py-1 border-b">Especialidad</th>
                        <th className="px-2 py-1 border-b">Tipo Cuenta</th>
                        <th className="px-2 py-1 border-b">Funcionario</th>
                        <th className="px-2 py-1 border-b">Fecha inicio tto.</th>
                        <th className="px-2 py-1 border-b">Fecha fin tto.</th>
                        <th className="px-2 py-1 border-b">Cantidad retirada</th>
                        <th className="px-2 py-1 border-b"></th>
                      </tr>
                    </thead>
                    { preConfirmacion && preConfirmacion.length > 0
                      ? preConfirmacion.map((item, index) => (
                      <tbody>
                        <tr className='rounded-sm py-1 text-left pl-1 capitalize font-roboto text-sm odd:bg-slate-50 even:bg-gray-100 hover:bg-slate-200 cursor-pointer'
                          onClick={() => {
                            handleModalOpen(item);
                          }}>
                          <td className='py-1'>{index + 1}</td>
                          <td className="px-2 py-1 border-b text-slate-700 font-semibold">{item.medicationNombre}</td>
                          <td className="px-2 py-1 border-b">{item.medicationConcentracion}</td>
                          <td className="px-2 py-1 border-b">{item.medicationMarca}</td>
                          <td className="px-2 py-1 border-b">{item.medicoNombre}</td>
                          <td className="px-2 py-1 border-b">{item.medicoEspecialidad}</td>
                          <td className="px-2 py-1 border-b">{item.tipo_tto}</td>
                          <td className="px-2 py-1 border-b">{item.userName}</td>
                          <td className="px-2 py-1 border-b">{new Date(item.startDate).toLocaleDateString('es-ES')}</td>
                          <td className="px-2 py-1 border-b">{new Date(new Date(item.startDate).setDate(new Date(item.startDate).getDate() + item.treatmentDays)).toLocaleDateString('es-ES')}</td>
                          <td className="px-2 py-1 border-b">Example cajas que retira</td>
                        </tr>
                      </tbody>
                      )) : 'no hay datos' }
                    </table>
                    <Modal show={openModalCC} handleClose={() => setOpenModalCC(false)}>
                      <div className='flex gap-4'>
                        <div className="mt-4">
                          <div className='flex flex-col gap-2 items-center'>
                            <CalendarTreatment mode='view' treatments={tratamientos} />
                          </div>
                        </div>
                        <div>
                          <div className='bg-yellow-100 rounded-md shadow-md p-1 text-slate-500'>
                            <h3 className="text-lg font-bold">{(selectedItem) ? selectedItem.medicationNombre : ''} {(selectedItem) ? `( ${selectedItem.medicationMarca} )` : ''}</h3>
                            <p className='border-b'>Médico: {(selectedItem) ? selectedItem.medicoNombre : ''}</p>
                            <p className='border-b'>Especialidad: {(selectedItem) ? selectedItem.medicoEspecialidad : ''}</p>
                            <p className='border-b'>Tipo de tratamiento: {(selectedItem) ? selectedItem.tipo_tto : ''}</p>
                            <p className='border-b'>Tratamiento: {(selectedItem) ? selectedItem.treatmentDays : ''} dias</p>
                            <p className='border-b'>Frecuencia: cada {(selectedItem) ? selectedItem.interval : ''} hs</p>
                            <p className='border-b'>Inicio tto.: {(selectedItem) ? new Date(selectedItem.startDate).toLocaleDateString('es-ES') : ''}</p>
                            <p>Fin tto.: {
                                            selectedItem 
                                              ? new Date(new Date(selectedItem.startDate).setDate(new Date(selectedItem.startDate).getDate() + selectedItem.treatmentDays)).toLocaleDateString('es-ES') 
                                              : ''}
                            </p>
                          </div>
                          <div className='text-slate-700 mt-2 mb-2'>
                            {
                              /** multiples fechas de retiro dependiendo del tiempo del tratamiento, si es solo 30 dias. es solo 1 retiro, si son mas de 30 y menos de 60 son 2 retiros.
                               * y asi sucesivamente hasta llegar a 180 dias que serian 6 retiros.
                               */}
                            {
                              renderRetiros()
                            }
                            {/* <p>Retiros pendientes: {(selectedItem) ? selectedItem. : ''.pendientes} caja/s</p> */}
                            {/* <p>Puede retirar: {(selectedItem) ? selectedItem. : ''.ret_mes} caja/s</p> */}
                          </div>
                          <label className="block mb-2 text-sm font-medium text-gray-700">Cantidad a retirar:</label>
                          <div className='flex gap-2 items-center'>
                            <input type="number" className="border w-1/2 border-gray-300 rounded-md p-2" placeholder="..." />
                            <p>Cajas</p>
                          </div>
                          <button className='bg-blue-400 text-white rounded-md shadow-sm px-2 py-0.5 mt-2 hover:bg-blue-500 hover:shadow-md' onClick={console.log('Agregar a retiro')}>Agregar a retiro</button>
                        </div>
                      </div>
                    </Modal>
                    {/* FIN Modal para buscar medicación -------------------------------------- */}
                </div>
                    <Modal show={modalTicket} handleClose={() => setModalTicket(false)}>
                      {/* pdf creado desde cero y mostrado en el modal */}
                      <h2>Vista previa del recibo</h2>

                      <PDFViewer style={{ width: "1200px", height: "570px" }}>
                        <Document>
                        {/* 80mm de ancho (226pt), altura ajustable */}
                        <Page size={[226, 600]} style={styles.page}>
                          {/* Encabezado */}
                          <View style={styles.header}>
                            <Text style={styles.title}>Farmacia Salud</Text>
                            <Text style={styles.subtitle}>Ticket de Retiros</Text>
                            <Text>Paciente: Juan Pérez</Text>
                            <Text>Fecha: 27/08/2025</Text>
                          </View>

                          {/* Bloque medicamentos crónicos */}
                          <Text style={{ fontWeight: "bold", marginBottom: 4 }}>Medicamentos Crónicos</Text>
                          {cronicos.map((med, idx) => (
                            <View key={idx} style={styles.section}>
                              <Text style={styles.medTitle}>
                                {med.nombre} {med.dosis}
                              </Text>
                              <Text style={{ marginVertical: 3 }}>Retiros:</Text>
                              {med.retiros.map((r, i) => (
                                <View key={i} style={styles.row}>
                                  <Text>Retiro {i + 1}</Text>
                                    <Text>
                                      {r.fecha} {r.hecho ? "✅" : "❌"}
                                    </Text>
                                  </View>
                              ))}

                              <Text style={styles.highlight}>
                                Restan: {med.retiros.filter((r) => !r.hecho).length}
                              </Text>
                            </View>
                          ))}

                          {/* Bloque medicamentos de única vez */}
                          {unicos.length > 0 && (
                            <>
                              <Text style={{ fontWeight: "bold", marginTop: 8, marginBottom: 4 }}>
                                Medicamentos Únicos
                              </Text>
                              {unicos.map((med, idx) => (
                                <View key={idx} style={styles.section}>
                                  <Text style={styles.medTitle}>
                                    {med.nombre} {med.dosis}
                                  </Text>
                                  <Text>Retiro único: {med.fecha} ✅</Text>
                                </View>
                              ))}
                            </>
                          )}
                        </Page>
                        </Document>
                      </PDFViewer>
                    </Modal>
                <button
                  onClick={() => {
                    //borra el localstorage y recarga la página
                    setPreConfirmacion([]); // Esto limpia el estado y el localStorage
                  }} 
                className='bg-red-500 text-white px-4 py-2 rounded-md mx-2 my-3'>Eliminar todas</button>
                <button
                  onClick={() => {
                    //Crea el ticket de retiro de la medicacion y lo que debe abonar la persona
                    //Muestra un mockup de un ticket en pdf en un modal
                    setModalTicket(true);
                  }} 
                className='bg-green-500 text-white shadow-md font-semibold px-4 py-2 rounded-sm hover:bg-green-100 hover:text-slate-500 mx-2 my-3'>Confirmar ticket</button>
            </div>
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
  )
}