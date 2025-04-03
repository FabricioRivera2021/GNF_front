import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es.js"; // Importa el idioma español

moment.locale('el'); // Configura Moment en español

console.log("Idioma actual:", moment.locale()); // 🔥 Debería mostrar "es"
console.log("Locales disponibles:", moment.locales()); // 🔥 Lista de locales cargados

const localizer = momentLocalizer(moment);

const CalendarTreatment = () => {
  const [events, setEvents] = useState([
    {
      start: new Date(), // Día de inicio (puedes cambiarlo)
      end: new Date(),
      title: "Inicio Tratamiento",
    },
  ]);

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={(slot) => {
          // Cuando el usuario selecciona un día, lo guarda como inicio del tratamiento
          const newEvent = {
            start: slot.start,
            end: slot.end,
            title: "Inicio Tratamiento",
          };
          setEvents([newEvent]); // Solo permite un día de inicio
        }}
        style={{ margin: "50px" }}
        messages={{
          next: "sig",
          previous: "ant",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día"
        }}
      />
    </div>
  );
};

export default CalendarTreatment;