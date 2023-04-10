import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Alert, FormRow, Logo } from "../components";
import { useAppContext } from "../context/Appcontext";

const Register = () => {
    const { isLoading, showAlert, displayAlert, setupUser, user } =
        useAppContext();

    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        isMember: true,
        showAlert: false,
    });

    const [password, setPassword] = useState("password");

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !values.email ||
            !values.password ||
            (!values.isMember && !values.name)
        ) {
            displayAlert();
        } else {
            if (values.isMember) {
                const currentUser = {
                    email: values.email,
                    password: values.password,
                };

                setupUser({
                    currentUser,
                    endPoint: "login",
                    alertText: "User loggedin Successfully! Redirecting....",
                });
            } else {
                const currentUser = {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                };
                setupUser({
                    currentUser,
                    endPoint: "register",
                    alertText: "User Registered Successfully! Redirecting....",
                });
            }
        }
    };

    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember });
    };

    const handleShowPassword = (e) => {
        if (e.target.checked) {
            setPassword("text");
        } else {
            setPassword("password");
        }
    };

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }
    }, [user, navigate]);
    return (
        <Wrapper className="full-page">
            <form className="form" onSubmit={handleSubmit}>
                <Logo />
                <h3>{values.isMember ? "Login" : "Register"}</h3>
                {showAlert && <Alert />}
                {/* form row for name */}
                {!values.isMember && (
                    <FormRow
                        name="name"
                        type="text"
                        handleChange={handleChange}
                        value={values.name}
                    />
                )}
                {/* form row for email */}
                <FormRow
                    name="email"
                    type="email"
                    value={values.email}
                    handleChange={handleChange}
                />
                {/* form row for password */}
                <FormRow
                    name="password"
                    type={password}
                    handleChange={handleChange}
                    value={values.password}
                />
                <span>
                    show Password{" "}
                    <input type="checkbox" onChange={handleShowPassword} />
                </span>
                <p>
                    {values.isMember
                        ? "Not a member yet?"
                        : "Already a member?"}

                    <button
                        type="button"
                        onClick={toggleMember}
                        className="member-btn"
                    >
                        {values.isMember ? "Register" : "Login"}
                    </button>
                </p>
                <button
                    type="submit"
                    className="btn btn-block"
                    disabled={isLoading}
                >
                    submit
                </button>
            </form>
        </Wrapper>
    );
};

export default Register;
