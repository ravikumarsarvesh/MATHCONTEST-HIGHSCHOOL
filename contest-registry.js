// ═══════════════════════════════════════════════════════════
// CONTEST REGISTRY — Single source of truth for available contests/years
// ═══════════════════════════════════════════════════════════
// HOW TO ADD A NEW YEAR:
// 1. Generate the data file using admin-update.html
// 2. Save the generated file into /data folder (e.g., data/data-euclid-2027.js)
// 3. Add the year number to the correct contest's "years" array below
// 4. Push to GitHub — Vercel deploys automatically
// ═══════════════════════════════════════════════════════════
window.MATH_ARENA_REGISTRY = {
  contests: {
    pascal: {
      name: "Pascal",
      grade: 9,
      type: "mcq",
      questions: 25,
      duration: "60 min",
      color: "#4CAF50",
      years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015]
    },
    cayley: {
      name: "Cayley",
      grade: 10,
      type: "mcq",
      questions: 25,
      duration: "60 min",
      color: "#2196F3",
      years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015]
    },
    fermat: {
      name: "Fermat",
      grade: 11,
      type: "mcq",
      questions: 25,
      duration: "60 min",
      color: "#FF9800",
      years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015]
    },
    euclid: {
      name: "Euclid",
      grade: 12,
      type: "written",
      questions: 10,
      duration: "2.5 hrs",
      color: "#9C27B0",
      years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016]
    }
  }
};
