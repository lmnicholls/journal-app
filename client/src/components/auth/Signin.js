import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styled from "styled-components";
import { signin } from "../../actions";
import Background from "../Background";
import NavAuth from "../nav/NavAuth";

const userSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const Signin = () => {
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
      signin(data, () => {
        history.push("/home");
      })
    );
  };

  return (
    <Fragment>
      <NavAuth />
      <SignInStyles>
        <Background />
        <div className="sign-in-container">
          <form
            className="sign-in-form"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <h3>Sign In</h3>
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
                Submit
              </button>
            </div>
          </form>
        </div>
      </SignInStyles>
    </Fragment>
  );
};

export default Signin;

const SignInStyles = styled.div`
  margin-top: 0px;
  padding-top: 200px;
  padding-bottom: 100px;
`;
