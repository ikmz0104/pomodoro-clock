import React from 'react';
import HeatCalendar from 'react-heat-calendar';

const Calendar = () => {
  return (
    <HeatCalendar
      beginDate={new Date('2021-06-01')} // optional
      endDate={new Date('2022-02-01')} // optional
      dateField="date" // optional
      data={[
        //み
        { date: '2021-06-15', someAttr: 'baz' },
        { date: '2021-06-21', someAttr: 'baz' },
        { date: '2021-06-28', someAttr: 'foo' },
        { date: '2021-07-05', someAttr: 'foo' },
        { date: '2021-07-06', someAttr: 'foo' },
        { date: '2021-07-07', someAttr: 'foo' },
        { date: '2021-07-08', someAttr: 'foo' },
        { date: '2021-07-02', someAttr: 'foo' },
        { date: '2021-06-26', someAttr: 'foo' },
        { date: '2021-06-17', someAttr: 'foo' },
        { date: '2021-06-18', someAttr: 'foo' },
        { date: '2021-06-24', someAttr: 'foo' },
        { date: '2021-07-15', someAttr: 'foo' },
        { date: '2021-07-22', someAttr: 'foo' },
        { date: '2021-07-29', someAttr: 'foo' },
        { date: '2021-07-01', someAttr: 'foo' },
        { date: '2021-08-05', someAttr: 'foo' },
        { date: '2021-07-26', someAttr: 'foo' },
        { date: '2021-07-27', someAttr: 'foo' },
        { date: '2021-07-28', someAttr: 'foo' },
        { date: '2021-07-30', someAttr: 'foo' },
        { date: '2021-07-24', someAttr: 'foo' },
        //ー
        { date: '2021-08-19', someAttr: 'foo' },
        { date: '2021-08-26', someAttr: 'foo' },
        { date: '2021-09-02', someAttr: 'foo' },
        { date: '2021-09-09', someAttr: 'foo' },
        { date: '2021-09-16', someAttr: 'foo' },
        //た
        { date: '2021-09-21', someAttr: 'foo' },
        { date: '2021-09-28', someAttr: 'foo' },
        { date: '2021-10-05', someAttr: 'foo' },
        { date: '2021-10-12', someAttr: 'foo' },
        { date: '2021-10-19', someAttr: 'foo' },
        { date: '2021-10-04', someAttr: 'foo' },
        { date: '2021-09-29', someAttr: 'foo' },
        { date: '2021-09-30', someAttr: 'foo' },
        { date: '2021-10-01', someAttr: 'foo' },
        { date: '2021-10-02', someAttr: 'foo' },
        { date: '2021-10-14', someAttr: 'foo' },
        { date: '2021-10-21', someAttr: 'foo' },
        { date: '2021-10-28', someAttr: 'foo' },
        { date: '2021-10-16', someAttr: 'foo' },
        { date: '2021-10-23', someAttr: 'foo' },
        { date: '2021-10-30', someAttr: 'foo' },
        //ん
        { date: '2021-11-29', someAttr: 'foo' },
        { date: '2021-11-30', someAttr: 'foo' },
        { date: '2021-12-01', someAttr: 'foo' },
        { date: '2021-12-02', someAttr: 'foo' },
        { date: '2021-11-20', someAttr: 'foo' },
        { date: '2021-11-26', someAttr: 'foo' },
        { date: '2021-12-03', someAttr: 'foo' },
        { date: '2021-12-10', someAttr: 'foo' },
        { date: '2021-12-18', someAttr: 'foo' },
        { date: '2021-12-25', someAttr: 'foo' },
        { date: '2021-12-31', someAttr: 'foo' },
        //！
        { date: '2022-01-17', someAttr: 'foo' },
        { date: '2022-01-18', someAttr: 'foo' },
        { date: '2022-01-19', someAttr: 'foo' },
        { date: '2022-01-20', someAttr: 'foo' },
        { date: '2022-01-22', someAttr: 'foo' },
        { date: '2022-01-22', someAttr: 'foo' },
        // ...and so on
        // { date: '2021-06-05', someAttr: 'baz' },
        // { date: '2021-06-10', someAttr: 'foo' },
        // { date: '2021-06-15', someAttr: 'bar' },
      ]}
    />
  );
};

export default Calendar;