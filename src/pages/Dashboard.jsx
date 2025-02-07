// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Box, Paper, Typography, LinearProgress, Grid } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [status, setStatus] = useState(0);

  // Dummy data for a bar chart (for example, approved vs. pending loans over the last 6 months)
  const chartData = {
    labels: ['Sept', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
    datasets: [
      {
        label: 'Approved Loans',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(76, 175, 80, 0.6)', // green-ish
      },
      {
        label: 'Pending Loans',
        data: [2, 3, 20, 5, 1, 4],
        backgroundColor: 'rgba(255, 152, 0, 0.6)', // orange-ish
      },
    ],
  };

  // Simulate a loan progress update
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus((prev) => {
        const nextStatus = prev < 100 ? prev + 25 : 100;
        toast.info(`Loan status updated: ${nextStatus}%`);
        return nextStatus;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Loan Status Dashboard
      </Typography>

      <Box sx={{ my: 3 }}>
        <Typography variant="subtitle1">Application Progress:</Typography>
        <LinearProgress
          variant="determinate"
          value={status}
          sx={{ height: 10, borderRadius: 5 }}
        />
        <Typography variant="body1" align="center" sx={{ mt: 1 }}>
          {status === 0 && 'Submitted'}
          {status > 0 && status < 100 && 'Under Review'}
          {status === 100 && 'Approved'}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Loan Applications Overview
            </Typography>
            <Bar data={chartData} options={{ maintainAspectRatio: true }} />
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Document Verification Status
          </Typography>
          <Typography variant="body1">
            Document: <span style={{ color: 'green', fontWeight: 'bold' }}>Approved</span>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
