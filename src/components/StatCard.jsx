import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function StatCard({ title, value, suffix = '', subtitle, subtitleColor }) {
  return (
    <Paper elevation={1} className="stat-card">
      <Typography variant="body2" className="stat-card-title">{title}</Typography>
      <div className="stat-card-value-row">
        <span className="stat-card-value">{value}</span>
        {suffix ? <span className="stat-card-suffix">{suffix}</span> : null}
      </div>
      {subtitle ? (
        <div className="stat-card-subtitle" style={{ color: subtitleColor }}>{subtitle}</div>
      ) : null}
    </Paper>
  );
}
