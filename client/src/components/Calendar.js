import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Nav from "./nav/Nav";
import Calendar from "react-calendar";
import CalendarDayListView from "../components/calendar/CalendarDayListView";
import { fetchEntries } from "../actions";
import moment from "moment";
import "../css/calendar.css";

const MyCalendar = (props) => {
  const [value, setValue] = useState(new Date());
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
    setValue(date);
  };

  const handleDayClick = (date) => {
    handleShow();
    alert(moment(date).format("MM/DD/YYYY"));
  };

  if (entries) {
    let dailyEntriesDates = entries.map((entry) => {
      let date = moment(new Date(entry.date)).format("MM/DD/YYYY");
      return date;
    });

    console.log(dailyEntriesDates);

    return (
      <div className="background">
        <Nav />
        <CalendarDiv>
          <Calendar
            onChange={onChange}
            onClickDay={(value) => handleDayClick(value)}
            value={value}
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
          handleClose={handleClose}
          handleShow={handleShow}
        />
      </div>
    );
  }

  return (
    <div className="background">
      <Nav />
      <CalendarDiv>
        <Calendar onChange={onChange} value={value} />
      </CalendarDiv>
    </div>
  );
};

export default MyCalendar;

const CalendarDiv = styled.div`
  padding-top: 100px;
  width: 50%;
  margin: auto;
  padding-bottom: 100px;
`;
