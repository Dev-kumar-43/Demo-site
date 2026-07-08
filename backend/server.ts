import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import multer from 'multer';
import path from 'path';

const app = express();

// Security Headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'nonce-RANDOM_NONCE'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  frameguard: {
    action: 'deny'
  },
  referrerPolicy: {
    policy: 'strict-origin-when-cross-origin'
  }
}));

// Additional Headers explicitly as requested
app.use((req, res, next) => {
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Restrictive CORS
app.use(express.json({ limit: '10kb' })); // Body parser
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(morgan('combined'));
app.use(hpp()); // Prevent HTTP Parameter Pollution

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per `window` (here, per minute)
  message: 'Too many requests from this IP, please try again after a minute',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use('/api/', apiLimiter);

import demoApiRouter, { requireAuth } from './demo-api';

// Simulated database
const alerts = [
  { id: 1, source_ip: '192.168.1.105', dest_ip: '10.0.0.5', attack_type: 'Ransomware Behavior Detected', severity: 'Critical', timestamp: new Date().toISOString() },
  { id: 2, source_ip: '45.22.19.88', dest_ip: '10.0.0.2', attack_type: 'Multiple Failed Root Logins', severity: 'High', timestamp: new Date().toISOString() },
];

// Mount Demo API Router
app.use('/api/v3', demoApiRouter);

// GraphQL Endpoint (Configurable for API-P0-05 and other tests)
import { customGraphQLHandler } from './graphql-handler';

app.post('/api/v3/graphql', customGraphQLHandler);
app.get('/api/v3/graphql', (req, res) => {
  res.status(405).json({ error: 'GraphQL endpoint only supports POST requests for security testing.' });
});

// Serve OpenAPI Spec
const openApiPath = process.env.NODE_ENV === 'production' 
  ? path.join(__dirname, '..', 'public', 'openapi.yaml') // from dist/
  : path.join(__dirname, 'public', 'openapi.yaml');      // from root

// UNPROTECTED API DOCS (Publicly exposed for testing)
app.get(['/api/v1/openapi.yaml', '/api/openapi.yaml'], (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'openapi.yaml')); // __dirname in PM2 is the 'dist' folder
});

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/api/alerts', (req, res) => {
  res.json({ success: true, data: alerts });
});

app.post('/api/simulate-attack', (req, res) => {
  const newAlert = {
    id: alerts.length + 1,
    source_ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
    dest_ip: `10.0.0.${Math.floor(Math.random() * 255)}`,
    attack_type: 'Simulated SQL Injection',
    severity: 'High',
    timestamp: new Date().toISOString()
  };
  alerts.push(newAlert);
  res.status(201).json({ success: true, data: newAlert });
});

// File Upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  res.status(200).json({ 
    success: true, 
    message: 'File uploaded successfully',
    file: {
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype
    }
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack); // Log detailed error internally
  res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' }); // Generic error to client
});

const PORT = process.env.PORT || 5010;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
