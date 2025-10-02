export const key = {
  products: (after: string | undefined, first: number) =>
    `p:${first}:${after ? Buffer.from(after).toString("base64url") : "head"}`,
};
