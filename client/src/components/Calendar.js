import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Nav from "./nav/Nav";
import Calendar from "react-calendar";
import "../css/calendar.css";

const MyCalendar = (props) => {
  const [value, onChange] = useState(new Date());
  const { authenticated } = useSelector((state) => state.auth);

  const history = useHistory();

  useEffect(() => {
    if (!authenticated) {
      history.push("/");
    }
  }, [authenticated, history]);

  const LogDay = (e) => {
    console.log("e", e);
  };

  return (
    <Fragment>
      <Nav />
      <CalendarBackground>
        <CalendarDiv>
          <Calendar
            onChange={onChange}
            value={value}
            className="react-calendar"
            onClickDay={(e) => LogDay(e)}
          />
        </CalendarDiv>
      </CalendarBackground>
    </Fragment>
  );
};

export default MyCalendar;

const CalendarDiv = styled.div`
  padding-top: 100px;
  width: 50%;
  margin: auto;
  padding-bottom: 100px;
`;

const CalendarBackground = styled.div`
  background-color: #5de4d2;
  background-image: linear-gradient(
    315deg,
    #5de4d2 25%,
    #6cdcbf 52%,
    #49a7da 90%
  );
`;
