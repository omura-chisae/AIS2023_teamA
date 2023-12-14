import React, { useState, memo } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Text, Button, Modal } from "react-native-paper";
import Styles from "../../style/Styles";

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
      <Button
        mode="contained"
        onPress={() => setShowCalendar(!showCalendar)}
        icon="plus"
        contentStyle={{ flexDirection: "row-reverse" }}
      >
        賞味期限を指定する
      </Button>

      {showCalendar && (
        <Calendar
          style={Styles.showDateCalendarStyle}
          theme={{
            textSectionTitleColor: "#ffffff", // 曜日の色変更
            monthTextColor: "#ffffff", // yyyy年 MM月の色変更
            textDayStyle: {
              marginHorizontal: 0,
            },
          }}
          monthFormat={"yyyy年 MM月"}
          showSixWeeks={true} // 常に6週間表示する
          onDayPress={(day) => {
            changeDate(new Date(day.dateString));

            setSelectedString({
              // 選択した日付をマーク
              [day.dateString]: {
                selected: true,
                selectedColor: "#6d5c3f",
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

LocaleConfig.locales.jp = {
  monthNames: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  monthNamesShort: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  dayNames: [
    "日曜日",
    "月曜日",
    "火曜日",
    "水曜日",
    "木曜日",
    "金曜日",
    "土曜日",
  ],
  dayNamesShort: ["日", "月", "火", "水", "木", "金", "土"],
};
LocaleConfig.defaultLocale = "jp";

export default ShowDate;
