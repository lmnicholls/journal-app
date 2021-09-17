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
        <SignInContainer>
          <SignInForm onSubmit={handleSubmit(handleFormSubmit)}>
            <h3>Sign In</h3>
            <FormGroup>
              <input
                className="form-control"
                name="email"
                {...register("email", { required: "Required" })}
              ></input>
              <FormLabels>
                <label>Email</label>
                <span
                  style={{
                    color: "white",
                    textShadow: "1px 1px red",
                  }}
                >
                  {errors.email?.message}
                </span>
              </FormLabels>
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
              <SubmitButton type="submit">Submit</SubmitButton>
            </div>
          </SignInForm>
        </SignInContainer>
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

const SignInContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SignInForm = styled.form`
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

const FormLabels = styled.div`
  display: flex;
  flex-flow: row;
  span: {
    font-size: 18px;
    padding-top: 4px;
    padding-left: 10px;
  }
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
