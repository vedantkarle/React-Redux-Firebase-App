import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Icon, Item, List, Segment, Button } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import { deleteEvent } from "../eventActions";

const EventListItem = ({ event }) => {
  const dispatch = useDispatch();

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src={event.hostPhotoURL} />
            <Item.Content>
              <Item.Header content={event.title} />
              <Item.Description>Hosted By {event.hostedBy}</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />
          {event.date}
          <Icon name="marker" />
          {event.venue}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {event.attendees.map((attendee) => {
            return <EventListAttendee attendee={attendee} key={attendee.id} />;
          })}
        </List>
      </Segment>
      <Segment clearing>
        <div>{event.description}</div>
        <Button
          color="red"
          floated="right"
          content="Delete"
          onClick={() => dispatch(deleteEvent(event.id))}
        />
        <Button
          as={Link}
          to={`/events/${event.id}`}
          color="teal"
          floated="right"
          content="View"
        />
      </Segment>
    </Segment.Group>
  );
};

export default EventListItem;
