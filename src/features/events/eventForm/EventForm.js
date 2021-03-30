import React, { useState } from "react";
import { Button, Form, Header, Input, Segment } from "semantic-ui-react";

const EventForm = ({ setFormOpen }) => {
  return (
    <Segment clearing>
      <Header content="Create a new event" />
      <Form>
        <Form.Field>
          <Input type="text" placeholder="Event Title" />
        </Form.Field>
        <Form.Field>
          <Input type="text" placeholder="Category" />
        </Form.Field>
        <Form.Field>
          <Input type="text" placeholder="Description" />
        </Form.Field>
        <Form.Field>
          <Input type="text" placeholder="City" />
        </Form.Field>
        <Form.Field>
          <Input type="text" placeholder="Venue" />
        </Form.Field>
        <Form.Field>
          <Input type="date" placeholder="Date" />
        </Form.Field>
        <Button type="submit" floated="right" positive content="Submit" />
        <Button
          type="submit"
          floated="right"
          content="Cancel"
          onClick={() => setFormOpen(false)}
        />
      </Form>
    </Segment>
  );
};

export default EventForm;
