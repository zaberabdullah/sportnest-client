🏆 SportNest – Sports Facility Booking Management System

**SportNest** is a high-performance sports facility booking platform built with **Next.js 16** and **HeroUI v3**. This platform enables sports enthusiasts to discover, explore, and book various sports facilities (Football, Badminton, Tennis, etc.) in real-time.

### 🌐 Live Project

[[আপনার Vercel লাইভ লিংক এখানে দিন]](https://sportnest-client-sigma.vercel.app/)

---

## 🚀 Key Features

* **Facility Discovery:** Interactive browsing with search and filtering by facility type and name.
* **Smart Booking:** Authenticated booking system for specific dates and time slots.
* **Role-Based Dashboards:** Distinct dashboards for Users and Facility Owners to manage bookings and facilities.
* **Modern Authentication:** Secure auth flow using `better-auth`.
* **Visual Appeal:** Beautiful UI powered by **HeroUI**, **DaisyUI**, and **Framer Motion** for smooth user interactions.
* **Performance:** Optimized using Next.js 16 (App Router) with fast data fetching.
* **Toast Feedback:** Instant UI notifications using `sonner` and `react-hot-toast`.

---

## 🛠 Tech Stack

* **Framework:** Next.js 16, React 19
* **UI/Styling:** HeroUI v3, DaisyUI, Tailwind CSS v4, Framer Motion
* **Authentication:** Better-Auth
* **Database & Data:** MongoDB, Axios
* **Icons:** Lucide React, React Icons

---

## 📦 Core npm Packages

```json
{
  "dependencies": {
    "@heroui/react": "^3.0.5",
    "better-auth": "^1.6.11",
    "framer-motion": "^12.40.0",
    "mongodb": "^7.2.0",
    "axios": "^1.16.1",
    "sonner": "^2.0.7",
    "daisyui": "^5.5.19"
  }
}

```

---

## ⚙️ How to Run Locally

1. **Clone the repository:**
```bash
git clone <your-repo-link>
cd sportnest-client

```


2. **Install dependencies:**
```bash
npm install

```


3. **Configure Environment Variables:**
Create a `.env.local` file and add:
```env
NEXT_PUBLIC_API_URL=your_backend_url
MONGODB_URI=your_mongodb_uri
BETTER_AUTH_SECRET=your_secret_key

```


4. **Run the development server:**
```bash
npm run dev

```



---

## 🔗 Repository Links

* **Client-side:** [আপনার গিটহাব ক্লায়েন্ট লিংক]](https://github.com/zaberabdullah/sportnest-client)
* **Server-side:** [আপনার গিটহাব সার্ভার লিংক]](https://github.com/zaberabdullah/sportnest-server)
