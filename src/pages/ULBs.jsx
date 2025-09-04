import React, { useMemo, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, PieChart, Pie, Cell, LineChart, Line, ComposedChart } from 'recharts';
import { ulbData } from '../data/mock.js';

const COLORS = ['#6a1b9a', '#00838f', '#ef6c00'];

import StatCard from '../components/StatCard.jsx';

function calcStats(series, accessor = (d)=>d.value) {
  let max = { value: -Infinity, month: '' }, min = { value: Infinity, month: '' }, sum = 0;
  for (const d of series) {
    const v = accessor(d);
    sum += v;
    if (v > max.value) max = { value: v, month: d.month };
    if (v < min.value) min = { value: v, month: d.month };
  }
  const avg = Math.round(sum / series.length);
  return { max, min, avg };
}

export default function ULBs() {
  const [open, setOpen] = useState(false);

  const share = useMemo(() => {
    const c = ulbData.shareResolved[0];
    return [
      { name: 'Infra & Greening', value: c.infra },
      { name: 'C&D & Dust', value: c.candd },
      { name: 'Garbage', value: c.garbage }
    ];
  }, []);

  const avgSpeed = Number((ulbData.resolutionSpeedVsBenchmark.reduce((s,d)=>s+d.speedDays,0)/ulbData.resolutionSpeedVsBenchmark.length).toFixed(1));
  const benchmark = ulbData.resolutionSpeedVsBenchmark[0]?.benchmarkDays ?? 0;
  const avgSurveyor = Math.round(ulbData.surveyorProductivity.reduce((s,d)=>s+d.avgPerMonth,0)/ulbData.surveyorProductivity.length);

  const surveyorStats = useMemo(() => calcStats(ulbData.surveyorMonthly), []);
  const officerStats = useMemo(() => calcStats(ulbData.officerMonthly, (d)=>Math.round((d.infra + d.candd + d.garbage)/3)), []);

  return (
    <Grid container spacing={3} className="dashboard-grid">
      <Grid item xs={12} md={4}>
        <StatCard title="Avg Resolution Speed" value={avgSpeed} suffix="d" subtitle={`Benchmark ${benchmark}d`} subtitleColor={avgSpeed <= benchmark ? '#2e7d32' : '#c62828'} />
      </Grid>
      <Grid item xs={12} md={4}>
        <StatCard title="Surveyor Avg / Mo" value={avgSurveyor} />
      </Grid>
      <Grid item xs={12} md={4}>
        <StatCard title="Top Share Category" value={Math.max(...share.map(s=>s.value))} suffix="%" />
      </Grid>

      <Grid item xs={12} md={3}>
        <StatCard title="Surveyor Highest" value={surveyorStats.max.value} subtitle={surveyorStats.max.month} />
      </Grid>
      <Grid item xs={12} md={3}>
        <StatCard title="Surveyor Lowest" value={surveyorStats.min.value} subtitle={surveyorStats.min.month} />
      </Grid>
      <Grid item xs={12} md={3}>
        <StatCard title="Surveyor Average" value={surveyorStats.avg} />
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper elevation={1} className="panel panel-summary" style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:'12px' }}>
          <Button variant="contained" onClick={()=>setOpen(true)}>Detailed data & analysis</Button>
        </Paper>
      </Grid>

      <Grid item xs={12} md={3}>
        <StatCard title="Officer Highest" value={officerStats.max.value} subtitle={officerStats.max.month} />
      </Grid>
      <Grid item xs={12} md={3}>
        <StatCard title="Officer Lowest" value={officerStats.min.value} subtitle={officerStats.min.month} />
      </Grid>
      <Grid item xs={12} md={3}>
        <StatCard title="Officer Average" value={officerStats.avg} />
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper elevation={1} className="panel panel-summary" style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:'12px' }}>
          <Button variant="contained" onClick={()=>setOpen(true)}>Detailed data & analysis</Button>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={2} className="panel panel-chart">
          <Typography variant="h6" className="panel-title">Resolution Speed vs Benchmark (Days)</Typography>
          <div className="chart-wrapper" role="img" aria-label="Bar chart resolution speed vs benchmark by zone">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ulbData.resolutionSpeedVsBenchmark} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zone" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="speedDays" name="Actual" fill="#1976d2" />
                <Bar dataKey="benchmarkDays" name="Benchmark" fill="#90caf9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={2} className="panel panel-chart">
          <Typography variant="h6" className="panel-title">Main 3 Category: Share of Issues Resolved</Typography>
          <div className="chart-wrapper" role="img" aria-label="Pie chart share of resolved issues by category">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={share} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={110}>
                  {share.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={2} className="panel panel-table">
          <Typography variant="h6" className="panel-title">Surveyor Productivity (Monthly)</Typography>
          <Table size="small" className="data-table">
            <TableHead>
              <TableRow>
                <TableCell>City</TableCell>
                <TableCell>Zone</TableCell>
                <TableCell align="right">Avg Issues/Month</TableCell>
                <TableCell align="right">Per Surveyor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ulbData.surveyorProductivity.slice(0, 10).map((r, idx) => (
                <TableRow key={idx}>
                  <TableCell>{r.city}</TableCell>
                  <TableCell>{r.zone}</TableCell>
                  <TableCell align="right">{r.avgPerMonth}</TableCell>
                  <TableCell align="right">{r.perSurveyor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={2} className="panel panel-table">
          <Typography variant="h6" className="panel-title">Officer Productivity (3 Major Categories)</Typography>
          <Table size="small" className="data-table">
            <TableHead>
              <TableRow>
                <TableCell>Zone</TableCell>
                <TableCell align="right">Infra & Greening</TableCell>
                <TableCell align="right">C&D & Dust</TableCell>
                <TableCell align="right">Garbage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ulbData.officerProductivity.map((r) => (
                <TableRow key={r.zone}>
                  <TableCell>{r.zone}</TableCell>
                  <TableCell align="right">{r.infra}</TableCell>
                  <TableCell align="right">{r.candd}</TableCell>
                  <TableCell align="right">{r.garbage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>

      <Dialog fullWidth maxWidth="md" open={open} onClose={()=>setOpen(false)}>
        <DialogTitle>Productivity analysis</DialogTitle>
        <DialogContent>
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ulbData.surveyorMonthly} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" name="Surveyor" stroke="#1976d2" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{ height: 300, marginTop: 16 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={ulbData.officerMonthly} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="infra" stroke="#6a1b9a" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="candd" stroke="#00838f" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="garbage" stroke="#ef6c00" strokeWidth={2} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}
