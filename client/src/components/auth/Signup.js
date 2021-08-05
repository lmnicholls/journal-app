import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styled from "styled-components";
import { signup } from "../../actions";
import NavAuth from "../nav/NavAuth";
import Background from "../Background.js";

const userSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is a required field"),
  lastName: Yup.string().required("Last Name is a required field"),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const handleFormSubmit = (data) => {
    dispatch(
      signup(data, () => {
        history.push("/home");
      })
    );
  };

  return (
    <Fragment>
      <Background />
      <NavAuth />
      <SignInStyles>
        <div className="sign-in-container">
          <form
            className="sign-in-form"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <h3 className="signup-header">Welcome to Moments in Time!</h3>
            <h3>Let's create your account.</h3>
            <div className="form-group name">
              <input
                className="form-control"
                name="firstName"
                {...register("first name", { required: "Required" })}
              ></input>
              <div className="form-labels">
                <label>First Name</label>
                <span
                  style={{
                    color: "white",
                    textShadow: "1px 1px red",
                  }}
                >
                  {errors.firstName?.message}
                </span>
              </div>
              <input
                className="form-control"
                name="lastName"
                {...register("last name", { required: "Required" })}
              ></input>
              <div className="form-labels">
                <label>Last Name</label>
                <span
                  style={{
                    color: "white",
                    textShadow: "1px 1px red",
                  }}
                >
                  {errors.lastName?.message}
                </span>
              </div>
            </div>
            <div className="form-group">
              <input
                className="form-control"
                name="email"
                {...register("email", { required: "Required" })}
              ></input>
              <div className="form-labels">
                <label>Email</label>
                <span
                  style={{
                    color: "white",
                    textShadow: "1px 1px red",
                  }}
                >
                  {errors.email?.message}
                </span>
              </div>
            </div>

            <div className="form-group">
              <input
                className="form-control"
                name="password"
                type="password"
                {...register("password", { required: "Required" })}
              ></input>
              <div className="form-labels">
                <label>Password</label>
                <span
                  style={{
                    color: "white",
                    textShadow: "1px 1px red",
                  }}
                >
                  {errors.password?.message}
                </span>
              </div>
            </div>
            <div className="submit-button">
              <button className="btn btn-primary submit" type="submit">
                Create Account
              </button>
            </div>
          </form>
        </div>
      </SignInStyles>
    </Fragment>
  );
};

export default Signup;

const SignInStyles = styled.div`
  margin-top: 0px;
  padding-top: 100px;
  padding-bottom: 100px;
`;
