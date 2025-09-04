export const cities = [
  { id: 'DEL', name: 'Delhi' },
  { id: 'MUM', name: 'Mumbai' },
  { id: 'BLR', name: 'Bengaluru' },
  { id: 'HYD', name: 'Hyderabad' },
  { id: 'CHE', name: 'Chennai' }
];

export const categories = [
  { id: 'infra', name: 'Infra & Greening' },
  { id: 'candd', name: 'C&D & Dust' },
  { id: 'garbage', name: 'Garbage' }
];

export const months = [
  'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'
];

export const targets = {
  resolutionRate: 0.9,
  monthlyIssuesTarget: 1000
};

function randomBetween(min, max) {
  return Math.round(min + Math.random() * (max - min));
}

export const gcData = {
  coverageByCity: cities.map((c, idx) => ({
    cityId: c.id,
    city: c.name,
    covered: 70 + idx * 5,
    remaining: 100 - (70 + idx * 5)
  })),
  resolutionRateMonthly: months.map((m, i) => ({
    month: m,
    achieved: randomBetween(70, 95),
    pending: 100 - randomBetween(70, 95)
  })),
  qualityByCity: cities.map((c, i) => ({
    cityId: c.id,
    city: c.name,
    quality: randomBetween(70, 95),
    prevQuality: randomBetween(60, 90)
  }))
};

export const mohuaData = {
  percentTargetIssuesMonthly: months.map((m) => ({
    month: m,
    achieved: randomBetween(60, 120),
    remaining: randomBetween(0, 40)
  })),
  resolutionRateByCategory: categories.map((cat) => ({
    category: cat.name,
    achieved: randomBetween(70, 95),
    gap: randomBetween(0, 30)
  })),
  qualityComboMonthly: months.map((m) => ({
    month: m,
    infra: randomBetween(70, 95),
    candd: randomBetween(65, 90),
    garbage: randomBetween(60, 88)
  })),
  agencyPerformance: [
    { agency: 'Agency A', category: 'Infra & Greening', raised: 1200, resolved: 1080, speed: 3.2, quality: 92 },
    { agency: 'Agency B', category: 'C&D & Dust', raised: 900, resolved: 750, speed: 4.8, quality: 84 },
    { agency: 'Agency C', category: 'Garbage', raised: 1500, resolved: 1380, speed: 2.7, quality: 89 }
  ]
};

export const ulbData = {
  zones: ['North','South','East','West','Central'],
  resolutionSpeedVsBenchmark: ['North','South','East','West','Central'].map((z) => ({
    zone: z,
    speedDays: Number((2 + Math.random() * 4).toFixed(1)),
    benchmarkDays: 3.5
  })),
  surveyorProductivity: cities.flatMap((c) => (
    ['North','South','East','West','Central'].map((z, i) => ({
      city: c.name,
      zone: z,
      avgPerMonth: randomBetween(80, 160),
      perSurveyor: randomBetween(15, 35)
    }))
  )),
  officerProductivity: ['North','South','East','West','Central'].map((z) => ({
    zone: z,
    infra: randomBetween(70, 95),
    candd: randomBetween(60, 90),
    garbage: randomBetween(65, 92)
  })),
  shareResolved: cities.map((c) => ({
    city: c.name,
    infra: randomBetween(25, 45),
    candd: randomBetween(20, 35),
    garbage: randomBetween(25, 40)
  }))
};
