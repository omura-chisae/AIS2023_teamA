import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import { PaperProvider, Text, Button, Modal } from "react-native-paper";

const ShowDate = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState("");

  return (
    <PaperProvider>
      <Button mode="contained" onPress={() => setShowCalendar(!showCalendar)}>
        賞味期限を指定する
      </Button>

      {showCalendar && (
        <>
          <Calendar
            monthFormat={"yyyy年 MM月"}
            onDayPress={(day) => {
              setDate(day.dateString);
            }}
          />
          {date && <Text>選択された日付: {date}</Text>}
        </>
      )}
    </PaperProvider>
  );
};

export default ShowDate;
