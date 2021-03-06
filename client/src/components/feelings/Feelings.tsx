import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import Nav from "../nav/Nav";
import { Form } from "react-bootstrap";
import moment from "moment";
import { addFeeling, fetchFeelings } from "../../actions";
import { Container, Row, Col } from "react-bootstrap";
import FeelingsPieChart from "./FeelingsPieChart";
import MonthlyFeelings from "./MonthlyFeelings";

interface AuthState {
  auth: string;
  firstName: string;
  lastName: string;
  email: string;
  authenticated: string;
}
interface FeelingsState {
  _id: string;
  date: string;
  text: string;
}
interface RootState {
  auth: AuthState;
  feelings: { feeling: FeelingsState[]; feelings: FeelingsState[] };
}

const Feelings = () => {
  const { authenticated } = useSelector((state: RootState) => state.auth);
  const { feelings } = useSelector((state: RootState) => {
    return state.feelings;
  });

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authenticated) {
      history.push("/");
    }
  }, [authenticated, history]);

  useEffect(() => {
    if (authenticated) {
      dispatch(fetchFeelings());
    }
  }, [dispatch, authenticated]);

  const handleFeelingClick: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    if (feelings[feelings.length - 1].date === moment().format("MM/DD/YYYY")) {
      alert("You already logged your feeling for today.");
    } else {
      const target = e.target as HTMLTextAreaElement;
      let feeling = target.value;
      let date = moment(new Date()).format("MM/DD/YYYY");
      dispatch(addFeeling(feeling, date));
      dispatch(fetchFeelings());
    }
  };

  return (
    <>
      <Nav />
      <FeelingsBackground />
      <FeelingsDiv>
        <FeelingsTitle>How are you feeling today?</FeelingsTitle>
        <FeelingsHeading>
          Click on a feeling below to log how you are feeling today.
        </FeelingsHeading>
        <Form>
          <FeelingsContainer>
            <Emoji>
              <FeelingButton
                value="amazing"
                onClick={(e) => handleFeelingClick(e)}
              >
                ????
              </FeelingButton>
              <Feeling>Amazing</Feeling>
            </Emoji>
            <Emoji>
              <FeelingButton
                value="happy"
                onClick={(e) => handleFeelingClick(e)}
              >
                ????
              </FeelingButton>
              <Feeling>Happy</Feeling>
            </Emoji>
            <Emoji>
              <FeelingButton value="meh" onClick={(e) => handleFeelingClick(e)}>
                ????
              </FeelingButton>
              <Feeling>Meh</Feeling>
            </Emoji>
            <Emoji>
              <FeelingButton
                value="nervous"
                onClick={(e) => handleFeelingClick(e)}
              >
                ????
              </FeelingButton>
              <Feeling>Nervous</Feeling>
            </Emoji>
            <Emoji>
              <FeelingButton value="sad" onClick={(e) => handleFeelingClick(e)}>
                ????
              </FeelingButton>
              <Feeling>Sad</Feeling>
            </Emoji>
            <Emoji>
              <FeelingButton
                value="angry"
                onClick={(e) => handleFeelingClick(e)}
              >
                ????
              </FeelingButton>
              <Feeling>Angry</Feeling>
            </Emoji>
          </FeelingsContainer>
        </Form>
      </FeelingsDiv>
      <ChartContainer>
        <ChartRow>
          <Graph xs={4}>
            <FeelingsPieChart feelings={feelings} />
          </Graph>
          <Graph xs={7}>
            <MonthlyFeelings feelings={feelings} />
          </Graph>
        </ChartRow>
      </ChartContainer>
    </>
  );
};

export default Feelings;

const FeelingsDiv = styled.div`
  padding-top: 100px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

const FeelingsTitle = styled.h3`
  padding-bottom: 15px;
  margin: 0;
  text-shadow: 3px 3px rgb(51, 167, 151);
  font-family: "Patrick Hand SC";
  font-size: 64px;
  color: white;
`;

const FeelingsHeading = styled.div`
  font-family: "Patrick Hand SC";
  font-size: 32px;
  color: white;
`;

const FeelingsBackground = styled.div`
  background-color: #5de4d2;
  background-image: linear-gradient(
    315deg,
    #5de4d2 25%,
    #6cdcbf 52%,
    #49a7da 90%
  );
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: -10;
`;

const FeelingsContainer = styled.div`
  display: flex;
  flex-flow: row;
  background-color: rgba(148, 147, 147, 0.753);
  border-radius: 15px;
`;

const Emoji = styled.div`
  font-size: 50px;
  width: 100px;
  text-align: center;
`;

const FeelingButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const Feeling = styled.div`
  font-size: 28px;
  font-family: "Patrick Hand SC";
  text-align: center;
  color: white;
`;

const ChartContainer = styled(Container)`
  margin: auto;
  width: 90%;
  margin-bottom: 50px;
  margin-top: 50px;
`;

const ChartRow = styled(Row)`
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
`;

const Graph = styled(Col)``;
