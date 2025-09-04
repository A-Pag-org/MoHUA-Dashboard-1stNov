import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { mohuaData } from '../data/mock.js';

import StatCard from '../components/StatCard.jsx';

export default function MoHUA() {
  const percentTargetData = mohuaData.percentTargetIssuesMonthly.map(d => ({ month: d.month, Achieved: d.achieved, Remaining: d.remaining }));
  const resRateByCat = mohuaData.resolutionRateByCategory.map(d => ({ category: d.category, Achieved: d.achieved, Gap: d.gap }));
  const qualityCombo = mohuaData.qualityComboMonthly;
  const qualitySeries = qualityCombo.map(d => ({ ...d, overall: Math.round((d.infra + d.candd + d.garbage)/3) }));

  const lastTarget = percentTargetData[percentTargetData.length - 1]?.Achieved ?? 0;
  const avgResRate = Math.round(resRateByCat.reduce((s,d)=>s+d.Achieved,0)/resRateByCat.length);
  const lastQuality = qualityCombo[qualityCombo.length - 1];
  const avgQuality = Math.round((lastQuality.infra + lastQuality.candd + lastQuality.garbage)/3);

  return (
    <Grid container spacing={3} className="dashboard-grid">
      <Grid item xs={12} md={4}>
        <StatCard title="% Target (Last Mo)" value={lastTarget} suffix="%" description="Share of target issues achieved last month." />
      </Grid>
      <Grid item xs={12} md={4}>
        <StatCard title="Resolution Rate (Avg)" value={avgResRate} suffix="%" description="Average resolution rate across categories." />
      </Grid>
      <Grid item xs={12} md={4}>
        <StatCard title="Quality (Last Mo)" value={avgQuality} suffix="%" description="Average quality score for the last month." />
      </Grid>
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
          <Typography variant="h6" className="panel-title panel-title-compact">Resolution Rate (%) across Categories</Typography>
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
          <div className="chart-wrapper" role="img" aria-label="Line chart with trend for quality across categories">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={qualitySeries} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="infra" name="Infra" stroke="#1e88e5" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="candd" name="C&D" stroke="#43a047" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="garbage" name="Garbage" stroke="#fb8c00" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="overall" name="Trend" stroke="#263238" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}
