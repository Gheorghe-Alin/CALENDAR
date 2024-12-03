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
