import React from 'react';
import HeatCalendar from 'react-heat-calendar';

type Graphdata = {
  someAttr: string;
}

type Contributes = {
  contribute: Graphdata;
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
      data={contributes[0].color}
    />
  );
};

export default Calendar;