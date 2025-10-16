import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/shopify';
import  VehicleConfigClient from '@/components/inventory/VehicleConfigClient';

interface VehicleConfigPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function VehicleConfigPage({ params }: VehicleConfigPageProps) {
  const resolvedParams = await params;

  // Fetch product from Shopify
  const product = await getProduct(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return (
    <VehicleConfigClient
      product={product}
    />
  );
}
