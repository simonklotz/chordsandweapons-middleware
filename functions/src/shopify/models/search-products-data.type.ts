export type SearchProductsData = {
  products: {
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
    edges: Array<{
      node: {
        id: string;
        title: string;
        description: string;
        availableForSale: boolean;
        featuredImage?: { url: string; altText?: string | null } | null;
        images?: {
          edges: Array<{ node: { url: string; altText?: string | null } }>;
        };
        priceRange: {
          minVariantPrice: { amount: string; currencyCode: string };
          maxVariantPrice: { amount: string; currencyCode: string };
        };
        artist?: { value?: string } | null;
        audioPreview?: { value?: string } | null;
      };
    }>;
  };
};
