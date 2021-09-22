import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Nav from "../nav/Nav";
import Calendar from "react-calendar";
import CalendarDayListView from "./CalendarDayListView";
import { fetchEntries } from "../../actions";
import moment from "moment";
import "./calendar.css";

const MyCalendar = (props) => {
  const [date, setDate] = useState(new Date());
  const { authenticated } = useSelector((state) => state.auth);
  const entries = useSelector((state) => {
    return state.journalEntries.entries[0];
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!authenticated) {
      history.push("/");
    }
  }, [authenticated, history]);

  useEffect(() => {
    if (authenticated) {
      dispatch(fetchEntries());
    }
  }, [dispatch, authenticated]);

  const onChange = (date) => {
    setDate(date);
  };

  const handleDayClick = (date) => {
    setDate(date);
    handleShow();
  };

  if (entries) {
    let dailyEntriesDates = entries.map((entry) => {
      let date = moment(new Date(entry.date)).format("MM/DD/YYYY");
      return date;
    });

    return (
      <>
        <Nav />
        <CalendarBackground />
        <CalendarDiv>
          <Calendar
            onChange={onChange}
            onClickDay={(date) => handleDayClick(date)}
            value={date}
            tileClassName={({ date, view }) => {
              if (
                dailyEntriesDates.find(
                  (entryDate) => entryDate === moment(date).format("MM/DD/YYYY")
                )
              ) {
                return "highlight";
              }
            }}
          />
        </CalendarDiv>
        <CalendarDayListView
          setShow={setShow}
          show={show}
          date={date}
          entries={entries}
          handleClose={handleClose}
          handleShow={handleShow}
        />
      </>
    );
  }

  return (
    <Background>
      <Nav />
      <CalendarDiv>
        <Calendar onChange={onChange} value={date} />
      </CalendarDiv>
    </Background>
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
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: -10;
`;

const Background = styled.div`
  background-color: #5de4d2;
  background-image: linear-gradient(
    315deg,
    #5de4d2 25%,
    #6cdcbf 52%,
    #49a7da 90%
  );
`;
