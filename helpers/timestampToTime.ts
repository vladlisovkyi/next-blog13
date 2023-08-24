export default function timestampToTime(timestamp: string): string {
  const currentDate = new Date();
  const postDate = new Date(timestamp);
  const diffInMilliseconds = currentDate.getTime() - postDate.getTime();

  const timeUnits = [
    { unit: "year", divisor: 365 * 24 * 60 * 60 * 1000 },
    { unit: "week", divisor: 7 * 24 * 60 * 60 * 1000 },
    { unit: "day", divisor: 24 * 60 * 60 * 1000 },
    { unit: "hour", divisor: 60 * 60 * 1000 },
    { unit: "minute", divisor: 60 * 1000 },
  ];

  for (const unit of timeUnits) {
    const diff = Math.floor(diffInMilliseconds / unit.divisor);
    if (diff >= 1) {
      return `${diff} ${unit.unit}${diff > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}