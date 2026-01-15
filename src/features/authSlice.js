// // src/features/auth/authSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   token:  null,
//   user:  null,
//   status: "idle",
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setCredentials: (state, action) => {
//       state.token = action?.payload?.token;
//       state.user = action?.payload?.user;

//       // Save to localStorage
//       localStorage.setItem("authToken", action.payload?.token);
//       localStorage.setItem("adminUser", JSON.stringify(action?.payload?.user));
//     },
//     clearCredentials: (state) => {
//       state.token = null;
//       state.user = null;

//       // Clear from localStorage
//       localStorage.removeItem("authToken");
//       localStorage.removeItem("adminUser");
//     },
//     setStatus: (state, action) => {
//       state.status = action.payload;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//     },
//   },
// });

// export const { setCredentials, clearCredentials, setStatus, setError } = authSlice.actions;
// export const selectCurrentUser = (state) => state.auth.user;
// export const selectCurrentToken = (state) => state.auth.token;
// export const selectAuthStatus = (state) => state.auth.status;
// export const selectAuthError = (state) => state.auth.error;

// export default authSlice.reducer;
// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  status: "idle",
  error: null,
  notifications: [], // ← new
  unreadCount: 0, // ← new
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload?.token;
      state.user = action.payload?.user;

      localStorage.setItem("authToken", action.payload?.token);
      localStorage.setItem("adminUser", JSON.stringify(action.payload?.user));
    },

    clearCredentials: (state) => {
      state.token = null;
      state.user = null;
      state.notifications = [];
      state.unreadCount = 0;

      localStorage.removeItem("authToken");
      localStorage.removeItem("adminUser");
    },

    // New actions for notifications
    addNewNotification: (state, action) => {
      state.notifications.unshift(action.payload); // add to beginning
      state.unreadCount += 1;
    },

    setNotifications: (state, action) => {
      state.notifications = action.payload;
      state.unreadCount = action.payload.filter((n) => !n.isRead).length;
    },

    markAllAsRead: (state) => {
      state.notifications = state.notifications.map((n) => ({
        ...n,
        isRead: true,
      }));
      state.unreadCount = 0;
    },

    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },

    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCredentials,
  clearCredentials,
  addNewNotification,
  setNotifications,
  markAllAsRead,
  clearNotifications,
  setStatus,
  setError,
} = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectNotifications = (state) => state.auth.notifications;
export const selectUnreadCount = (state) => state.auth.unreadCount;

export default authSlice.reducer;
