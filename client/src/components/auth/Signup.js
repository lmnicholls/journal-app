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
  therapist: Yup.string().required("Therapist is a required field"),
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
        <SignUpContainer>
          <SignUpForm onSubmit={handleSubmit(handleFormSubmit)}>
            <h3 style={{ marginBottom: "0px" }}>Welcome to Therapy & Me!</h3>
            <h3>Let's create your account.</h3>
            <FormGroup>
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
            </FormGroup>

            <FormGroup>
              <input
                className="form-control"
                name="therapist"
                {...register("therapist", { required: "Required" })}
              ></input>
              <div className="form-labels">
                <label>Therapist Name</label>
                <span
                  style={{
                    color: "white",
                    textShadow: "1px 1px red",
                  }}
                >
                  {errors.therapist?.message}
                </span>
              </div>
            </FormGroup>

            <FormGroup>
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
            </FormGroup>

            <FormGroup>
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
            </FormGroup>
            <div style={{ textAlign: "right" }}>
              <SubmitButton className="btn btn-primary submit" type="submit">
                Create Account
              </SubmitButton>
            </div>
          </SignUpForm>
        </SignUpContainer>
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

const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SignUpForm = styled.form`
  font-family: "Patrick Hand SC";
  color: white;
  text-align: center;
  border-radius: 25px;
  width: 40%;
  padding: 20px;
  background: rgba(95, 158, 189, 0.8);
  h3 {
    font-size: 36px;
    margin-top: 0px;
  }
  label {
    font-size: 24px;
    padding-bottom: 15px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-flow: column;
  text-align: left;
`;

const SubmitButton = styled.button`
  background-color: rgb(217, 219, 219);
  font-family: "Patrick Hand SC";
  font-size: 24px;
  border: none;
  color: rgb(95, 158, 189);
  padding: 8px 16px;
  text-decoration: none;
  cursor: pointer;
  border-radius: 5px;
  :hover {
    background-color: rgb(80, 180, 139);
    color: rgb(112, 110, 110);
  }
`;

// const FormInput = styled.input`
//   border: 2px solid white;
//   border-radius: 4px;
//   height: 25px;
//   font-family: "Comic Neue";
//   font-size: 18px;
//   color: rgb(8, 64, 92);
// `;
