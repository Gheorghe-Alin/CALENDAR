export const handleSelectSlot = (
  { start, end },
  setNewEvent,
  setSelectedEvent,
  setShowModal
) => {
  setNewEvent({
    title: "",
    start: new Date(start),
    end: new Date(end),
    description: "",
    room: "SALA 1",
    participanti: [],
  });
  setSelectedEvent(null);
  setShowModal(true);
};

export const handleSelectEvent = (
  event,
  setSelectedEvent,
  setNewEvent,
  setShowModal
) => {
  setSelectedEvent(event);
  setNewEvent({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  });
  setShowModal(true);
};

export const handleAddEvent = (
  events,
  selectedEvent,
  newEvent,
  setEvents,
  setShowModal
) => {
  const updatedEvents = selectedEvent
    ? events.map((event) =>
        event.start === selectedEvent.start ? newEvent : event
      )
    : [...events, { ...newEvent, participanti: newEvent.participanti }];
  setEvents(updatedEvents);
  localStorage.setItem("events", JSON.stringify(updatedEvents));
  setShowModal(false);
};

export const handleDeleteEvent = (
  events,
  selectedEvent,
  setEvents,
  setShowModal
) => {
  const updatedEvents = events.filter(
    (event) => event.start !== selectedEvent.start
  );
  setEvents(updatedEvents);
  localStorage.setItem("events", JSON.stringify(updatedEvents));
  setShowModal(false);
};

export const handleEventDrop =
  (events, setEvents) =>
  ({ event, start, end }) => {
    const updatedEvents = events.map((existingEvent) =>
      existingEvent.start === event.start
        ? { ...existingEvent, start, end }
        : existingEvent
    );
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

export const handleEventResize =
  (events, setEvents) =>
  ({ event, start, end }) => {
    const updatedEvents = events.map((existingEvent) =>
      existingEvent.start === event.start
        ? { ...existingEvent, start, end }
        : existingEvent
    );
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };
