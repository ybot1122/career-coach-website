import * as admin from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getDataConnect } from "firebase-admin/data-connect";

let serviceAccount = JSON.parse(
  process.env.FIREBASE_ADMIN_CREDENTIALS!,
);

// Validate service account
if (!serviceAccount) {
  throw new Error("Firebase Admin service account is not available.");
}

// Check if service account has required fields
if (
  !serviceAccount.project_id ||
  !serviceAccount.private_key ||
  !serviceAccount.client_email
) {
  throw new Error("Firebase Admin service account is missing required fields.");
}

let adminApp: admin.App;

try {
  if (admin.getApps().length === 0) {
    adminApp = admin.initializeApp({
      credential: admin.cert(serviceAccount),
    });
    console.log("Firebase Admin SDK initialized successfully");
  } else {
    adminApp = admin.getApps()[0];
    console.log("Using existing Firebase Admin app");
  }
} catch (error) {
  console.error("Failed to initialize Firebase Admin SDK:", error);
  throw new Error(
    `Firebase Admin SDK initialization failed: ${
      error instanceof Error ? error.message : "Unknown error"
    }`,
  );
}

export const adminAuth = getAuth(adminApp);
export const dataConnect = getDataConnect({
  serviceId: "tobyscoaching-ffcc5-service",
  location: "us-east4",
});
