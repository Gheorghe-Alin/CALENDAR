import React from "react";
import EventCalendar from "./EventCalendar";
import { CalendarProvider } from "./modules/context";
function App() {
  return (
    <div className="App">
      <CalendarProvider>
        <EventCalendar />
      </CalendarProvider>
    </div>
  );
}

export default App;
