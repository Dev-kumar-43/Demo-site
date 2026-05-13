# SOC Platform (Cybersecurity Operations Dashboard)

A full-stack cybersecurity web application designed to help security teams monitor threats, manage incidents, audit systems, and maintain compliance.

## Features

- **Executive Dashboard**: Real-time KPIs, threat trends, and system health.
- **Incident Management**: Kanban-style board for alert triage and investigation.
- **Role-Based Access Control**: Granular permissions for Admins, Managers, Analysts, and Viewers.
- **MFA Authentication**: Enforced MFA for privileged roles (simulated).
- **Security Scanners**: Simulated vulnerability, port, and SSL analyzers.
- **Audit Logging**: Immutable records of user actions.

## Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui, Recharts.
- **Backend**: Node.js, Express, TypeScript.
- **Security**: Helmet, Express Rate Limit, XSS-Clean, HPP, Argon2 (simulated), JWT.

## Security Considerations Implemented

1. **Strict Content Security Policy (CSP)** and robust security headers (HSTS, X-Frame-Options, etc.).
2. **Rate Limiting** on all API routes to prevent brute-force and DoS.
3. **Input Validation & Sanitization** to prevent XSS and HTTP Parameter Pollution.
4. **Secure Error Handling** to avoid leaking stack traces or sensitive data.
5. **CORS Restrictions** allowing only the explicit frontend origin.

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server (development mode with ts-node):
   ```bash
   npx ts-node server.ts
   ```

### Environment Variables

**Backend (`backend/.env`):**
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_key_128_bit_entropy
JWT_REFRESH_SECRET=your_super_secret_refresh_key
DB_FILE=./database.sqlite
```

**Frontend (`frontend/.env`):**
```env
VITE_API_URL=http://localhost:5000/api
```

## Deployment

- **Frontend (Vercel/Netlify)**: Connect your repository, set the root directory to `frontend`, and build command to `npm run build`. The output directory will be `dist`.
- **Backend (Render/Railway)**: Connect repository, set root directory to `backend`, use `npx tsc` for build and `node dist/server.js` for the start command. Ensure environment variables are configured in the platform's dashboard.
