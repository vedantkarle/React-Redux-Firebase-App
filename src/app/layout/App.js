import { useState } from "react";
import { Container } from "semantic-ui-react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import HomePage from "../../features/home/HomePage";
import EventsDetailedPage from "../../features/events/eventsDetailed/EventsDetailedPage";
import Navbar from "../../features/nav/Navbar";
import "./styles.css";
import EventForm from "../../features/events/eventForm/EventForm";

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
    <Router>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <Navbar setFormOpen={handleCreateFromOpen} />
            <Container className="main">
              <Route exact path="/" component={HomePage} />
              <Route exact path="/events" component={EventDashboard} />
              <Route exact path="/events/:id" component={EventsDetailedPage} />
              <Route exact path="/createEvent" component={EventForm} />
            </Container>
          </>
        )}
      />
    </Router>
  );
}

export default App;
