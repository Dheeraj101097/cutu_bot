import { createBrowserRouter, Navigate } from 'react-router';
import { LoginScreen } from './screens/LoginScreen';
import { SignupScreen } from './screens/SignupScreen';
import { HomeScreen } from './screens/HomeScreen';
import { ChatScreen } from './screens/ChatScreen';
import { UploadScreen } from './screens/UploadScreen';
import { StocksScreen } from './screens/StocksScreen';
import { MusicScreen } from './screens/MusicScreen';
import { SettingsScreen } from './screens/SettingsScreen';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <LoginScreen />,
  },
  {
    path: '/signup',
    element: <SignupScreen />,
  },
  {
    path: '/home',
    element: <HomeScreen />,
  },
  {
    path: '/chat',
    element: <ChatScreen />,
  },
  {
    path: '/upload',
    element: <UploadScreen />,
  },
  {
    path: '/stocks',
    element: <StocksScreen />,
  },
  {
    path: '/music',
    element: <MusicScreen />,
  },
  {
    path: '/settings',
    element: <SettingsScreen />,
  },
]);
