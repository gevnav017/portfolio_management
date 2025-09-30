// Format a number as USD currency
export const toMoney = (value) => {
  if (value == null) return "-";
  const num = Number(value); // converts "1.1" → 1.1
  return num.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

// Format a number as a percentage (e.g. 0.1234 → "12.34%")
export const toPercent = (value, digits = 2) => {
  if (value == null || isNaN(value)) return "-";
  return (
    (value * 100).toLocaleString("en-US", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }) + "%"
  );
};

// Format a plain number with grouping and fixed decimals
export const toNumber = (value, digits = 2) => {
  if (value == null || isNaN(value)) return "-";
  return value.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
};
