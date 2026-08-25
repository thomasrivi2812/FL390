import type { Metadata } from "next";
import { Krona_One, Titillium_Web, Work_Sans } from "next/font/google";

import { CartDrawer } from "@/components/cart/cart-drawer";
import { CartProvider } from "@/components/cart/cart-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SITE, siteUrl } from "@/lib/site";
import "./globals.css";

/** Display uniquement : hero, titres de page, logotype, manifeste, marquees. */
const kronaOne = Krona_One({
  variable: "--font-krona-one",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

/** Copy courante, noms de produits, prix. */
const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/** Micro-labels en capitales : navigation, boutons, clés de tableaux. */
const titillium = Titillium_Web({
  variable: "--font-titillium",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE.name} Paris — Drop 01`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.fullName,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE.fullName,
    title: `${SITE.name} Paris — Drop 01`,
    description: SITE.description,
    // TODO : remplacer par un visuel dédié 1200 × 630 fourni par la marque.
    images: [{ url: "/img/cleared-navy.png", width: 1122, height: 1402 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} Paris — Drop 01`,
    description: SITE.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${kronaOne.variable} ${workSans.variable} ${titillium.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
