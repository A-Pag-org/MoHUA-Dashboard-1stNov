import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useFilters } from '../state/FiltersContext.jsx';

export default function Layout() {
  const location = useLocation();
  const { userType, setUserType, timeMode, setTimeMode, month, setMonth, cityId, setCityId, categoryId, setCategoryId, cities, categories, months } = useFilters();

  const currentTab = location.pathname.startsWith('/mohua') ? 'MoHUA'
    : location.pathname.startsWith('/ulbs') ? 'ULBs'
    : location.pathname.startsWith('/apag') ? 'A-PAG' : 'GC';

  return (
    <Box className="app-shell">
      <AppBar position="sticky" color="primary" className="header-appbar">
        <Toolbar className="header-toolbar">
          <Typography variant="h6" component="h1" className="brand-title">MoHUA Dashboard</Typography>
          <Box sx={{ flex: 1 }} />
          <FormControl size="small" className="filter-control">
            <InputLabel id="user-type-label">User</InputLabel>
            <Select labelId="user-type-label" label="User" value={userType} onChange={(e)=>setUserType(e.target.value)}>
              <MenuItem value="GC">GC</MenuItem>
              <MenuItem value="MoHUA">MoHUA</MenuItem>
              <MenuItem value="ULBs">City ULBs</MenuItem>
              <MenuItem value="A-PAG">A-PAG</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" className="filter-control">
            <InputLabel id="time-mode-label">Time</InputLabel>
            <Select labelId="time-mode-label" label="Time" value={timeMode} onChange={(e)=>setTimeMode(e.target.value)}>
              <MenuItem value="Monthly">Monthly</MenuItem>
              <MenuItem value="Cumulative">Cumulative</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" className="filter-control">
            <InputLabel id="month-label">Month</InputLabel>
            <Select labelId="month-label" label="Month" value={month} onChange={(e)=>setMonth(e.target.value)}>
              {months.map((m)=>(<MenuItem key={m} value={m}>{m}</MenuItem>))}
            </Select>
          </FormControl>
          <FormControl size="small" className="filter-control">
            <InputLabel id="city-label">City</InputLabel>
            <Select labelId="city-label" label="City" value={cityId} onChange={(e)=>setCityId(e.target.value)}>
              {cities.map((c)=>(<MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>))}
            </Select>
          </FormControl>
          <FormControl size="small" className="filter-control">
            <InputLabel id="category-label">Category</InputLabel>
            <Select labelId="category-label" label="Category" value={categoryId} onChange={(e)=>setCategoryId(e.target.value)}>
              {categories.map((c)=>(<MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>))}
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" className="content-container">
        <Tabs value={currentTab} className="role-tabs" variant="scrollable" scrollButtons allowScrollButtonsMobile>
          <Tab label="GC" value="GC" component={Link} to="/gc" />
          <Tab label="MoHUA" value="MoHUA" component={Link} to="/mohua" />
          <Tab label="City ULBs" value="ULBs" component={Link} to="/ulbs" />
          <Tab label="A-PAG" value="A-PAG" component={Link} to="/apag" />
        </Tabs>
        <Outlet />
      </Container>
    </Box>
  );
}
