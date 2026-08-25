import { HeaderSpacer } from "@/components/layout/header-spacer";

/**
 * Toutes les pages hors accueil dégagent la hauteur de l'en-tête fixe.
 */
export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderSpacer />
      {children}
    </>
  );
}
