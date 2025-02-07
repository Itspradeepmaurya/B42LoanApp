// src/pages/RepaymentCalendar.jsx
import React, { useState } from 'react';
import { Box, Paper, Typography, Grid, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

// Dummy repayment data
const payments = [
  { date: '2025-02-05', status: 'paid', amount: 200 },
  { date: '2025-02-12', status: 'upcoming', amount: 200 },
  { date: '2025-02-19', status: 'overdue', amount: 200 },
];

const RepaymentCalendar = () => {
  // Initialize with the current date/time
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(dayjs());

  // Calculate the start of the selected month and get the number of days in it
  const startOfMonth = selectedDate.startOf('month');
  const daysInMonth = startOfMonth.daysInMonth();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => startOfMonth.add(i, 'day'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ maxWidth: 900, mx: 'auto', p: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Repayment Calendar
        </Typography>

        {/* Date and Time Pickers */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <DatePicker
                label="Select Month"
                value={selectedDate}
                onChange={(newValue) => {
                  if (newValue) {
                    setSelectedDate(newValue);
                  }
                }}
                renderInput={(params) => <TextField {...params} />}
                views={['year', 'month']}
              />
            </Grid>
            <Grid item>
              <TimePicker
                label="Select Time"
                value={selectedTime}
                onChange={(newValue) => {
                  if (newValue) {
                    setSelectedTime(newValue);
                  }
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Calendar Grid */}
        <Grid container spacing={1}>
          {daysArray.map((day) => {
            const dateStr = day.format('YYYY-MM-DD');
            const payment = payments.find((p) => p.date === dateStr);
            return (
              <Grid item xs={2} sm={1} key={dateStr}>
                <Paper
                  sx={{
                    p: 1,
                    textAlign: 'center',
                    height: 80,
                    backgroundColor: payment
                      ? payment.status === 'paid'
                        ? 'success.light'
                        : payment.status === 'upcoming'
                        ? 'warning.light'
                        : 'error.light'
                      : 'background.paper',
                  }}
                >
                  <Typography variant="body2">{day.date()}</Typography>
                  {payment && (
                    <Typography variant="caption">
                      ${payment.amount}
                    </Typography>
                  )}
                </Paper>
              </Grid>
            );
          })}
        </Grid>

        <Typography variant="body1" align="center" sx={{ mt: 2 }}>
          Hover over a date to see payment details. (Tooltips can be added for more info)
        </Typography>
      </Box>
    </LocalizationProvider>
  );
};

export default RepaymentCalendar;
