import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import { openModal } from "../../app/common/modals/modalReducer";
import { increment, decrement } from "./testReducer";

const Sandbox = () => {
  const dispatch = useDispatch();
  const [target, setTarget] = useState(null);
  const { data } = useSelector((state) => state.test);
  const { loading } = useSelector((state) => state.async);

  return (
    <>
      <h1>Testing</h1>
      <h3>Data is :{data}</h3>
      <Button
        loading={loading && target === "increment"}
        name="increment"
        onClick={(e) => {
          dispatch(increment(20));
          setTarget(e.target.name);
        }}
        content="Increment"
        color="green"
      />
      <Button
        loading={loading && target === "decrement"}
        name="decrement"
        onClick={(e) => {
          dispatch(decrement(10));
          setTarget(e.target.name);
        }}
        content="Decrement"
        color="red"
      />
      <Button
        onClick={() =>
          dispatch(openModal({ modalType: "TestModal", modalProps: { data } }))
        }
        content="Open Modal"
        color="teal"
      />
    </>
  );
};

export default Sandbox;
