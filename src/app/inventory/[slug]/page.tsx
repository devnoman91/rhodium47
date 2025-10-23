import { notFound } from 'next/navigation';
import { getProduct, getProducts } from '@/lib/shopify';
import  VehicleConfigClient from '@/components/inventory/VehicleConfigClient';

interface VehicleConfigPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface ParsedSections {
  topHeading: string;
  performanceData: string;
}

function parseDescriptionHtml(html: string): ParsedSections {
  let topHeading = '';
  let performanceData = '';

  // Extract content from <div id="top-heading">...</div> (with nested divs)
  const topHeadingStart = html.indexOf('<div id="top-heading">');
  if (topHeadingStart !== -1) {
    const searchStart = topHeadingStart + '<div id="top-heading">'.length;
    let depth = 1;
    let pos = searchStart;

    while (pos < html.length && depth > 0) {
      const nextOpen = html.indexOf('<div', pos);
      const nextClose = html.indexOf('</div>', pos);

      if (nextClose === -1) break;

      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth++;
        pos = nextOpen + 4;
      } else {
        depth--;
        if (depth === 0) {
          topHeading = html.substring(searchStart, nextClose);
          break;
        }
        pos = nextClose + 6;
      }
    }
  }

  // Extract content from <div id="perfomance-data">...</div> (with nested elements)
  const perfomanceStart = html.indexOf('<div id="perfomance-data">');
  if (perfomanceStart !== -1) {
    const searchStart = perfomanceStart + '<div id="perfomance-data">'.length;
    let depth = 1;
    let pos = searchStart;

    while (pos < html.length && depth > 0) {
      const nextOpen = html.indexOf('<div', pos);
      const nextClose = html.indexOf('</div>', pos);

      if (nextClose === -1) break;

      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth++;
        pos = nextOpen + 4;
      } else {
        depth--;
        if (depth === 0) {
          performanceData = html.substring(searchStart, nextClose);
          break;
        }
        pos = nextClose + 6;
      }
    }
  }

  return {
    topHeading,
    performanceData
  };
}

export default async function VehicleConfigPage({ params }: VehicleConfigPageProps) {
  const resolvedParams = await params;

  // Fetch product from Shopify
  const product = await getProduct(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  // Fetch all products to find the "Due Today" product by name
  const allProducts = await getProducts({ query: '' });
  const dueTodayProduct = allProducts.find((p: any) => 
    p.title.toLowerCase().includes('due today')
  );

  // Parse the descriptionHtml to extract sections
  const sections = parseDescriptionHtml(product.descriptionHtml || '');

  return (
    <VehicleConfigClient
      product={product}
      dueTodayProduct={dueTodayProduct}
      topHeadingHtml={sections.topHeading}
      performanceHtml={sections.performanceData}
    />
  );
}
