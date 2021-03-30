import { useState } from "react";
import { Container } from "semantic-ui-react";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import Navbar from "../../features/nav/Navbar";
import "./styles.css";

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setFormOpen(true);
  };

  const handleCreateFromOpen = () => {
    setSelectedEvent(null);
    setFormOpen(true);
  };

  return (
    <>
      <Navbar setFormOpen={handleCreateFromOpen} />
      <Container className="main">
        <EventDashboard
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          selectedEvent={selectedEvent}
          selectEvent={handleSelectEvent}
        />
      </Container>
    </>
  );
}

export default App;
