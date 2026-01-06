// src/routes/Router.jsx
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

// Layouts
import AuthLayout from '@/ui/layout/AuthLayout';
import MainLayout from '@/ui/layout/MainLayout';

// Pages
import Login from '@/pages/auth/Login';
// import Register from '@/pages/auth/Register';        // uncomment when ready
// import ForgotPassword from '@/pages/auth/ForgotPassword';

// Protected Pages
import Dashboard from '@/pages/Dashboard';
import TehsilList from '@/pages/tehsil/TehsilList';
import TehsilCreate from '@/pages/tehsil/DCList';
import PublicRoute from './PublicRoutes';
import ProtectedRoutes from './ProtectedRoutes';
import UserCreate from '@/pages/users/UserCreate';
import DCList from '@/pages/tehsil/DCList';

// Route Protection Components

const router = createBrowserRouter([
  // 1. Root → redirect to login
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },

  // 2. Public/Auth routes (not protected)
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      // {
      //   path: 'choose-role',
      //   element: (
      //     <PublicRoute>
      //       <Register />
      //     </PublicRoute>
      //   ),
      // },
      // {
      //   path: 'forget-password',
      //   element: (
      //     <PublicRoute>
      //       <ForgotPassword />
      //     </PublicRoute>
      //   ),
      // },
    ],
  },

  // 3. Protected routes (everything under /portal)
  {
    path: '/portal',
    element: <MainLayout />,
    children: [
      {
        element: <ProtectedRoutes />, // ← protects all nested routes
        children: [
          {
            index: true,              // /portal → shows Dashboard
            element: <Dashboard />,
          },
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
          {
            path: '/portal/tehsils',
            element: <TehsilList />,
          },
          {
            path: '/portal/dcs',
            element: <DCList />,
          },

           {path : 'users/create',
            element : <UserCreate/>
           }
        ],
      },
    ],
  },

  // 4. Unauthorized / 403 page
  {
    path: '/unauthorized',
    element: (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>
          <h2 className="text-2xl font-semibold mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page.
          </p>
          <a
            href="/portal"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    ),
  },

  // 5. Catch-all (404)
  {
    path: '*',
    element: (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-6">Page not found</p>
          <a
            href="/"
            className="text-blue-600 hover:underline"
          >
            Go back to home
          </a>
        </div>
      </div>
    ),
  },
]);

export default router;