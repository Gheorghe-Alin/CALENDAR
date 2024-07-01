import { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/ro";
import "moment-timezone";

const useCalendar = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
    description: "",
    room: "SALA 1",
    participanti: [],
  });

  useEffect(() => {
    console.log(events);
  }, [events]);

  useEffect(() => {
    moment.locale("ro");
    moment.tz.setDefault("Europe/Bucharest");

    const storedEvents = JSON.parse(localStorage.getItem("events"));
    if (storedEvents) {
      const parsedEvents = storedEvents.map((event) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }));
      setEvents(parsedEvents);
    }
  }, []);

  return {
    events,
    setEvents,
    showModal,
    setShowModal,
    selectedEvent,
    setSelectedEvent,
    newEvent,
    setNewEvent,
  };
};

export default useCalendar;
