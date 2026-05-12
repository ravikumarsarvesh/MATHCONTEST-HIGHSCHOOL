# Spec: Add New Contest Year (e.g., 2027)

## Overview
Step-by-step guide to add a new year's Pascal, Cayley, and Fermat contest papers to MathArena without breaking existing functionality.

## Prerequisites
- CEMC has published the new year's contest papers at: `https://cemc.uwaterloo.ca/sites/default/files/documents/YEAR/YEARContestName.html`
- You have verified the URLs work (test in browser first)

---

## Step 1: Verify CEMC URLs

Test these URLs in your browser before starting:
```
https://cemc.uwaterloo.ca/sites/default/files/documents/2027/2027PascalContest.html
https://cemc.uwaterloo.ca/sites/default/files/documents/2027/2027PascalSolution.html
https://cemc.uwaterloo.ca/sites/default/files/documents/2027/2027CayleyContest.html
https://cemc.uwaterloo.ca/sites/default/files/documents/2027/2027CayleySolution.html
https://cemc.uwaterloo.ca/sites/default/files/documents/2027/2027FermatContest.html
https://cemc.uwaterloo.ca/sites/default/files/documents/2027/2027FermatSolution.html
```

If any give 404, note which ones need a different folder path (CEMC sometimes uses `/2026/` or `/2025/` for older papers). Update `cemcFolder()` function accordingly.

---

## Step 2: Update Year Range

In BOTH `waterloo-math-contests.html` AND `index.html`:

1. Find `for(var y=2026;y>=2015;y--)` in the PAPERS loop
2. Change `2026` to `2027`
3. Find the year dropdown population: `for(var y=2026;y>=2015;y--)`
4. Change `2026` to `2027`

---

## Step 3: Choose Unique Question IDs

ID scheme (DO NOT reuse existing IDs):
- Pascal 2027: IDs **5001-5025**
- Cayley 2027: IDs **5101-5125**
- Fermat 2027: IDs **5201-5225**

CRITICAL: Fermat 2015 already uses IDs 4001-4025 (same as Pascal 2026). Never reuse IDs across contests.

---

## Step 4: Add Questions

For each contest (Pascal, Cayley, Fermat):

1. Fetch the CEMC contest page HTML
2. Extract all 25 questions with EXACT wording from CEMC
3. Extract all 5 answer options per question
4. Determine correct answer (A=0, B=1, C=2, D=3, E=4)
5. Add solution and rationale

Format each question as:
```javascript
{id:5001,c:'pascal',t:'TYPE',d:'DIFFICULTY',q:'EXACT CEMC QUESTION TEXT',o:['A','B','C','D','E'],a:CORRECT_INDEX,sol:'SHORT SOLUTION',rat:'DETAILED RATIONALE',ref:'Pascal 2027 Q1',year:2027,qnum:1},
```

Where:
- `t` = topic: 'algebra', 'geometry', 'number', 'probability', 'combinatorics'
- `d` = difficulty: Q1-Q10 = 'easy', Q11-Q20 = 'medium', Q21-Q25 = 'hard'
- `a` = 0-indexed correct answer (A=0, B=1, C=2, D=3, E=4)

---

## Step 5: Insert Questions in QB Array

In BOTH files, add the new questions BEFORE the 2026 entries:

```javascript
// ──── PASCAL 2027 (Q1-Q25) ────
{id:5001, ...},
{id:5002, ...},
...
{id:5025, ...},
// ──── PASCAL 2026 (Q1-Q25) ────
```

Same for Cayley and Fermat sections.

---

## Step 6: Update Title (if applicable)

If the app title says "2015-2026", update to "2015-2027".

---

## Step 7: Bump Version

In BOTH files, find:
```javascript
if(localStorage.getItem('_v')!=='X.X'){localStorage.clear();localStorage.setItem('_v','X.X');}
```
Increment the version number (e.g., '2.4' → '2.5'). This forces localStorage clear for all users so the new questions load cleanly.

---

## Step 8: Test Checklist

After adding questions, verify ALL of these work:

- [ ] Home page shows 2027 papers for Pascal, Cayley, Fermat
- [ ] "View Paper" button opens correct CEMC page
- [ ] "Solutions" button opens correct CEMC solutions page
- [ ] Exam Practice → select 2027 → shows 25 questions in Q1-Q25 order
- [ ] Mock Test timer starts and counts down
- [ ] Answer selection works (click highlights)
- [ ] Submit shows results
- [ ] Solutions tab → 2027 shows questions with solutions
- [ ] Questions display with full CEMC text (not shortened)
- [ ] "View Official CEMC Paper" button in questions works
- [ ] No JavaScript errors in console (F12)
- [ ] Existing 2015-2026 papers still work
- [ ] Progress tab reset button works

---

## Step 9: Sync Files

ALWAYS keep `waterloo-math-contests.html` and `index.html` in sync:
- Same questions in same order
- Same PAPERS URLs
- Same version number
- Same `cemcFolder()` function

---

## Common Pitfalls to Avoid

1. **ID collisions** — Never reuse IDs. Check existing ID ranges first.
2. **Subset vs full** — Always add ALL 25 questions, never a subset.
3. **Question order** — Must be Q1-Q25 in array order.
4. **Shortened text** — Use EXACT CEMC wording, never paraphrase.
5. **Special characters** — Escape `$` as `\\$`, use `\\(` for LaTeX.
6. **Unicode** — Avoid `≥` `≤` characters in JS strings. Use `\\geq` `\\leq` in LaTeX.
7. **localStorage** — Always bump version after question changes.
8. **Both files** — Every change must go in BOTH HTML files.
9. **Don't touch timer code** — The timer breaks from stale localStorage, not code changes.
10. **Test in incognito** — If timer seems broken, test in incognito window first.

---

## File Locations

- Main app: `waterloo-math-contests.html` (Vercel deployment)
- Secondary: `index.html` (same content, alternate entry)
- Local papers: `papers/` folder (for papers CEMC doesn't host)
- Images: `Images/` folder (for screenshot-based diagrams)

---

## Diagram Handling

The app does NOT render diagrams inline. Instead:
- Every question shows: "*Some questions may contain diagrams...*"
- Every question has: "View Official CEMC Paper" button
- No SVGs, no images, no diagram extraction needed
- Just add questions with text — diagrams are viewed on CEMC site
