import React, { createContext, useContext, useMemo, useState } from 'react';
import { cities, categories, months } from '../data/mock.js';

const FiltersContext = createContext(null);

export function FiltersProvider({ children }) {
  const [userType, setUserType] = useState('GC');
  const [timeMode, setTimeMode] = useState('Monthly');
  const [month, setMonth] = useState(months[new Date().getMonth()]);
  const [cityId, setCityId] = useState(cities[0].id);
  const [categoryId, setCategoryId] = useState(categories[0].id);

  const value = useMemo(() => ({
    userType, setUserType,
    timeMode, setTimeMode,
    month, setMonth,
    cityId, setCityId,
    categoryId, setCategoryId,
    cities, categories, months
  }), [userType, timeMode, month, cityId, categoryId]);

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
}

export function useFilters() {
  const ctx = useContext(FiltersContext);
  if (!ctx) throw new Error('useFilters must be used within FiltersProvider');
  return ctx;
}
