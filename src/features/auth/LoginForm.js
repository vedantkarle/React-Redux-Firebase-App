import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import * as Yup from "yup";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button } from "semantic-ui-react";
import { signInUser } from "../auth/authActions";
import { closeModal } from "../../app/common/modals/modalReducer";

const LoginForm = () => {
  const dispatch = useDispatch();

  return (
    <ModalWrapper size="mini" header="Login in to Re-Vents">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string().required().email(),
          password: Yup.string().required(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(signInUser(values));
          setSubmitting(false);
          dispatch(closeModal());
        }}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form className="ui form">
            <MyTextInput name="email" placeholder="Email Address" />
            <MyTextInput
              name="password"
              placeholder="Password"
              type="password"
            />
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              fluid
              size="large"
              color="teal"
              content="Login"
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export default LoginForm;
