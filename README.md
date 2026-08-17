# ReproUs Web Application

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Python_3.10+-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![Vercel Ready](https://img.shields.io/badge/Vercel-Deployment_Ready-black?logo=vercel)](https://vercel.com/)

A modern, judgment-free reproductive health learning hub and community platform built for youth and young adults. Converted from the ReproUs master mockup into a full-stack Next.js and FastAPI application.

---

## 🌟 Features

- **Home**: Organic hero, value proposition, quick-jump cards (Body Basics, Cycle Sense, Myths & Facts), and Youth Voices callout.
- **Our Story**: Origin, 3 core pillars (*Always Free, Judgment-Free, Built on Community*), and interactive historical timeline.
- **Learning Hub**:
  - Gamification bar with live streak counters, XP points, and unlocked category badges.
  - 7 comprehensive categories (Body Basics, Cycle Sense, Body Conditions, Real Talk, Mind & Self, Play Strong · Athlete Corner, The Bigger Picture).
  - Duolingo-style serpentine learning track with interactive lessons, quizzes, games, and topic modals.
- **Workshops**: 4-step preparation guide, 90-minute agenda breakdown, past session gallery, attendee reviews, upcoming sessions with interactive RSVP booking, and school visit requests.
- **Resources**: Verified free/sliding-scale clinic search by zip code, 24/7 confidential crisis hotlines, Youth Ambassador leadership application, and downloadable training modules.
- **Q&A**: Expandable accordion directory and 100% anonymous question submission modal with medical review workflow.
- **Myths & Facts**: Interactive 3D flip cards with smooth CSS animations and category filters.
- **Youth Voices**: Community quote cards and anonymous story submission board.
- **Inclusion & Accessibility**:
  - 5-language switcher (English, Español, Kreyòl, Tiếng Việt, العربية, + More).
  - Text resizing controls (`A`, `A+`, `A++`).
  - High Contrast mode toggle.
  - Reduced-motion accessibility support.

---

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Radix UI primitives, Lucide Icons.
- **Backend API**: Python FastAPI, Pydantic, Uvicorn.
- **Styling & Theme**: Custom ReproUs palette (`--blush`, `--blush-deep`, `--yellow`, `--yellow-deep`, `--berry`, `--berry-dark`, `--ink`, `--cream-card`) and typography (`Fraunces` serif + `Nunito Sans` sans-serif).
- **Deployment**: Configured for direct zero-config Vercel deployment.

---

## 💻 Local Development Setup

### 1. Frontend (Next.js)

```bash
cd reprous-webapp
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### 2. Backend (FastAPI)

```bash
cd reprous-webapp/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

FastAPI interactive Swagger documentation is available at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

---

## ☁️ Vercel Deployment Guide

To deploy the application to Vercel:

1. **Connect GitHub**:
   - Go to [vercel.com](https://vercel.com) and log into your account.
   - Click **Add New...** → **Project**.
   - Import the repository `sjMaverick26/reprous-webapp`.

2. **Project Settings**:
   - **Framework Preset**: Next.js (automatically detected).
   - **Root Directory**: `./` (leave default).
   - **Build Command**: `npm run build` (or Next.js default).
   - **Install Command**: `npm install`.

3. **Environment Variables (Optional)**:
   - If hosting the FastAPI backend on a separate cloud service (e.g. Render, Railway, AWS Lambda, GCP Cloud Run), add:
     - `NEXT_PUBLIC_API_URL`: `https://your-backend-api-url.com/api`

4. **Deploy**:
   - Click **Deploy**. Vercel will build and assign your production URL (e.g., `https://reprous-webapp.vercel.app`).
   - Any commit pushed to the `main` branch will automatically trigger a new deployment.

---

## 📚 Documentation

For complete beginner-friendly onboarding and deep dives:
- **[Developer's Guide](file:///Users/corinnelucas/dev/projects/ReproUs/reprous-webapp/docs/DEVELOPERS_GUIDE.md)**: Architecture, SDLC, PNPM commands, development vs. production environments, host/port networking, Next.js / Tailwind / Radix stack, and Vercel cloud deployment.
- **[Web Development Foundations: HTML, CSS, TypeScript & Delivery](file:///Users/corinnelucas/dev/projects/ReproUs/reprous-webapp/docs/WEB_DEVELOPMENT_FOUNDATIONS.md)**: The core trinity (HTML/CSS/JS), TypeScript, bundling pipeline, and browser delivery/hydration.
- **[Introduction to Python & FastAPI](file:///Users/corinnelucas/dev/projects/ReproUs/reprous-webapp/docs/PYTHON_GUIDE.md)**: Python foundations, data structures, virtual environments (`venv`), and FastAPI backend routes.
- **[Databases & Managing Durable State with MySQL](file:///Users/corinnelucas/dev/projects/ReproUs/reprous-webapp/docs/DATABASE_MYSQL_GUIDE.md)**: RAM vs. persistent disk, relational ER schemas, SQL CRUD operations, ACID safety, and FastAPI integration.
- **[Beginner's Guide to Git & GitHub](file:///Users/corinnelucas/dev/projects/ReproUs/reprous-webapp/docs/GIT_GUIDE.md)**: Version control, the 4 zones of Git, branching, conventional commits, pull requests, `.gitignore`, and safe undos.

---

## 📂 Project Structure

```
reprous-webapp/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root HTML & Google Fonts
│   │   ├── page.tsx                # Dynamic multi-tab page shell
│   │   └── globals.css             # Theme variables, 3D flip card & a11y styles
│   ├── components/
│   │   ├── layout/                 # Navbar, LanguageBar, Footer
│   │   ├── pages/                  # Home, Story, Hub, Workshops, Resources, QA, Myths, Voices
│   │   ├── shared/                 # ReproUsMark, AccessMini
│   │   └── ui/                     # Button, Dialog, Accordion, Card, Badge, Input, Textarea
│   ├── data/                       # Hub topics, FAQs, Myths, Workshops, Clinics, Voices
│   └── lib/                        # cn utility, API fetchers
├── backend/
│   ├── main.py                     # FastAPI app with CORS
│   ├── routers/                    # Hub, Workshops, QA, Voices, Clinics
│   └── requirements.txt
├── public/
├── tailwind.config.ts
├── next.config.mjs
├── vercel.json
└── package.json
```

---

## 📄 License

MIT License — ReproUs Project.
