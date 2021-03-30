import React from "react";
import EventListItem from "./EventListItem";

const EventList = ({ events, selectEvent }) => {
  return (
    <div>
      {events.map((event) => {
        return (
          <EventListItem
            event={event}
            key={event.id}
            selectEvent={selectEvent}
          />
        );
      })}
    </div>
  );
};

export default EventList;
