export function getDateTimeInfo(timestamp: string): {
  day: string;
  time: string;
  date: string;
} {
  const dateObj = new Date(timestamp);

  const day = dateObj.toLocaleDateString("en-US", { weekday: "long" });
  const time = dateObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const date = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return { day, time, date };
}

export function getDateTimeFromTimestamp(unixTimestamp: number): {
  day: string;
  time: string;
  date: string;
} {
  // Create a new Date object from the timestamp in milliseconds
  const date = new Date(unixTimestamp * 1000);

  // Get individual components with user's locale-specific formatting
  const day = date.toLocaleDateString("en-US", { weekday: "long" }); // Adjust options for desired format
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }); // Adjust options for desired format
  const dateString = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }); // Adjust options for desired format

  return { day, time, date: dateString };
}

export function getStartOfDayTimestamp(timestamp: number): number {
  const date = new Date(timestamp * 1000); // Convert to milliseconds for Date object
  date.setHours(0, 0, 0, 0); // Set time components to zero
  return Math.floor(date.getTime() / 1000); // Convert back to seconds and round down
}
