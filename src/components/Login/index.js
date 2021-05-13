import { fb } from 'service';
import { useState } from 'react';
import { Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { FormField } from 'components/FormField';
import { validationSchema, defaultValues } from './formikConfig';

export const Login = () => {
  const history = useHistory();
  const [serverError, setServerError] = useState('');

  const login = ({ email, password }, { setSubmitting }) => {
    fb.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        if (!res.user) {
          setServerError(
            "We're having trouble logging you in. Please try again.",
          );
        }
      })
      .catch(err => {
        if (err.code === 'auth/wrong-password') {
          setServerError('Invalid credentials');
        } else if (err.code === 'auth/user-not-found') {
          setServerError('No account for this email');
        } else {
          setServerError('Something went wrong :(');
        }
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div>
      <div className="title" style={{ marginTop: "25px"}}>let us chat .</div>
    <div className="auth-form">
      <h1>login</h1>
      <Formik
        onSubmit={login}
        validateOnMount={true}
        initialValues={defaultValues}
        validationSchema={validationSchema}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <FormField name="email" label="email" type="email" />
            <FormField name="password" label="password" type="password" />

            <div className="auth-link-container">
              <span
                className="auth-link"
                onClick={() => history.push('signup')}
              >
               don't have an account yet? sign up here 
              </span>
            </div>

            <button type="submit" disabled={!isValid || isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>

      {serverError && <div className="error">{serverError}</div>}
    </div>
    </div>
  
  );
};
