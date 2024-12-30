import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function BasicTimePicker({time,setTime}) {
  
  return (
      <DemoContainer components={['TimePicker']}>
        <TimePicker label="Enter the time of Interview" value={time} onChange={(newTime)=> setTime(newTime)} />
      </DemoContainer>
  );
}