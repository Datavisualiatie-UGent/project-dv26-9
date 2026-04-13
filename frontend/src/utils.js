export function formatMoney(value) {
  if (value == null || isNaN(value)) return "No data";

  return (
    new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value) + " USD"
  );
}