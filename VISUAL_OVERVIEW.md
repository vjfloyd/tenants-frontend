# 📱 Tenant Management System - Visual Overview

## Application Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   NEXT.JS APPLICATION                   │
│              (React 19 + TypeScript 5)                  │
└─────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
    ┌────────────┐   ┌─────────────┐  ┌──────────────┐
    │   Pages    │   │ Components  │  │    Hooks     │
    ├────────────┤   ├─────────────┤  ├──────────────┤
    │ /          │   │ TenantForm  │  │useTenantForm │
    │ /tenants   │   │ TenantList  │  │              │
    │ /tenants/  │   │             │  │              │
    │   create   │   │             │  │              │
    └────────────┘   └─────────────┘  └──────────────┘
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
    ┌────────────┐   ┌─────────────┐  ┌──────────────┐
    │ Utilities  │   │ API Service │  │    Types     │
    ├────────────┤   ├─────────────┤  ├──────────────┤
    │validation()│   │createTenant │  │TenantFormData│
    │getFieldErr │   │             │  │TenantResponse│
    │            │   │             │  │ValidationErr │
    └────────────┘   └─────────────┘  └──────────────┘
                          │
                          ▼
            ┌──────────────────────────────┐
            │   BACKEND API                │
            │ http://178.156.219.218/v1    │
            │   POST /tenants              │
            └──────────────────────────────┘
```

## User Journey Map

```
START
  │
  ▼
┌─────────────────────┐
│  Visit Home Page    │
│       (/)           │
└─────────────────────┘
         │
    ┌────┴─────────────────────────┐
    │                              │
    ▼                              ▼
┌──────────────────┐       ┌─────────────────┐
│ Learn About      │       │ Create Tenant   │
│ System Features  │       │ Button          │
└──────────────────┘       └─────────────────┘
    │                              │
    │                              ▼
    │                      ┌─────────────────┐
    │                      │ TenantForm      │
    │                      │ Component       │
    │                      └─────────────────┘
    │                              │
    │                              ▼
    │                      ┌─────────────────┐
    │                      │ Fill Form:      │
    │                      │ • Name          │
    │                      │ • Floor         │
    │                      │ • Month         │
    │                      │ • Year          │
    │                      └─────────────────┘
    │                              │
    │                              ▼
    │                      ┌─────────────────┐
    │                      │ Validate Input  │
    │                      │ (Real-time)     │
    │                      └─────────────────┘
    │                              │
    │                    ┌─────────┴──────────┐
    │                    │                    │
    │              ❌ Invalid          ✅ Valid
    │                    │                    │
    │                    ▼                    ▼
    │            ┌────────────┐       ┌──────────────┐
    │            │Show Errors │       │Submit Form   │
    │            └────────────┘       │(Show Spinner)│
    │                                 └──────────────┘
    │                                        │
    │                                        ▼
    │                                 ┌──────────────┐
    │                                 │POST to API   │
    │                                 └──────────────┘
    │                                        │
    │                              ┌─────────┴──────────┐
    │                              │                    │
    │                        ❌ Error            ✅ Success
    │                              │                    │
    │                              ▼                    ▼
    │                      ┌────────────────┐  ┌──────────────┐
    │                      │Error Message   │  │Success Alert │
    │                      │Retry Available │  │Form Reset    │
    │                      └────────────────┘  └──────────────┘
    │                              │                    │
    └──────────────────────────────┴────────────────────┘
                          │
                          ▼
                    ┌─────────────┐
                    │ Dashboard   │
                    │  (/tenants) │
                    └─────────────┘
                          │
                          ▼
                        END
```

## File Organization

```
tenants-frontend/
│
├── 📄 Configuration Files
│   ├── package.json
│   ├── tsconfig.json (MODIFIED ✅)
│   ├── next.config.ts
│   ├── tailwind.config.mjs
│   ├── postcss.config.mjs
│   └── eslint.config.mjs
│
├── 📱 Application Pages
│   └── app/
│       ├── page.tsx                 # 🏠 Home
│       ├── layout.tsx               # Layout wrapper
│       ├── globals.css              # Global styles
│       │
│       ├── api/
│       │   └── tenants/
│       │       └── route.ts         # 🔌 API proxy
│       │
│       └── tenants/
│           ├── page.tsx             # 📊 Dashboard
│           └── create/
│               └── page.tsx         # ✍️ Create Form
│
├── 🧩 Source Code
│   └── src/
│       ├── api/
│       │   └── tenants.ts           # 🌐 API service
│       │
│       ├── components/
│       │   ├── TenantForm.tsx       # 📝 Form component
│       │   └── TenantList.tsx       # 📋 List component
│       │
│       ├── hooks/
│       │   └── useTenantForm.ts     # 🎣 State hook
│       │
│       └── utils/
│           └── validation.ts        # ✅ Validation
│
├── 📚 Documentation
│   ├── README.md
│   ├── SUMMARY.md                   # ⭐ Quick overview
│   ├── QUICKSTART.md                # 🚀 Getting started
│   ├── TENANT_SETUP.md              # 📖 Full guide
│   ├── IMPLEMENTATION.md            # 🔧 Technical details
│   └── start.sh                     # 🎬 Launch script
│
├── 🎨 Static Assets
│   └── public/
│       ├── next.svg
│       ├── vercel.svg
│       └── ...other assets
│
└── 📦 Dependencies
    └── node_modules/
```

## Component Relationship Diagram

```
┌────────────────────────────────┐
│   Next.js App Router           │
│  (File-based Routing)          │
└────────────────────────────────┘
              │
    ┌─────────┼─────────┐
    │         │         │
    ▼         ▼         ▼
  /     /tenants    /tenants/create
   │         │           │
   ├────────┤           │
   │        │           │
   ▼        │           ▼
HomePage   │      ┌────────────────┐
   │        │      │ CreateTenantPage
   │        │      │      │
   │        │      │      ▼
   │        │      │  TenantForm
   │        │      │      │
   │        ▼      │      ▼
   │    TenantsPage  useTenantForm
   │        │        │
   │        ▼        ▼
   │    TenantList  validateTenantForm
   │               │
   │               ▼
   │            createTenant (API)
   │               │
   └───────────────┼─────────────────────┐
                   │                     │
                   ▼                     ▼
              validation.ts          tenants.ts
                   │                     │
                   ▼                     ▼
            Validation Errors      HTTP POST Request
                                         │
                                         ▼
                                  Backend API
                                  178.156.219.218
                                  /v1/tenants
```

## State Management Flow

```
TenantForm Component
    │
    ├─ useTenantForm Hook
    │   │
    │   ├─ formData State
    │   │   └─ { name, floor, month, year }
    │   │
    │   ├─ errors State
    │   │   └─ ValidationError[]
    │   │
    │   ├─ isLoading State
    │   │   └─ boolean
    │   │
    │   ├─ isSuccess State
    │   │   └─ boolean
    │   │
    │   ├─ successMessage State
    │   │   └─ string
    │   │
    │   └─ errorMessage State
    │       └─ string
    │
    ├─ handleInputChange()
    │   └─ Updates formData + clears field errors
    │
    ├─ handleSubmit()
    │   ├─ Validates form
    │   ├─ Calls createTenant()
    │   ├─ Handles success
    │   └─ Handles errors
    │
    └─ resetForm()
        └─ Clears all state
```

## API Integration

```
Frontend Request
    │
    ├─ Endpoint: POST /v1/tenants
    ├─ URL: http://178.156.219.218/v1/tenants
    ├─ Headers: Content-Type: application/json
    │
    └─ Body:
        {
          "name": "Vilma",
          "floor": 3,
          "month": 9,
          "year": 2025
        }
              │
              ▼
        Backend API
              │
        ┌─────┴─────┐
        │           │
    ✅ Success  ❌ Error
        │           │
        ▼           ▼
      200         4xx/5xx
      │           │
      ▼           ▼
    Response   Error Response
      │           │
      ▼           ▼
    Show       Show Error
    Success    Message
    Alert      & Allow Retry
```

## Tech Stack Layers

```
┌────────────────────────────────────────┐
│      User Interface Layer               │
│  Tailwind CSS + React Components       │
├────────────────────────────────────────┤
│      Logic Layer                        │
│  Hooks + Utilities + Validation        │
├────────────────────────────────────────┤
│      Data Layer                         │
│  API Service + State Management        │
├────────────────────────────────────────┤
│      Backend Communication              │
│  Next.js API Routes (optional)         │
├────────────────────────────────────────┤
│      External API                       │
│  http://178.156.219.218/v1/tenants    │
└────────────────────────────────────────┘
```

## Validation Rules Flowchart

```
User Input
    │
    ▼
┌──────────────────────────┐
│ Check Name               │
│ • Required?              │
│ • Min 2 chars?           │
└──────────────────────────┘
    │
    ▼
┌──────────────────────────┐
│ Check Floor              │
│ • Required?              │
│ • Valid number?          │
│ • Range 0-100?           │
│ • Whole number?          │
└──────────────────────────┘
    │
    ▼
┌──────────────────────────┐
│ Check Month              │
│ • Required?              │
│ • Valid number?          │
│ • Range 1-12?            │
│ • Whole number?          │
└──────────────────────────┘
    │
    ▼
┌──────────────────────────┐
│ Check Year               │
│ • Required?              │
│ • Valid number?          │
│ • >= 2000?               │
│ • <= (current + 10)?     │
│ • Whole number?          │
└──────────────────────────┘
    │
    ├─ Any Errors? ──────────→ Display Errors
    │                          (Don't Submit)
    │
    └─ No Errors ──────────→ Submit Form
```

## Responsive Design Breakpoints

```
Mobile (< 768px)
├─ Single column layout
├─ Full-width forms
├─ Stacked cards
└─ Touch-friendly buttons

Tablet (768px - 1024px)
├─ 2-3 column grid
├─ Optimized spacing
├─ Readable font sizes
└─ Comfortable touch targets

Desktop (> 1024px)
├─ Full grid layout
├─ Multiple columns
├─ Optimized whitespace
└─ Hover effects enabled
```

## Development Workflow

```
1. Start Development Server
   └─ npm run dev
      └─ Runs on port 3000/3001
      └─ HMR (Hot Module Reload) enabled
      └─ Fast refresh for JSX

2. Make Changes
   └─ Edit component files
   └─ Browser auto-refreshes

3. Validate
   └─ Check console for errors
   └─ Test form functionality
   └─ Verify API calls

4. Build
   └─ npm run build
   └─ Compiles TypeScript
   └─ Optimizes production build
   └─ Generates .next directory

5. Deploy
   └─ npm start (local)
   └─ Vercel / AWS / Docker / Other
```

---

This visual overview should help you understand the application structure at a glance!

