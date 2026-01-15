// src/components/SocketManager.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initSocket, disconnectSocket } from "@/services/socket";
import {
  selectCurrentUser,
  selectCurrentToken,
  addNewNotification,
  setNotifications,
} from "@/features/authSlice";
import { useGetQuery } from "@/services/apiService"; // adjust name if needed

export default function SocketManager() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  const { data: apiData, isSuccess } = useGetQuery("/notifications", {
    skip: !user?.id,
  });
  console.log(apiData, "from the socket manager");

  useEffect(() => {
    if (!user?.id) return;

    const socket = initSocket(token, user.id);

    socket.on("new-complaint", (payload) => {
      console.log(payload, "payload from the socker manager");
      dispatch(
        addNewNotification({
          ...payload,
          id: `live-${payload.complaintId}-${Date.now()}`,
          isRead: false,
        }),
      );
    });

    return () => {
      socket.off("new-complaint");
      disconnectSocket();
    };
  }, [user?._id, token, dispatch]);

  // Sync initial notifications from API
  useEffect(() => {
    if (isSuccess && apiData?.data) {
      dispatch(setNotifications(apiData.data));
    }
  }, [isSuccess, apiData, dispatch]);

  return null;
}
