import { useEffect, useState } from "react";
import moment from "moment";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from 'date-fns';
import es from 'date-fns/locale/es'; // Importa el idioma español de date-fns
import "react-big-calendar/lib/css/react-big-calendar.css";
import { userStateContext } from "../context/ContextProvider";
// import localization from "moment/locale/es"; // Importa el idioma español

const locales = {
  es: es
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
})

// moment.locale('el'); // Configura Moment en español
// const localizer = momentLocalizer(moment); // Configura el localizador de Moment.js para react-big-calendar
// moment.locale("es", localization); // Configura el idioma español para Moment.js

console.log("Idioma actual:", moment.locale()); // 🔥 Debería mostrar "es"
console.log("Locales disponibles:", moment.locales()); // 🔥 Lista de locales cargados

const messages = {
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento',
  allDay: 'Todo el día',
  week: 'Semana',
  work_week: 'Semana laboral',
  day: 'Día',
  month: 'Mes',
  previous: 'Anterior',
  next: 'Siguiente',
  yesterday: 'Ayer',
  tomorrow: 'Mañana',
  today: 'Hoy',
  agenda: 'Agenda',
  noEventsInRange: 'No hay eventos en este rango.',
  showMore: (total) => `+ Ver más (${total})`,
}

const CalendarTreatment = ({ mode = "edit", treatments = [] }) => {

  const {startDate, setStartDate, treatmentDays, setTreatmentDays, events, setEvents} = userStateContext();

  const isCurrentMonth = new Date(events.start).getMonth() === new Date().getMonth() && new Date(events.start).getFullYear() === new Date().getFullYear();

  useEffect(() => {
    // redibuja el calendario si se cambia un evento (por ejemplo el rango de fechas de un tratamiento)
    setEvents([
      {
        title: `Tratamiento (${treatmentDays} días)`,
        start: startDate,
        end: new Date(startDate.getTime() + treatmentDays * 24 * 60 * 60 * 1000), // Calcula la fecha de fin
        allDay: true
      }
    ])
  }, [startDate, treatmentDays])

  return (
    <div style={{ height: 350 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}//this is what updates UI text
        culture="es"//this ensures date-fns uses Spanish locale
        selectable={true}// this enables clicking/selecting slots
        views={['month']}// optional, limit to month view
        onSelectSlot={(slotInfo) => {
          if (mode === "edit") {
            const selectedDate = slotInfo.start;
            setStartDate(selectedDate);
      
            if (treatmentDays > 0) {
              const endDate = new Date(selectedDate);
              endDate.setDate(selectedDate.getDate() + treatmentDays - 1);
      
              setEvents([
                {
                  title: `Tratamiento (${treatmentDays} días)`,
                  start: selectedDate,
                  end: endDate,
                  allDay: true,
                },
              ]);
            }
          }
        }}
        //   // Cuando el usuario selecciona un día, lo guarda como inicio del tratamiento
        //   const newEvent = {
        //     start: slot.start,
        //     end: slot.end,
        //     title: "Inicio Tratamiento",
        //   };
        //   setEvents([newEvent]); // Solo permite un día de inicio
        // }}
        style={{ marginLeft: "20px", marginRight: "20px" }}
      />
    </div>
  );
};

export default CalendarTreatment;