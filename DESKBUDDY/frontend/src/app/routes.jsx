import React, { useEffect, useState } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../server/firebase'; 

import { LoginScreen } from './screens/LoginScreen';
import { SignupScreen } from './screens/SignupScreen';
import { HomeScreen } from './screens/HomeScreen';
import { ChatScreen } from './screens/ChatScreen';
import { UploadScreen } from './screens/UploadScreen';
import { StocksScreen } from './screens/StocksScreen';
import { MusicScreen } from './screens/MusicScreen';
import { SettingsScreen } from './screens/SettingsScreen';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe; // Cleanup listener on unmount
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white/50">Loading...</div>;
  return user ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white/50">Loading...</div>;
  return !user ? children : <Navigate to="/home" replace />;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/home" replace />,
  },
  {
    path: '/login',
    element: <PublicRoute><LoginScreen /></PublicRoute>,
  },
  {
    path: '/signup',
    element: <PublicRoute><SignupScreen /></PublicRoute>,
  },
  {
    path: '/home',
    element: <ProtectedRoute><HomeScreen /></ProtectedRoute>,
  },
  {
    path: '/chat',
    element: <ProtectedRoute><ChatScreen /></ProtectedRoute>,
  },
  {
    path: '/upload',
    element: <ProtectedRoute><UploadScreen /></ProtectedRoute>,
  },
  {
    path: '/stocks',
    element: <ProtectedRoute><StocksScreen /></ProtectedRoute>,
  },
  {
    path: '/music',
    element: <ProtectedRoute><MusicScreen /></ProtectedRoute>,
  },
  {
    path: '/settings',
    element: <ProtectedRoute><SettingsScreen /></ProtectedRoute>,
  },
]);
