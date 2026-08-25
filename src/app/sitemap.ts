import type { MetadataRoute } from "next";

import { getProducts } from "@/lib/products";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/shop", priority: 0.9 },
    { path: "/lookbook", priority: 0.7 },
    { path: "/livraison", priority: 0.4 },
    { path: "/retours", priority: 0.4 },
    { path: "/contact", priority: 0.4 },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route.path}`,
      priority: route.priority,
    })),
    ...products.map((product) => ({
      url: `${siteUrl}/shop/${product.slug}`,
      priority: 0.8,
    })),
  ];
}
