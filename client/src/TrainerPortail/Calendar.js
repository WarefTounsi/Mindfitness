import Box from "@mui/material/Box";
import Header from "./Shared/Header";
// import { Calendar } from "react-multi-date-picker";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, DatePicker } from "react-modern-calendar-datepicker";
import { getCoachByEmail } from "../services/Trainer";
import {
  getReservationListByTrainerId,
  getReservationListByTrainerIdAndStatus,
} from "../services/Reservation";
import { Typography } from "@mui/material";

export function TrainerCalendar() {
  const [value, setValue] = useState([]);
  const auth = useAuth();
  const [selectedDay, setSelectedDay] = useState([]);

  useEffect(() => {
    getCoachByEmail(auth?.auth?.user)
      .then((data) => getReservationListByTrainerIdAndStatus(data[0]?.id))
      .then((data) => {
        const dates = data.map((item) => transformDate(item.date));
        setSelectedDay(dates)
      });
  }, []);

  return (
    <Box>
      <Header title="Calendar" />
      <Box
        sx={{ display: "flex", justifyContent: "center", width: "100%" }}
        my={5}
      >
        <Calendar
          value={selectedDay}
          shouldHighlightWeekends
          customDaysClassName={[
            { year: 2019, month: 3, day: 4 },
            { year: 2019, month: 3, day: 12 },
            { year: 2019, month: 3, day: 18 },
            { year: 2019, month: 3, day: 26 },
          ]}
        />
      </Box>
    </Box>
  );
}
const transformDate = (date) => {
  const dateObject = new Date(date);
  return {
    year: dateObject.getFullYear(),
    month: dateObject.getMonth() + 1,
    day: dateObject.getDate()
  };
};
