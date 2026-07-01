// Utility function to format timestamp to "Mon, Jan 1, 2024, 1:23 PM PST"
export const formatDateTime = (
  timestamp: string | null | undefined
): string => {
  if (!timestamp) return "-";

  try {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "-";

    // Get timezone abbreviation
    const timeString = date.toLocaleTimeString("en-US", {
      timeZoneName: "short",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const timezoneAbbr = timeString.split(" ").pop() || "";

    // Format: "Mon, Jan 1, 2024, 1:23 PM"
    const dateString = date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    // Remove any existing timezone from dateString (to avoid duplication)
    const dateStringNoTz = dateString.replace(/\s+[A-Z]{2,5}$/, "");

    return `${dateStringNoTz} ${timezoneAbbr}`;
  } catch (error) {
    return "-";
  }
};
