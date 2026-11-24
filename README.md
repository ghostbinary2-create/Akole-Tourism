<<<<<<< HEAD
# Akole Tourism & Tour Package Management System

A complete full-stack web application built for exploring tourist attractions, booking tour packages, and managing operations for **Akole Taluka, Ahmednagar, Maharashtra** (home to Kalsubai Peak, Bhandardara Lake, Sandhan Valley, Harishchandragad, and monsoon waterfalls).

---

## Tech Stack

### Frontend (`/client`)
- **Framework**: Next.js 14 (React) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Glassmorphism, Custom HSL themes
- **Icons**: Lucide React
- **Analytics & Maps**: Recharts, Leaflet & React-Leaflet
- **HTTP Client**: Axios with JWT Interceptor

### Backend (`/server`)
- **Runtime**: Node.js & Express.js
- **Database ORM**: Prisma ORM
- **Database Engine**: SQLite / MySQL (Configured for dev & production)
- **Security**: JWT Authentication, bcrypt password hashing, CORS, input validation

---

## Features Overview

1. **Landing Page**:
   - Modern Sahyadri-themed Hero section with CTA buttons
   - Popular Tourist Places preview
   - Curated Tour Packages listing
   - Interactive Leaflet Map showing markers for Bhandardara, Kalsubai, Harishchandragad, Sandhan Valley, Ratangad, etc.
   - Why Choose Us section (certified guides, stargazing, village thali)
   - Photo Gallery modal preview
   - Customer Testimonials
   - About Akole (Geography, biodiversity sanctuary, history)
   - Contact form & Tourism office information

2. **Tourist Places Module** (`/places`, `/places/[id]`):
   - Grid listing with search filter & map view toggle
   - Detailed place view featuring image galleries, best time to visit, entry fees, activities, location coordinates, and associated tour packages.

3. **Tour Package Module** (`/packages`, `/packages/[id]`):
   - Filter packages by search query, destination, max budget slider, and duration
   - Package card details with available seat counter, inclusions, day-by-day itinerary accordion, traveler reviews, and star ratings.

4. **User Authentication & Dashboard** (`/login`, `/register`, `/dashboard`):
   - Registration with full validation
   - Login with JWT token storage
   - User Dashboard with tabs: **My Bookings**, **Profile & Password Management**, and **Notifications Bell**.

5. **Booking Flow & Mock Payment Module**:
   - Multi-step booking modal: Select Date & Travelers count &rarr; Booking Summary &rarr; Mock Payment (UPI, Credit Card, Net Banking) &rarr; Instant Confirmation
   - Generates unique Booking ID (e.g. `AKL202600001`)
   - Seat count auto-deduction and printable receipt modal.

6. **Admin Control Panel** (`/admin`):
   - **Dashboard Overview**: Metrics cards (Total Users, Places, Packages, Bookings, Revenue)
   - **Recharts Analytics**: Monthly Bookings, Monthly Revenue, Popular Packages, User Registrations
   - **User Management**: View, search, filter, block/unblock, delete user accounts
   - **Tourist Place CRUD**: Add, edit, delete places
   - **Tour Package CRUD**: Create, update price, capacity, available seats, dates, itinerary
   - **Booking Management**: Confirm, cancel, or mark bookings completed
   - **Review Moderation**: Approve or delete user reviews
   - **Broadcast Notifications**: Send announcements to all registered users.

---

## Default Credentials

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@akole.com` | `admin123` |
| **Sample User** | `user@akole.com` | `user123` |

---

## Project Structure

```
d:\Travel Agency
├── client/                     # Next.js App Router Frontend
│   ├── src/
│   │   ├── app/                # Pages: /, /places, /packages, /login, /register, /dashboard, /admin
│   │   ├── components/         # Landing, Places, Packages, BookingModal, LeafletMap, Admin Panel
│   │   ├── context/            # AuthContext
│   │   ├── lib/                # Axios API client
│   │   └── types/              # TypeScript interfaces
│   └── package.json
│
└── server/                     # Express Backend
    ├── controllers/            # Auth, User, Place, Package, Booking, Payment, Review, Notification, Stats
    ├── middleware/             # Auth, Admin, Error Handler
    ├── prisma/                 # schema.prisma & seed.js
    ├── routes/                 # REST API endpoints
    ├── utils/                  # JWT token helpers, Booking ID generator
    ├── server.js               # Main Express entry point
    └── .env                    # Environment config
```

---

## Quick Setup Instructions

### 1. Backend Setup (`/server`)

```bash
cd server

# Install dependencies
npm install

# Setup Database & Run Seed Script
npx prisma db push
node prisma/seed.js

# Start Express Server (Runs on http://localhost:5000)
npm run dev
```

### 2. Frontend Setup (`/client`)

```bash
cd client

# Install dependencies
npm install

# Start Next.js Development Server (Runs on http://localhost:3000)
npm run dev
```

---

## API Documentation Reference

- **Auth**: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- **Users**: `GET /api/users`, `PUT /api/users/:id`, `PUT /api/users/:id/status`, `DELETE /api/users/:id`
- **Places**: `GET /api/places`, `GET /api/places/:id`, `POST /api/places`, `PUT /api/places/:id`, `DELETE /api/places/:id`
- **Packages**: `GET /api/packages`, `GET /api/packages/:id`, `POST /api/packages`, `PUT /api/packages/:id`, `DELETE /api/packages/:id`
- **Bookings**: `POST /api/bookings`, `GET /api/bookings/my`, `GET /api/bookings/:id`, `PUT /api/bookings/:id/cancel`
- **Admin Bookings**: `GET /api/bookings/admin/all`, `PUT /api/bookings/admin/:id/confirm`, `PUT /api/bookings/admin/:id/complete`
- **Payments**: `POST /api/payments`, `GET /api/payments/:id`
- **Reviews**: `POST /api/reviews`, `GET /api/reviews/package/:packageId`, `PUT /api/admin/reviews/:id/approve`
- **Notifications**: `GET /api/notifications`, `PUT /api/notifications/:id/read`, `POST /api/notifications/broadcast`
- **Stats**: `GET /api/stats/admin`
=======
# Akole-Tourism
A full-stack tourism and tour package management system for Akole, Maharashtra.
>>>>>>> 80c89a2761292e5bdb80e44a5fc55a80f2fd05fa
