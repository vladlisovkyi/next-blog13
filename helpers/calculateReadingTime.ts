export default function calculateReadingTime(
  content: string,
  wordsPerMinute: number = 200
): string {
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);

  if (minutes === 1) {
    return "1 minute read";
  } else {
    return `${minutes} minutes read`;
  }
}
