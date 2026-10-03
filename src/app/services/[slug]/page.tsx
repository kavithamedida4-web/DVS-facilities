import { notFound } from "next/navigation";
import { MAIN_SERVICES } from "@/data/servicesData";
import ServiceDetailClient from "./ServiceDetailClient";

export function generateStaticParams() {
  return MAIN_SERVICES.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = MAIN_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} />;
}
