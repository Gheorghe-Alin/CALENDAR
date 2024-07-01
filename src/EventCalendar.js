import React, { useContext, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import DatePicker from "react-datepicker";
import moment from "moment";
import "moment/locale/ro";
import "moment-timezone";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "./EventCalendar.css";
import { CalendarContext } from "./modules/context";
import * as Services from "./modules/services";
import { EventAgenda } from "./modules/component";

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

const EventCalendar = () => {
  const {
    events,
    setEvents,
    showModal,
    setShowModal,
    selectedEvent,
    setSelectedEvent,
    newEvent,
    setNewEvent,
  } = useContext(CalendarContext);

  useEffect(() => {
    console.log(events);
  }, [events]);

  // const EventAgenda = ({ event }) => {
  //   const participanti =
  //     event.participanti && Array.isArray(event.participanti)
  //       ? event.participanti.join(", ")
  //       : "";

  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "space-between",
  //         padding: "0.5rem 1rem",
  //       }}
  //     >
  //       <div>
  //         <strong>{event.title}</strong> <br />
  //         Participanți: {participanti}
  //       </div>
  //       <div>{event.room}</div>
  //     </div>
  //   );
  // };

  const CustomAgendaHeader = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <div>
        <strong>Eveniment</strong>
      </div>
      <div>
        <strong>Sala</strong>
      </div>
    </div>
  );

  return (
    <div>
      <DragAndDropCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={(e) => {
          Services.handleSelectSlot(
            e,
            setNewEvent,
            setSelectedEvent,
            setShowModal
          );
        }}
        onSelectEvent={(e) =>
          Services.handleSelectEvent(
            e,
            setSelectedEvent,
            setNewEvent,
            setShowModal
          )
        }
        onEventDrop={Services.handleEventDrop(events, setEvents)}
        onEventResize={Services.handleEventResize(events, setEvents)}
        resizable
        draggableAccessor={() => true}
        style={{ height: 500, margin: "50px" }}
        defaultView={Views.MONTH}
        messages={{
          today: "Astăzi",
          previous: "Înapoi",
          next: "Înainte",
          month: "Lună",
          week: "Săptămână",
          day: "Zi",
          agenda: "Agendă",
          date: "Dată",
          time: "Oră",
          event: "Eveniment",
          showMore: (total) => `+ încă ${total}`,
        }}
        formats={{
          agendaDateFormat: "ddd D MMM",
          agendaTimeFormat: "HH:mm",
          agendaTimeRangeFormat: ({ start, end }, culture, localizer) =>
            `${localizer.format(start, "HH:mm", culture)} - ${localizer.format(
              end,
              "HH:mm",
              culture
            )}`,
        }}
        components={{
          agenda: {
            header: CustomAgendaHeader,
            event: EventAgenda,
          },
        }}
      />
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedEvent ? "Editează Eveniment" : "Adaugă Eveniment"}</h3>
            <input
              type="text"
              placeholder="Titlu"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />
            <DatePicker
              selected={newEvent.start}
              onChange={(date) => setNewEvent({ ...newEvent, start: date })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="dd MMMM yyyy HH:mm"
              timeCaption="Ora"
            />
            <DatePicker
              selected={newEvent.end}
              onChange={(date) => setNewEvent({ ...newEvent, end: date })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="dd MMMM yyyy HH:mm"
              timeCaption="Ora"
            />
            <select
              value={newEvent.room}
              onChange={(e) =>
                setNewEvent({ ...newEvent, room: e.target.value })
              }
            >
              <option value="SALA 1">SALA 1</option>
              <option value="SALA 2">SALA 2</option>
              <option value="SALA 3">SALA 3</option>
              <option value="SALA 4">SALA 4</option>
            </select>
            <input
              type="text"
              placeholder="Participanți"
              value={
                newEvent.participanti ? newEvent.participanti.join(",") : ""
              }
              onChange={(e) => {
                const participantiArray = e.target.value.split(",");
                setNewEvent({ ...newEvent, participanti: participantiArray });
              }}
            />
            <textarea
              placeholder="Descriere"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={() =>
                  Services.handleAddEvent(
                    events,
                    selectedEvent,
                    newEvent,
                    setEvents,
                    setShowModal
                  )
                }
              >
                {selectedEvent ? "Actualizează Eveniment" : "Adaugă Eveniment"}
              </button>
              {selectedEvent && (
                <button
                  onClick={() =>
                    Services.handleDeleteEvent(
                      events,
                      selectedEvent,
                      setEvents,
                      setShowModal
                    )
                  }
                >
                  Șterge Eveniment
                </button>
              )}
              <button onClick={() => setShowModal(false)}>Anulează</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCalendar;
