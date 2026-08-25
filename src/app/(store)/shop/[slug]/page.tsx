import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductPurchase } from "@/components/product/product-purchase";
import { CaptionPill } from "@/components/ui/caption-pill";
import { formatPrice } from "@/lib/format";
import {
  getProduct,
  getProducts,
  hasSecondView,
  productMeta,
  SPEC_ROWS,
} from "@/lib/products";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(
  props: PageProps<"/shop/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await getProduct(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

const KEY = "font-label text-[9px] font-bold tracking-[0.26em] uppercase";

export default async function ProductPage(props: PageProps<"/shop/[slug]">) {
  const { slug } = await props.params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-start">
      <div className="flex flex-col gap-[14px] px-[22px] py-[18px] min-[760px]:pr-0">
        <figure className="relative m-0 aspect-3/4 overflow-hidden rounded-[14px] bg-stone">
          <Image
            src={product.image}
            alt={`${product.name} — impression dos`}
            fill
            priority
            sizes="(min-width: 760px) 50vw, 100vw"
            className="object-cover"
          />
          <CaptionPill className="bottom-[14px] left-[14px]">
            Dos — impression
          </CaptionPill>
        </figure>

        {hasSecondView(product) && (
          <figure className="relative m-0 aspect-3/4 overflow-hidden rounded-[14px] bg-stone">
            <Image
              src={product.secondImage}
              alt={`${product.name} — porté sur le tarmac`}
              fill
              sizes="(min-width: 760px) 50vw, 100vw"
              className="object-cover"
            />
            <CaptionPill className="bottom-[14px] left-[14px]">
              Porté — tarmac
            </CaptionPill>
          </figure>
        )}
      </div>

      <div className="border-t border-black/10 px-[clamp(22px,4vw,60px)] py-[clamp(28px,4vw,64px)] min-[760px]:sticky min-[760px]:top-(--header-height) min-[760px]:border-t-0 min-[760px]:border-l">
        <Link
          href="/shop"
          className={`${KEY} tracking-[0.28em] text-black/42 transition-colors duration-300 hover:text-ink`}
        >
          ← Shop all
        </Link>

        <h1 className="font-display mt-[22px] mb-0 text-[clamp(1.5rem,3.4vw,2.6rem)] leading-[1.08]">
          {product.name}
        </h1>

        <div className="mt-[14px] flex flex-wrap items-baseline gap-[16px]">
          <span className="font-label text-[19px] font-bold">
            {formatPrice(product.price)}
          </span>
          <span className={`${KEY} text-black/42`}>{productMeta(product)}</span>
        </div>

        <p className="mt-[24px] mb-0 max-w-[44ch] text-[15px]/[1.75] text-black/68">
          {product.description}
        </p>

        <ProductPurchase key={product.slug} product={product} />

        <dl className="mt-[40px] mb-0 border-t border-ink">
          {SPEC_ROWS.map((row) => (
            <div
              key={row.key}
              className="grid grid-cols-[minmax(100px,0.7fr)_1fr] gap-[16px] border-b border-black/14 py-[13px]"
            >
              <dt className={`${KEY} text-black/42`}>{row.key}</dt>
              <dd className="m-0 text-[14px] font-semibold">{row.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-[26px] flex flex-wrap gap-x-[28px] gap-y-[12px]">
          <Link
            href="/livraison"
            className={`${KEY} tracking-[0.24em] border-b border-black/30 transition-colors duration-300 hover:text-burgundy`}
          >
            Expédié 24–48h
          </Link>
          <Link
            href="/retours"
            className={`${KEY} tracking-[0.24em] border-b border-black/30 transition-colors duration-300 hover:text-burgundy`}
          >
            Retours 15 jours
          </Link>
        </div>
      </div>
    </div>
  );
}
