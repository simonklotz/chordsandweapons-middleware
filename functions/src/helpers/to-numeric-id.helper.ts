/**
 * Converts a Shopify GID to its corresponding numeric ID.
 * 'gid://shopify/Product/15574017540478' -> 15574017540478
 */
export const toNumericId = (gid: string): number => {
  return Number(gid.split("/").pop());
};
