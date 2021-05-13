import { fb } from 'service';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormField } from 'components/FormField';
import { defaultValues, validationSchema } from './formikConfig';

export const Signup = () => {
  const history = useHistory();
  const [serverError, setServerError] = useState('');

  const signup = ({ email, userName, password }, { setSubmitting }) => {
    fb.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        if (res?.user?.uid) {
          fetch('/api/createUser', {
            method: 'POST',
            body: JSON.stringify({
              userName,
              userId: res.user.uid,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }).then(() => {
            fb.firestore
              .collection('chatUsers')
              .doc(res.user.uid)
              .set({ userName, avatar: '' });
          });
        } else {
          setServerError(
            "We're having trouble signing you up. Please try again.",
          );
        }
      })
      .catch(err => {
        if (err.code === 'auth/email-already-in-use') {
          setServerError('An account with this email already exists');
        } else {
          setServerError(
            "We're having trouble signing you up. Please try again.",
          );
        }
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div>
      <div className="title" style={{ marginTop: "220px"}}>let us chat .</div>
    <div className="auth-form">
      <h1>sign up</h1>
      <Formik
        onSubmit={signup}
        validateOnMount={true}
        initialValues={defaultValues}
        validationSchema={validationSchema}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <FormField name="userName" label="username" />
            <FormField name="email" label="email" type="email" />
            <FormField name="password" label="password" type="password" />
            <FormField
              type="password"
              name="verifyPassword"
              label="verify password"
            />

            <div className="auth-link-container">
             <span className="auth-link" onClick={() => history.push('login')}>
               have an account already? log in here
              </span>
            </div>

            <button disabled={isSubmitting || !isValid} type="submit">
              sign up
            </button>
          </Form>
        )}
      </Formik>

      {serverError && <div className="error">{serverError}</div>}
    </div>
    </div>
    
  );
};
