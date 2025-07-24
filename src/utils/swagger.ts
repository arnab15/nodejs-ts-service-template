/* eslint-disable @typescript-eslint/no-explicit-any */
// src/utils/swagger.ts
import fs from 'fs';
import path from 'path';

import { globSync } from 'glob';
import yaml from 'js-yaml';

export function loadSwaggerSpec(): any {
  const files = globSync(path.join(__dirname, '../docs/**/*.yml')); // ✅ correct
  const openapiDoc: any = {
    openapi: '3.0.0',
    info: {
      title: 'Inventory Management System API',
      version: '1.0.0',
    },
    paths: {},
    components: {
      schemas: {},
      responses: {},
      parameters: {},
      requestBodies: {},
      securitySchemes: {},
    },
  };

  for (const file of files) {
    const doc = yaml.load(fs.readFileSync(file, 'utf8')) as any;

    if (doc.paths) {
      Object.assign(openapiDoc.paths, doc.paths);
    }

    if (doc.components) {
      for (const [key, value] of Object.entries(doc.components)) {
        if (openapiDoc.components[key]) {
          Object.assign(openapiDoc.components[key], value);
        } else {
          openapiDoc.components[key] = value;
        }
      }
    }
  }

  return openapiDoc;
}
