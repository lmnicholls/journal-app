import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Nav from "./nav/Nav";
import Calendar from "react-calendar";
import { fetchEntries } from "../actions";
// import "react-calendar/dist/Calendar.css";
import "../css/calendar.css";

const MyCalendar = (props) => {
  const [value, setValue] = useState(new Date());
  const { authenticated } = useSelector((state) => state.auth);
  const entries = useSelector((state) => {
    return state.journalEntries.entries[0];
  });

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
    alert(date);
  };

  const handleLoadCalendarEntries = (date, view) => {
    if (view === "month" && date.getDay() === 0) {
      return <p>It's Sunday!</p>;
    }
  };

  if (entries) {
    console.log(entries.map((entry) => entry.date));

    let dailyEntriesDates = entries.map((entry) => {
      let date = new Date(entry.date);
      let entryYear = date.getFullYear();
      let entryMonth = (1 + date.getMonth()).toString().padStart(2, "0");
      let entryDay = date.getDate().toString().padStart(2, "0");

      return entryMonth + "/" + entryDay + "/" + entryYear;
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
                  (entryDate) =>
                    entryDate ===
                    (1 + date.getMonth()).toString().padStart(2, "0") +
                      "/" +
                      date.getDate().toString().padStart(2, "0") +
                      "/" +
                      date.getFullYear()
                )
              ) {
                return "highlight";
              }
            }}
          />
        </CalendarDiv>
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
