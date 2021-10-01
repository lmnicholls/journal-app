import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchUser } from "../actions";
import "../App.css";

interface AuthState {
  auth: string;
  firstName: string;
  lastName: string;
  email: string;
  authenticated: string;
}

interface RootState {
  auth: AuthState;
}

const App = (props: any) => {
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (authenticated) {
      dispatch(fetchUser());
    }
  }, [dispatch, authenticated]);

  return <AppContainer>{props.children}</AppContainer>;
};

export default App;

const AppContainer = styled.div`
  padding-top: 0px;
`;
