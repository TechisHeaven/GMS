export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const interval in intervals) {
    const time = Math.floor(secondsAgo / intervals[interval]);
    if (time >= 1) {
      return `${time} ${interval}${time > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
}
