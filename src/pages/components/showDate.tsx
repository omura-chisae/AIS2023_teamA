import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import { Text, Button, Modal } from "react-native-paper";

type DateProps = {
  changeDate: (date: Date) => void;
  date: Date;
};

const ShowDate: React.FC<DateProps> = (props) => {
  const { changeDate, date } = props;

  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <>
      <Button mode="contained" onPress={() => setShowCalendar(!showCalendar)}>
        賞味期限を指定する
      </Button>

      {showCalendar && (
        <Calendar
          monthFormat={"yyyy年 MM月"}
          onDayPress={(day) => {
            changeDate(new Date(day.dateString));
          }}
          enableSwipeMonths={true}
        />
      )}
    </>
  );
};

export default ShowDate;
