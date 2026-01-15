import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Bell, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectNotifications,
  selectUnreadCount,
  markAllAsRead,
} from "../../features/authSlice";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const notifications = useSelector(selectNotifications);
  const unreadCount = useSelector(selectUnreadCount);
  const dispatch = useDispatch();

  const modalRef = useRef(null);

  const toggle = () => {
    if (isOpen) {
      dispatch(markAllAsRead());
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatTime = (isoString) => {
    return new Date(isoString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <button
        onClick={toggle}
        className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={modalRef}
            className="fixed z-[1000] top-16 right-4 w-96 bg-white shadow-xl rounded-lg border border-gray-200 max-h-[80vh] flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-gray-800">Notifications</h3>
              <button
                onClick={toggle}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              {notifications.length === 0 ? (
                <div className="py-10 text-center text-gray-500">
                  No notifications yet
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id || notif.complaintId}
                    className={`p-4 border-b hover:bg-gray-50 transition-colors ${
                      !notif.isRead ? "bg-blue-50/40" : ""
                    }`}
                  >
                    <p className="font-medium text-gray-900">{notif.title}</p>
                    <p className="text-sm text-gray-700 mt-1">
                      {notif.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {formatTime(notif.createdAt)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default Notification;
