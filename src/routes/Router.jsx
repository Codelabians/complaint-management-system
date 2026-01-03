import Login from '@/pages/auth/Login';
import Dashboard from '@/pages/Dashboard';
import TehsilCreate from '@/pages/tehsil/TehsilCreate';
import TehsilList from '@/pages/tehsil/TehsilList';
import MainLayout from '@/ui/layout/MainLayout';
import { createBrowserRouter } from 'react-router-dom';


// Import pages as you create them
// import TehsilList from '../pages/tehsil/TehsilList';
// import TehsilCreate from '../pages/tehsil/TehsilCreate';
// import TehsilEdit from '../pages/tehsil/TehsilEdit';
// import ACList from '../pages/users/ACList';
// import MCList from '../pages/users/MCList';
// import COList from '../pages/users/COList';
// import UserCreate from '../pages/users/UserCreate';
// import ComplaintList from '../pages/complaints/ComplaintList';
// import ComplaintCreate from '../pages/complaints/ComplaintCreate';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      // Tehsil Routes
      {
        path: 'tehsils',
        element: <TehsilList />
      },
       {
        path: 'tehsil-create',
        element: <TehsilCreate />
      },
      //   {
      //   path: 'login',
      //   element: <Login />
      // },
     
      // {
      //   path: 'tehsils/create',
      //   element: <TehsilCreate />
      // },
      // {
      //   path: 'tehsils/edit/:id',
      //   element: <TehsilEdit />
      // },
      
      // User Routes
      // {
      //   path: 'users/ac',
      //   element: <ACList />
      // },
      // {
      //   path: 'users/mc',
      //   element: <MCList />
      // },
      // {
      //   path: 'users/co',
      //   element: <COList />
      // },
      // {
      //   path: 'users/create',
      //   element: <UserCreate />
      // },
      
      // Complaint Routes
      // {
      //   path: 'complaints',
      //   element: <ComplaintList />
      // },
      // {
      //   path: 'complaints/create',
      //   element: <ComplaintCreate />
      // },
      // {
      //   path: 'complaints/assigned',
      //   element: <ComplaintAssigned />
      // },
      // {
      //   path: 'complaints/pending',
      //   element: <ComplaintPending />
      // },
      // {
      //   path: 'complaints/resolved',
      //   element: <ComplaintResolved />
      // },
      
      // Report Routes
      // {
      //   path: 'reports/tehsil',
      //   element: <TehsilReport />
      // },
      // {
      //   path: 'reports/users',
      //   element: <UserReport />
      // },
      // {
      //   path: 'reports/complaints',
      //   element: <ComplaintReport />
      // },
      
      // Settings Routes
      // {
      //   path: 'settings/profile',
      //   element: <Profile />
      // },
      // {
      //   path: 'settings/password',
      //   element: <ChangePassword />
      // },
      // {
      //   path: 'settings/system',
      //   element: <SystemSettings />
      // }
    ]
  }
]);

export default router;