// routes.config.js
export const routes = {
  DC: [
    { path: '/dashboard', name: 'Dashboard' },
    { path: '/tehsils', name: 'Tehsil Management' },
    { path: '/users/ac', name: 'AC Management' },
    { path: '/users/mc', name: 'MC Management' },
    { path: '/users/co', name: 'CO Management' },
    { path: '/complaints', name: 'All Complaints' },
    { path: '/reports', name: 'Reports' }
  ],
  AC: [
    { path: '/dashboard', name: 'Dashboard' },
    { path: '/users/mc', name: 'MC Management' },
    { path: '/users/co', name: 'CO Management' },
    { path: '/complaints', name: 'Complaints' }
  ],
  MC: [
    { path: '/dashboard', name: 'Dashboard' },
    { path: '/complaints/assigned', name: 'My Complaints' }
  ],
  CO: [
    { path: '/dashboard', name: 'Dashboard' },
    { path: '/complaints/create', name: 'Register Complaint' },
    { path: '/complaints/assigned', name: 'My Complaints' }
  ]
};