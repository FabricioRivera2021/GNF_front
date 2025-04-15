import { useEffect, useState } from "react";
import moment from "moment";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from 'date-fns';
import es from 'date-fns/locale/es'; // Importa el idioma español de date-fns
import "react-big-calendar/lib/css/react-big-calendar.css";
import { userStateContext } from "../context/ContextProvider";

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
  const [calendarDate, setCalendarDate] = useState(new Date());

  useEffect(() => {
    console.log(events);
    
    if (mode === "view" && events.length > 0) {
      setCalendarDate(new Date(events[0].start));
    }
  }, [mode, events]);

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
    <>

    <div style={{ height: 350, width: 550}}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}//this is what updates UI text
        culture="es"//this ensures date-fns uses Spanish locale
        selectable={true}// this enables clicking/selecting slots
        views={['month']}// optional, limit to month view
        date={mode === "view" ? calendarDate : undefined}
        onNavigate={(date) => {
          if (mode === "view") {
            setCalendarDate(date);
          }
        }}
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
        eventPropGetter={(event) => {
          const today = new Date();
          const isCurrentTreatment =
            today >= new Date(event.start) && today <= new Date(event.end);
          return {
            style: {
              backgroundColor: isCurrentTreatment ? 'green' : '#3174ad',
              color: '#1e293b',
              borderRadius: '4px',
              border: 'none',
            },
          };
        }}
        style={{ marginLeft: "20px", marginRight: "20px" }}
      />
    </div>
    </>
  );
};

export default CalendarTreatment;