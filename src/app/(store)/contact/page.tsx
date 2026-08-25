import type { Metadata } from "next";

import { DocPage } from "@/components/docs/doc-page";
import { CONTACT } from "@/lib/docs";

export const metadata: Metadata = {
  title: CONTACT.title,
  description: CONTACT.intro,
};

export default function ContactPage() {
  return <DocPage doc={CONTACT} />;
}
