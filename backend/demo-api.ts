import express from 'express';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'super_secret_jwt_key_123';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        username: string;
        role: string;
      };
    }
  }
}

const router = express.Router();

// Mock Users
const MOCK_USERS = [
  { id: 1, username: 'userA', password: 'password123', role: 'user' },
  { id: 2, username: 'userB', password: 'password123', role: 'user' },
];

// Mock Objects
const MOCK_OBJECTS = [
  // Sequential IDs
  { id: 1, ownerId: 1, data: "User A's sensitive data (Sequential)" },
  { id: 2, ownerId: 2, data: "User B's sensitive data (Sequential)" },
  
  // UUIDs
  { id: '11111111-1111-1111-1111-111111111111', ownerId: 1, data: "User A's sensitive data (UUID)" },
  { id: '22222222-2222-2222-2222-222222222222', ownerId: 2, data: "User B's sensitive data (UUID)" },
];

// Secure authentication middleware (Mock)
const requireAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; username: string; role: string };
    req.user = { id: decoded.id, username: decoded.username, role: decoded.role };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }
};

// Additional rate limiting specifically for the demo API endpoints
const demoLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window`
  message: 'Too many requests to the demo API, please try again later.'
});
router.use(demoLimiter);

// 0. POST /login - Issues a JWT for testing
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Bad Request: Missing username or password' });
  }

  const user = MOCK_USERS.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized: Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.status(200).json({ success: true, token });
});

// 1. Secure GET /user/secret - Protected by authentication middleware
router.get('/user/secret', requireAuth, (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: `This is a secure secret message for ${req.user?.username}.` 
  });
});

// 2. Secure POST /pet - Protected by authentication and includes basic input validation
router.post('/pet', requireAuth, (req, res) => {
  const { name, status } = req.body;
  
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Bad Request: Invalid or missing pet name.' });
  }
  
  res.status(201).json({ 
    success: true, 
    data: { id: Math.floor(Math.random() * 1000), name, status: status || 'available' } 
  });
});

// 3. Secure DELETE /pet/:id - Protected by authentication and ID validation
router.delete('/pet/:id', requireAuth, (req, res) => {
  const petId = parseInt(req.params.id as string, 10);
  
  if (isNaN(petId)) {
    return res.status(400).json({ error: 'Bad Request: Invalid pet ID format.' });
  }
  
  res.status(200).json({ success: true, message: `Pet ${petId} deleted securely.` });
});

// 4. Secure GET /pet/findByStatus - Returns JSON instead of raw unescaped HTML to prevent XSS
router.get('/pet/findByStatus', (req, res) => {
  const status = req.query.status;
  
  // Returning JSON is the standard and secure way to build APIs.
  // This avoids any risk of Reflected XSS from HTML interpolation.
  res.status(200).json({ 
    success: true, 
    message: 'Search results retrieved securely.',
    queryParameter: String(status)
  });
});

// 5. Secure GET /pet/:id - Uses a Data Transfer Object (DTO) pattern to prevent data exposure
router.get('/pet/:id', (req, res) => {
  const petId = parseInt(req.params.id as string, 10);
  
  if (isNaN(petId)) {
    return res.status(400).json({ error: 'Bad Request: Invalid pet ID format.' });
  }

  // Mock database record containing internal/sensitive fields
  const mockDatabaseRecord = {
    id: petId,
    name: 'Fluffy',
    db_primary_key_id: '99992312',
    internal_role_mask: '0x00FF',
    encryption_salt_hint: 'salty_hash_123'
  };

  // Secure DTO: explicitly map only the safe fields to be returned to the client
  const safePetResponse = {
    id: mockDatabaseRecord.id,
    name: mockDatabaseRecord.name
  };

  res.status(200).json({ 
    success: true, 
    data: safePetResponse 
  });
});

// --- NEW BOLA/IDOR TEST ENDPOINTS ---

// VULNERABLE: BOLA with Sequential ID
// User can access other users' objects by just guessing the ID
router.get('/vulnerable/object/:id', requireAuth, (req, res) => {
  const objectId = parseInt(req.params.id as string, 10);
  
  if (isNaN(objectId)) {
    return res.status(400).json({ error: 'Bad Request: Invalid ID format.' });
  }

  const obj = MOCK_OBJECTS.find(o => o.id === objectId);
  if (!obj) {
    return res.status(404).json({ error: 'Object not found.' });
  }

  // VULNERABILITY: No ownership check! 
  // Any authenticated user can read this object.
  res.status(200).json({ success: true, data: obj });
});

// VULNERABLE: BOLA with UUID
// User can access other users' objects by guessing/knowing the UUID
router.get('/vulnerable/object/uuid/:uuid', requireAuth, (req, res) => {
  const objectUuid = req.params.uuid;

  const obj = MOCK_OBJECTS.find(o => o.id === objectUuid);
  if (!obj) {
    return res.status(404).json({ error: 'Object not found.' });
  }

  // VULNERABILITY: No ownership check! 
  // Any authenticated user can read this object.
  res.status(200).json({ success: true, data: obj });
});

// SECURE: BOLA protection with Sequential ID
// Verifies that the object belongs to the authenticated user
router.get('/secure/object/:id', requireAuth, (req, res) => {
  const objectId = parseInt(req.params.id as string, 10);
  
  if (isNaN(objectId)) {
    return res.status(400).json({ error: 'Bad Request: Invalid ID format.' });
  }

  const obj = MOCK_OBJECTS.find(o => o.id === objectId);
  if (!obj) {
    return res.status(404).json({ error: 'Object not found.' });
  }

  // SECURITY FIX: Check if the logged-in user actually owns the object
  if (obj.ownerId !== req.user?.id) {
    // Return 403 Forbidden to prevent BOLA
    return res.status(403).json({ error: 'Forbidden: You do not have permission to access this object.' });
  }

  res.status(200).json({ success: true, data: obj });
});

// SECURE: BOLA protection with UUID
// Verifies that the object belongs to the authenticated user
router.get('/secure/object/uuid/:uuid', requireAuth, (req, res) => {
  const objectUuid = req.params.uuid;

  const obj = MOCK_OBJECTS.find(o => o.id === objectUuid);
  if (!obj) {
    return res.status(404).json({ error: 'Object not found.' });
  }

  // SECURITY FIX: Check if the logged-in user actually owns the object
  if (obj.ownerId !== req.user?.id) {
    return res.status(403).json({ error: 'Forbidden: You do not have permission to access this object.' });
  }

  res.status(200).json({ success: true, data: obj });
});

export default router;
