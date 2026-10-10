# 🛒 বাজার দর (BazarDor)

**BazarDor** is a modern web application designed for viewing daily essential commodity prices, comparing category-based market rates, and managing user authentication and profiles seamlessly.

---

## 🛠️ Technologies Used
### **Frontend:**
- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Styling:** Tailwind CSS v4, Tailwind Turbopack
- **Icons & UI:** `react-icons`, `react-marquee-text`
- **Notifications:** `react-hot-toast`
- **Authentication:** Better Auth (`better-auth`)
- **Database:** MongoDB (`mongodb`)
- **Database Adapter:** `@better-auth/mongo-adapter`

## 🚀 Key Features
1. **🔐 Secure Authentication (Better Auth):**
   - Secure Email and Password Sign-Up and Sign-In with robust error handling.
   - Google Social Login integration for quick and easy one-click authentication.

2. **👤 User Profile Management & Dropdown UI:**
   - Dynamic header featuring conditional rendering for authenticated and unauthenticated states.
   - Professional dropdown menu and a dedicated `/profile` page to view and update user information.

3. **📊 Dynamic Market Rates & Categories:**
   - Real-time API integration to fetch and display category-wise essential commodity prices.
   - Smooth navigation and responsive data tables.

4. **📱 Fully Responsive & Mobile-Friendly Layout:**
   - Custom mobile navigation and optimized UI tailored for mobile, tablet, and desktop devices.
   - Custom-designed **404 Not Found** error page.

5. **🔔 Real-Time Feedback & Notifications:**
   - Integrated `react-hot-toast` for rich UI notifications across all user actions (sign-in, sign-up, profile updates, sign-out, and error alerts).


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
