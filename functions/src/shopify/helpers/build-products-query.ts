// Defensive escaping (Shopify expects a query string; we keep it simple & safe)
function escapeQuotes(s: string) {
  return s.replace(/"/g, '\\"').replace(/'/g, "\\'");
}

/**
 * Build a balanced Shopify product query from a free-text term.
 * Example: (title:*term* OR product_type:*term* OR vendor:*term* OR tag:*term*)
 * You can tweak fields later (e.g., add `sku:` or `variants.sku:`).
 */
export function buildProductsQuery(userInput: string): string {
  const raw = userInput.trim();

  if (!raw) {
    return "inventory_total:>0";
  }

  const safe = escapeQuotes(raw.slice(0, 128)); // cap length to avoid abuse
  const term = safe.includes(" ") ? `"${safe}"` : safe;

  return `(title:*${term}* OR product_type:*${term}* OR vendor:*${term}* OR tag:*${term}*)`;
}
