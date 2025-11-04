# ALX Listing App – Deployed  

**Live URL:** https://alx-listing-app-**YOUR_STUDENT_ID**.vercel.app  

A fully-functional **Airbnb clone** built with **Next.js**, **React**, **TypeScript**, **Axios**, and **Expo**.  
All data is **live** – fetched from a real API, bookable, reviewable, and **production-ready** on Vercel.

[![Next.js](https://img.shields.io/badge/Next.js-13+-000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios)](https://axios-http.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000?style=for-the-badge&logo=vercel)](https://vercel.com)

---

## Project Overview

**Milestone 6** – **Deploy the ALX Listing App** to a public cloud host.  
All pages (listings, property details, booking, reviews) now pull **real data** via a configured API and work flawlessly in production.

---

## Key Features (Live)

| Feature | Description |
|---------|-------------|
| **Dynamic Listings** | `GET /properties` → rendered on `/` |
| **Property Detail** | `GET /properties/:id` → `/property/[id]` |
| **Booking Flow** | `POST /bookings` → `/booking` with validation |
| **Reviews** | `GET /properties/:id/reviews` → inside property page |
| **Responsive UI** | Mobile-first, tested on phone, tablet, desktop |
| **Production Build** | `npm run build` passes, no errors |
| **Secure Env Vars** | `NEXT_PUBLIC_API_BASE_URL` stored safely |

---

## File Structure (Deployed)

```
alx-listing-app-deployed/
├─ .env.local          # (git-ignored) API base URL
├─ .gitignore
├─ pages/
│   ├─ index.tsx       # Home – listings
│   ├─ property/[id].tsx
│   ├─ booking/index.tsx
│   └─ _app.tsx
├─ components/
│   └─ property/ReviewSection.tsx
├─ public/
│   └─ (static assets)
├─ next.config.mjs
├─ package.json
└─ README.md
```

---

## Setup & Local Development

```bash
# 1. Clone the deployed repo
git clone https://github.com/YOUR_USERNAME/alx-listing-app-deployed.git
cd alx-listing-app-deployed

# 2. Install deps
npm install

# 3. Add your API URL
cp .env.example .env.local
# edit .env.local → NEXT_PUBLIC_API_BASE_URL=https://your-api.com

# 4. Run locally
npm run dev
```

Open http://localhost:3000

---

## Production Build & Deploy (Vercel)

```bash
# Test production build
npm run build   # must succeed
npm run start   # optional local prod server
```

### Deploy Steps (already done)

1. **Connected** repo to Vercel → **Framework Preset:** *Next.js*  
2. Added **Environment Variable** `NEXT_PUBLIC_API_BASE_URL` in Vercel dashboard  
3. Click **Deploy** → live URL generated  

> **Live URL:** `https://alx-listing-app-YOUR_STUDENT_ID.vercel.app`

---

## Verification Checklist (Live)

- [x] Homepage loads all properties  
- [x] Property detail page works for any ID  
- [x] Booking form submits → success toast  
- [x] Reviews load under each property  
- [x] Fully responsive (mobile, tablet, desktop)  
- [x] No console errors / 404s  
- [x] Lighthouse PWA score ≥ 90 (installable, offline-ready)  

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL of the backend (e.g., `https://api.alx-listings.com`) |

> **Never** commit `.env.local`. It is listed in `.gitignore`.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| **CORS errors** | Ensure backend allows `https://alx-listing-app-*.vercel.app` |
| **Build fails** | Run `npm run build` locally, fix TypeScript / import errors |
| **Images 404** | Add domain to `next.config.mjs` → `images.domains` |
| **Env var missing** | Re-add in Vercel *Project Settings → Environment Variables* |

---

## Future Enhancements

- Push notifications for booking confirmations  
- User authentication (OAuth)  
- Offline caching with Service Workers (full PWA)  
- Server-side rendering of reviews for SEO  

---

## Author

**Thubelihle Dlamini** – [@Dwaynemaster007](https://github.com/Dwaynemaster007)  

---

<div align="center">

### Deployed with love by Dwaynemaster007  

*Your next stay is just a click away – live, fast, and beautiful!*

[![GitHub](https://img.shields.io/badge/GitHub-Dwaynemaster007-181717?style=for-the-badge&logo=github)](https://github.com/Dwaynemaster007)

**Tags:** `nextjs` `react` `typescript` `axios` `vercel` `airbnb-clone` `alx-frontend` `deployment`

</div>