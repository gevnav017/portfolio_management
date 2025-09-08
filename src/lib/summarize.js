export function summarize(positions, spot = 0) {
  const N = (v) => Number(v ?? 0);

  // --- STOCKS ---
  const stock = positions.filter((p) => p.type === "Stock");
  const buys = stock.filter((s) => s.side?.toLowerCase() === "buy");
  const sells = stock.filter((s) => s.side?.toLowerCase() === "sell");

  const sharesBought = buys.reduce((n, s) => n + N(s.quantity), 0);
  const sharesSold = sells.reduce((n, s) => n + N(s.quantity), 0);
  const openQty = sharesBought - sharesSold;

  // Use sellPrice when available; fall back to purchasePrice
  const buyCost = buys.reduce(
    (sum, s) => sum + N(s.quantity) * N(s.purchasePrice),
    0
  );
  const sellProceeds = sells.reduce(
    (sum, s) =>
      sum +
      N(s.quantity) *
        (s.sellPrice != null ? N(s.sellPrice) : N(s.purchasePrice)),
    0
  );

  const originalCostBasis = buyCost;
  const avgCost = sharesBought > 0 ? originalCostBasis / sharesBought : 0;

  const currentPrice = N(spot);
  const unrealizedStockPL =
    openQty > 0 ? (currentPrice - avgCost) * openQty : 0;
  const realizedStockPL =
    sharesSold > 0 ? sellProceeds - avgCost * sharesSold : 0;

  // Dividends
  const dividendsCollected = positions
    .filter((p) => p.type === "Dividend")
    .reduce((sum, d) => sum + N(d.credit), 0);

  // --- OPTIONS ---
  const options = positions.filter(
    (p) => p.type !== "Stock" && p.type !== "Dividend"
  );
  const totalCredits = options.reduce((sum, o) => sum + N(o.credit), 0);
  const totalDebits = options.reduce((sum, o) => sum + N(o.debit), 0);
  const netPremium = totalCredits - totalDebits;

  const isOpen = (o) =>
    typeof o.status === "string"
      ? o.status.toLowerCase() === "open"
      : !!o.status;

  const openOptionPL = options
    .filter(isOpen)
    .reduce((sum, o) => sum + (N(o.credit) - N(o.debit)), 0);
  const closedOptionPL = options
    .filter((o) => !isOpen(o))
    .reduce((sum, o) => sum + (N(o.credit) - N(o.debit)), 0);
  const openOptionQty = options
    .filter(isOpen)
    .reduce((n, o) => n + N(o.quantity), 0);

  // Basis reduction by dividends + positive net premium
  const adjustedCostBasis =
    originalCostBasis - dividendsCollected - Math.max(0, netPremium);

  return {
    sharesBought,
    sharesSold,
    openQty,
    originalCostBasis,
    avgCost,
    currentPrice,
    unrealizedStockPL,
    realizedStockPL,
    dividendsCollected,
    netPremium,
    openOptionPL,
    closedOptionPL,
    openOptionQty,
    adjustedCostBasis,
  };
}
