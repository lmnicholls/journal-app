import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchUser } from "../actions";
import "../App.css";

const App = (props) => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.auth.authenticated);

  useEffect(() => {
    if (authenticated) {
      dispatch(fetchUser());
    }
  }, [authenticated]);

  return <AppContainer>{props.children}</AppContainer>;
};

export default App;

const AppContainer = styled.div`
  padding-top: 0px;
`;
