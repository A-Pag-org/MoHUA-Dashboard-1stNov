import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ComposedChart, Line } from 'recharts';
import { mohuaData } from '../data/mock.js';

export default function MoHUA() {
  const percentTargetData = mohuaData.percentTargetIssuesMonthly.map(d => ({ month: d.month, Achieved: d.achieved, Remaining: d.remaining }));
  const resRateByCat = mohuaData.resolutionRateByCategory.map(d => ({ category: d.category, Achieved: d.achieved, Gap: d.gap }));
  const qualityCombo = mohuaData.qualityComboMonthly;

  return (
    <Grid container spacing={3} className="dashboard-grid">
      <Grid item xs={12}>
        <Paper elevation={2} className="panel panel-table">
          <Typography variant="h6" className="panel-title">Agency-wise Performance</Typography>
          <Table size="small" className="data-table">
            <TableHead>
              <TableRow>
                <TableCell>Agency</TableCell>
                <TableCell>Category</TableCell>
                <TableCell align="right">Raised</TableCell>
                <TableCell align="right">Resolved</TableCell>
                <TableCell align="right">Speed (days)</TableCell>
                <TableCell align="right">Quality (%)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mohuaData.agencyPerformance.map((r) => (
                <TableRow key={r.agency+r.category}>
                  <TableCell>{r.agency}</TableCell>
                  <TableCell>{r.category}</TableCell>
                  <TableCell align="right">{r.raised}</TableCell>
                  <TableCell align="right">{r.resolved}</TableCell>
                  <TableCell align="right">{r.speed}</TableCell>
                  <TableCell align="right">{r.quality}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={2} className="panel panel-chart">
          <Typography variant="h6" className="panel-title">% of Target Issues Raised/Month</Typography>
          <div className="chart-wrapper" role="img" aria-label="Stacked column % of target by month">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={percentTargetData} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Achieved" stackId="a" fill="#1565c0" />
                <Bar dataKey="Remaining" stackId="a" fill="#90caf9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={2} className="panel panel-chart">
          <Typography variant="h6" className="panel-title">Resolution Rate (%) across Categories</Typography>
          <div className="chart-wrapper" role="img" aria-label="Stacked column resolution rate across categories">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resRateByCat} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Achieved" stackId="b" fill="#2e7d32" />
                <Bar dataKey="Gap" stackId="b" fill="#a5d6a7" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={2} className="panel panel-chart">
          <Typography variant="h6" className="panel-title">Quality (%) across Categories</Typography>
          <div className="chart-wrapper" role="img" aria-label="Combination chart for quality across categories">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={qualityCombo} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="infra" fill="#6a1b9a" />
                <Bar dataKey="candd" fill="#00838f" />
                <Bar dataKey="garbage" fill="#ef6c00" />
                <Line type="monotone" dataKey="infra" stroke="#4a148c" strokeWidth={2} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}
