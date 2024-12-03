import { useState } from 'react';
import Calendar from 'react-calendar';
import './Calender.css';

function Calender() {
  const [date, setDate] = useState(new Date());

  return (
    <div className='calender'>
      <p className='text-center'>
        <span>Selected Date:</span>
        {date.toDateString()}
      </p>
      <div className='calendar-container'>
        <Calendar onChange={setDate} value={date} />
      </div>
    </div>
  );
}

export default Calender;


