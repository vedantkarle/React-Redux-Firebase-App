import React from "react";
import EventListItem from "./EventListItem";

const EventList = ({ events }) => {
  return (
    <div>
      {events.map((event) => {
        return <EventListItem event={event} key={event.id} />;
      })}
    </div>
  );
};

export default EventList;
