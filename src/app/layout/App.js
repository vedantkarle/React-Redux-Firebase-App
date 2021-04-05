import React from "react";
import { Container } from "semantic-ui-react";
import { Route, useLocation } from "react-router-dom";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import HomePage from "../../features/home/HomePage";
import EventsDetailedPage from "../../features/events/eventsDetailed/EventsDetailedPage";
import Navbar from "../../features/nav/Navbar";
import "./styles.css";
import EventForm from "../../features/events/eventForm/EventForm";
import Sandbox from "../../features/sandbox/Sandbox";
import ModalManager from "../common/modals/ModalManager";
import { ToastContainer } from "react-toastify";
import ErrorComponent from "../common/errors/ErrorComponent";

function App() {
  const { key } = useLocation();

  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <ModalManager />
            <ToastContainer position="bottom-right" hideProgressBar />
            <Navbar />
            <Container className="main">
              <Route exact path="/" component={HomePage} />
              <Route exact path="/events" component={EventDashboard} />
              <Route exact path="/sandbox" component={Sandbox} />
              <Route exact path="/events/:id" component={EventsDetailedPage} />
              <Route
                exact
                path={["/createEvent", "/manage/:id"]}
                component={EventForm}
                key={key}
              />
              <Route path="/error" component={ErrorComponent} />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default App;
