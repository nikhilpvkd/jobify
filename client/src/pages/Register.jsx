import React, { useState } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Alert, FormRow, Logo } from "../components";
import { useAppContext } from "../context/Appcontext";

const Register = () => {
    const { showAlert, displayAlert } = useAppContext();
    // console.log(state);
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        isMember: true,
        showAlert: false,
    });
    const handleChange = (e) => {
        console.log(e.target.name);
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        if (
            !values.email ||
            !values.password ||
            (!values.isMember && !values.name)
        ) {
            displayAlert();
        }
    };

    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember });
    };
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
                    type="password"
                    handleChange={handleChange}
                    value={values.password}
                />
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
                <button type="submit" className="btn btn-block">
                    submit
                </button>
            </form>
        </Wrapper>
    );
};

export default Register;
