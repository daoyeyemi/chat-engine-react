import React, { useState } from 'react';
import "../../App.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { fb } from '../../service/firebase';

function Signup() {
    
const defaultValues = {
    email: "",
    password: "",
    userName: "",
    verifyPassword: ""
};

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required").min(6, "must be at least six characters"),
    userName: Yup.string().required("Required").matches(/^\S*$/, "Spaces not allowed").min(5, "must be at least six characters"),
    verifyPassword: Yup.string().required("Required").oneOf([Yup.ref("password"), null], "Passwords do not match")
});

const signingUp = ({ email, userName, password }, { setSubmitting }) => {
    fb.auth
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
            console.log(res);
            if (res?.user?.uid) {
                fetch("/api/createNewUser", {
                    method : "POST",
                    body: JSON.stringify({
                        userName,
                        userId: res.user.uid
                    }),
                    headers : {
                        "Content-Type" : "application/json"
                    }
                }).then(() => {
                    fb.firestore
                        .collection("chatUsers")
                        .doc(res.user.uid)
                        .set({ userName, avatar: "" })
                })
            } else {
                setErrorInServer("We're experiencing problems signing you up at the moment.")
            }
        })
        .catch(error => {
            if (error.code === "auth/email-already-in-use") {
                setErrorInServer("An account with this email already exists.")
            } else {
                setErrorInServer("There have been some problems signing you up. Try again.")
            }
        })
        .finally(() => setSubmitting(false));
}

const [errorInServer, setErrorInServer] = useState("");

    return (
        <div className="auth-form">
            <h1>Sign up</h1>
            <Formik
                onSubmit={signingUp}
                validateOnMount={true}
                initialValues={defaultValues}
                validationSchema={validationSchema}
            >
                {({ isValid, isSubmitting }) => (
                   <Form>
                        <label>
                            Username
                            <Field className="form-control" type="text" name="userName"/>
                            <ErrorMessage className="error" name="userName" component="div"/>
                        </label>
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
                        <label>
                            Re-type password
                            <Field className="form-control" type="password" name="verifyPassword"/>
                            <ErrorMessage className="error" name="verifyPassword" component="div"/>
                        </label>
                        <Link to="/login">
                        <div className="auth-link-container auth-link">
                            Have an account already?
                        </div>
                        </Link>
                        
                        <button disabled={isSubmitting === true || isValid === false} type="submit">Sign up</button>
                    </Form> 
                )}
            </ Formik>

        {!!errorInServer && <div className="error">{errorInServer}</div>}
        </div>
    )
};

export default Signup;
