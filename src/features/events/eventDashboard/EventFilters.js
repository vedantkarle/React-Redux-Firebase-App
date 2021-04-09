import React from "react";
import { Header, Menu } from "semantic-ui-react";
import Calendar from "react-calendar";

const EventFilters = ({ predicate, setPredicate, loading }) => {
  return (
    <>
      <Menu vertical size="large" style={{ width: "100%" }}>
        <Header icon="filter" attached color="teal" content="Filters" />
        <Menu.Item
          disabled={loading}
          active={predicate.get("filter") === "all"}
          onClick={() => setPredicate("filter", "all")}
          content="All Events"
        />
        <Menu.Item
          disabled={loading}
          active={predicate.get("filter") === "isGoing"}
          onClick={() => setPredicate("filter", "isGoing")}
          content="I'm going"
        />
        <Menu.Item
          disabled={loading}
          active={predicate.get("filter") === "isHost"}
          onClick={() => setPredicate("filter", "isHost")}
          content="I'm hosting"
        />
      </Menu>
      <Header icon="calendar" attached color="teal" content="Select Date" />
      <Calendar
        onChange={(date) => setPredicate("startDate", date)}
        value={predicate.get("startDate") || new Date()}
        tileDisabled={() => loading}
      />
    </>
  );
};

export default EventFilters;
