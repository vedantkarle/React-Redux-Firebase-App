import React from "react";
import EventListItem from "./EventListItem";

const EventList = ({ events, selectEvent, deleteEvent }) => {
  return (
    <div>
      {events.map((event) => {
        return (
          <EventListItem
            event={event}
            key={event.id}
            selectEvent={selectEvent}
            deleteEvent={deleteEvent}
          />
        );
      })}
    </div>
  );
};

export default EventList;
