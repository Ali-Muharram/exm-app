# 📚 Exam Application

تطبيق احترافي لإدارة الامتحانات والشهادات مبني باستخدام Next.js 14 مع App Router.

A professional exam and diploma management application built with Next.js 14 using the App Router.

---

## 🚀 التقنيات المستخدمة / Tech Stack

### Core Framework
- **Next.js 14.2.35** - React framework with App Router
- **React 18** - UI library
- **TypeScript 5** - Type-safe JavaScript

### Styling & UI
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components built on Radix UI
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Icon library
- **tailwindcss-animate** - Animation utilities

### Authentication & Authorization
- **NextAuth.js 4.24.13** - Authentication solution for Next.js
- **Middleware** - Route protection and authentication guards

### State Management & Data Fetching
- **TanStack React Query 5.90.12** - Server state management
- **React Hook Form 7.68.0** - Form state management
- **Zod 4.2.0** - Schema validation
- **@hookform/resolvers 5.2.2** - Form validation resolvers

### Additional Libraries
- **recharts 2.15.4** - Chart library for data visualization
- **react-infinite-scroll-component 6.1.1** - Infinite scrolling
- **react-phone-number-input 3.4.14** - Phone input component
- **react-countdown-circle-timer 3.2.1** - Countdown timer
- **input-otp 1.4.2** - OTP input component
- **sonner 2.0.7** - Toast notifications
- **next-themes 0.4.6** - Dark mode support
- **js-cookie 3.0.5** - Cookie management

---

## 📁 هيكل المشروع / Project Structure

```
exm-app/
├── public/                          # Static assets
│   ├── assets/                      # Images and logos
│   └── icons/                       # SVG icons
│
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── api/                     # API routes
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/   # NextAuth handler
│   │   │   ├── change-password/     # Password change endpoint
│   │   │   ├── diplomas/            # Diplomas API
│   │   │   ├── exams/               # Exams API
│   │   │   ├── profile/             # Profile API
│   │   │   └── questions/           # Questions API
│   │   │       ├── check/           # Question validation
│   │   │       └── route.ts
│   │   │
│   │   ├── auth/                    # Authentication pages
│   │   │   ├── _components/         # Auth-specific components
│   │   │   │   ├── branding-section.tsx
│   │   │   │   ├── create-new-password.tsx
│   │   │   │   ├── forget-pass-form.tsx
│   │   │   │   └── verify-otp.tsx
│   │   │   ├── _hooks/              # Auth-specific hooks
│   │   │   │   ├── forgot-password.context.ts
│   │   │   │   └── time-reset-otp.ts
│   │   │   ├── forgot-password/     # Forgot password page
│   │   │   ├── login/               # Login page
│   │   │   ├── register/            # Registration page
│   │   │   ├── layout.tsx           # Auth layout
│   │   │   └── page.tsx
│   │   │
│   │   ├── dashboard/               # Dashboard pages
│   │   │   ├── _components/         # Dashboard components
│   │   │   │   ├── app-sidebar.tsx  # Sidebar navigation
│   │   │   │   ├── breadcrumb.tsx
│   │   │   │   ├── heading.tsx
│   │   │   │   ├── nav-main.tsx
│   │   │   │   ├── nav-projects.tsx
│   │   │   │   ├── nav-user.tsx
│   │   │   │   └── team-switcher.tsx
│   │   │   │
│   │   │   ├── _diplomas/           # Diplomas module
│   │   │   │   ├── _components/
│   │   │   │   │   └── list-diplomas.tsx
│   │   │   │   └── deplomas.tsx
│   │   │   │
│   │   │   ├── account-settings/    # Account settings
│   │   │   │   ├── change-password/ # Change password
│   │   │   │   │   └── _components/
│   │   │   │   │       └── change-password-form.tsx
│   │   │   │   ├── profile/         # User profile
│   │   │   │   │   └── _components/
│   │   │   │   │       ├── delete-account.tsx
│   │   │   │   │       └── profile-form.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── exams/               # Exams module
│   │   │   │   ├── _components/
│   │   │   │   │   └── list-exams.tsx
│   │   │   │   ├── [slug]/          # Dynamic exam page
│   │   │   │   │   ├── _components/
│   │   │   │   │   │   ├── duration.tsx
│   │   │   │   │   │   ├── progress.tsx
│   │   │   │   │   │   └── questions-form.tsx
│   │   │   │   │   ├── _exam-result/ # Exam results
│   │   │   │   │   │   └── _components/
│   │   │   │   │   │       ├── answers.tsx
│   │   │   │   │   │       └── chart-result.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── hooks/               # Dashboard hooks
│   │   │   │   ├── dashboard.context.ts
│   │   │   │   └── header.hook.ts
│   │   │   ├── layout.tsx           # Dashboard layout
│   │   │   └── page.tsx             # Dashboard home
│   │   │
│   │   ├── fonts/                   # Custom fonts
│   │   │   └── GeistMonoVF.woff
│   │   │
│   │   ├── auth.ts                  # NextAuth configuration
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Home page
│   │   ├── globals.css              # Global styles
│   │   ├── error.tsx                # Error boundary
│   │   ├── global-error.tsx         # Global error handler
│   │   └── not-found.tsx            # 404 page
│   │
│   ├── components/                  # Reusable components
│   │   ├── providers/               # Context providers
│   │   │   ├── app/                 # App-level providers
│   │   │   │   ├── _components/
│   │   │   │   │   ├── next-auth-provider.tsx
│   │   │   │   │   └── react-query.provider.tsx
│   │   │   │   └── index.tsx
│   │   │   └── dashboard/           # Dashboard providers
│   │   │       ├── _components/
│   │   │       │   └── header.provider.tsx
│   │   │       └── index.tsx
│   │   │
│   │   ├── shared/                  # Shared components
│   │   │   ├── empty.tsx
│   │   │   ├── error-form.tsx
│   │   │   ├── phone-input.tsx
│   │   │   └── project-name.tsx
│   │   │
│   │   └── ui/                      # UI components (shadcn/ui)
│   │       ├── avatar.tsx
│   │       ├── breadcrumb.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── chart.tsx
│   │       ├── collapsible.tsx
│   │       ├── command.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── empty.tsx
│   │       ├── form.tsx
│   │       ├── input-otp.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── radio-group.tsx
│   │       ├── scroll-area.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── toggle-group.tsx
│   │       ├── toggle.tsx
│   │       └── tooltip.tsx
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── global-mutation.hooks.ts
│   │   └── use-mobile.tsx
│   │
│   ├── lib/                         # Utilities and configurations
│   │   ├── constants/               # App constants
│   │   │   ├── account-settings-sidebar.constant.ts
│   │   │   ├── branding-section.constants.ts
│   │   │   └── dashboard-sidebar.constants.ts
│   │   │
│   │   ├── schemes/                 # Zod validation schemas
│   │   │   ├── change-password.schema.ts
│   │   │   ├── create-password.schema.ts
│   │   │   ├── forgot-password-otp.schema.ts
│   │   │   ├── forgot-password.schema.ts
│   │   │   ├── login.schema.ts
│   │   │   ├── profile.scema.ts
│   │   │   └── register.schema.ts
│   │   │
│   │   ├── service/                 # API service functions
│   │   │   ├── globa-infinty-query-function.ts
│   │   │   └── global-query.service.ts
│   │   │
│   │   ├── types/                   # TypeScript type definitions
│   │   │   ├── account-settings.d.ts
│   │   │   ├── api.d.ts
│   │   │   ├── auth.d.ts
│   │   │   ├── dashboard.d.ts
│   │   │   ├── diplomas.d.ts
│   │   │   ├── error-form-.d.ts
│   │   │   ├── exam-result-response.d.ts
│   │   │   ├── exams.d.ts
│   │   │   ├── next-auth.d.ts
│   │   │   └── questions.d.ts
│   │   │
│   │   └── utils/                   # Utility functions
│   │       ├── BadRequestException.ts
│   │       ├── get_token_in_hundeler.ts
│   │       └── tailwind-merge.ts
│   │
│   └── middleware.ts                # Next.js middleware (route protection)
│
├── components.json                  # shadcn/ui configuration
├── next.config.mjs                  # Next.js configuration
├── tailwind.config.ts               # Tailwind CSS configuration
├── postcss.config.mjs               # PostCSS configuration
├── tsconfig.json                    # TypeScript configuration
├── package.json                     # Dependencies and scripts
└── README.md                        # This file
```

---

## 🔑 الميزات الرئيسية / Key Features

- ✅ **نظام المصادقة الكامل** - تسجيل الدخول، التسجيل، استعادة كلمة المرور مع OTP
  - Complete authentication system - Login, register, password recovery with OTP

- ✅ **لوحة تحكم متقدمة** - واجهة مستخدم احترافية مع sidebar navigation
  - Advanced dashboard - Professional UI with sidebar navigation

- ✅ **إدارة الامتحانات** - إنشاء وإجراء الامتحانات مع عداد الوقت
  - Exam management - Create and take exams with timer

- ✅ **إدارة الشهادات** - عرض وإدارة الشهادات والدبلومات
  - Diploma management - View and manage certificates and diplomas

- ✅ **نتائج الامتحانات** - عرض النتائج مع الرسوم البيانية والإحصائيات
  - Exam results - View results with charts and statistics

- ✅ **إعدادات الحساب** - إدارة الملف الشخصي وتغيير كلمة المرور
  - Account settings - Manage profile and change password

- ✅ **حماية المسارات** - Middleware لحماية الصفحات المخصصة
  - Route protection - Middleware for protected pages

- ✅ **تصميم متجاوب** - يعمل على جميع الأجهزة
  - Responsive design - Works on all devices

---

## 🛠️ التثبيت والإعداد / Installation & Setup

### المتطلبات / Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### خطوات التثبيت / Installation Steps

1. **تثبيت المكتبات / Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. **إعداد متغيرات البيئة / Setup environment variables**
   
   أنشئ ملف `.env.local` في المجلد الرئيسي:
   Create a `.env.local` file in the root directory:
   ```env
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   APP_URL=your-backend-api-url
   ```

3. **تشغيل المشروع في وضع التطوير / Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **افتح المتصفح / Open browser**
   
   افتح [http://localhost:3000](http://localhost:3000) لمشاهدة التطبيق
   Open [http://localhost:3000](http://localhost:3000) to view the app

---

## 📜 الأوامر المتاحة / Available Scripts

```bash
# التطوير / Development
npm run dev          # تشغيل خادم التطوير / Start development server

# البناء / Build
npm run build        # بناء المشروع للإنتاج / Build for production
npm start            # تشغيل الإصدار المبني / Run production build

# الجودة / Quality
npm run lint         # فحص الكود / Lint code
```

---

## 🏗️ البنية المعمارية / Architecture

### App Router Structure
يستخدم المشروع Next.js 14 App Router مع البنية التالية:
The project uses Next.js 14 App Router with the following structure:

- **Route Groups** (`_components`, `_hooks`, `_diplomas`, etc.) - Organize related files without affecting the URL structure
- **Dynamic Routes** (`[slug]`) - Dynamic routing for exams
- **Nested Layouts** - Shared layouts for auth and dashboard sections

### State Management
- **Server State**: TanStack React Query for API data
- **Form State**: React Hook Form with Zod validation
- **Global State**: React Context API for app-wide state

### API Integration
- API routes in `/app/api` directory
- Client-side API calls using React Query
- Token-based authentication with NextAuth.js

---

## 🎨 التصميم / Design System

- **UI Framework**: shadcn/ui (Radix UI + Tailwind CSS)
- **Icons**: Lucide React
- **Colors**: Custom CSS variables for theming
- **Typography**: Inter font (Google Fonts) + Geist Mono
- **Dark Mode**: Supported via next-themes

---

## 📝 ملاحظات التطوير / Development Notes

- يستخدم المشروع TypeScript بشكل صارم
  The project uses strict TypeScript
  
- جميع المكونات تستخدم Server Components بشكل افتراضي
  All components use Server Components by default
  
- يتم استخدام Client Components فقط عند الحاجة (useState, useEffect, etc.)
  Client Components are used only when needed (useState, useEffect, etc.)
  
- التوجيه محمي بواسطة middleware.ts
  Routing is protected by middleware.ts

---

## 📄 الترخيص / License

هذا المشروع خاص / This project is private

---

## 👨‍💻 المطور / Developer

تم تطويره باستخدام Next.js 14 و React 18
Developed with Next.js 14 and React 18
