"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { initializeApp, FirebaseApp, getApps } from "firebase/app";
import { getAuth, Auth, onAuthStateChanged } from "firebase/auth";
import { getAnalytics, Analytics } from "firebase/analytics";
import * as DataConnectClient from "@tobyscoaching/data-connect-sdk";

export type DataConnectClientType = typeof DataConnectClient;

type FirebaseContextType = {
  app: FirebaseApp | null;
  auth: Auth | null;
  analytics: Analytics | null;
  isInitialized: boolean;
  error: string | null;
  user: Auth["currentUser"] | null | undefined;
  userProfile: NonNullable<DataConnectClient.GetUserData["user"]> | null;
  loadUserProfile: null | (() => Promise<void>);
  dataConnect: DataConnectClientType;
};

const FirebaseContext = createContext<FirebaseContextType>({
  app: null,
  auth: null,
  analytics: null,
  isInitialized: false,
  error: null,
  user: null,
  userProfile: null,
  loadUserProfile: null,
  dataConnect: DataConnectClient,
});

const firebaseConfig = {
  apiKey: "AIzaSyBVYyhpocUCnD0A8SaWbi4H8gJZHYk_atk",
  authDomain: "tobyscoaching-ffcc5.firebaseapp.com",
  projectId: "tobyscoaching-ffcc5",
  storageBucket: "tobyscoaching-ffcc5.firebasestorage.app",
  messagingSenderId: "788277920745",
  appId: "1:788277920745:web:0c272188af8af9ba1c4178",
  measurementId: "G-C37W50HTM4",
};

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const [app, setApp] = useState<FirebaseApp | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);

  // undefined means still waiting, null means no user
  const [user, setUser] = useState<Auth["currentUser"] | null | undefined>(
    undefined,
  );
  const [userProfile, setUserProfile] = useState<
    NonNullable<DataConnectClient.GetUserData["user"]> | null
  >(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeFirebase = async () => {
      try {
        console.log("Starting Firebase initialization...");
        console.log("Firebase config:", {
          projectId: firebaseConfig.projectId,
          authDomain: firebaseConfig.authDomain,
          apiKey: firebaseConfig.apiKey ? "***" : "missing",
        });

        // Check if Firebase is already initialized
        const existingApps = getApps();
        let _app: FirebaseApp;

        if (existingApps.length === 0) {
          // Initialize new Firebase app
          _app = initializeApp(firebaseConfig);
          console.log("Firebase app initialized:", _app.name);
        } else {
          // Use existing app
          _app = existingApps[0];
          console.log("Using existing Firebase app:", _app.name);
        }

        // Initialize Auth
        const _auth = getAuth(_app);
        console.log("Auth initialized for app:", _app.name);

        // Initialize Analytics only in browser and if not in development
        let _analytics: Analytics | null = null;
        if (
          typeof window !== "undefined" &&
          process.env.NODE_ENV === "production"
        ) {
          try {
            _analytics = getAnalytics(_app);
            console.log("Analytics initialized");
          } catch (analyticsError) {
            console.warn("Analytics initialization failed:", analyticsError);
          }
        }

        setApp(_app);
        setAuth(_auth);
        setAnalytics(_analytics);
        setIsInitialized(true);
        setError(null);

        console.log("Firebase initialization completed successfully");
      } catch (error: any) {
        console.error("Firebase initialization failed:", error);
        console.error("Error details:", {
          code: error.code,
          message: error.message,
          stack: error.stack,
        });
        setError(error.message || "Failed to initialize Firebase");
        setIsInitialized(true); // Mark as initialized even if failed
      }
    };

    initializeFirebase();
  }, []);

  // Listen for authentication state changes and update context
  useEffect(() => {
    if (!auth) return;

    // Handler for auth state changes
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        console.log(user);
        if (user === null) {
          setUserProfile(null);
        } else {
          await loadUserProfile();
        }
        setUser(user);
      },
      (error) => {
        setError(error.message || "Authentication state error");
      },
    );

    return () => unsubscribe();
  }, [auth]);

  const loadUserProfile = useCallback(async () => {
    if (!auth) return;
    const currentUser = auth.currentUser;
    if (!currentUser) return;
    const userProfileResponse = await DataConnectClient.getUser({
      id: currentUser.uid,
    });

    setUserProfile(userProfileResponse?.data?.user ?? null);
  }, [auth]);

  return (
    <FirebaseContext.Provider
      value={{
        app,
        auth,
        analytics,
        isInitialized,
        error,
        user,
        userProfile,
        dataConnect: DataConnectClient,
        loadUserProfile,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};
