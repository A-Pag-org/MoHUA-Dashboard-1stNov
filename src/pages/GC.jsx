import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { gcData, targets } from '../data/mock.js';

import StatCard from '../components/StatCard.jsx';

export default function GC() {
  const coverageData = gcData.coverageByCity.map(d => ({ city: d.city, Covered: d.covered, Remaining: d.remaining }));
  const resolutionData = gcData.resolutionRateMonthly.map(d => ({ month: d.month, Achieved: d.achieved, Remaining: Math.max(0, 100 - d.achieved) }));
  const qualityData = gcData.qualityByCity.map(d => ({ city: d.city, Quality: d.quality, Delta: d.quality - d.prevQuality }));

  const avgCoverage = Math.round(coverageData.reduce((s, d) => s + d.Covered, 0) / coverageData.length);
  const lastRes = resolutionData[resolutionData.length - 1]?.Achieved ?? 0;
  const avgQuality = Math.round(qualityData.reduce((s, d) => s + d.Quality, 0) / qualityData.length);

  return (
    <Grid container spacing={3} className="dashboard-grid">
      <Grid item xs={12} md={4}>
        <StatCard title="Avg Coverage" value={avgCoverage} suffix="%" subtitle={`Target ${Math.round(targets.resolutionRate*100)}%`} />
      </Grid>
      <Grid item xs={12} md={4}>
        <StatCard title="Resolution (Last Mo)" value={lastRes} suffix="%" subtitle={lastRes >= Math.round(targets.resolutionRate*100) ? 'On Target' : 'Below Target'} subtitleColor={lastRes >= Math.round(targets.resolutionRate*100) ? '#2e7d32' : '#c62828'} />
      </Grid>
      <Grid item xs={12} md={4}>
        <StatCard title="Avg Quality" value={avgQuality} suffix="%" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={2} className="panel panel-chart">
          <Typography variant="h6" className="panel-title">% Universe Covered by City (Cumulative)</Typography>
          <div className="chart-wrapper" role="img" aria-label="Stacked column coverage by city">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={coverageData} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="city" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Covered" stackId="a" fill="#1976d2" />
                <Bar dataKey="Remaining" stackId="a" fill="#90caf9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={2} className="panel panel-chart">
          <Typography variant="h6" className="panel-title">Resolution % (Monthly & Cumulative)</Typography>
          <div className="chart-wrapper" role="img" aria-label="Stacked column resolution percent by month">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resolutionData} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Achieved" stackId="b" fill="#2e7d32" />
                <Bar dataKey="Remaining" stackId="b" fill="#a5d6a7" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="target-note">Target: {Math.round(targets.resolutionRate * 100)}%</div>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={2} className="panel panel-chart">
          <Typography variant="h6" className="panel-title">Quality of Resolution (%)</Typography>
          <div className="chart-wrapper" role="img" aria-label="Bar chart of quality by city with delta">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={qualityData} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="city" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(v, n) => n === 'Delta' ? [`${v.toFixed(1)} pts`, 'Δ vs prev'] : [v, n]} />
                <Legend />
                <Bar dataKey="Quality" fill="#6a1b9a" />
                <Bar dataKey="Delta" fill="#ef5350" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}
