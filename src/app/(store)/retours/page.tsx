import type { Metadata } from "next";

import { DocPage } from "@/components/docs/doc-page";
import { RETOURS } from "@/lib/docs";

export const metadata: Metadata = {
  title: RETOURS.title,
  description: RETOURS.intro,
};

export default function RetoursPage() {
  return <DocPage doc={RETOURS} />;
}
