# WedVibe - Animated Digital Invitation SaaS 🌸

WedVibe is a production-ready, highly dynamic digital invitation SaaS platform tailored for the Indian wedding market. Built with Next.js 14+, Supabase, Razorpay, and modern animation libraries, it allows customers and wedding planners to generate and share stunning animated web-based invitations.

## Features

- **Beautiful Animations:** Smooth page transitions and element animations powered by Framer Motion and GSAP.
- **Dual User Roles:**
  - **Customers:** Buy individual templates via UPI/Cards (powered by Razorpay).
  - **Wedding Planners:** Purchase bulk credit packs at a discount to generate cards for multiple clients.
- **Real-time Customization:** Easy-to-use form to customize couple names, event details, and upload photos.
- **Rich Templates:** Various tiered templates (Basic, Standard, Premium) catering to different aesthetics like "Rose Bloom", "Royal Dark", and "Minimal Blush".
- **Admin Dashboard:** Monitor revenue, user registrations, manage templates, and adjust credit balances.
- **Secure Authentication:** Supabase Auth for email/password and social logins.
- **Next.js 16 Ready:** Fully compliant with Next.js App Router and the latest `proxy.ts` middleware conventions.

## Tech Stack

- **Framework:** Next.js 14+ (App Router, TypeScript)
- **Styling:** Tailwind CSS + shadcn/ui + GSAP + Framer Motion
- **Database & Auth:** Supabase (PostgreSQL, Row Level Security)
- **Payments:** Razorpay (UPI, Cards, NetBanking - India)
- **Email:** Resend (for order confirmations and magic links)

## Getting Started

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Set up your environment variables based on `.env.example`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

RESEND_API_KEY=your_resend_api_key
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Setup

Execute the provided SQL schemas in your Supabase SQL Editor to set up:
- `profiles` table for user management and credits.
- `templates` table for invitation designs.
- `orders` and `customizations` for purchases and card details.
- `credit_transactions` for tracking planner credits.
- RLS Policies to secure user data.

## Deployment

This project is optimized for deployment on Vercel. 
Ensure all environment variables are added to your Vercel project settings before deploying.

```bash
npm run build
npm start
```
