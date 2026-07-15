"use client";

import { Bell } from "lucide-react";
import { useState } from "react";

export function NotificationButton() {
  const [hasUnread] = useState(true);

  return (
    <button
      type="button"
      className="text-text-secondary hover:bg-surface-tertiary hover:text-text-primary focus-visible:ring-primary-500 relative rounded-lg p-2 transition-colors focus:outline-none focus-visible:ring-2"
      aria-label="Notifications"
    >
      <Bell className="h-5 w-5" />
      {hasUnread && (
        <span className="bg-danger-500 ring-surface absolute end-1.5 top-1.5 h-2 w-2 rounded-full ring-2" />
      )}
    </button>
  );
}
