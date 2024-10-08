export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetcher = (url) => fetch(url).then((res) => res.json());

export function ccyFormat(num) {
  return <>${`${parseFloat(num).toLocaleString("us-EN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</>;
}

export function capFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}