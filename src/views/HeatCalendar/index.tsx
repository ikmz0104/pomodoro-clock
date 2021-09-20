import React from 'react';
import HeatCalendar from 'react-heat-calendar';

type Calendardate = {
  someAttr: string;
}

type Contributes = {
  contribute: Calendardate;
}

type CalendarProps = {
  contributes: Contributes;
}

const Calendar: React.FC<CalendarProps> = ({contributes}) => {
  return (
    <HeatCalendar
      beginDate={new Date('2021-06-01')}
      endDate={new Date('2022-02-01')}
      dateField="date"
      data={contributes}
      //data={contributes[0].color} ⇚デバック時エラー要対応
    />
  );
};

export default Calendar;