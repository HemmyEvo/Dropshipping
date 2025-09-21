import ProductClient from "./productClient";
import { getProductBySlug, getRelatedProductsByCategory } from "@/lib/actions/product.action";

export default async function ProductDetails({
  params,
  searchParams: searchParamsPromise,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string }>
}) {
  const { slug } = await params;

  try {
    // ✅ Fetch product
    const product = await getProductBySlug(slug);
    
    const searchParams = await searchParamsPromise;
    
    // Safely access category name - handle both old and new category structures
    const categoryName = typeof product.category === 'object' && product.category !== null
      ? product.category.name // New structure: { name: string, subcategories: string[] }
      : product.category;     // Old structure: string
    
    // Use the product's slug as the ID for related products query
    const relatedProducts = await getRelatedProductsByCategory({
      category: categoryName,
      productId: product.slug || product.sku,
      page: Number(searchParams.page || "1"),
    });

    return (
      <ProductClient
        product={product}
        relatedProducts={relatedProducts.data}
        searchParams={searchParams}
      />
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    
    // Return a not found page or error message
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }
}