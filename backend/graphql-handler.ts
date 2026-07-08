import { Request, Response } from 'express';
import { graphql, NoSchemaIntrospectionCustomRule, validate, parse } from 'graphql';
import depthLimit from 'graphql-depth-limit';
import jwt from 'jsonwebtoken';
import { schema } from './graphql-schema';

const JWT_SECRET = 'super_secret_jwt_key_123';

export const customGraphQLHandler = async (req: Request, res: Response) => {
  const mode = process.env.GRAPHQL_MODE || 'exposed'; // 'exposed', 'auth_required', 'no_introspection'
  const maxDepthStr = process.env.GRAPHQL_MAX_DEPTH;
  const maxDepth = maxDepthStr && maxDepthStr !== 'unlimited' ? parseInt(maxDepthStr, 10) : null;

  // 1. Authentication Check (Mode 2)
  if (mode === 'auth_required') {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ errors: [{ message: 'Unauthorized' }] });
    }
    const token = authHeader.split(' ')[1];
    try {
      jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ errors: [{ message: 'Unauthorized' }] });
    }
  }

  // 2. Setup Validation Rules
  const validationRules: any[] = [];
  
  // Disable Introspection (Mode 3)
  if (mode === 'no_introspection') {
    validationRules.push(NoSchemaIntrospectionCustomRule);
  }
  
  // Depth Limiting
  if (maxDepth !== null && !isNaN(maxDepth)) {
    validationRules.push(depthLimit(maxDepth));
  }

  // Helper to execute a single query
  const executeQuery = async (query: string, variables?: any, operationName?: string) => {
    if (!query) {
      return { errors: [{ message: 'Must provide query string.' }] };
    }

    try {
      const documentAST = parse(query);
      const validationErrors = validate(schema, documentAST, validationRules);
      
      if (validationErrors.length > 0) {
        return { errors: validationErrors };
      }

      return await graphql({
        schema,
        source: query,
        variableValues: variables,
        operationName
      });
    } catch (err: any) {
      return { errors: [{ message: err.message || 'GraphQL execution error' }] };
    }
  };

  // 3. Batch Query Support
  if (Array.isArray(req.body)) {
    // It's a batch query
    const results = await Promise.all(
      req.body.map((op: any) => executeQuery(op.query, op.variables, op.operationName))
    );
    return res.status(200).json(results);
  } else {
    // Single query
    const { query, variables, operationName } = req.body;
    const result = await executeQuery(query, variables, operationName);
    return res.status(200).json(result);
  }
};
