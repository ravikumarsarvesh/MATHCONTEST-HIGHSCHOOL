# 🚀 Deploying to Vercel

This is a static single-file project — deploying to Vercel takes about 2 minutes.

---

## Prerequisites

- A [Vercel account](https://vercel.com/signup) (free tier works)
- A [GitHub](https://github.com) account (optional but recommended)

---

## Option 1: Deploy via GitHub (Recommended)

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Waterloo Math Contest Prep Hub"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/waterloo-math-contests.git
git push -u origin main
```

### Step 2 — Connect to Vercel

1. Go to [vercel.com/new](https://vercel.com/new).
2. Click **Import Git Repository**.
3. Select your `waterloo-math-contests` repo.
4. Vercel auto-detects it as a static site. No build settings needed.
5. Click **Deploy**.

### Step 3 — Done!

Your site is live at `https://waterloo-math-contests.vercel.app` (or your custom domain).

Every push to `main` auto-deploys.

---

## Option 2: Deploy via Vercel CLI

### Step 1 — Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2 — Deploy

From the project directory:

```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No
- **Project name?** → waterloo-math-contests
- **Directory?** → `./` (current directory)
- **Override settings?** → No

### Step 3 — Production Deploy

```bash
vercel --prod
```

---

## Option 3: Drag & Drop

1. Go to [vercel.com/new](https://vercel.com/new).
2. Scroll down to **Import Third-Party Git Repository** or look for the upload option.
3. Alternatively, create a new project and use the CLI to deploy.

> Note: Vercel's web UI primarily works with Git repos. For drag-and-drop, the CLI method is simplest.

---

## Configuration

No `vercel.json` is needed for this project. Vercel serves static files by default.

If you want to add custom headers or redirects, create `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=3600" }
      ]
    }
  ]
}
```

---

## Custom Domain

1. Go to your project on [vercel.com](https://vercel.com).
2. Click **Settings** → **Domains**.
3. Add your domain (e.g., `mathprep.yourdomain.com`).
4. Update your DNS records as instructed by Vercel.

---

## Free Tier Limits

Vercel's free Hobby plan includes:
- Unlimited static site deployments
- 100 GB bandwidth/month
- Automatic HTTPS
- Global CDN
- Preview deployments for every branch

This project is well within free tier limits since it's a single HTML file (~50KB).

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Blank page | Ensure `waterloo-math-contests.html` is named `index.html` or add a redirect |
| MathJax not loading | Check internet connection — MathJax loads from CDN |
| 404 on direct URL | Rename file to `index.html` for root access |

### Rename for Vercel

For the cleanest URL, rename the file before deploying:

```bash
mv waterloo-math-contests.html index.html
```

Then `https://your-project.vercel.app/` serves the app directly.
