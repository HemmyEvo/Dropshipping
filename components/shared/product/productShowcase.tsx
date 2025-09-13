import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
}

interface ProductShowcaseProps {
  title: string;
  viewAllPath: string;
  products: Product[];
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ title, viewAllPath, products }) => {
  // Function to render star ratings
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={14}
          className={i <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
        />
      );
    }
    return stars;
  };

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className={`font-integral text-2xl md:text-3xl lg:text-4xl font-bold`}>
          {title}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {products.map((product) => (
          <div key={product.id} className="group">
            <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-3">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={400}
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
            
            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              {renderStars(product.rating)}
              <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
            </div>
            
            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">${product.price}</span>
              {product.originalPrice && (
                <span className="text-gray-500 line-through text-sm">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View All button at the bottom centered */}
      <div className="flex justify-center">
        <Link 
          href={viewAllPath}
          className="border border-black px-8 py-3 rounded-full font-medium hover:bg-black hover:text-white transition-colors"
        >
          View All
        </Link>
      </div>
    </section>
  );
};

export default ProductShowcase;