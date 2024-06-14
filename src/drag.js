import React, { Fragment, useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import events from "../resources/events"; // Asigură-te că ai resursele tale de evenimente importate corect
import { Calendar, Views, DateLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"; // Importă modulul dragAndDrop
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss"; // Importă stilurile necesare pentru dragAndDrop

const DragAndDropCalendar = withDragAndDrop(Calendar);

const DragAndDrop = ({ localizer }) => {
  const [myEvents, setMyEvents] = useState(events);

  // Funcție pentru mutarea evenimentului
  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }
      if (allDay && !droppedOnAllDaySlot) {
        event.allDay = false;
      }

      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end, allDay: event.allDay }];
      });
    },
    [setMyEvents]
  );

  // Funcție pentru redimensionarea evenimentului
  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end }];
      });
    },
    [setMyEvents]
  );

  // Data implicită pentru calendar
  const defaultDate = useMemo(() => new Date(), []);

  return (
    <Fragment>
      <div className="height600">
        <DragAndDropCalendar
          defaultDate={defaultDate}
          defaultView={Views.MONTH}
          events={myEvents}
          localizer={localizer}
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          popup
          resizable
        />
      </div>
    </Fragment>
  );
};

DragAndDrop.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
};

export default DragAndDrop;
