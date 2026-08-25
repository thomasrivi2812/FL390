import type { Metadata } from "next";

import { DocPage } from "@/components/docs/doc-page";
import { LIVRAISON } from "@/lib/docs";

export const metadata: Metadata = {
  title: LIVRAISON.title,
  description: LIVRAISON.intro,
};

export default function LivraisonPage() {
  return <DocPage doc={LIVRAISON} />;
}
