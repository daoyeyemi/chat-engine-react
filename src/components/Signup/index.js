import { fb } from '../../service';
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
    <div className="auth-form">
      <h1 className="entry-title" style={{ fontSize: "100px" }}>let us chat</h1>
      <h1 className="entry-title">sign up</h1>
      <Formik
        onSubmit={signup}
        validateOnMount={true}
        initialValues={defaultValues}
        validationSchema={validationSchema}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <label style={{ marginTop: "10px", marginBottom: "10px"}}>Username</label>
            <input style={{ backgroundColor: "white" }} name="userName" placeholder="Enter username here..." />
            <label style={{ marginTop: "10px", marginBottom: "10px"}}>Email</label>
            <input style={{ backgroundColor: "white" }} name="email" type="email" placeholder="Enter email here..." />
            <label style={{ marginTop: "10px", marginBottom: "10px"}}>Password</label>
            <input style={{ backgroundColor: "white" }} name="password" type="password" placeholder="Enter password here..." />
            <label style={{ marginTop: "10px", marginBottom: "10px"}}>Verify Password</label>
            <input style={{ backgroundColor: "white" }} type="password" name="verifyPassword" placeholder="Enter password here again..." />

            <div className="auth-link-container">
              already have an account ?{' '}
              <span className="auth-link" onClick={() => history.push('login')}>
                log in here
              </span>
            </div>

            <button disabled={isSubmitting || !isValid} type="submit">
              Sign Up
            </button>
          </Form>
        )}
      </Formik>

      {!!serverError && <div className="error">{serverError}</div>}
    </div>
  );
};
