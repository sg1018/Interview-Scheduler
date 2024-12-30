import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDatePicker() {

  const [date,setDate]=React.useState();
  console.log(date);
  return (
      <DemoContainer components={['DatePicker']}>
        <DateField
          label="Controlled field"
          value={date}
          onChange={(newValue) => console.log(newValue)}
        />
      </DemoContainer>
  );
}