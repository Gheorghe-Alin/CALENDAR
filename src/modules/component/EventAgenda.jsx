import React from "react";

const EventAgenda = ({ event = {} }) => {
  // Set default event object
  const participanti = Array.isArray(event.participanti)
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

export default EventAgenda;
