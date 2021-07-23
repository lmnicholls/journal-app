import React, { Fragment } from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styled from "styled-components";
// import { signin } from "../../actions";
import ParticlesBg from "particles-bg";
import NavAuth from "../nav/NavAuth";

const userSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const Signin = () => {
  // const { register, handleSubmit, errors } = useForm({
  //   resolver: yupResolver(userSchema),
  // });

  // const dispatch = useDispatch();
  // const history = useHistory();

  // const handleFormSubmit = (data) => {
  //   dispatch(
  //     signin(data, () => {
  //       history.push("/home");
  //     })
  //   );
  // };

  return (
    <Fragment>
      <NavAuth />
      <SignInStyles>
        <ParticlesBg type="circle" bg={true} />

        <div className="sign-in-container">
          <form
            className="sign-in-form"
            //  onSubmit={handleSubmit(handleFormSubmit)}
          >
            <h3>Sign In</h3>
            <div className="form-group">
              <input
                className="form-control"
                name="email"
                // ref={register({ required: true })}
              ></input>
              <label>Email</label>
              {/* {errors.email?.message} */}
            </div>

            <div className="form-group">
              <input
                className="form-control"
                name="password"
                type="password"
                // ref={register({ required: true })}
              ></input>
              <label>Password</label>
              {/* {errors.password?.message} */}
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
  padding-top: 250px;
`;
