import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { Button, Header, Segment } from "semantic-ui-react";
import cuid from "cuid";
import { updateEvent, createEvent } from "../eventActions";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryData as categoryOptions } from "../../../app/api/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";

const EventForm = ({ match, history }) => {
  const dispatch = useDispatch();
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );

  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("You must provide a title!"),
    category: Yup.string().required("You must provide a category!"),
    description: Yup.string().required("You must provide a description!"),
    city: Yup.string().required("You must provide city!"),
    venue: Yup.string().required("You must provide a venue!"),
    date: Yup.string().required("You must provide a date!"),
  });

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          selectedEvent
            ? dispatch(updateEvent({ ...selectedEvent, ...values }))
            : dispatch(
                createEvent({
                  ...values,
                  id: cuid(),
                  hostedBy: "Vedant",
                  attendees: [],
                  hostPhotoURL: "/assets/user.png",
                })
              );

          history.push("/events");
        }}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form className="ui form">
            <Header sub color="teal" content="Event Details" />
            <MyTextInput name="title" placeholder="Event title" />
            <MySelectInput
              name="category"
              placeholder="Category"
              options={categoryOptions}
            />
            <MyTextArea name="description" placeholder="Description" rows={3} />
            <Header sub color="teal" content="Event Location Details" />
            <MyTextInput name="city" placeholder="City" />
            <MyTextInput name="venue" placeholder="Venue" />
            <MyDateInput
              name="date"
              placeholderText="Date"
              timeFormat="HH:mm"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm a"
            />
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              floated="right"
              positive
              content="Submit"
            />
            <Button
              as={Link}
              to="/events"
              disabled={isSubmitting}
              type="submit"
              floated="right"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default EventForm;
