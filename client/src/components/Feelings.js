import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import Nav from "./nav/Nav";
import { Form } from "react-bootstrap";
import moment from "moment";
import "../css/feelings.css";
import { addFeeling, fetchFeelings } from "../actions";
import { Container, Row, Col } from "react-bootstrap";
import FeelingsPieChart from "./feelings/FeelingsPieChart";
import MonthlyFeelings from "./feelings/MonthlyFeelings";

const Feelings = (props) => {
  const { authenticated } = useSelector((state) => state.auth);
  const feelings = useSelector((state) => {
    return state.feelings.feelings;
  });

  const history = useHistory();
  const [date, setDate] = useState("");
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

  const handleFeelingClick = (e) => {
    e.preventDefault();
    if (date === moment().format("L")) {
      alert("You already logged your feeling for today.");
    } else {
      let feeling = e.target.value;
      let date = moment().format("L");
      setDate(date);
      dispatch(
        addFeeling(feeling, date, () => {
          dispatch(fetchFeelings());
        })
      );
    }
  };

  return (
    <div className="background">
      <Nav />
      <FeelingsDiv>
        <h3 className="journal-title">How are you feeling today?</h3>
        <Form>
          <div className="feelingsContainer">
            <div className="emoji">
              <button
                className="feelingButton"
                value="amazing"
                onClick={(e) => handleFeelingClick(e)}
              >
                😁
              </button>
              <div className="feeling">Amazing</div>
            </div>
            <div className="emoji" value="happy">
              <button
                className="feelingButton"
                value="happy"
                onClick={(e) => handleFeelingClick(e)}
              >
                🙂
              </button>
              <div className="feeling">Happy</div>
            </div>
            <div className="emoji" value="meh">
              <button
                className="feelingButton"
                value="meh"
                onClick={(e) => handleFeelingClick(e)}
              >
                😐
              </button>
              <div className="feeling">Meh</div>
            </div>
            <div className="emoji" value="nervous">
              <button
                className="feelingButton"
                value="nervous"
                onClick={(e) => handleFeelingClick(e)}
              >
                😬
              </button>
              <div className="feeling">Nervous</div>
            </div>
            <div className="emoji" value="sad">
              <button
                className="feelingButton"
                value="sad"
                onClick={(e) => handleFeelingClick(e)}
              >
                😭
              </button>
              <div className="feeling">Sad</div>
            </div>
            <div className="emoji" value="angry">
              <button
                className="feelingButton"
                value="angry"
                onClick={(e) => handleFeelingClick(e)}
              >
                😡
              </button>
              <div className="feeling">Angry</div>
            </div>
          </div>
        </Form>
      </FeelingsDiv>
      <Container className="container">
        <Row className="containerRow">
          <Col sm={{ size: "auto" }} className="graphContainer">
            <FeelingsPieChart feelings={feelings} />
          </Col>
          <Col sm={{ size: "auto" }} className="graphContainer">
            <MonthlyFeelings feelings={feelings} />
          </Col>
        </Row>
      </Container>
    </div>
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
