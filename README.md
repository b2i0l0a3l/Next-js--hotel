<div align="center">

# 🏨 Hotel Management System

**Manage, book, and discover premium hotels worldwide with ease.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Stripe](https://img.shields.io/badge/Stripe-22-635BFF?style=for-the-badge&logo=stripe)](https://stripe.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

---

A full-stack hotel booking platform built with **Next.js 16**, **React 19**, and **Stripe** for seamless payment processing. Hotel owners can list properties and manage rooms, while guests can search, explore, and book their perfect stay — all within a modern, responsive interface.

</div>

---

## ✨ Features

### 🔐 Authentication & Authorization
- Secure authentication powered by **Clerk**
- Role-based access for hotel owners and guests
- Protected API routes and server-side session validation

### 🏢 Hotel Management
- **Create, update, and delete** hotel listings
- Rich hotel profiles with multiple image uploads via **UploadThing**
- Detailed amenity tracking (Wi-Fi, pool, spa, gym, restaurant, parking, and more)
- Location-based filtering by **country, state, and city**
- Full-text search across hotel listings

### 🛏️ Room Management
- Add and manage multiple rooms per hotel
- Configurable room details: bed count, guest capacity, bathroom count
- Room amenities (city view, mountain view, balcony, air conditioning, soundproofing)
- Individual room pricing with optional breakfast add-on

### 💳 Booking & Payments
- Integrated **Stripe** payment processing
- Create and update payment intents for flexible booking flows
- Date range picker for check-in/check-out selection
- Booking history tracking with payment status
- Idempotent payment handling (prevents duplicate charges)

### 🎨 User Experience
- **Dark/Light theme** toggle with `next-themes`
- Fully responsive design with **Tailwind CSS 4**
- Toast notifications via **Sonner**
- Form validation with **Zod** and **React Hook Form**
- Modern UI components built with **Radix UI** and **shadcn/ui**

---

## 🛠️ Tech Stack

| Layer            | Technology                                    |
| ---------------- | --------------------------------------------- |
| **Framework**    | Next.js 16 (App Router)                       |
| **Language**     | TypeScript 5                                  |
| **UI Library**   | React 19                                      |
| **Styling**      | Tailwind CSS 4                                |
| **Components**   | shadcn/ui + Radix UI                          |
| **Database**     | PostgreSQL                                    |
| **ORM**          | Prisma 6                                      |
| **Auth**         | Clerk                                         |
| **Payments**     | Stripe                                        |
| **File Upload**  | UploadThing                                   |
| **State**        | Zustand                                       |
| **Forms**        | React Hook Form + Zod                         |
| **Notifications**| Sonner                                        |

---

## 📁 Project Structure

```
hotel/
├── app/                          # Next.js App Router
│   ├── (clerk)/                  # Auth pages (sign-in, sign-up)
│   ├── api/                      # API Routes
│   │   ├── create-payment-intent/  # Stripe payment processing
│   │   ├── hotel/                  # Hotel CRUD operations
│   │   ├── room/                   # Room CRUD operations
│   │   └── uploadthing/            # File upload endpoint
│   ├── book-room/                # Booking checkout page
│   ├── hotel/                    # Hotel creation/editing
│   ├── hotel-details/            # Hotel detail view
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page (hotel listings)
│
├── components/                   # Shared UI components
│   ├── layout/                   # NavBar, page structure
│   ├── providers/                # Theme, context providers
│   ├── shared/                   # Reusable components (Container)
│   ├── toggles/                  # Theme toggle
│   └── ui/                       # shadcn/ui primitives
│
├── features/                     # Feature-based modules
│   ├── hotel/                    # Hotel feature
│   │   ├── actions/              # Server actions
│   │   ├── components/           # Hotel-specific components
│   │   ├── type/                 # TypeScript types
│   │   ├── utils/                # Utility functions
│   │   └── validator/            # Zod schemas
│   ├── hotel-details/            # Hotel details page client
│   └── room/                     # Room feature
│       ├── components/           # Room cards, forms, buttons
│       ├── type/                 # TypeScript types
│       ├── utils/                # Utility functions
│       └── validator/            # Zod schemas
│
├── hooks/                        # Custom React hooks
│   ├── useBookRoom.ts            # Zustand booking store
│   ├── useHandleNavigation.ts    # Navigation utility
│   ├── useLocation.ts            # Country/state/city data
│   └── useZodForm.ts             # Typed form hook
│
├── lib/                          # Core utilities
│   ├── Stripe.ts                 # Stripe service wrapper
│   ├── auth.ts                   # Auth utilities
│   ├── prismadb.ts               # Prisma client singleton
│   └── uploadthing.ts            # UploadThing config
│
└── prisma/
    └── schema.prisma             # Database schema
```

---

## 🗄️ Database Schema

```mermaid
erDiagram
    Hotel ||--o{ Room : has
    Hotel ||--o{ Booking : has
    Room ||--o{ Booking : has

    Hotel {
        string id PK
        string userId
        string title
        string description
        string[] images
        string country
        string state
        string city
        boolean gym
        boolean pool
        boolean spa
        boolean freeWifi
        boolean restaurant
        boolean parking
        datetime createdAt
        datetime updatedAt
    }

    Room {
        string id PK
        string title
        string description
        int bedCount
        int guestCount
        int bathRoomCount
        string image
        int breakFastPrice
        int roomPrice
        boolean cityView
        boolean mountainView
        boolean balcony
        string hotelId FK
    }

    Booking {
        string id PK
        string username
        string userId
        string userEmail
        string roomId FK
        string hotelId FK
        string hotelownerId
        datetime startDate
        datetime endDate
        string currency
        int totalPrice
        boolean paymentStatus
        string paymentIntentId
        datetime bookedAt
    }
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **PostgreSQL** database
- **Stripe** account (test mode)
- **Clerk** account
- **UploadThing** account

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/hotel-management.git
cd hotel-management/hotel
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/hotel_db"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxx

# UploadThing
UPLOADTHING_TOKEN=xxxxx
```

### 4. Set Up the Database

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📡 API Endpoints

| Method   | Endpoint                      | Description                    |
| -------- | ----------------------------- | ------------------------------ |
| `POST`   | `/api/hotel`                  | Create a new hotel             |
| `PATCH`  | `/api/hotel/:hotelId`         | Update hotel details           |
| `DELETE` | `/api/hotel/:hotelId`         | Delete a hotel                 |
| `POST`   | `/api/room`                   | Create a new room              |
| `PATCH`  | `/api/room/:roomId`           | Update room details            |
| `DELETE` | `/api/room/:roomId`           | Delete a room                  |
| `POST`   | `/api/create-payment-intent`  | Create or update payment       |
| `POST`   | `/api/uploadthing`            | Upload files                   |

---

## 🔑 Key Design Decisions

- **Feature-Based Architecture:** Components, types, validators, and utilities are co-located by feature (`hotel`, `room`) rather than by type, making the codebase scalable and easy to navigate.
- **Zustand for Booking State:** Lightweight global state management for the booking flow, avoiding prop drilling across deeply nested components.
- **Stripe Service Wrapper:** A dedicated `Strip` class encapsulates all Stripe logic (`create`, `update`, `getById`), keeping API routes clean and focused on orchestration.
- **Zod + React Hook Form:** Type-safe form validation with schema inference, ensuring data integrity from the client all the way to the database.

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

**Built with ❤️ using Next.js, React, and Stripe**

</div>
