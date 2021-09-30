import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Nav from "../nav/Nav";
import Calendar from "react-calendar";
import CalendarDayListView from "./CalendarDayListView";
import { fetchFeelings, fetchEntries } from "../../actions";
import moment from "moment";
import "./calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

interface AuthState {
  auth: string;
  firstName: string;
  lastName: string;
  email: string;
  authenticated: string;
}

interface EntryState {
  _id: string;
  title: string;
  date: string;
  entry: string;
}

interface FeelingsState {
  _id: string;
  date: string;
  text: string;
}

interface RootState {
  auth: AuthState;
  journalEntries: { entry: EntryState[]; entries: EntryState[] };
  feelings: { feeling: FeelingsState[]; feelings: FeelingsState[] };
}

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());
  const { authenticated } = useSelector((state: RootState) => state.auth);
  const { entries } = useSelector((state: RootState) => {
    return state.journalEntries;
  });
  const { feelings } = useSelector((state: RootState) => {
    return state.feelings;
  });
  console.log(feelings);
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
      dispatch(fetchFeelings());
    }
  }, [dispatch, authenticated]);

  const onChange = (date: Date) => {
    setDate(date);
  };

  const handleDayClick = (date: Date) => {
    setDate(date);
    handleShow();
  };

  const handleAddEntryClick = () => {
    history.push("/new-entry");
  };

  const handleAddFeelingClick = () => {
    history.push("/feelings");
  };

  const tileContent = ({ activeStartDate, date, view }: any) => {
    let feelingsKey: {
      [key: string]: string;
    } = {
      amazing: "😁",
      happy: "🙂",
      meh: "😐",
      sad: "😭",
      nervous: "😬",
      angry: "😡",
    };
    let feelingEmoji: string = "";
    if (
      feelings.find(
        (feeling: FeelingsState) =>
          feeling.date === moment(date).format("MM/DD/YYYY")
      )
    ) {
      const feelingdate = feelings.find(
        (feeling: FeelingsState) =>
          feeling.date === moment(date).format("MM/DD/YYYY")
      );
      if (!feelingdate) return null;
      feelingEmoji = feelingsKey[feelingdate.text];
      return <p style={{ fontSize: "16px" }}> {feelingEmoji} </p>;
    } else return <p style={{ fontSize: "16px", color: "transparent" }}>:)</p>;
  };

  if (entries) {
    let dailyEntriesDates = entries.map((entry: EntryState) => {
      let date = moment(new Date(entry.date)).format("MM/DD/YYYY");
      return date;
    });

    return (
      <>
        <Nav />
        <CalendarBackground />
        <CalendarHeading>
          <CalendarTitle>My Calendar</CalendarTitle>
          <Heading>
            Click on the highlighted dates to view your journal entries for that
            day.
          </Heading>
          <ButtonDiv>
            <Button
              onClick={handleAddEntryClick}
              style={{ marginRight: "8px" }}
            >
              <FontAwesomeIcon
                icon={faPlusCircle}
                className="icon bars fa-1xx"
                style={{ paddingRight: "5px" }}
              />
              Add Entry
            </Button>
            <Button onClick={handleAddFeelingClick}>
              <FontAwesomeIcon
                icon={faPlusCircle}
                className="icon bars fa-1xx"
                style={{ paddingRight: "5px" }}
              />
              Add Feeling
            </Button>
          </ButtonDiv>
        </CalendarHeading>
        <CalendarDiv>
          <Calendar
            onChange={onChange}
            onClickDay={(date) => handleDayClick(date)}
            value={date}
            tileClassName={({ date }) => {
              if (
                dailyEntriesDates.find(
                  (entryDate: string) =>
                    entryDate === moment(date).format("MM/DD/YYYY")
                )
              ) {
                return "highlight";
              } else return "";
            }}
            tileContent={tileContent}
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
  padding-top: 10px;
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

const CalendarHeading = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding-top: 75px;
`;

const CalendarTitle = styled.h3`
  margin: 0;
  text-shadow: 3px 3px rgb(51, 167, 151);
  font-family: "Patrick Hand SC";
  font-size: 64px;
  color: white;
`;

const Heading = styled.div`
  font-family: "Patrick Hand SC";
  font-size: 32px;
  color: white;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-flow: row;
`;

const Button = styled.button`
  margin-top: 10px;
  margin-right: 2px;
  margin-bottom: 10px;
  background-color: #49a7da;
  font-family: "Patrick Hand SC";
  font-size: 24px;
  border: none;
  color: white;
  text-decoration: none;
  cursor: pointer;
  border-radius: 5px;
  :hover {
    background-color: white;
    color: #6cdcbf;
  }
`;
