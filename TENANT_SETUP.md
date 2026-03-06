# Tenant Management System

A modern Next.js React application for managing property tenants. Create, view, and organize tenant information with an intuitive interface.

## Features

- ✨ **Easy Tenant Creation** - Quick form to add new tenants with validation
- 📊 **Tenant Management** - View and organize all tenants
- 🎨 **Beautiful UI** - Clean and responsive design using Tailwind CSS
- ⚡ **Fast & Modern** - Built with Next.js 16 and React 19
- 🔒 **Type-Safe** - Full TypeScript support
- ✅ **Form Validation** - Client-side validation for all fields
- 🚀 **Responsive Design** - Works on desktop, tablet, and mobile

## Project Structure

```
tenants-frontend/
├── app/
│   ├── page.tsx                 # Home/landing page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   └── tenants/
│       ├── page.tsx             # Tenants dashboard
│       └── create/
│           └── page.tsx         # Tenant creation page
├── src/
│   ├── api/
│   │   └── tenants.ts           # API client service for tenant operations
│   ├── components/
│   │   ├── TenantForm.tsx       # Form component for creating tenants
│   │   └── TenantList.tsx       # Component to display tenant list
│   ├── hooks/
│   │   └── useTenantForm.ts     # Custom hook for form state management
│   └── utils/
│       └── validation.ts        # Form validation utilities
├── public/                       # Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.mjs
├── postcss.config.mjs
└── eslint.config.mjs
```

## Installation & Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## API Integration

The application connects to the tenant management API at:
```
http://178.156.219.218/v1/tenants
```

### API Endpoint

**Create Tenant**
- **URL**: `POST /v1/tenants`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "floor": 3,
    "month": 9,
    "year": 2025
  }
  ```

## Usage

### Home Page
- Visit `http://localhost:3000` to see the landing page
- Learn about the system and quick start guide
- Navigate to the tenants section from the navigation

### Create Tenant
1. Go to `/tenants/create` or click "Create Tenant" button
2. Fill in the tenant details:
   - **Tenant Name**: Full name of the tenant
   - **Floor Number**: Which floor the tenant occupies (0-100)
   - **Month**: Lease start month (1-12)
   - **Year**: Lease start year (2000 onwards)
3. Click "Create Tenant" to submit
4. Success message will display on completion

### Tenants Dashboard
- Visit `/tenants` to see the tenants management page
- View all created tenants in a table
- Quick action to create new tenants

## Form Validation

The form includes comprehensive validation:

- **Name**: Required, minimum 2 characters
- **Floor**: Required, must be 0-100, whole number
- **Month**: Required, must be 1-12
- **Year**: Required, must be 2000 onwards

Validation errors are displayed next to each field with helpful messages.

## Components

### TenantForm
The main form component for creating tenants. Features:
- Real-time validation
- Error messages for each field
- Loading state during submission
- Success/error notifications
- Reset form functionality
- Accessible form design with ARIA labels

### TenantList
Component to display list of tenants. Features:
- Responsive table layout
- Loading states
- Error handling
- Empty state message

## Custom Hooks

### useTenantForm
Manages all form state and logic:
- Form data state
- Validation error tracking
- Loading/success states
- Form submission handling
- Reset functionality

## Utilities

### validation.ts
- `validateTenantForm()` - Validates entire form data
- `getFieldError()` - Gets error message for specific field
- Type-safe validation with TypeScript interfaces

### tenants.ts (API Service)
- `createTenant()` - Sends tenant data to API
- Type definitions for API requests/responses
- Error handling and logging

## Styling

The project uses **Tailwind CSS v4** for styling:
- Responsive design utilities
- Dark mode support (configured)
- Custom color schemes
- Pre-built component classes

## TypeScript

Full TypeScript support with:
- Strict mode enabled
- Type-safe API contracts
- Typed React hooks
- Interface definitions for all data structures

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

### ESLint Configuration

The project includes ESLint configuration for code quality. Configure rules in `eslint.config.mjs`

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Future Enhancements

- [ ] Implement GET endpoint to fetch existing tenants
- [ ] Add tenant edit/update functionality
- [ ] Add tenant delete functionality
- [ ] Implement pagination for tenant list
- [ ] Add search/filter functionality
- [ ] Export tenants to CSV/PDF
- [ ] Add authentication
- [ ] Implement data persistence/caching

## Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Dependencies not installing
```bash
rm -rf node_modules package-lock.json
npm install
```

### API Connection Issues
- Check if the API endpoint is accessible: `http://178.156.219.218/v1/tenants`
- Verify CORS settings on the backend
- Check browser console for error details

## License

Private project - All rights reserved

## Support

For issues or questions, please contact the development team.

