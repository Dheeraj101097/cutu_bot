import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { router } from './routes';

export default function App() {
  return (
    <ThemeProvider>
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'rgba(26, 40, 34, 0.9)', // Deep forest green
            color: '#fff',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(222, 237, 207, 0.2)', // Soft mint border
            borderRadius: '16px',
          },
          success: {
            iconTheme: {
              primary: '#DEEDCF',
              secondary: '#1A2822',
            },
          },
        }}
      />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}