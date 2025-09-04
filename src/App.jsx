import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const chartData = [
  { name: 'Jan', value: 40 },
  { name: 'Feb', value: 55 },
  { name: 'Mar', value: 33 },
  { name: 'Apr', value: 68 },
  { name: 'May', value: 49 },
  { name: 'Jun', value: 75 },
];

export default function App() {
  return (
    <Box className="app-shell">
      <CssBaseline />
      <AppBar position="sticky" color="primary" className="header-appbar">
        <Toolbar className="header-toolbar">
          <Typography variant="h6" component="h1" className="brand-title">
            Mohua Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className="content-container">
        <Grid container spacing={3} className="dashboard-grid">
          <Grid item xs={12} md={8}>
            <Paper elevation={2} className="panel panel-chart">
              <Typography variant="h6" className="panel-title">Monthly Trend</Typography>
              <div className="chart-wrapper" role="img" aria-label="Line chart showing monthly trend">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#1976d2" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={2} className="panel panel-summary">
              <Typography variant="h6" className="panel-title">Summary</Typography>
              <ul className="summary-list">
                <li className="summary-item"><span className="summary-label">Total:</span> <span className="summary-value">320</span></li>
                <li className="summary-item"><span className="summary-label">Average:</span> <span className="summary-value">53.3</span></li>
                <li className="summary-item"><span className="summary-label">Peak:</span> <span className="summary-value">75</span></li>
              </ul>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
