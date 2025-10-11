// src/hooks/useFirebaseAuth.ts

import { useEffect, useState } from "react";
import { auth } from "../config/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  IdTokenResult, 
} from "firebase/auth";

interface AuthState {
  user: User | null;
  role: string | null; // Added: Holds the user's custom claim role ('admin' or null)
  loading: boolean;
}

export function useFirebaseAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    role: null,
    loading: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      let role: string | null = null;

      if (currentUser) {
        // Crucial step: Force token refresh to get the latest custom claims
        const claims: IdTokenResult = await currentUser.getIdTokenResult(true);
        role = claims.claims.role as string || null; 
      }

      setAuthState({
        user: currentUser,
        role: role,
        loading: false,
      });
    });

    return () => unsubscribe();
  }, []); 

  const signup = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  return { ...authState, signup, login, logout };
}