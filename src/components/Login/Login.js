import React, {useState} from 'react'
import "../../App.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

function Login() {
    
    const defaultValues = {
        email: "",
        password: ""
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Required"),
        password: Yup.string().required("Required")
    });

    const loggingIn = ({email, password, setSubmitting}) => {
        console.log("Logging In: ", email, password);
    }

    const [errorInServer, setErrorInServer] = useState("");

    return (
        <div className="auth-form">
            <h1>Login</h1>
            <Formik
                    onSubmit={loggingIn}
                    validateOnMount={true}
                    initialValues={defaultValues}
                    validationSchema={validationSchema}
            >
                {({ isValid, isSubmitting }) => (
                <Form>
                    <label>
                        Email
                        <Field className="form-control" type="email" name="email"/>
                        <ErrorMessage className="error" name="email" component="div"/>
                    </label>
                    <label>
                        Password
                        <Field className="form-control" type="password" name="password"/>
                        <ErrorMessage className="error" name="password" component="div"/>
                    </label> 
                    <Link to="/signup">
                    <div className="auth-link-container auth-link">
                        Don't have an account already?
                    </div>
                    </Link>
                    
                    <button disabled={isSubmitting === true || isValid === false} type="submit">Log in</button>
 
                </Form>
                )}
            </Formik>

            {errorInServer && <div className="error">{errorInServer}</div>}
        </div>
                
    )
}

export default Login;
