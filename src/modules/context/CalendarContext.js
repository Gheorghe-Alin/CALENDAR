import React, { createContext } from "react";
import { useCalendar } from "../hook";

export const CalendarContext = createContext();

const CalendarProvider = ({ children }) => {
  const {
    events,
    setEvents,
    showModal,
    setShowModal,
    selectedEvent,
    setSelectedEvent,
    newEvent,
    setNewEvent,
  } = useCalendar();
  return (
    <CalendarContext.Provider
      value={{
        events,
        setEvents,
        showModal,
        setShowModal,
        selectedEvent,
        setSelectedEvent,
        newEvent,
        setNewEvent,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;
