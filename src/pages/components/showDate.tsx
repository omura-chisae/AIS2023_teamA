import React, { useState, memo } from "react";
import { Calendar } from "react-native-calendars";
import { Text, Button, Modal } from "react-native-paper";

type DateProps = {
  changeDate: (date: Date) => void;
  date: Date;
};

const ShowDate: React.FC<DateProps> = memo((props) => {
  const { changeDate, date } = props;

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDateString, setSelectedString] = useState<{
    [date: string]: any;
  }>({});

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

            setSelectedString({
              // 選択した日付をマーク
              [day.dateString]: {
                selected: true,
                selectedColor: "blue",
              },
            });
          }}
          markedDates={selectedDateString}
          enableSwipeMonths={true} // スワイプで先月・来月を表示
        />
      )}
    </>
  );
});

export default ShowDate;
