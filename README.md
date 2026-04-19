# 🏆 University of Waterloo Math Contest Prep Hub

Single-page HTML app for CEMC contest prep: Pascal (Gr 9), Cayley (Gr 10), Fermat (Gr 11).

## 📁 Files
```
waterloo-math-contests.html   ← The app
README.md                     ← This file
vercel.md                     ← Hosting guide
```

## ✨ Features

| Tab | Description |
|-----|-------------|
| 📄 Papers | Official CEMC links 2015–2025 with difficulty badges |
| 🃏 Cards | 30 flip cards by contest/topic with hints |
| 📝 Mock Test | Category-based: Pascal only, Cayley only, Fermat only, or Mixed. 30 random Qs, 60 min timer, pause/resume |
| 📋 Past Paper Tests | Year-wise mock tests for each contest (2015–2025). Pick contest + year, take full test |
| 💡 Solutions | Step-by-step worked problems with source refs |
| 📐 Cheat Sheet | 25+ formulas with "When to Use" and "Shortcut" columns |
| 📈 Progress | Full test history, per-contest ratings, wrong question re-practice list |

## 🆕 Key Features

- **Category filtering** — Mock tests are contest-specific (Pascal only, Cayley only, etc.) or Mixed
- **Year-wise past paper tests** — Select any year (2015–2025) for any contest
- **Verbatim questions** — Questions match official CEMC papers word-for-word with source references
- **Pause/Resume** — Navigate away mid-test, come back later. Progress auto-saves to localStorage
- **Step-by-step solutions** — Every question shows detailed solution + rationale after submission
- **Email results** — Prompt to email results after each test
- **Full test history** — Progress tab shows every test taken with date, score, CEMC rating
- **Wrong question re-practice** — Click any past test to see wrong questions with correct answers and explanations
- **CEMC-style grading** — Distinction (90%+), Merit (70%+), Median (50%+), Developing (<50%)
- **Areas of improvement** — Weak topics identified with study advice after each test
- **Answer rationale** — Every question explains WHY the answer is correct
- **Source references** — Every question cites origin (e.g., "Pascal 2025 Q1")

## 📊 CEMC Grading

| Rating | Score | Meaning |
|--------|-------|---------|
| Distinction | 90%+ | Top ~10% |
| Merit | 70%+ | Top ~25% |
| Median | 50%+ | Around median |
| Developing | <50% | Focus on fundamentals |

## 📖 Quick Start

1. Open `waterloo-math-contests.html` in any browser
2. **Mock Test** → Pick contest category + difficulty → Start
3. **Past Paper Tests** → Pick contest + year → Start
4. After submission: review solutions, check improvements, email results
5. **Progress** → See all past tests, click to expand wrong questions

## 🚀 Hosting

See [vercel.md](vercel.md) for Vercel deployment (rename file to `index.html` first).

## 📚 Official Resources

- [CEMC Past Contests](https://cemc.uwaterloo.ca/resources/past-contests)
- [CEMC Problem Set Generator](https://cemc.uwaterloo.ca/resources/problem-set-generator)
