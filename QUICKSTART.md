# Quick Start Guide

## Installation & Running

```bash
# Navigate to project directory
cd /Users/victor/projects/tenants-frontend

# Install dependencies (if needed)
npm install

# Start development server
npm run dev
```

**App will be available at**: `http://localhost:3000`

## File Locations

### Create a Tenant
**Route**: `/tenants/create`  
**Component**: `src/components/TenantForm.tsx`  
**Page**: `app/tenants/create/page.tsx`

### View Tenants
**Route**: `/tenants`  
**Component**: `src/components/TenantList.tsx`  
**Page**: `app/tenants/page.tsx`

### Home Page
**Route**: `/`  
**Page**: `app/page.tsx`

## API Endpoint
**URL**: `http://178.156.219.218/v1/tenants`  
**Method**: `POST`  
**Located in**: `src/api/tenants.ts` → `createTenant()` function

## Form Validation Rules

```typescript
{
  name: string          // Required, 2+ characters
  floor: number         // 0-100, whole number
  month: number         // 1-12
  year: number          // 2000+
}
```

## Available Scripts

```bash
npm run dev      # Start development server on port 3000
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## Key Components

| Component | Location | Purpose |
|-----------|----------|---------|
| TenantForm | `src/components/TenantForm.tsx` | Form to create tenants |
| TenantList | `src/components/TenantList.tsx` | Display list of tenants |
| useTenantForm | `src/hooks/useTenantForm.ts` | Form state management |
| createTenant | `src/api/tenants.ts` | API call function |

## Project Structure

```
app/                          # Next.js App Router
├── page.tsx                 # Home (/)
├── tenants/
│   ├── page.tsx             # Dashboard (/tenants)
│   └── create/
│       └── page.tsx         # Create Form (/tenants/create)
└── api/
    └── tenants/
        └── route.ts         # API Proxy (optional)

src/                         # Source code
├── api/
│   └── tenants.ts          # API service
├── components/
│   ├── TenantForm.tsx      # Form component
│   └── TenantList.tsx      # List component
├── hooks/
│   └── useTenantForm.ts    # State hook
└── utils/
    └── validation.ts       # Form validation
```

## Tips

### To Create a Tenant via UI
1. Go to `http://localhost:3000`
2. Click "Create Your First Tenant" or navigate to `/tenants/create`
3. Fill in:
   - Tenant Name: e.g., "Vilma"
   - Floor: e.g., 3
   - Month: e.g., September
   - Year: e.g., 2025
4. Click "Create Tenant"
5. See success message

### To View the Tenants Dashboard
1. Navigate to `http://localhost:3000/tenants`
2. Or from home page, click "Go to Tenants"

### To Debug API Issues
1. Open browser DevTools (F12)
2. Go to Network tab
3. Try to create a tenant
4. Check the POST request to the API
5. See response and error messages

## Common Issues

| Issue | Solution |
|-------|----------|
| Port 3000 in use | `npm run dev -- -p 3001` |
| Module not found | Check `tsconfig.json` path aliases |
| API connection error | Verify `http://178.156.219.218/v1/tenants` is accessible |
| Form not validating | Check browser console for JavaScript errors |

## Documentation Files

- **IMPLEMENTATION.md** - Complete implementation details
- **TENANT_SETUP.md** - Detailed setup and feature guide
- **README.md** - Original Next.js README

## Support

All code is fully commented. Check:
- Component files for JSDoc comments
- Hook files for usage examples
- Type definitions for data structure docs

---

**Last Updated**: March 1, 2026  
**Version**: 1.0.0

