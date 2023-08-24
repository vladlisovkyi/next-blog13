export default function truncateText(str: string, length = 70) {
  return str.length > length ? str.slice(0, length) + "..." : str;
}
