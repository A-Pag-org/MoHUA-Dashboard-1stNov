import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

export default function APAG() {
  const navigate = useNavigate();
  return (
    <Grid container spacing={3} className="dashboard-grid">
      <Grid item xs={12}>
        <Paper elevation={2} className="panel panel-summary">
          <Typography variant="h6" className="panel-title">Access All Levels</Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} className="quick-links">
            <Button variant="contained" onClick={()=>navigate('/gc')}>GC</Button>
            <Button variant="contained" onClick={()=>navigate('/mohua')}>MoHUA</Button>
            <Button variant="contained" onClick={()=>navigate('/ulbs')}>City ULBs</Button>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}
