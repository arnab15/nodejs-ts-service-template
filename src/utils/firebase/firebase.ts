import * as path from 'path';

import admin from 'firebase-admin';

const serviceAccountPath = path.resolve(__dirname, '../../config/firebase-service-account.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
  });
}

export const firebaseAdmin = admin;
