import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import * as Yup from "yup";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Divider, Label } from "semantic-ui-react";
import { registerInFirebase } from "../../app/firestore/firebaseService";
import { closeModal } from "../../app/common/modals/modalReducer";
import SocialLogin from "./SocialLogin";

const RegisterForm = () => {
  const dispatch = useDispatch();

  return (
    <ModalWrapper size="mini" header="Register to Re-Vents">
      <Formik
        initialValues={{ email: "", displayName: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string().required().email(),
          displayName: Yup.string().required(),
          password: Yup.string().required(),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await registerInFirebase(values);
            setSubmitting(false);
            dispatch(closeModal());
          } catch (error) {
            setErrors({ auth: error.message });
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid, errors }) => (
          <Form className="ui form">
            <MyTextInput name="displayName" placeholder="Display Name" />
            <MyTextInput name="email" placeholder="Email Address" />
            <MyTextInput
              name="password"
              placeholder="Password"
              type="password"
            />
            {errors.auth && (
              <Label
                basic
                color="red"
                style={{ marginBottom: 10 }}
                content={errors.auth}
              />
            )}
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              fluid
              size="large"
              color="teal"
              content="Register"
            />
            <Divider horizontal>Or</Divider>
            <SocialLogin />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export default RegisterForm;
