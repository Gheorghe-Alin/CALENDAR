import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import DatePicker from "react-datepicker";
import moment from "moment";
import "moment/locale/ro";
import "moment-timezone";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "./EventCalendar.css";

const localizer = momentLocalizer(moment);

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
    description: "",
    room: "SALA 1", // Default room
    participanti: [], // List of participanti
  });

  useEffect(() => {
    moment.locale("ro");
    moment.tz.setDefault("Europe/Bucharest");

    const storedEvents = JSON.parse(localStorage.getItem("events"));
    if (storedEvents) {
      // Convert stored dates to Date objects
      const parsedEvents = storedEvents.map((event) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }));
      setEvents(parsedEvents);
    }
  }, []);

  const handleSelectSlot = ({ start, end }) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    setNewEvent({
      title: "",
      start: startDate,
      end: endDate,
      description: "",
      room: "SALA 1", // Default room
      participanti: [],
    });
    setSelectedEvent(null);
    setShowModal(true);
  };

  const handleSelectEvent = (event) => {
    const startDate = new Date(event.start);
    const endDate = new Date(event.end);
    setSelectedEvent(event);
    setNewEvent({ ...event, start: startDate, end: endDate });
    setShowModal(true);
  };

  const handleAddEvent = () => {
    const updatedEvents = selectedEvent
      ? events.map((event) =>
          event.start === selectedEvent.start ? newEvent : event
        )
      : [...events, { ...newEvent, participanti: newEvent.participanti }];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setNewEvent({
      title: "",
      start: new Date(),
      end: new Date(),
      description: "",
      room: "SALA 1", // Reset room
      participanti: [],
    });
    setShowModal(false);
  };

  const handleDeleteEvent = () => {
    const updatedEvents = events.filter(
      (event) => event.start !== selectedEvent.start
    );
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setShowModal(false);
  };

  const handleEventDrop = ({ event, start, end }) => {
    const updatedEvents = events.map((existingEvent) =>
      existingEvent.start === event.start
        ? { ...existingEvent, start, end }
        : existingEvent
    );
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const CustomAgendaHeader = ({ label }) => (
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

  const EventAgenda = ({ event }) => {
    const participanti =
      event.participanti && Array.isArray(event.participanti)
        ? event.participanti.join(", ")
        : "";

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0.5rem 1rem",
        }}
      >
        <div>
          <strong>{event.title}</strong> <br />
          Participanți: {participanti}
        </div>
        <div>{event.room}</div>
      </div>
    );
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        onEventDrop={handleEventDrop}
        draggableAccessor={() => true}
        style={{ height: 500, margin: "50px" }}
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
              <option value="SALA 3">SALA 4</option>
            </select>
            <input
              type="text"
              placeholder="Participanti"
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

            <button onClick={handleAddEvent}>
              {selectedEvent ? "Actualizează Eveniment" : "Adaugă Eveniment"}
            </button>
            {selectedEvent && (
              <button onClick={handleDeleteEvent}>Șterge Eveniment</button>
            )}
            <button onClick={() => setShowModal(false)}>Anulează</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCalendar;
