import React, { Fragment, useState } from "react";
import styled from "styled-components";
import ParticlesBg from "particles-bg";
import Nav from "./nav/Nav";
import Calendar from "react-calendar";
import "../css/calendar.css";

const MyCalendar = (props) => {
  const [value, onChange] = useState(new Date());

  const LogDay = (e) => {
    console.log("e", e);
  };

  return (
    <Fragment>
      <Nav />
      <div className="background">
        <ParticlesBg type="circle" bg={true} style={{ position: "fixed" }} />
      </div>
      <CalendarDiv>
        <Calendar
          onChange={onChange}
          value={value}
          className="react-calendar"
          onClickDay={(e) => LogDay(e)}
        />
      </CalendarDiv>
    </Fragment>
  );
};

export default MyCalendar;

const CalendarDiv = styled.div`
  padding-top: 100px;
  width: 50%;
  margin: auto;
`;
